import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json());

const PORT = 3000;

// Helper function to lazy-initialize the GoogleGenAI client on-demand from live env secrets
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "" || apiKey === "undefined") {
    return null;
  }
  try {
    return new GoogleGenAI({
      apiKey: apiKey.trim(),
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } catch (error) {
    console.error("Failed to lazily initialize GoogleGenAI client:", error);
    return null;
  }
}

// REST API Endpoints
app.get("/api/health", (req, res) => {
  const activeAi = getGeminiClient();
  res.json({
    status: "ok",
    hasGeminiActive: activeAi !== null,
    timestamp: new Date().toISOString()
  });
});

// AI Translation proxy endpoint
app.post("/api/translate", async (req, res) => {
  const { text, targetLang } = req.body;
  if (!text || typeof text !== "string" || !targetLang) {
    return res.status(400).json({ error: "Missing or invalid text or targetLang parameters." });
  }

  // If targetLang is English, return original
  if (targetLang === "en") {
    return res.json({ translatedText: text });
  }

  // Get full language name for the LLM
  const langNames: Record<string, string> = {
    hi: "Hindi",
    fr: "French",
    de: "German",
    es: "Spanish",
    it: "Italian",
    pt: "Portuguese",
    ar: "Arabic",
    zh: "Chinese (Simplified)",
    ja: "Japanese",
    ru: "Russian"
  };
  const targetLanguageName = langNames[targetLang] || targetLang;

  const activeAi = getGeminiClient();
  if (activeAi) {
    try {
      const response = await activeAi.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Translate this text precisely into ${targetLanguageName}.
Context: It is for a luxury, biological, futuristic dental studio website. Keep the exact tone (modern, high-fidelity, polished, medically accurate) and maintain formatting keys (like keeping same numbers, capitalization, line endings, dynamic blocks).
Crucial: Respond with EXACTLY the translated text and nothing else. Do NOT envelope in quotes, do NOT add introductory or explanatory texts, do NOT append notes.

Text to translate:
${text}`,
      });

      const translatedText = response.text?.trim() || text;
      return res.json({ translatedText });
    } catch (error: any) {
      console.error(`Gemini Translation proxy failed for [${targetLang}]:`, error.message);
      return res.status(500).json({ error: "AI translation generation failed." });
    }
  } else {
    // Local fallback
    return res.json({ translatedText: `${text}` });
  }
});

// Chatbot Endpoint
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Missing or invalid message parameter." });
  }

  // System instruction for the Gemini Chat model
  const systemInstruction = `You are Chatpata Assistant, the premier virtual clinical coordinator at Chatpata Dental Studio. 
Chatpata Dental Studio is a luxury, state-of-the-art biological dentistry practice.
We provide 10 specialized services:
1. General Dentistry ($150-$450): diagnostics, dental cleanings, composite fillings.
2. Teeth Whitening ($299-$599): zoom laser-whitening, up to 8 shades in 1 hour.
3. Dental Implants ($1800-$3500): robotic computer-guided single or full-arch implants.
4. Root Canal Therapy ($650-$1200): microscopic pain-free nerve therapy.
5. Orthodontics ($3000-$6500): smart clear aligners or low-friction brackets.
6. Cosmetic Dentistry ($950-$2100/tooth): handcrafted German porcelain veneers, micro-enamel preparation.
7. Pediatric Dentistry ($100-$250): stress-free kids cleaning, protective sealants.
8. Crowns & Bridges ($800-$1800): single-visit CAD/CAM robotic block milling.
9. Wisdom Tooth Extraction ($350-$800): piezosurgery gentle water-cooled removals.
10. Emergency Dental Care ($150-$600): same-day urgent slots for pain or traumatic teeth issues.

Our Elite Doctors:
- Dr. Elena Lumina (Chief Medical Officer): DDS, PhD Harvard, specializes in 3D digital prosthodontics and robotic surgery.
- Dr. Julian Vane (Senior Periodontist): Columbia graduate, specializes in implants and oral surgeries.
- Dr. Elara Thorne (Orthodontist): University of Michigan graduate, specializes in clear aligners and jaw aesthetics.
- Dr. Marcus Chen (Aesthetic Design): Penn Dental master, specializes in celebrity cosmetic porcelain work.

Your Character:
- Be warm, extremely empathetic, sophisticated, and clinically professional.
- Address questions about oral safety, appointment times, prices, and doctor expertise.
- Keep your answers highly concise (under 3 robust sentences or a quick bullet list).
- Invite them to book using the on-page form if they are asking about scheduling.
- NEVER suggest diagnoses that require a physical exam; advise our doctors' digital consults instead.`;

  const activeAi = getGeminiClient();
  if (activeAi) {
    try {
      // Reconstruct simple chat messages for @google/genai generateContent
      // Ensure we don't exceed token limits and stay highly stable
      const rawContents: any[] = [];
      
      // Map historical messages safely
      if (history && Array.isArray(history)) {
        for (const turn of history) {
          if (turn && turn.text && typeof turn.text === "string" && turn.text.trim() !== "") {
            rawContents.push({
              role: turn.role === "user" ? "user" : "model",
              parts: [{ text: turn.text.trim() }]
            });
          }
        }
      }
      
      // Append the latest user query
      rawContents.push({
        role: "user",
        parts: [{ text: message.trim() }]
      });

      // Gemini strictly requires alternating roles: user, model, user, model...
      // Let's filter and merge contiguous turns with the same role to guarantee successful schema validation
      const sanitizedContents: any[] = [];
      let lastRole: string | null = null;

      for (const turn of rawContents) {
        if (turn.role === lastRole) {
          // Merge consecutive identical roles by appending the text
          if (sanitizedContents.length > 0) {
            const lastPart = sanitizedContents[sanitizedContents.length - 1].parts[0];
            lastPart.text = `${lastPart.text}\n${turn.parts[0].text}`;
          }
        } else {
          sanitizedContents.push({
            role: turn.role,
            parts: [{ text: turn.parts[0].text }]
          });
          lastRole = turn.role;
        }
      }

      // Ensure the collection starts with 'user' role if the model requires it
      if (sanitizedContents.length > 0 && sanitizedContents[0].role !== "user") {
        // If it starts with 'model', shift it out or prepend a placeholder user turn
        sanitizedContents.unshift({
          role: "user",
          parts: [{ text: "Hello!" }]
        });
      }

      const response = await activeAi.models.generateContent({
        model: "gemini-3.5-flash",
        contents: sanitizedContents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "I apologize, but I struggled to generate a clinical response. How else can I assist you with Chatpata details?";
      return res.json({ reply: replyText, mode: "Gemini AI" });

    } catch (error: any) {
      console.error("Gemini API error, launching backup coordinator:", error.message);
      // Let it fall back to standard smart matching if the external service fails
    }
  }

  // Smart localized dental matching response engine (Local Fallback)
  const lowerMsg = message.toLowerCase();
  let fallbackReply = "Thank you for reaching out to Chatpata Dental Studio. Our expert clinical coordinators can assist you. Would you like to schedule an appointment with Dr. Lumina, Dr. Vane, Dr. Thorne, or Dr. Chen?";

  if (lowerMsg.includes("hello") || lowerMsg.includes("hi ") || lowerMsg.includes("hey")) {
    fallbackReply = "Welcome to Chatpata Dental Studio. I am Chatpata Assistant, your luxury oral care coordinator. How may I assist you with our advanced procedures or scheduling an appointment today?";
  } else if (lowerMsg.includes("implant") || lowerMsg.includes("replace tooth") || lowerMsg.includes("screw") || lowerMsg.includes("missing")) {
    fallbackReply = "For tooth replacements, Dr. Julian Vane specializes in computer-guided robotic Dental Implants ($1,800 - $3,500) with lifetime durability. You can schedule an implant scan directly inside our appointment terminal.";
  } else if (lowerMsg.includes("ortho") || lowerMsg.includes("aligner") || lowerMsg.includes("brace") || lowerMsg.includes("straight") || lowerMsg.includes("invisalign")) {
    fallbackReply = "Our orthodontist, Dr. Elara Thorne, crafts customized Clear Aligner progressions ($3,000 - $6,500) with exact 3D bite pathway simulations. She can align your smile beautifully.";
  } else if (lowerMsg.includes("veneer") || lowerMsg.includes("cosmetic") || lowerMsg.includes("white") || lowerMsg.includes("bleach") || lowerMsg.includes("smile")) {
    fallbackReply = "We offer cold-blue Laser Teeth Whitening ($299 - $599) and premium German Porcelain Veneers ($950 - $2,100 per tooth) designed by cosmetic specialist Dr. Marcus Chen.";
  } else if (lowerMsg.includes("pain") || lowerMsg.includes("emergency") || lowerMsg.includes("hurt") || lowerMsg.includes("broken") || lowerMsg.includes("bleed")) {
    fallbackReply = "If you are experiencing sudden dental pain, we allocate priority same-day Emergency Dental slots ($150 - $600) for instant relief. Please use our booking terminal to select 'Emergency Dental Care' immediately.";
  } else if (lowerMsg.includes("pricing") || lowerMsg.includes("cost") || lowerMsg.includes("insurance") || lowerMsg.includes("expensive") || lowerMsg.includes("fee")) {
    fallbackReply = "Chatpata Dental Studio holds direct relationships with premier PPO dental insurance networks and handles all documents on your behalf. We also support interest-free monthly installment plans (EMI) or CareCredit. Detailed treatment pricing cards are visible in our pricing guide page section.";
  } else if (lowerMsg.includes("doctor") || lowerMsg.includes("dentist") || lowerMsg.includes("who is") || lowerMsg.includes("staff")) {
    fallbackReply = "Chatpata Studio features Dr. Elena Lumina (Robotic Surgery & CMO), Dr. Julian Vane (Implants), Dr. Elara Thorne (Clear Aligners), and Dr. Marcus Chen (Aesthetic Veneers). Each expert brings unmatched Ivy-League or top research experience.";
  } else if (lowerMsg.includes("root canal") || lowerMsg.includes("canal") || lowerMsg.includes("decay")) {
    fallbackReply = "We provide entirely pain-free Root Canal treatments ($650 - $1,200) under state-of-the-art micro-endodontic camera systems, saving your original tooth biological structure safely.";
  } else if (lowerMsg.includes("hours") || lowerMsg.includes("open") || lowerMsg.includes("schedule") || lowerMsg.includes("time") || lowerMsg.includes("days")) {
    fallbackReply = "Chatpata Dental Studio is open Monday through Friday from 08:30 AM to 06:00 PM. You can choose your preferred expert, date, and specific morning/afternoon slot seamlessly in our interactive Booking System.";
  }

  return res.json({ reply: fallbackReply, mode: "Clinical Match Engine" });
});

// Configure Vite integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Dynamic import of Vite for development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware attached.");
  } else {
    // Serve production static assets compiled by 'npm run build'
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[CHATPATA SERVER] Running smoothly on port ${PORT}`);
  });
}

startServer();

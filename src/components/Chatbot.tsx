import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageCircle, X, Send, Bot, ShieldCheck, ChevronRight } from 'lucide-react';

interface ChatTurn {
  role: 'user' | 'model';
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatTurn[]>([
    {
      role: 'model',
      text: "Hello! I am Chatpata Assistant, your luxury virtual clinical caretaker. I can describe our 10 therapies, help select elite doctors, or guide you on prices. How may I support your smile today?"
    }
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiMode, setAiMode] = useState("Chatpata AI Portal");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat portal logs
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Append user input
    const userTurn: ChatTurn = { role: 'user', text: textToSend };
    setMessages((prev) => [...prev, userTurn]);
    setInputMsg("");
    setIsLoading(true);

    try {
      // Direct electronic call to server-side chatbot route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          // Extract last 6 messages safely to prevent massive payloads
          history: messages.slice(-6)
        })
      });

      if (response.ok) {
        const data = await response.json();
        const modelTurn: ChatTurn = { role: 'model', text: data.reply };
        if (data.mode) {
          setAiMode(data.mode);
        }
        setMessages((prev) => [...prev, modelTurn]);
      } else {
        throw new Error("Clinical server failed connection.");
      }
    } catch (err) {
      console.error(err);
      // Clean fallback if anything drops out
      const fallbackTurn: ChatTurn = {
        role: 'model',
        text: "I apologize, but my medical server connection is temporarily fluctuating. Please feel free to give our frontdesk a call at (555) 019-2834, or let me know if I can guide you on general pricing instead!"
      };
      setMessages((prev) => [...prev, fallbackTurn]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (qText: string) => {
    handleSend(qText);
  };

  const preSets = [
    { label: "Suggest Implant Doctor", q: "Who is your implant specialist and what are his qualifications?" },
    { label: "Veneers Price Range", q: "What is the cost of handcrafted veneers?" },
    { label: "Emergency Pain Service", q: "I have extreme tooth pain, what should I do?" }
  ];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      
      {/* Tiny Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-slate-900 text-teal-400 hover:text-teal-300 shadow-2xl flex items-center justify-center border border-slate-800 transition-transform hover:scale-105 active:scale-95 cursor-pointer relative group"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-teal-500 rounded-full w-4 h-4 flex items-center justify-center border-2 border-white">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            </span>
            <div className="absolute right-16 bg-slate-900 border border-slate-800 text-white text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300">
              Assistance Portal
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-[calc(100vw-32px)] sm:w-[365px] h-[480px] bg-white rounded-3xl border border-slate-200/90 shadow-2xl flex flex-col justify-between overflow-hidden text-left"
          >
            {/* Header */}
            <div className="bg-slate-900 p-4 shrink-0 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-xl text-teal-400">
                  <Bot className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white font-sans">Chatpata Assistant</h4>
                  <div className="flex items-center gap-1 text-[9px] text-teal-400 font-mono">
                    <ShieldCheck className="h-3 w-3" />
                    <span>{aiMode} Active</span>
                  </div>
                </div>
              </div>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 px-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chats Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              
              {messages.map((turn, index) => (
                <div
                  key={index}
                  className={`flex ${turn.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs font-sans leading-relaxed shadow-xs ${turn.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-150 rounded-tl-none'}`}
                  >
                    {turn.text}
                  </div>
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl p-3 shadow-xs border border-slate-150 rounded-tl-none flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce delay-200" />
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce delay-300" />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Quick Prompts Suggestions */}
            {messages.length === 1 && (
              <div className="border-t border-slate-100 p-3 bg-white shrink-0 space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans px-1">Suggested Inquiries</p>
                <div className="flex flex-col gap-1.5">
                  {preSets.map((preset, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => handleQuickQuestion(preset.q)}
                      className="text-left py-2 px-3 hover:bg-slate-50 text-slate-700 hover:text-teal-700 border border-slate-150 shadow-inner rounded-xl text-[11px] font-sans font-medium transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>{preset.label}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-300 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Text Input Footer */}
            <div className="p-3 border-t border-slate-150 bg-white flex gap-2 shrink-0 items-center">
              <input
                type="text"
                placeholder="Write your clinical inquire..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSend(inputMsg); }}
                className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-teal-500/10"
              />
              <button
                type="button"
                onClick={() => handleSend(inputMsg)}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-teal-400 hover:text-teal-300 shadow-md transition-colors cursor-pointer shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

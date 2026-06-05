import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, LANGUAGES, detectBrowserLanguage, TRANSLATIONS } from '../translations';

interface TranslationContextType {
  lang: Language;
  setLanguage: (lang: Language) => void;
  t: (text: string) => string;
  isTranslating: boolean;
  allTranslations: Record<string, Record<string, string>>;
  saveManualTranslation: (originalText: string, targetLanguage: Language, translatedValue: string) => void;
  getTranslationProgress: () => { translated: number; total: number; percentage: number };
  triggerAutoTranslateAll: () => Promise<void>;
  aiTranslateSingle: (text: string, targetLang: Language) => Promise<string>;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Initial default cache of some key website segments to speed up rendering
const INITIAL_CORE_VOCAB: Record<string, Record<string, string>> = {
  "Chief Medical Officer": {
    hi: "मुख्य चिकित्सा अधिकारी",
    fr: "Médecin-Chef",
    de: "Chefarzt",
    es: "Director Médico",
    it: "Direttore Sanitario",
    pt: "Diretor Médico",
    ar: "كبير الأطباء",
    zh: "首席医疗官",
    ja: "最高医学責任者",
    ru: "Главный Врач"
  },
  "Senior Implantologist": {
    hi: "वरिष्ठ इम्प्लांटोलॉजिस्ट",
    fr: "Implantologue Senior",
    de: "Leitender Implantologe",
    es: "Implantólogo Sénior",
    it: "Implantologo Senior",
    pt: "Implantologista Sênior",
    ar: "أخصائي زراعة الأسنان الأقدم",
    zh: "资深种植牙专家",
    ja: "シニア・インプラント専門医",
    ru: "Старший Имплантолог"
  },
  "Orthodontist Specialist": {
    hi: "ऑर्थोडॉन्टिस्ट विशेषज्ञ",
    fr: "Orthodontiste Spécialiste",
    de: "Kieferorthopäde",
    es: "Ortodoncista Especialista",
    it: "Ortodontista Specialista",
    pt: "Ortodontista Especialista",
    ar: "أخصائي تقويم الأسنان المتميز",
    zh: "正畸科专家",
    ja: "矯正歯科専門医",
    ru: "Ортодонт-Специалист"
  },
  "Cosmetic Dentist Specialist": {
    hi: "कॉस्मेटिक दंत चिकित्सक विशेषज्ञ",
    fr: "Dentiste Cosmétique Spécialiste",
    de: "Ästhetischer Zahnarzt",
    es: "Dentista Cosmético Especialista",
    it: "Dentista Estetico Specialista",
    pt: "Dentista Estético Especialista",
    ar: "أخصائي تجميل الأسنان المتميز",
    zh: "美容美白牙科专家",
    ja: "審美歯科専門医",
    ru: "Эстетический Стоматолог"
  }
};

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('en');
  const [isLoadingLanguage, setIsLoadingLanguage] = useState(true);
  const [isTranslating, setIsTranslating] = useState(false);
  
  // Dynamically loaded dynamic translations
  // Format: { [englishSourceText]: { [langCode]: translatedText } }
  const [allTranslations, setAllTranslations] = useState<Record<string, Record<string, string>>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chatpata_ai_translations');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse translations from localStorage", e);
        }
      }
    }
    return INITIAL_CORE_VOCAB;
  });

  // Persist translations when updated
  useEffect(() => {
    localStorage.setItem('chatpata_ai_translations', JSON.stringify(allTranslations));
  }, [allTranslations]);

  // Initial path/search and browser language detection matching SEO friendly URLs
  useEffect(() => {
    const initLanguage = () => {
      if (typeof window === 'undefined') return;

      const path = window.location.pathname;
      // Check if path is e.g., /hi, /fr, /es
      const pathParts = path.split('/').filter(Boolean);
      const possibleLang = pathParts[0] as Language;
      
      const isSupported = LANGUAGES.some(l => l.code === possibleLang);
      
      let finalLang: Language = 'en';

      if (isSupported) {
        finalLang = possibleLang;
      } else {
        // Fall back to localStorage or browser auto-detection
        const savedLang = localStorage.getItem('selected_language') as Language;
        if (savedLang && LANGUAGES.some(l => l.code === savedLang)) {
          finalLang = savedLang;
        } else {
          finalLang = detectBrowserLanguage();
        }
        
        // Push the correct SEO-friendly path state silently (preserve hashes like #pricing)
        const hash = window.location.hash || '';
        window.history.replaceState(null, '', `/${finalLang}${hash}`);
      }

      setLanguage(finalLang);
      setIsLoadingLanguage(false);
    };

    initLanguage();
  }, []);

  const setLanguage = (newLang: Language) => {
    if (!LANGUAGES.some(l => l.code === newLang)) return;
    
    setLangState(newLang);
    localStorage.setItem('selected_language', newLang);

    if (typeof document !== 'undefined') {
      const isRtl = LANGUAGES.find(l => l.code === newLang)?.isRtl;
      document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
      document.documentElement.lang = newLang;

      // Update URL path prefix (e.g. /en, /hi, /ar) preserving hash and query
      const hash = window.location.hash || '';
      const search = window.location.search || '';
      window.history.pushState(null, '', `/${newLang}${search}${hash}`);

      // Dynamically updates SEO Head Tag alternates (hreflang)
      updateSeoTags(newLang);
    }
  };

  // Modern SEO alternative lang tags and metadata optimizer
  const updateSeoTags = (activeLang: Language) => {
    const head = document.head;
    
    // Clear old tags
    const existingHreflangs = head.querySelectorAll('link[rel="alternate"]');
    existingHreflangs.forEach(el => el.remove());

    const existingCanonical = head.querySelector('link[rel="canonical"]');
    if (existingCanonical) existingCanonical.remove();

    // Create hreflang tags
    LANGUAGES.forEach(l => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = l.code;
      link.href = `${window.location.origin}/${l.code}`;
      head.appendChild(link);
    });

    // Create x-default alternative
    const defaultLink = document.createElement('link');
    defaultLink.rel = 'alternate';
    defaultLink.hreflang = 'x-default';
    defaultLink.href = `${window.location.origin}/en`;
    head.appendChild(defaultLink);

    // Create canonical link
    const canonLink = document.createElement('link');
    canonLink.rel = 'canonical';
    canonLink.href = `${window.location.origin}/${activeLang}${window.location.hash || ''}`;
    head.appendChild(canonLink);

    // Set page Title and Meta Description for SEO based on active language
    const studioTitleSuffix = activeLang === 'en' ? 'Chatpata Biological Dental Studio' : 'Chatpata Dental';
    let titleText = `Elite Biological Dentistry | ${studioTitleSuffix}`;
    let descText = "Discover luxury biological, metal-free, and robotic-guided dentistry with custom high-tech dental care programs.";

    if (activeLang === 'hi') {
      titleText = `एलीट बायोलॉजिकल दंत चिकित्सा | ${studioTitleSuffix}`;
      descText = "शानदार मेटल-मुक्त, कस्टम उच्च तकनीक और रोबोटिक-निर्देशित दंत समाधान खोजें।";
    } else if (activeLang === 'es') {
      titleText = `Odontología Biológica de Élite | ${studioTitleSuffix}`;
      descText = "Descubra la odontología biológica de lujo, libre de metales y guiada por robótica con atención personalizada.";
    } else if (activeLang === 'fr') {
      titleText = `Dentisterie Biologique d'Élite | ${studioTitleSuffix}`;
      descText = "Découvrez la dentisterie biologique de luxe, sans métal et guidée par la robotique avec nos soins dentaires.";
    } else if (activeLang === 'ar') {
      titleText = `طب الأسنان الحيوي الراقي | ${studioTitleSuffix}`;
      descText = "اكتشف طب الأسنان الحيوي الفاخر والخالي من المعادن والموجه بالروبوت مع برامج رعاية مخصصة.";
    }

    document.title = titleText;
    let metaDesc = head.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', descText);
  };

  // Server-side AI Translation action Proxy
  const aiTranslateSingle = useCallback(async (text: string, targetLang: Language): Promise<string> => {
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, targetLang }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.translatedText) {
          return data.translatedText;
        }
      }
      return `${text} (${targetLang.toUpperCase()})`;
    } catch (err) {
      console.error("Failed background AI translation:", err);
      return text;
    }
  }, []);

  const saveManualTranslation = useCallback((originalText: string, targetLanguage: Language, translatedValue: string) => {
    setAllTranslations(prev => ({
      ...prev,
      [originalText]: {
        ...(prev[originalText] || {}),
        [targetLanguage]: translatedValue
      }
    }));
  }, []);

  // One-click text translator with real-time background AI trigger + fallback instantly
  const t = useCallback((text: string): string => {
    if (!text || typeof text !== 'string') return '';
    const trimmed = text.trim();
    if (!trimmed) return text;
    
    // English is the source reference language
    if (lang === 'en') return trimmed;

    // Check pre-saved translations
    const translationsForText = allTranslations[trimmed];
    if (translationsForText && translationsForText[lang]) {
      return translationsForText[lang];
    }

    // Missing translation!
    // 1. Instantly register in allTranslations state (to make it viewable in Admin panel)
    // 2. Trigger async background AI request to fetch and save translation dynamically
    // Thus rendering updates instantly when response settles. Elegant micro-interaction!
    if (!translationsForText || translationsForText[lang] === undefined) {
      // Register temporary empty block to prevent infinite re-fetches
      setAllTranslations(prev => {
        if (prev[trimmed]?.[lang] !== undefined) return prev;
        return {
          ...prev,
          [trimmed]: {
            ...(prev[trimmed] || {}),
            [lang]: "" // placeholder representing processing state
          }
        };
      });

      // Background AI API pull
      aiTranslateSingle(trimmed, lang).then(translated => {
        if (translated && translated !== trimmed) {
          setAllTranslations(prev => ({
            ...prev,
            [trimmed]: {
              ...(prev[trimmed] || {}),
              [lang]: translated
            }
          }));
        }
      });
    }

    // Default immediate fallback is English to keep UI perfectly legible
    return trimmed;
  }, [lang, allTranslations, aiTranslateSingle]);

  // Translation stats compiler dashboard helper
  const getTranslationProgress = useCallback(() => {
    const totalKeys = Object.keys(allTranslations).length;
    if (totalKeys === 0) return { translated: 0, total: 0, percentage: 100 };

    // Calculate how many total slots across all 10 non-English languages are populated
    const targetLangs = LANGUAGES.filter(l => l.code !== 'en');
    let filledSlots = 0;
    const totalSlots = totalKeys * targetLangs.length;

    Object.values(allTranslations).forEach(translations => {
      targetLangs.forEach(l => {
        if (translations[l.code] && translations[l.code].trim() !== "") {
          filledSlots++;
        }
      });
    });

    return {
      translated: filledSlots,
      total: totalSlots,
      percentage: Math.round((filledSlots / totalSlots) * 100) || 0
    };
  }, [allTranslations]);

  // Bulk translation sequence runner
  const triggerAutoTranslateAll = async () => {
    setIsTranslating(true);
    const targetLangs = LANGUAGES.filter(l => l.code !== 'en');
    const sourceKeys = Object.keys(allTranslations);

    try {
      // Process chunks to avoid heavy rate limits
      for (const originalText of sourceKeys) {
        const languageMapping = allTranslations[originalText] || {};
        
        for (const targetL of targetLangs) {
          if (!languageMapping[targetL.code] || languageMapping[targetL.code].trim() === "") {
            const translated = await aiTranslateSingle(originalText, targetL.code);
            languageMapping[targetL.code] = translated;
          }
        }

        setAllTranslations(prev => ({
          ...prev,
          [originalText]: { ...languageMapping }
        }));
      }
    } catch (e) {
      console.error("AI Auto translation runner encountered errors: ", e);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <TranslationContext.Provider
      value={{
        lang,
        setLanguage,
        t,
        isTranslating,
        allTranslations,
        saveManualTranslation,
        getTranslationProgress,
        triggerAutoTranslateAll,
        aiTranslateSingle
      }}
    >
      {!isLoadingLanguage && <div className="font-sans antialiased">{children}</div>}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

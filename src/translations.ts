export type Language = 
  | 'en' | 'hi' | 'fr' | 'de' | 'es' 
  | 'it' | 'pt' | 'ar' | 'zh' | 'ja' | 'ru';

export interface LanguageConfig {
  code: Language;
  name: string;
  flag: string;
  isRtl?: boolean;
}

export const LANGUAGES: LanguageConfig[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', isRtl: true },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

export const TRANSLATIONS: Record<Language, any> = {
  en: {
    nav: {
      about: "Studio About",
      services: "Therapies",
      doctors: "Elite Board",
      gallery: "Smile Gallery",
      spaces: "Spaces",
      pricing: "Pricing",
      blogs: "Science Blogs",
      contact: "Contact Us"
    },
    header: {
      dashboard: "Dashboard Roster",
      bookSlot: "Book Slot",
      bookSlotNow: "Book Slot Now",
      subLogo: "BIOLOGICAL STUDIO",
      biologicalSurgery: "Biological Surgery"
    },
    footer: {
      treatments: "Treatments",
      admittance: "Admittance",
      headquarters: "Headquarters",
      monFri: "Mon – Fri",
      saturdays: "Saturdays",
      emergencyOnly: "Emergency slots only",
      onDuty: "On-Duty Practitioner online",
      rightsReserved: "All Rights Reserved. HIPAA Compliant Roster Portal.",
      privacy: "Privacy Terms",
      fda: "FDA Disclaimers",
      insurance: "Insurance Codes"
    },
    currencySymbol: "$",
    localeCode: "en-US",
  },
  hi: {
    nav: {
      about: "स्टूडियो परिचय",
      services: "चिकित्सा सेवाएँ",
      doctors: "विशेषज्ञ डॉक्टर",
      gallery: "गैलरी (सनमाइल)",
      spaces: "क्लिनिक परिसर",
      pricing: "अंदाज़ा खर्च",
      blogs: "विज्ञान ब्लॉग",
      contact: "संपर्क करें"
    },
    header: {
      dashboard: "डैशबोर्ड पोर्टल",
      bookSlot: "अपॉइंटमेंट लें",
      bookSlotNow: "अभी बुक करें",
      subLogo: "बायोलॉजिकल डेंटल स्टूडियो",
      biologicalSurgery: "बायोलॉजिकल सर्जरी"
    },
    footer: {
      treatments: "उपचार",
      admittance: "प्रवेश के घंटे",
      headquarters: "मुख्य कार्यालय",
      monFri: "सोम - शुक्र",
      saturdays: "शनिवार",
      emergencyOnly: "केवल आपातकालीन स्लॉट",
      onDuty: "ड्यूटी पर डॉक्टर उपलब्ध हैं",
      rightsReserved: "सर्वाधिकार सुरक्षित। HIPAA आज्ञाकारी रोस्टर पोर्टल।",
      privacy: "गोपनीयता नीति",
      fda: "FDA अस्वीकरण",
      insurance: "बीमा कोड"
    },
    currencySymbol: "₹",
    localeCode: "hi-IN",
  },
  fr: {
    nav: {
      about: "À Propos",
      services: "Thérapies",
      doctors: "Élite Médicale",
      gallery: "Galerie Sourires",
      spaces: "Espaces",
      pricing: "Tarifs",
      blogs: "Blogs Scientifiques",
      contact: "Contactez-nous"
    },
    header: {
      dashboard: "Roster Tableau",
      bookSlot: "Réserver Cita",
      bookSlotNow: "Réserver Maintenant",
      subLogo: "STUDIO BIOLOGIQUE",
      biologicalSurgery: "Chirurgie Biologique"
    },
    footer: {
      treatments: "Traitements",
      admittance: "Heures d'Admission",
      headquarters: "Siège Social",
      monFri: "Lun – Ven",
      saturdays: "Samedis",
      emergencyOnly: "Slots d'urgence uniquement",
      onDuty: "Praticien de garde en ligne",
      rightsReserved: "Tous Droits Réservés. Portail Roster Conforme HIPAA.",
      privacy: "Confidentialité",
      fda: "Avertissements FDA",
      insurance: "Codes d'Assurance"
    },
    currencySymbol: "€",
    localeCode: "fr-FR",
  },
  de: {
    nav: {
      about: "Über Studio",
      services: "Therapien",
      doctors: "Elite-Vorstand",
      gallery: "Lächeln-Galerie",
      spaces: "Räume",
      pricing: "Preise",
      blogs: "Wissenschafts-Blogs",
      contact: "Kontakt"
    },
    header: {
      dashboard: "Dienstplan Portal",
      bookSlot: "Termin buchen",
      bookSlotNow: "Jetzt buchen",
      subLogo: "BIOLOGISCHES STUDIO",
      biologicalSurgery: "Biologische Chirurgie"
    },
    footer: {
      treatments: "Behandlungen",
      admittance: "Öffnungszeiten",
      headquarters: "Hauptquartier",
      monFri: "Mon – Fre",
      saturdays: "Samstags",
      emergencyOnly: "Nur Notfallschlitze",
      onDuty: "Diensthabender Arzt online",
      rightsReserved: "Alle Rechte vorbehalten. HIPAA-konformes Dienstplanportal.",
      privacy: "Datenschutz",
      fda: "FDA-Haftungsausschlüsse",
      insurance: "Versicherungscodes"
    },
    currencySymbol: "€",
    localeCode: "de-DE",
  },
  es: {
    nav: {
      about: "Sobre el Estudio",
      services: "Terapias",
      doctors: "Equipo Élite",
      gallery: "Galería de Sonrisas",
      spaces: "Instalaciones",
      pricing: "Precios",
      blogs: "Blogs Científicos",
      contact: "Contáctenos"
    },
    header: {
      dashboard: "Panel de Control",
      bookSlot: "Reservar Cita",
      bookSlotNow: "Reservar Ahora",
      subLogo: "ESTUDIO BIOLÓGICO",
      biologicalSurgery: "Cirugía Biológica"
    },
    footer: {
      treatments: "Tratamientos",
      admittance: "Horarios",
      headquarters: "Sede Principal",
      monFri: "Lun – Vie",
      saturdays: "Sábados",
      emergencyOnly: "Solo citas de emergencia",
      onDuty: "Médico de guardia en línea",
      rightsReserved: "Todos los derechos reservados. Portal compatible con HIPAA.",
      privacy: "Términos de Privacidad",
      fda: "Descargo de la FDA",
      insurance: "Códigos de Seguro"
    },
    currencySymbol: "$",
    localeCode: "es-ES",
  },
  it: {
    nav: {
      about: "Studio Chi Siamo",
      services: "Terapie",
      doctors: "Comitato Élite",
      gallery: "Galleria Sorrisi",
      spaces: "Spazi Tecnologici",
      pricing: "Tariffario",
      blogs: "Articoli Scientifici",
      contact: "Contattaci"
    },
    header: {
      dashboard: "Roster Pannello",
      bookSlot: "Prenota Slot",
      bookSlotNow: "Prenota Ora",
      subLogo: "STUDIO BIOLOGICO",
      biologicalSurgery: "Chirurgia Biologica"
    },
    footer: {
      treatments: "Trattamenti",
      admittance: "Orari Apertura",
      headquarters: "Sede Centrale",
      monFri: "Lun – Ven",
      saturdays: "Sabato",
      emergencyOnly: "Solo urgenze mediche",
      onDuty: "Pratico di guardia online",
      rightsReserved: "Tutti i diritti riservati. Portale HIPAA.",
      privacy: "Termini Privacy",
      fda: "FDA Avvertenze",
      insurance: "Codici Assicurativi"
    },
    currencySymbol: "€",
    localeCode: "it-IT",
  },
  pt: {
    nav: {
      about: "Sobre o Estúdio",
      services: "Terapias",
      doctors: "Conselho de Elite",
      gallery: "Galeria de Sorrisos",
      spaces: "Espaços",
      pricing: "Preços",
      blogs: "Blogs Científicos",
      contact: "Contate-Nos"
    },
    header: {
      dashboard: "Portal de Escala",
      bookSlot: "Agendar Horário",
      bookSlotNow: "Agendar Agora",
      subLogo: "ESTÚDIO BIOLÓGICO",
      biologicalSurgery: "Cirurgia Biológica"
    },
    footer: {
      treatments: "Tratamentos",
      admittance: "Horários",
      headquarters: "Sede Principal",
      monFri: "Seg – Sex",
      saturdays: "Sábados",
      emergencyOnly: "Apenas vagas de emergência",
      onDuty: "Médico de plantão online",
      rightsReserved: "Todos os direitos reservados. Portal em conformidade com o HIPAA.",
      privacy: "Políticas de Privacidade",
      fda: "Aviso de Isenção da FDA",
      insurance: "Códigos de Seguro"
    },
    currencySymbol: "R$",
    localeCode: "pt-BR",
  },
  ar: {
    nav: {
      about: "حول الاستوديو",
      services: "العلاجات المتقدمة",
      doctors: "مجلس النخبة",
      gallery: "معرض الابتسامات",
      spaces: "العيادات",
      pricing: "الأسعار التقديرية",
      blogs: "المدونات العلمية",
      contact: "اتصل بنا"
    },
    header: {
      dashboard: "لوحة التحكم",
      bookSlot: "حجز موعد",
      bookSlotNow: "احجز مقعدك الآن",
      subLogo: "الاستوديو الحيوي المتقدم",
      biologicalSurgery: "الجراحة الحيوية"
    },
    footer: {
      treatments: "العلاجات المتوفرة",
      admittance: "أوقات العمل والرعاية",
      headquarters: "المقر الرئيسي للمجموعة",
      monFri: "الاثنين – الجمعة",
      saturdays: "السبت",
      emergencyOnly: "الحالات الطارئة فقط",
      onDuty: "الطبيب المناوب متصل الآن",
      rightsReserved: "جميع الحقوق محفوظة. بوابة متوافقة مع معايير HIPAA.",
      privacy: "شروط الخصوصية والأمان",
      fda: "تنويهات وإفادات FDA",
      insurance: "رموز مطالبات التأمين"
    },
    currencySymbol: "ر.س",
    localeCode: "ar-SA",
  },
  zh: {
    nav: {
      about: "关于诊所",
      services: "牙科疗法",
      doctors: "精英董事会",
      gallery: "完美微笑展示",
      spaces: "诊所环境",
      pricing: "透明费用",
      blogs: "医学前沿博客",
      contact: "联系我们"
    },
    header: {
      dashboard: "管理控制台",
      bookSlot: "挂号预约",
      bookSlotNow: "立即预约席位",
      subLogo: "生态生物牙科中心",
      biologicalSurgery: "精密生物手术"
    },
    footer: {
      treatments: "牙科治疗项目",
      admittance: "诊所开诊时间",
      headquarters: "集团总部地址",
      monFri: "周一 至 周五",
      saturdays: "周六",
      emergencyOnly: "仅开放急诊挂号",
      onDuty: "值班医师在线候诊",
      rightsReserved: "版权所有 © 2026 叠翠生物牙科。符合 HIPAA 信息安全认证规则。",
      privacy: "隐私申明条款",
      fda: "FDA 权威免责声明",
      insurance: "公立与商业保险代码"
    },
    currencySymbol: "¥",
    localeCode: "zh-CN",
  },
  ja: {
    nav: {
      about: "スタジオ概要",
      services: "治療メニュー",
      doctors: "エリートリスト",
      gallery: "スマイル症例",
      spaces: "クリーン施設",
      pricing: "費用ガイド",
      blogs: "科学情報ブログ",
      contact: "お問い合わせ"
    },
    header: {
      dashboard: "管理パネル",
      bookSlot: "スロット予約",
      bookSlotNow: "今すぐ予約する",
      subLogo: "バイオロジカル歯科",
      biologicalSurgery: "バイオロジカルインプラント"
    },
    footer: {
      treatments: "治療案内",
      admittance: "受付時間",
      headquarters: "本部所在地",
      monFri: "月曜 – 金曜",
      saturdays: "土曜",
      emergencyOnly: "緊急対応枠のみ",
      onDuty: "当番医がオンライン対応中",
      rightsReserved: "All Rights Reserved. HIPAA準拠カルテ管理システム。",
      privacy: "個人情報保護方針",
      fda: "FDA警告・免責事項",
      insurance: "提携健康保険コード"
    },
    currencySymbol: "¥",
    localeCode: "ja-JP",
  },
  ru: {
    nav: {
      about: "О Студии",
      services: "Терапия",
      doctors: "Коллегия Врачей",
      gallery: "Галерея Улыбок",
      spaces: "Клиника",
      pricing: "Стоимость",
      blogs: "Научный Блог",
      contact: "Контакты"
    },
    header: {
      dashboard: "Панель Управления",
      bookSlot: "Запись на Прием",
      bookSlotNow: "Забронировать Сейчас",
      subLogo: "БИОЛОГИЧЕСКАЯ СТУДИЯ",
      biologicalSurgery: "Биологическая Хирургия"
    },
    footer: {
      treatments: "Направления Лечения",
      admittance: "Часы Приема",
      headquarters: "Штаб-Квартира",
      monFri: "Пн – Пт",
      saturdays: "Субботы",
      emergencyOnly: "Только экстренные слоты",
      onDuty: "Дежурный специалист в сети",
      rightsReserved: "Все права защищены. HIPAA-совместимый портал расписания.",
      privacy: "Политика Конфиденциальности",
      fda: "Дисклеймеры FDA",
      insurance: "Страховые Коды"
    },
    currencySymbol: "₽",
    localeCode: "ru-RU",
  },
};

/**
 * Automagically matches user browser language
 */
export function detectBrowserLanguage(): Language {
  if (typeof window === "undefined") return "en";
  try {
    const browserLang = navigator.language || (navigator as any).userLanguage || "en";
    const baseCode = browserLang.toLowerCase().split("-")[0] as Language;
    const exists = LANGUAGES.some(l => l.code === baseCode);
    return exists ? baseCode : "en";
  } catch {
    return "en";
  }
}

/**
 * Currency converter helper with exchange rate
 * Hardcoded rough estimations relative to USD ($1USD = ...)
 */
export const EXCHANGE_RATES: Record<Language, { rate: number; suffix?: string; prefix?: string }> = {
  en: { rate: 1.0, prefix: "$" },
  hi: { rate: 83.5, prefix: "₹" },
  fr: { rate: 0.92, prefix: "€" },
  de: { rate: 0.92, prefix: "€" },
  es: { rate: 1.0, prefix: "$" }, // using USD for ES since it's global/LatAm
  it: { rate: 0.92, prefix: "€" },
  pt: { rate: 5.25, prefix: "R$" },
  ar: { rate: 3.75, prefix: "ر.س " },
  zh: { rate: 7.25, prefix: "¥" },
  ja: { rate: 156.0, prefix: "¥" },
  ru: { rate: 90.0, suffix: " ₽" },
};

export function formatPriceRange(usdPriceRangeOrText: string, lang: Language): string {
  // If it's a typical text like "$150 - $450" or "$299"
  // Let's parse the numbers and do conversion!
  const config = EXCHANGE_RATES[lang] || EXCHANGE_RATES.en;
  
  try {
    // Find all numbers in the string
    const rx = /\$?([0-9,]+)/g;
    let match;
    let modified = usdPriceRangeOrText;
    const numbersToProcess: { raw: string; value: number }[] = [];
    
    while ((match = rx.exec(usdPriceRangeOrText)) !== null) {
      const raw = match[0];
      const val = parseInt(match[1].replace(/,/g, ""), 10);
      if (!isNaN(val)) {
        numbersToProcess.push({ raw, value: val });
      }
    }
    
    // Process backwards to avoid messing up indices
    for (let i = numbersToProcess.length - 1; i >= 0; i--) {
      const item = numbersToProcess[i];
      const converted = Math.round(item.value * config.rate);
      // Format with thousands separator
      const formattedNum = converted.toLocaleString(lang === 'en' ? 'en-US' : TRANSLATIONS[lang]?.localeCode || 'en-US');
      const replacement = config.prefix 
        ? `${config.prefix}${formattedNum}` 
        : `${formattedNum}${config.suffix || ''}`;
      
      // Since numbers might repeat, we do search and replace carefully or replace just that substring index
      modified = modified.replace(item.raw, replacement);
    }
    return modified;
  } catch (error) {
    return usdPriceRangeOrText; // fallback to raw string
  }
}

export function formatDate(dateString: string, lang: Language): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    const locale = TRANSLATIONS[lang]?.localeCode || "en-US";
    return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateString;
  }
}

import { Doctor, Service, Blog, Testimonial } from '../types';

export const DOCTORS: Doctor[] = [
  {
    id: "dr-elena-lumina",
    name: "Dr. Elena Lumina",
    role: "Chief Medical Officer",
    specialization: "Prosthodontics & Robotic Surgery",
    qualifications: "DDS, Ph.D. in Digital Dentistry (Harvard Medical)",
    experience: 18,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyi0kaNgj4UXFp8XMGOBwVwwb-la6R9pvmVxPMgbiXPcAvhw84Fxi2zhqgq1lPHErjCulR1D9akEojobS6aDr6Y4yVfT1Vnh_XSR5aDvrPD0C3ztpTMGiSIvImzfDGEXYEnua0Q_hdjn_khEHXhiLbtMG4_nnBkGG-BfsnWk12OurK1KxGoewTeaytCDvNi1uSk6Um_u2oyvtWeQ1SX94m6wcsT2C_5JO53ZsLjZDjFr-syOgmkdaCzQYF6-rx_e7t0na3KF6d5UE",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyi0kaNgj4UXFp8XMGOBwVwwb-la6R9pvmVxPMgbiXPcAvhw84Fxi2zhqgq1lPHErjCulR1D9akEojobS6aDr6Y4yVfT1Vnh_XSR5aDvrPD0C3ztpTMGiSIvImzfDGEXYEnua0Q_hdjn_khEHXhiLbtMG4_nnBkGG-BfsnWk12OurK1KxGoewTeaytCDvNi1uSk6Um_u2oyvtWeQ1SX94m6wcsT2C_5JO53ZsLjZDjFr-syOgmkdaCzQYF6-rx_e7t0na3KF6d5UE",
    bio: "Dr. Lumina pioneered guided implant placement systems in 3D digital dental modeling. With over 15 years lecturing internationally, she couples technology with personalized patient wellness.",
    availability: {
      days: ["Monday", "Wednesday", "Friday"],
      hours: ["09:00 AM", "10:30 AM", "01:00 PM", "03:30 PM"]
    },
    rating: 4.95,
    consultationsCount: 5240,
    email: "elena.lumina@luminadental.com"
  },
  {
    id: "dr-julian-vane",
    name: "Dr. Julian Vane",
    role: "Senior Implantologist",
    specialization: "Dental Implants & Oral Maxillofacial Surgery",
    qualifications: "DDS, MS in Periodontology (Columbia University)",
    experience: 14,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxsyUDMt2xH3uu77ZrC9Ns8mm7K44TCOSgRnHjFBpQzW7b1tjdDva-Bc0Jr0ZZh5YDYNsUy5ibg5C_gCBA97Buli7wqiuZ06H3A38GOdTjLQMjMyH0oCdpJlPSdRo62az-GlRKWsB4hd8InGMCijQ9xMEBeYOygpEPNSm6zhIvwbgrk7eqUNrrN2D0TsZIE3NTeVWQOc1WIZy_Lc7ENCzzJ96UMv1cil2ILj5CVIMoU3dM7sHP588_nFyfICdTplnYqMJszA98eGY",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-UhvnahYsy-2AHdU1Lpu-Mu0nTmAEmKJMcqQNEFY_H22Px47tE3t9pF0UB5UaPy9KAxb0_GJC0plN6wIYPzJ3M20ltnVbkT_lv_xBcL0rNcIqoZlkY1CQ_u3pnmx2eiyhxneJLbRtSACEqAm3gG7-uNqM74SiQ-4XUo2JAd-66osbFGAgFKs00MrRk7lq4MVsD2vQNvrTEP_m2ZUadOFZZ_G-opan3ayflxFhDPfPlbo8NdfuTF8YstEFbKtKunsSZNX2k0IRzzI",
    bio: "Dr. Vane is a leading figure in full-mouth reconstructions and computer-guided implant operations. He holds multiple patents for minimally-invasive anchoring devices.",
    availability: {
      days: ["Monday", "Tuesday", "Thursday"],
      hours: ["09:30 AM", "11:00 AM", "02:00 PM", "04:30 PM"]
    },
    rating: 4.92,
    consultationsCount: 3820,
    email: "julian.vane@luminadental.com"
  },
  {
    id: "dr-elara-thorne",
    name: "Dr. Elara Thorne",
    role: "Orthodontist Specialist",
    specialization: "Smart Orthodontics & Clear Aligners",
    qualifications: "DDS, MS in Orthodontics (University of Michigan)",
    experience: 11,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC54u9muPYbIfTL1bP0vIJeiypLEY-zCbqEYl6SKhWKRqGlzqVVHV97Yzyy0Y8zZ50kHTBeMGgsffZYBQe6JBl1LFaKNR817xQ_KxLNkOrcMBOHUlTL1VS6txO494Yq5O37KtRkp9_JmB4_RnLPBv78DQ_HAri8FKUuYdQv2D1G4GwAG-knpt17qVwdJr9K-3lMrzMsGYj-L8h6Jy_zJoZxm0kGjzadzbAWGbyFFoHW0uTscn8frGIulwM3J88EDpMMnCKuN4rP_oQ",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2RbW-fbMPHPv_3TpoffTfG6YwmzOPsMp6lzRBY-ME9nDQfwu-FHAFr2xI1GGfAZQm_j4xCocax4n3LnoXOPBdUGyTxVIKd5i4KhofofKmkkYiLnbsTY57WIhJ7G2yrbPXWfFP8vSGwbAyOp0kAnBNcem5v0escyiufMGUfz39ZIqM-JvNd5Xxec9-w47HcBBzjivGaDFlRy38gNkpogWyVEwMF954i8O0CIroaCcXhMhND4-TcBX12IBIDx2MFkiKPDuS-enSDLI",
    bio: "Dr. Thorne focuses on high-tech diagnostic aligners, structural jaw harmony, and child-supportive orthodontic approaches. She specializes in custom, barely-visible structural devices.",
    availability: {
      days: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      hours: ["10:00 AM", "11:30 AM", "01:30 PM", "03:00 PM"]
    },
    rating: 4.88,
    consultationsCount: 2910,
    email: "elara.thorne@luminadental.com"
  },
  {
    id: "dr-marcus-chen",
    name: "Dr. Marcus Chen",
    role: "Cosmetic Dentist Specialist",
    specialization: "Aesthetic Design & Veneers",
    qualifications: "DMD (Penn Dental Medicine), AAACD Accredited",
    experience: 12,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHEdi5blQjN-YTAGMfpXZhcghdtxGD7XV602HUQh755S7V96GRFis2_dch0EeDhtuRAgFwfBokTshZzkbsGS4lfcFFzvMtBRjApuO8U2OVszD9CzRNvf3HS9IGg8DrIOA71AxD-mv_jS6Oq51FkZ70rvQz8UHLkywRQ8Cq7bSQce2-unsCMuvi6l3Kr-QrHdWeltsUOToLythd6xABZiP41plCXpDucec8VCWVYnZfzN-nl4yqeAdyRwpQ1602GZUmF1a64cb8Yl8",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJofrauyA1PyTzOgTNx4I_zJLDLLojp4PD4wo7SOoQzzrud6sobsWJtsimmOw4khN4SIOaIIU7yfH6F34DnCsufpbJKp7hGwgzt2A1rlhEzhWAo8b8P4VC6HwVQhjBSjd6zNbtidmf9Mr6297akOKw4iyMcCSYezhW4a9jNqKUG-0vhv79QeMZDZaQb8Ka8H0aOVEwo6BrGEJnytvDUYUaM4NWf7wfD3zp70qQpGZ0XpE-5CSl3nF3B7855gTjz59egvvFgNnP3ZU",
    bio: "Dr. Chen is a master of micro-dentistry and hand-crafted porcelain applications. He is highly sought after by actors, models, and individuals demanding flawless aesthetic design.",
    availability: {
      days: ["Monday", "Thursday", "Friday"],
      hours: ["09:00 AM", "11:00 AM", "02:30 PM", "05:00 PM"]
    },
    rating: 4.97,
    consultationsCount: 3100,
    email: "marcus.chen@luminadental.com"
  }
];

export const SERVICES: Service[] = [
  {
    id: "general-dentistry",
    name: "General Dentistry",
    shortDesc: "Complete diagnostics, smart dental cleaning, and advanced restorations using digital guides.",
    longDesc: "General Dentistry forms the core foundation of Ethereal Dental care. We utilize laser diagnosis devices to discover sub-surface micro-cavities before they turn into major structural failures, followed by high-definition 3D intraoral scans.",
    priceRange: "$150 - $450",
    duration: "45 - 60 mins",
    iconName: "Stethoscope",
    recoveryTime: "Immediate",
    advantages: [
      "Ultra-low radiation digital diagnostics",
      "No-scrape ultrasonic cleaning systems",
      "Composite, biomechanically-matched fillings"
    ],
    procedure: [
      "Digital multi-spectrum scan",
      "Ultrasonic biofilm disintegration",
      "High-pressure enamel polishing",
      "Personalized preventive therapy maps"
    ]
  },
  {
    id: "teeth-whitening",
    name: "Teeth Whitening",
    shortDesc: "Aesthetic laser-whitening treatments yielding up to 8 shades lighter in one session.",
    longDesc: "Chatpata Studio leverages Zoom laser activations combined with cool-blue LED systems and high-comfort desensitizing gels. The results are breathtaking, safe for enamel, and structured to prevent immediate relapse.",
    priceRange: "$299 - $599",
    duration: "60 mins",
    iconName: "Sparkles",
    recoveryTime: "None (Temporarily avoid dynamic colors in foods)",
    advantages: [
      "Instant 8-shade improvement guarantee",
      "Virtually zero thermal nerve stimulation",
      "Custom laser-activated oxygenation"
    ],
    procedure: [
      "Dynamic dental shade matching documentation",
      "Premium protective gingival barrier application",
      "Cool-blue LED laser gel activation phases (3x)",
      "High-calcium tooth sealing barrier varnish"
    ]
  },
  {
    id: "dental-implants",
    name: "Dental Implants",
    shortDesc: "Robotic computer-guided dental implants with computer-designed crowns.",
    longDesc: "A titanium anchor seamlessly fuses with your jawbone in our sterile surgical suites. Under state-of-the-art navigation, implants are placed within fractions of a millimeter, shortening healing times dramatically.",
    priceRange: "$1,800 - $3,500",
    duration: "90 - 120 mins",
    iconName: "Anchor",
    recoveryTime: "1 - 3 Days (Complete bone fuse takes 3 months)",
    advantages: [
      "Perfect biometric jaw distribution and balance",
      "99.4% biological success rate",
      "Lifetime material warranty support"
    ],
    procedure: [
      "High-res Cone-beam CT (CBCT) navigation scan",
      "Robotic custom osteotomy guide crafting",
      "Titanium implant micro-insertion under laser-monitoring",
      "Temporary aesthetic custom crown placement"
    ]
  },
  {
    id: "root-canal",
    name: "Root Canal Therapy",
    shortDesc: "Pain-free micro-endodontics utilizing ultrasonic instrumentation.",
    longDesc: "Save your native tooth structure with zero discomfort. Under high-definition micro-cameras, our specialists locate, clean, and sterilize micro-canals using safe chemical jets and high-durability fills.",
    priceRange: "$650 - $1,200",
    duration: "60 - 90 mins",
    iconName: "Activity",
    recoveryTime: "1 - 2 Days",
    advantages: [
      "Entirely pain-free computerized anesthesia",
      "High-definition 3D imaging navigation",
      "Saves your biological dental root structure"
    ],
    procedure: [
      "Targeted digital local anesthesia profiling",
      "3D endodontic microscopic canal isolation",
      "Laser-activated sterilization of target canals",
      "Biopolymer biocompatible space seal"
    ]
  },
  {
    id: "orthodontics",
    name: "Orthodontics",
    shortDesc: "Premium self-ligating metal mechanisms or invisible, smart clear aligners.",
    longDesc: "Transform your structural alignment. We model your bite path on a machine learning simulation engine, producing progressive clear aligner stages that relocate misaligned elements smoothly.",
    priceRange: "$3,000 - $6,500",
    duration: "30 - 45 mins (Per session)",
    iconName: "Shuffle",
    recoveryTime: "Adapts within 24 hours of aligner swaps",
    advantages: [
      "Virtually invisible aesthetic design options",
      "Predictive virtual video progress outcomes",
      "Shorter clinic treatment durations than traditional braces"
    ],
    procedure: [
      "Full intra-oral 3D camera digital mapping",
      "Structural simulation and treatment planning",
      "Aligner box delivery or custom support bracket bonding",
      "Bi-monthly mechanical tracking checks"
    ]
  },
  {
    id: "cosmetic-dentistry",
    name: "Cosmetic Dentistry",
    shortDesc: "Extreme smile reconstructions with handcrafted porcelain sheets.",
    longDesc: "Through digital smile design, we redesign the symmetry, color, width, and angle of your smile. Every set of veneers is hand-crafted and detailed individually by our master ceramicists.",
    priceRange: "$950 - $2,100 (Per tooth)",
    duration: "90 - 150 mins",
    iconName: "Award",
    recoveryTime: "None (Instant visual shift)",
    advantages: [
      "Completely personal smile profile design matching",
      "Stain-resistant high-lustre German porcelain",
      "Ultra-conservative micro-enamel preparation"
    ],
    procedure: [
      "Photorealistic digital smile mockup modeling",
      "Micro-millimeter surface enamel design contouring",
      "Interim protective veneer application",
      "Porcelain fusion and adhesive setup under blue lasers"
    ]
  },
  {
    id: "pediatric-dentistry",
    name: "Pediatric Dentistry",
    shortDesc: "Fear-free child-focused care with smart enamel sealants.",
    longDesc: "Warm, supportive environments designed specifically for toddlers up to teenagers. We emphasize positive, non-threatening reinforcement, play-infused education, and protective sealant layers.",
    priceRange: "$100 - $250",
    duration: "30 - 45 mins",
    iconName: "Heart",
    recoveryTime: "Immediate",
    advantages: [
      "Interactive playroom dental models",
      "Painless micro-nozzle water cleaning",
      "Enamel reinforcement sealant overlays"
    ],
    procedure: [
      "Stress-free visual and verbal acclimation",
      "Soft brush cleansing and polish",
      "Micro-pipette liquid sealant application",
      "Interactive hygiene reward game"
    ]
  },
  {
    id: "crowns-bridges",
    name: "Crowns & Bridges",
    shortDesc: "One-visit restorations using CAD/CAM digital dental mills.",
    longDesc: "Restore heavily broken or missing teeth. Utilizing intraoral cameras, our CAD/CAM mill shapes a single block of porcelain composite to perfectly match your tooth structure in under an hour.",
    priceRange: "$800 - $1,800",
    duration: "60 - 90 mins",
    iconName: "Shield",
    recoveryTime: "Immediate",
    advantages: [
      "Single-visit crown preparation and delivery",
      "Zero messy physical mouth impressions",
      "Monolithic strength comparable to natural tissue"
    ],
    procedure: [
      "Digital virtual impression scans (CAD)",
      "Robotic block milling fabrication process",
      "Polishing and custom custom shading tinting",
      "Clinical tooth bonding and bite force sweep alignment"
    ]
  },
  {
    id: "wisdom-tooth",
    name: "Wisdom Tooth Extraction",
    shortDesc: "Atraumatic surgical or non-surgical dental extractions with high comfort.",
    longDesc: "Impacted or problematic wisdom teeth are extracted using gentle micro-vibrations rather than brutal force. This preserves the surrounding jaw architecture and minimizes bruising/swelling.",
    priceRange: "$350 - $800",
    duration: "45 - 90 mins",
    iconName: "Scissors",
    recoveryTime: "2 - 5 Days",
    advantages: [
      "Ultra-low swelling dental piezosurgery extraction",
      "Platelet-Rich Fibrin (PRF) bio-healing accelerator options",
      "Extremely comfortable recovery period"
    ],
    procedure: [
      "3D surgical positioning layout and planning",
      "Computerized anesthesia and sedation delivery",
      "Piezosurgery extraction with delicate water-cooling",
      "Dissolvable suture alignment and PRF membrane care"
    ]
  },
  {
    id: "emergency-care",
    name: "Emergency Dental Care",
    shortDesc: "Same-day instant response for trauma, sudden pain, or broken teeth.",
    longDesc: "We allocate daily priority spaces in our schedules for emergency treatment. Cracked tooth structures, loose crowns, acute intense nerve pain, or physical accidents are handled instantly.",
    priceRange: "$150 - $600",
    duration: "30 - 60 mins",
    iconName: "AlertTriangle",
    recoveryTime: "Variable on treatment pathway",
    advantages: [
      "Same-day guaranteed emergency slots",
      "Immediate fast diagnosis and complete pain reduction",
      "Comprehensive trauma restoration services"
    ],
    procedure: [
      "Instant priority triage and diagnostic scan",
      "Emergency pain treatment and local block",
      "Mechanical structure save or biological extraction",
      "Post-emergency follow-up planning"
    ]
  }
];

export const FAQS = [
  {
    category: "General",
    question: "How often should I schedule a professional dental cleanup?",
    answer: "For ideal oral hygiene, we advise a digital checkup and ultrasonic cleanup every 6 months. Patients with active periodontal profiles or history of implant restorative systems may be advised to schedule every 3-4 months."
  },
  {
    category: "Treatments",
    question: "Do you use metal materials in cavity fillings or crowns?",
    answer: "No, Chatpata Dental Studio is completely mercury-free and metal-conservative. We utilize medical-grade porcelain, ceramic composites, and zirconia which look natural, support bone health, and match normal thermal expandability."
  },
  {
    category: "Booking",
    question: "What is your clinic cancellation and rescheduling policy?",
    answer: "We kindly request at least 24 hours advance notification for rescheduling or general cancellations so we can allocate that priority slot to emergency dental cases. Late cancellations may incur a nominal scheduling fee."
  },
  {
    category: "Insurance",
    question: "Which insurance programs and payment systems do you accept?",
    answer: "We collaborate with most major premium PPO dental insurance networks. Our administrative coordinators manage and submit all insurance document packages on your behalf. We also support interest-free installment options like CareCredit or special monthly EMI programs."
  }
];

export const FACILITIES = [
  {
    title: "Digital X-Ray Suite",
    desc: "Equipped with diagnostic Cone-Beam CT technology for high-contrast resolution, compiling complete three-dimensional cranial models with 90% less tissue radiation.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCYou_hyeyL7iS-0dvILhUum8-XgByhq0_r5ENi73_Ovr9hHB1hKo0HA5BEpJCfYZECm25U7zH0xG9yHtjlYpO0XPCTXBGHLjdCvqUe22AZJosEFYpiKArXqzuwJlL1MH2P5ZbNNXJWXaqMXiX9tYWaCUVZdTtfH1i8PTWpcCTZn6HCUle_C9B0zzgZA7Jsm4CnmBGdnlsbUMsEPcJ5_iRyxj4EyEvcN3zXgdE1LX5aGBF3Z5DwBmAemzElR229ItWDP5RWw7Ng60"
  },
  {
    title: "Laser Dentistry Center",
    desc: "Advanced erbium laser units that allow suture-free soft tissue restructuring and drill-free cavity operations, keeping native structures healthy and pain-free.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKiROyCLJsZHIqGmzUAanGAYZqsy1OAUk6lHLTOeCFVFG5sqiTLzZfHUhEgzYwwr-Hpb_8uN3m4d5VGw2wpsXnmArCqE2_8P1qoB3qfb8ukTdHKtlXrQoVAsQXpb6zshQqd3RFuEHcZU6FRKJYK4ISY3-tvQ4AXc7mBvJcmORMKylOXbodrMyaf_TcC6qeP2rwpulUVL0XZGwRPIWs8vOMfotUbfsFhcerZ7cpSVTm2u0XrYYwBVlEtm07sigD0JD7aZJ_8taX0Vs"
  },
  {
    title: "Auto-Sterilization Zone",
    desc: "A surgical-grade, glass-front sterilization center meeting highest international cleanroom directives. Full automation and sensor triggers guarantee sterile safety.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPySovl68pxf9nnlzKzptBruJoXqPQhhRd8jEfnViDzJeyau7LmS9jhlpRztJONQ30jC4NzG_PcIu7b7-BIGvDIQc89a2SCmFHxKk7CXVgBlGi4jk8BO1qFVRhPUnFS4Z3bA5eDmFKSVZg2oq3MlWvknJ4pHTiy6BzJ9jjVQUjLmR1JkCW-Ka-IpwNrIEAc2ntfSSvkM21gaMbE6WVZTlt9wf8qO4f7zp24EOCGU1-_52Xt1WP6LSbEAsLdDQcuZD-pa_frk3C5dY"
  }
];

export const BLOGS: Blog[] = [
  {
    id: "dentistry-future",
    title: "AI & 3D Printing: The Quantum Leap in Dental Artistry",
    category: "Technology",
    author: "Dr. Elena Lumina",
    date: "May 28, 2026",
    readTime: "5 min read",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuABgQYHXs4Up2_PUpc3KxTscXBtemWaaUXAZHnCG9jzLYzEruEjBC0eKo6B_xuculVgaMuA8qbUrs455LFH0qnHSCwfw2AVYtDKcDbtTlbkFAf-rFwrQmZhZQSn4S7tUZ-FNpZk2No6AnWdGOupk-cdVuMbEMKbiRdl0S5U0cxt66-dMe_uCCKC0fvcY9gUBlkE988519FK4P1hJSndjpUt8OVik8-9KDknTDtRqIDZOMt5-njgzGmftx7uE5tZ0mXJwqODnMedVlQ",
    snippet: "Discover how AI intraoral assessment systems and 3D dental printers are crafting custom ceramic teeth in under 12 minutes, right beside your chair.",
    content: "### The Paradigm Shift in Custom Prosthetic Speed\n\nTraditional workflows for restorations used to require gooey impression pastes, sending molds to offsite dental labs, and walking around under a fragile temporary acrylic crown for two full weeks. Today, that entire methodology is obsolete inside premier smart dental facilities.\n\nAt Chatpata Dental Studio, we combine **multi-dimension scanner systems** and direct **AI CAD software** to design restorations instantly. This software models the physical bite strength, opposing tooth heights, and even patient aesthetics with pixel-level correctness.\n\nOnce the custom tooth design is approved on-screen:\n1. A block of monochromatic or multi-layered bioceramic is placed into the CAD/CAM high-precision milling station.\n2. In less than 10 minutes, high-speed diamond bur systems shave the block to exact tolerances, matching target teeth within 12 microns.\n3. The ceramic is stained, glazed, and laser-cured right before the patient's eyes.\n\nThe final result is a beautiful, biological-matching solution completed in a single dental appointment. Uncompromising security, zero discomfort, and immediate functional use."
  },
  {
    id: "preventative-dentistry",
    title: "The Silent Micro-cavity: Diagnosing Below Enamel",
    category: "Oral Care Guide",
    author: "Dr. Julian Vane",
    date: "May 15, 2026",
    readTime: "4 min read",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCYou_hyeyL7iS-0dvILhUum8-XgByhq0_r5ENi73_Ovr9hHB1hKo0HA5BEpJCfYZECm25U7zH0xG9yHtjlYpO0XPCTXBGHLjdCvqUe22AZJosEFYpiKArXqzuwJlL1MH2P5ZbNNXJWXaqMXiX9tYWaCUVZdTtfH1i8PTWpcCTZn6HCUle_C9B0zzgZA7Jsm4CnmBGdnlsbUMsEPcJ5_iRyxj4EyEvcN3zXgdE1LX5aGBF3Z5DwBmAemzElR229ItWDP5RWw7Ng60",
    snippet: "Modern visual checking screens can miss fractures starting within roots. Learn how near-infrared light transillumination and CBCT reveal hidden issues safely.",
    content: "### Diagnosing Cavities Before They Attack the Nerve\n\nHistorically, dental cavity diagnosis involved a simple physical explorer tool (the metallic hook) and basic horizontal 2D X-rays after symptoms appeared. Unfortunately, by the time a dentist can physically feel a cavity or a shadow registers clearly on traditional paper X-rays, the healthy decay structure is already deeply established.\n\nNear-infrared digital transillumination (NIRI) represents a huge leap forward: It shines bright, completely radiation-free near-infrared light through the enamel shell of teeth. \n\nHealthy tooth structures present a translucent glowing distribution, whereas cavities or stress micro-fractures absorb the light, registering as sharp darkened shadows on our digital cameras. This lets clinicians intervene using non-invasive mineralizing washes, bypassing invasive surgical drill methods completely."
  },
  {
    id: "aligners-smile",
    title: "Why Clear Aligners Offer Far More Than Simple Straight Teeth",
    category: "Smile Aesthetics",
    author: "Dr. Elara Thorne",
    date: "May 02, 2026",
    readTime: "6 min read",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGxYobmAyVBvetlgXFCnBQSfLf_PiDHr0xffJbd8P4aguL0wjd8o0Sl3wgb7jqc_mqAa6Up9i2lBvftnfgOAaerFVJ1icvHgE0pCKKedsxXqqrtf0Kj7zz7zNmUtfzZmdzH1EIwQoZqJK145BoCI75ClHFlHDPqajE4AtPwFuX3pjQIyT05sLXD5M9U6aNEadbGHKjU9nFNHBD3q7OkRjEUS53ZQAzhPY4zdKX9-EKc_aZzkbEJw_cmkXJ2e6maEeIHmyATSLHubo",
    snippet: "Unlocking custom alignments can relieve severe headaches, TMJ wear and tear, and sleep disruptions. We explore the biomechanical wellness of aligner systems.",
    content: "### The Biomechanical Impact of Structural Alignment\n\nWhen people consider clear aligner therapeutics, they almost always visualize mechanical beauty. Having perfectly level, symmetrical front teeth creates high social esteem. However, as orthopedic orthodontists, we explore dental placement through a biomechanical lens.\n\nMisaligned arches cause many hidden health crises:\n- **TMJ Strain**: Unmatched teeth force your mandibular joint to rotate in unnatural patterns, inducing chronic head tension.\n- **Premature Enamel Wear**: Misalignment directs extreme chewing pressure onto specific single points, fracturing outer protective layers over time.\n- **Plaque Shelters**: Overlapped teeth prevent regular brushing and flossing paths, allowing bacterial biofilms to hide.\n\nSmart clear aligner systems guide each single socket into precise balance under biomechanically calculated timelines, unlocking healthy facial comfort, clear sleep patterns, and lifelong dental health."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "testi-1",
    patientName: "Sophia Richardson",
    comment: "I absolute hate clinical smells and normal drill vibrators. Booking at Chatpata was completely different. The reception feels like a luxury resort, and they performed my restoration under fully silent laser systems. Magnificent treatment and wonderful design!",
    rating: 5,
    date: "May 25, 2026",
    approved: true
  },
  {
    id: "testi-2",
    patientName: "Alexander Vance",
    comment: "Dr. Julian Vane and the digital implant team completed a full arch computer-guided transplant in a single afternoon. No pain, minimal swelling, and I was eating dinner comfortably by the evening. The local chatbot actually answered my recovery questions late at night!",
    rating: 5,
    date: "May 19, 2026",
    approved: true
  },
  {
    id: "testi-3",
    patientName: "Emily Zhao",
    comment: "After years of hiding my smile, Dr. Chen's micro-porcelain veneers completely changed my life. They matched my natural features perfectly. Absolute state-of-the-art dental care!",
    rating: 5,
    date: "May 10, 2026",
    approved: true
  }
];

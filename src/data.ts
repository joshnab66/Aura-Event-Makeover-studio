import { ServiceItem, PricingPlan, Testimony, GalleryItem, TeamMember, CustomThemeOption } from "./types";

export const SERVICES_DATA: ServiceItem[] = [
  // Event Planning Services
  {
    id: "srv_wedding",
    category: "event",
    title: "Signature Royal Weddings",
    tagline: "Ultra-luxury, end-to-end couture wedding planning and styling.",
    description: "From magnificent stage setups to custom floral installations, we curate unforgettable bridal journeys. Our team handles complete vendor curation, sequence choreography, guest hospitality, and grand staging designs.",
    benefits: [
      "Bespoke theme draping and gold scale chandeliers",
      "Comprehensive vendor and guest concierge mapping",
      "Impeccable timeline execution by lead directors",
      "Floral architecture designed by award-winning floral designers"
    ],
    image: "https://files.catbox.moe/mdcu5g.jpg",
    priceStart: "$15,000"
  },
  {
    id: "srv_corporate",
    category: "event",
    title: "Elite Corporate Galas",
    tagline: "High-caliber spacing, branding alignment, and majestic productions.",
    description: "Launch products, host elite banquets, or organize corporate award galas that leave lasting impressions. We handle custom LED layouts, acoustics, thematic visual elements, and bespoke menu curation.",
    benefits: [
      "Avant-garde audiovisual design and logistics",
      "Seamless brand narrative integration throughout the hall",
      "State-of-the-art keynote setups and VIP lounge mapping",
      "Gourmet culinary coordination"
    ],
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
    priceStart: "$25,000"
  },
  {
    id: "srv_birthday",
    category: "event",
    title: "Bespoke Birthday Celebrations",
    tagline: "Whimsical, lavish themed anniversaries and luxury kids parties.",
    description: "Whether celebrating milestone 30s, 50s, or spectacular first birthdays, we create immersive dreamscapes. Custom structures, interactive food theatre, and beautiful photo installations are made ready.",
    benefits: [
      "Custom backdrop structures with dynamic multi-tier cake styling",
      "Sought-after musical performers and ambient live entertainers",
      "Thematic table styling with luxury linen pairings",
      "Fairy-light canopy mapping"
    ],
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=95&w=1600",
    priceStart: "$8,000"
  },
  {
    id: "srv_engagement",
    category: "event",
    title: "Intimate Engagement & Private Parties",
    tagline: "Romantic engagements and private dinners of ultimate luxury.",
    description: "Curated experiences celebrating rings, family unions, or private milestones. Every detail—from custom calligraphy menus to micro-floral styling—is personalized with utmost privacy.",
    benefits: [
      "Sunset and garden stage setups of stunning romance",
      "Gourmet tasting menu curation with wine pairings",
      "Private classical string quartets or live jazz",
      "Detailed visual registry support"
    ],
    image: "https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=95&w=1600",
    priceStart: "$5,000"
  },

  // Beauty & Makeover Services
  {
    id: "srv_bridal_makeup",
    category: "makeover",
    title: "Bespoke High-Definition Bridal Makeup",
    tagline: "Radiant, long-wearing high-fashion makeup tailored to your aura.",
    description: "A customized luxury cosmetic experience using exclusively ultra-premium brands (Chanel, Dior, Charlotte Tilbury). Created to stand flawlessly against high-definition photography and emotional tears.",
    benefits: [
      "Full digital glow trial session before the main day",
      "Contour sculpting to amplify natural symmetry",
      "Luxury individual silk lash styling",
      "Full-body airbrush foundation transition"
    ],
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800",
    priceStart: "$1,200"
  },
  {
    id: "srv_groom_styling",
    category: "makeover",
    title: "Groom Signature Grooming & Styling",
    tagline: "Sharp, masculine, clean, and perfectly suited styling services.",
    description: "Comprehensive grooming and fashion tailoring for grooms. From refreshing skin hydrations to hair texturizing, pocket-square coaching, and bespoke tuxedo alignment guidance.",
    benefits: [
      "Relaxing facial skin recovery therapy on wedding morning",
      "Precision cut, styling, and structural beard contouring",
      "Groom attire drape styling, tie coaching, and pocket alignments",
      "Matte camera-ready anti-shine complexion control"
    ],
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
    priceStart: "$600"
  },
  {
    id: "srv_hair_styling",
    category: "makeover",
    title: "Couture Hair Artistry",
    tagline: "Sculpted elegant updos, cascading romantic curls, and tiara fittings.",
    description: "Bespoke hair creations that balance your headpiece, face shape, and gown collar. Uses state-of-the-art lightweight locking sprays to guarantee movement stability throughout dance segments.",
    benefits: [
      "Bespoke hair volume and extension mapping",
      "Precise tiara, veil, or floral design anchor placement",
      "Anti-humidity high-shine shielding therapies",
      "Pre-event intensive protein reconstruction salon care"
    ],
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430f39?auto=format&fit=crop&q=80&w=800",
    priceStart: "$500"
  },
  {
    id: "srv_fashion_consult",
    category: "makeover",
    title: "Couture Fashion Consultation",
    tagline: "Wardrobe styling, color analysis, and personalized outfit curation.",
    description: "Discover your signature silhouette. We analyze your skin undertones, body framework, and design dynamic mood boards, connecting you with boutique artisans and designers.",
    benefits: [
      "Interactive digital skin color undertone spectrum assessment",
      "Bespoke mood boarding matching your event themes",
      "VIP private salon tour with selected master designers",
      "Personal fit and posture coaching session"
    ],
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800",
    priceStart: "$1,000"
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  // Wedding packages
  {
    id: "pkg_wed_basic",
    category: "wedding",
    tier: "Basic",
    title: "The Classic Union",
    price: "$9,500",
    subtitle: "Ideal for streamlined events and standard elegant staging requests.",
    features: [
      "Up to 150 guests mapping",
      "Lead planner + 2 onsite wedding day coordinators",
      "Grand stage drape + center floral decorations",
      "Standard premium sound & ambient spotlight set",
      "Vendor registry & timeline coordination"
    ]
  },
  {
    id: "pkg_wed_premium",
    category: "wedding",
    tier: "Premium",
    title: "The Golden Dream",
    price: "$18,000",
    subtitle: "Our signature and highly recommended full-service experience.",
    features: [
      "Up to 300 guests mapping",
      "Lead planner + 5 expert day-of coordinators",
      "Custom 3D stage layout with heavy imported florals",
      "Professional stage lighting canopy + smoke clouds",
      "Comprehensive guest concierge & seating charts",
      "Includes 1 Bridal Makeup + Trial package",
      "VIP lounge thematic styling"
    ],
    popular: true
  },
  {
    id: "pkg_wed_luxury",
    category: "wedding",
    tier: "Luxury",
    title: "Imperial Royalty",
    price: "$35,000",
    subtitle: "The ultimate peak of high-end events. Absolutely no compromise.",
    features: [
      "Unlimited guest support mapping",
      "Complete design director-led custom curation team",
      "Full-scale immersive glass/floral catwalk staging",
      "Cinematic LED backplane and high-fidelity concert sound",
      "Gourmet menu auditing + master champagne tower design",
      "Full makeover squad: 2 Bridal looks + Groom styling",
      "Exclusive celebrity guest entrance security & valet mapping",
      "Post-event memory video look-back edit"
    ]
  },

  // Corporate Packages
  {
    id: "pkg_corp_small",
    category: "corporate",
    tier: "Small",
    title: "Synergy Executive",
    price: "$12,000",
    subtitle: "Perfect for intimate board meetings, VIP dinners, or seminars.",
    features: [
      "Up to 100 corporate guests",
      "Sleek minimalist podium & custom step-and-repeat",
      "Standard wireless microphone sets and screen displays",
      "Interactive registration desks with badge templates",
      "Basic lunch & premium refreshment catering prep"
    ]
  },
  {
    id: "pkg_corp_premium",
    category: "corporate",
    tier: "Premium",
    title: "Global Summit Excellence",
    price: "$28,000",
    subtitle: "Designed for full-scale brand launches and large conferences.",
    features: [
      "Up to 400 corporate delegates",
      "U-shaped dynamic LED panels + heavy branding arrays",
      "Advanced sound-engineering and multi-camera live-feed",
      "Full delegate registration management app integration",
      "Bespoke networking cocktail lounges",
      "Master speaker styling and quick stage grooming",
      "Multi-session tracking and workshop setups"
    ],
    popular: true
  },

  // Beauty Packages
  {
    id: "pkg_beauty_basic",
    category: "beauty",
    tier: "Basic",
    title: "Bespoke Bridal Elegance",
    price: "$1,500",
    subtitle: "Standard luxury makeover set for the blushing bride.",
    features: [
      "1 HD Ceremony Makeup using prestige products",
      "1 Elegant Hair updos or cascading floral weave",
      "1 Custom trial and product match consultation",
      "On-site bridal dressing and saree/gown draping assistant"
    ]
  },
  {
    id: "pkg_beauty_premium",
    category: "beauty",
    tier: "Premium",
    title: "Aura Royal Crown",
    price: "$2,800",
    subtitle: "Comprehensive premium bridal + groom combo.",
    features: [
      "2 Distinct Bridal Looks (Ceremony + Evening Reception)",
      "1 Professional Groom hair texturizing & anti-shine prep",
      "Premium luxury skin radiance prep ampoules",
      "Hair styling extension mapping & tiara pin fitting",
      "Touch-up services during formal photography (3 hrs)",
      "Includes 2 family member grooming makeup vouchers"
    ],
    popular: true
  }
];

export const TESTIMONIALS_DATA: Testimony[] = [
  {
    id: "testi_1",
    name: "Genevieve Sterling",
    role: "Bride",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    comment: "I looked like an absolute royal vision on my wedding day. The gold stage flowers perfectly matched my bridal highlighter. The transition between my afternoon makeup and evening look was seamless. Simply legendary!",
    rating: 5,
    event: "The Sterling-Vance Royal Wedding"
  },
  {
    id: "testi_2",
    name: "Marcus Vance",
    role: "Groom (Tech Entrepreneur)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    comment: "Planning a 350-guest luxury wedding was stress-free. Every vendor executed at high speeds. My grooming layout looked incredibly natural under heavy stage beams. Highly recommend their customization framework.",
    rating: 5,
    event: "The Sterling-Vance Royal Wedding"
  },
  {
    id: "testi_3",
    name: "Clarissa Davenport",
    role: "VP of Brands, NeoGlobal",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    comment: "The annual corporate awards was a stunning visual. The custom staging, high-definition visual effects, and customized lighting templates won rave reviews from our international board. A production of flawless tier.",
    rating: 5,
    event: "NeoGlobal Executive Gala"
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "gal_1",
    category: "weddings",
    title: "An Amber Whispering Dream",
    subtitle: "Chateau Wedding with 10k Roses",
    image: "https://files.catbox.moe/mdcu5g.jpg"
  },
  {
    id: "gal_2",
    category: "corporate",
    title: "Luminary Tech Launch",
    subtitle: "Futuristic Glass Catwalk & Neon Stage",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=95&w=1600"
  },
  {
    id: "gal_3",
    category: "birthdays",
    title: "The Golden Velvet Sweet 16",
    subtitle: "Imperial Crown Canopy Backdrop",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=95&w=1600"
  },
  {
    id: "gal_4",
    category: "bridal",
    title: "Ethereal Dewy Glow",
    subtitle: "Prestige Airbrush Cosmetics Concept",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=95&w=1600"
  },
  {
    id: "gal_5",
    category: "groom",
    title: "The Classic Tailored Executive",
    subtitle: "Anti-Shine Groom Matte Airbrush Prep",
    image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=95&w=1920"
  },
  {
    id: "gal_6",
    category: "weddings",
    title: "Royal Emerald Canopy",
    subtitle: "Bespoke Glass Gazebo with Dangling Orchids",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=95&w=1920"
  }
];

export const TEAM_DATA: TeamMember[] = [
  {
    id: "team_1",
    name: "Elena Ross-Chamberlain",
    role: "Managing Director & Principal Planner",
    bio: "With over 14 years organizing elite events across Tuscany, Monaco, and New York, Elena turns complex logistical scales into works of beautiful art.",
    certifications: ["WIPA Master Certified Planner", "Art Institute Royal Floristry Diploma"],
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "team_2",
    name: "Aisha Al-Jamil",
    role: "Creative Director of Beauty & Styling",
    bio: "Former styling advisor for high-fashion runway weeks. Aisha understands how different cosmetics look under specific indoor/outdoor light temperatures.",
    certifications: ["Vidal Sassoon Academy Alumna", "Prestige HD Airbrush Master"],
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "team_3",
    name: "Demetrius Croft",
    role: "Technical Staging & Staging Architect",
    bio: "Our technical genius. Demetrius turns event spacing scales into architectural blueprints with high-fidelity acoustics and precise LED mappings.",
    certifications: ["AVIXA Certified Technology Specialist", "3D CAD Event Design Fellow"],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  }
];

export const CUSTOM_THEMES: CustomThemeOption[] = [
  { id: "thm_purple_gold", name: "Imperial Velvet & Rich Gold", colorHex: "#2e1065", description: "Bespoke Royal Purple drapery paired with luxury warm gold tablescapes and glass lanterns." },
  { id: "thm_slate_gold", name: "Modern Noir & Champagne Sparkle", colorHex: "#1a1a1a", description: "Minimalist ultra-luxury experience focusing on dark matte textures, amber uplighting, and golden cutleries." },
  { id: "thm_beige_boho", name: "Warm Cream, Pampas & Soft Rose", colorHex: "#dfcfbe", description: "Organically rich, dreamy, warm visual tones featuring dry desert flora, ivory silks, and candlelit clusters." },
  { id: "thm_emerald_gold", name: "Sylvan Emerald & Fresh Ivy", colorHex: "#064e3b", description: "Stunning forest hues combined with dangling hanging moss ceilings and brass accessories." }
];

export const FAQS_DATA = [
  {
    q: "How far in advance should we reserve event planning?",
    a: "We recommend reserving our teams at least 6 to 12 months in advance for major weddings and corporate summits. Custom structure fabrications require significant design timelines."
  },
  {
    q: "What is inclusive within the Beauty Makeover Trial?",
    a: "Trials take place in our private vanity suite. We analyze state complexion, map lash styles, complete 2 distinct makeup iterations, and take detailed high-resolution camera notes."
  },
  {
    q: "Do you travel internationally or handle far venues?",
    a: "Absolutely. We are fully structured to travel globally and coordinate premium venues, shipping staging elements and flowers as verified."
  },
  {
    q: "Can we mix options to build a unique hybrid package?",
    a: "Yes! Use our 'Bespoke Customizer' tool which utilizes custom configurations. Our AI instantly compiles custom blueprints aligned with your budget category."
  }
];

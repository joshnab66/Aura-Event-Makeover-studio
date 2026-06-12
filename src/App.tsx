import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  CalendarDays, 
  Compass, 
  MapPin, 
  Mail, 
  Phone, 
  Crown, 
  Heart, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  User, 
  Users, 
  DollarSign, 
  Clock, 
  HelpCircle, 
  Loader2, 
  Send, 
  MessageSquare, 
  Menu, 
  X, 
  Globe, 
  Scissors, 
  Star, 
  Palette, 
  Sparkle,
  Tv,
  Check,
  Building,
  PartyPopper,
  Glasses,
  Smile,
  ShieldCheck,
  Calendar,
  Layers,
  Camera,
  HeartHandshake
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Navigation from "./components/Navigation";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import { 
  SERVICES_DATA, 
  PRICING_PLANS, 
  TESTIMONIALS_DATA, 
  GALLERY_DATA, 
  TEAM_DATA, 
  CUSTOM_THEMES, 
  FAQS_DATA 
} from "./data";
import { 
  ServiceItem, 
  PricingPlan, 
  GalleryItem, 
  ProposalResponse, 
  BookingSubmission, 
  ChatMessage 
} from "./types";

const HERO_IMAGES = [
  "https://files.catbox.moe/mdcu5g.jpg",
  "https://files.catbox.moe/o0ebzb.jpg",
  "https://files.catbox.moe/f3o8ss.webp",
  "https://files.catbox.moe/ic2t3k.jpg",
  "https://files.catbox.moe/5ydkw9.jpg"
];

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab ] = useState<string>("home");

  // Hero Background Slideshow State
  const [currentHeroImageIndex, setCurrentHeroImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // Cross-fade every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Booking & Admin State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState("Wedding");
  const [bookingDate, setBookingDate] = useState("");
  const [approxBudget, setApproxBudget] = useState("Premium");
  const [guestCountInput, setGuestCountInput] = useState(150);
  const [specialReq, setSpecialReq] = useState("");
  const [bookings, setBookings] = useState<BookingSubmission[]>([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);

  // Customizer / Planner Wizard State
  const [wizardStep, setWizardStep] = useState(1);
  const [customEventType, setCustomEventType] = useState("Wedding");
  const [customGuests, setCustomGuests] = useState(200);
  const [customTheme, setCustomTheme] = useState(CUSTOM_THEMES[0].name);
  const [customDecor, setCustomDecor] = useState("Royal Imported Florals");
  const [customCatering, setCustomCatering] = useState("Luxury Fine-Dining Multi-Course Plated");
  const [customPhoto, setCustomPhoto] = useState(true);
  const [customMakeup, setCustomMakeup] = useState("Timeless Radiant Glow");
  const [customHair, setCustomHair] = useState("Couture Updo with Tiara Anchor");
  const [customOutfitHelp, setCustomOutfitHelp] = useState(true);
  const [customBudgetCategory, setCustomBudgetCategory] = useState("Premium");
  const [customSpecialNotes, setCustomSpecialNotes] = useState("");
  const [proposalLoading, setProposalLoading] = useState(false);
  const [proposalResult, setProposalResult] = useState<ProposalResponse | null>(null);
  const [proposalError, setProposalError] = useState<string | null>(null);

  // Aura AI Chat State
  const [isAuraOpen, setIsAuraOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "assistant",
      content: "Welcome, darling. I am Aura, your senior Event Planning & Haute Couture styling companion. How may I assist you in crafting your high-end vision today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userChatInput, setUserChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  // Gallery Filters
  const [galleryFilter, setGalleryFilter] = useState<string>("all");
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);

  // Services Modal details
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Services category filtering state
  const [servicesCategoryFilter, setServicesCategoryFilter] = useState<"all" | "event" | "makeover">("all");

  // Pricing toggle ('events' vs 'makeovers')
  const [pricingCategory, setPricingCategory] = useState<"wedding" | "corporate" | "beauty">("wedding");

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Fetch initial bookings on mount
  useEffect(() => {
    fetch("/api/bookings")
      .then(res => res.json())
      .then((data: any) => {
        if (data && data.bookings) {
          setBookings(data.bookings);
        }
      })
      .catch(err => console.error("Could not fetch bookings on mount", err));
  }, []);

  // Submit standard reservation
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !bookingDate) {
      alert("Please fill in all essential credentials.");
      return;
    }

    setBookingLoading(true);
    const postBody = {
      name,
      email,
      phone,
      eventType,
      dateTime: bookingDate,
      approxBudget,
      guestCount: guestCountInput,
      specialRequirements: specialReq
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postBody)
      });
      const data = await response.json();
      if (data.success) {
        setBookingSuccess(true);
        // Refresh bookings array
        setBookings(prev => [data.booking, ...prev]);
        // Reset inputs
        setName("");
        setEmail("");
        setPhone("");
        setSpecialReq("");
      } else {
        alert("Booking server temporary failure.");
      }
    } catch (err) {
      console.error(err);
      // fallback save locally
      const localBooking: BookingSubmission = {
        id: `local_${Date.now()}`,
        name,
        email,
        phone,
        eventType,
        dateTime: bookingDate,
        approxBudget,
        guestCount: guestCountInput,
        specialRequirements: specialReq,
        createdAt: new Date().toISOString()
      };
      setBookings(prev => [localBooking, ...prev]);
      setBookingSuccess(true);
    } finally {
      setBookingLoading(false);
    }
  };

  // Compile Bespoke Proposal via Gemini API
  const handleCompileProposal = async () => {
    setProposalLoading(true);
    setProposalError(null);
    setProposalResult(null);

    const configPayload = {
      eventType: customEventType,
      guestCount: customGuests,
      selectedTheme: customTheme,
      decorationLevel: customDecor,
      cateringPreference: customCatering,
      photographyRequired: customPhoto,
      beautyStyling: {
        makeupStyle: customMakeup,
        hairstyle: customHair,
        outfitAssistance: customOutfitHelp
      },
      estimatedBudget: customBudgetCategory,
      notes: customSpecialNotes
    };

    try {
      const resp = await fetch("/api/gemini/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(configPayload)
      });
      if (!resp.ok) {
        throw new Error("Could not construct bespoke quote. Ensure API Key is bound.");
      }
      const data: ProposalResponse = await resp.json();
      setProposalResult(data);
      setWizardStep(4); // Advance to results
    } catch (err: any) {
      console.warn("Gemini Server endpoint failed. Falling back to local bespoke computation engine...", err);
      // Fallback proposal matching high style
      setTimeout(() => {
        const mockProposal: ProposalResponse = {
          eventThemes: [
            `Divine Gilded Blossom: Features heavy cascading imported cream roses, gold chandeliers over the walkways, and warm sand uplighting matching ${customTheme}.`,
            `The Velvet Crest Lounge: Ambient luxurious seating draped in rich velvet Royal Purple, centered on interactive candlelight and glass candelabras.`,
            `Celestial Monolith Setup: Custom constructed geometric LED panels casting pristine warm golden shadows behind a stunning floral crown.`
          ],
          makeoverDesign: `A gorgeous matching fusion of ${customMakeup} coupled with ${customHair}. This look guarantees marvelous balance against the flashing cinematic photography lights. Includes deluxe airbrush preparation for flawless glow.`,
          suggestedTimeline: [
            { phase: "Bespoke Design Alignment", activity: "Custom mood boards and fabric texture review in our private suite", timing: "Month 1" },
            { phase: "Couture Trial & Styling Day", activity: "Full professional trial matching cosmetics against the planned staging temperatures", timing: "Month 2" },
            { phase: "Grande Celebration Staging", activity: "Staging architecture erection and floral placement by master horticulturists", timing: "Morning 06:00" },
            { phase: "Prestige Makeover Execution", activity: "Aisha Al-Jamil begins the bespoke airbrushing, styling, and hair locks", timing: "Morning 10:00" },
            { phase: "Curtains Raise & Performance", activity: "Coordinated entry choreography managed live by 5 venue supervisors", timing: "Evening 07:00" }
          ],
          itemizedCost: [
            { category: "Custom Venue Curations & Staging", service: `Premium custom staging design incorporating ${customDecor} style assets`, estimatedCost: "$12,000 - $18,000" },
            { category: "Prestige Salon & Makeup Suite", service: `${customMakeup} cosmetic application, hair updos, and dedicated draping coordinator`, estimatedCost: "$1,800 - $2,500" },
            { category: "Culinary Management", service: `Pre-audited high-end plated layout aligned with the chosen culinary aesthetic: ${customCatering}`, estimatedCost: "$85 per guest" },
            { category: "Cinematic Visual Recording", service: "Full-day professional media coverage with sunset drone sweeps and digital highlights", estimatedCost: "$4,500" }
          ],
          luxeSummary: `Welcome to absolute elite celebrations. Aligned with your envisioned ${customEventType} set for ${customGuests} valued attendees with a ${customBudgetCategory} budget tier, our lead Creative Directors will manifest a gorgeous memory. Your preferences have been preserved, and we are prepared to orchestrate your masterpiece.`
        };
        setProposalResult(mockProposal);
        setWizardStep(4);
      }, 1500);
    } finally {
      setProposalLoading(false);
    }
  };

  // Send message to Live AI Assistant Aura
  const handleSendAuraMessage = async () => {
    if (!userChatInput.trim()) return;
    const userMsg = userChatInput.trim();
    setUserChatInput("");

    const newMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      role: "user",
      content: userMsg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMsg]);
    setChatLoading(true);

    try {
      // package previous messages for context
      const contextHistory = chatMessages.slice(-8).map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: contextHistory,
          userMessage: userMsg
        })
      });

      if (!response.ok) {
        throw new Error("Chat link unstable");
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `a_${Date.now()}`,
        role: "assistant",
        content: data.reply || "Our live assistants are ready. How can I help fine-tune your bespoke logistics?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      // Local AI coordinator responses to FAQs and standard prompts
      setTimeout(() => {
        let replies = [
          "Of course, my dear. In designing high-fashion layouts, matching your staging florals to the makeup undertones creates a spectacular cinematic coherence.",
          "Our wedding sets always feature specialized day-of coordinators who interface with suppliers seamlessly. That allows you to experience your luxury transformation tension-free.",
          "That is beautifully envisioned! For a guest count of that scale, we advise adopting our Imperial Velvet theme paired with heavy hanging candelabras.",
          "To secure Aisha Al-Jamil for the makeup trials, you can book standard booking slots, and we'll arrange a dedicated private suite experience instantly."
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        const assistantMsg: ChatMessage = {
          id: `a_${Date.now()}`,
          role: "assistant",
          content: randomReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, assistantMsg]);
      }, 1000);
    } finally {
      setChatLoading(false);
    }
  };

  // Filter gallery items
  const filteredGallery = galleryFilter === "all" 
    ? GALLERY_DATA 
    : GALLERY_DATA.filter(item => item.category === galleryFilter);

  // Filter services items
  const filteredServices = servicesCategoryFilter === "all"
    ? SERVICES_DATA
    : SERVICES_DATA.filter(item => item.category === servicesCategoryFilter);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-slate-800 selection:bg-amber-100 selection:text-amber-900" id="main_app_wrapper">
      
      {/* Top Prominent Luxury Header Status Bar */}
      <div className="bg-[#1e0b36] text-[#FAF6F0] py-1.5 px-4 text-center text-[10px] md:text-xs tracking-widest font-semibold border-b border-amber-400/20 uppercase flex items-center justify-center gap-2">
        <Crown className="w-3.5 h-3.5 text-[#cca43b] animate-pulse" />
        <span>Prestige All-in-One Luxury Events & Haute Makeover Services</span>
        <span className="hidden md:inline text-amber-300">|</span>
        <span className="hidden md:inline font-mono">Bespoke AI Customizer Live</span>
      </div>

      {/* Navigation Menu */}
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        servicesCategoryFilter={servicesCategoryFilter}
        setServicesCategoryFilter={setServicesCategoryFilter}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {/* 1. HOME TAB */}
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-16"
            >
              {/* HERO SECTION - Immersive Dark Canvas */}
              <section className="relative min-h-[85vh] flex items-center justify-center text-center bg-gradient-to-b from-[#1e0b36] via-[#2d1250] to-[#140626] text-[#FAF6F0] px-4 overflow-hidden py-16" id="hero_section">
                {/* Visual Backdrop overlays - Animated 4K HD Slideshow */}
                <div className="absolute inset-0 z-0">
                  {HERO_IMAGES.map((img, idx) => (
                    <div
                      key={img}
                      className="absolute inset-0 bg-cover bg-center mix-blend-overlay transition-opacity duration-1000 ease-in-out"
                      style={{
                        backgroundImage: `url('${img}')`,
                        opacity: idx === currentHeroImageIndex ? 0.35 : 0,
                      }}
                      referrerPolicy="no-referrer"
                    />
                  ))}
                  {/* Subtle dark radial premium overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#1e0b36]/40 via-transparent to-[#140626]/80" />
                </div>
                
                {/* Decorative floating lights */}
                <div className="absolute top-1/4 left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-75"></div>

                <div className="relative max-w-4xl mx-auto space-y-8 z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-300/30 bg-[#1e0b36]/60 text-amber-200 text-xs tracking-widest font-semibold uppercase backdrop-blur-md"
                  >
                    <Crown className="w-4 h-4 text-[#cca43b]" />
                    Where Couture Styling Meets Immersive Staging
                  </motion.div>

                  <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-[#FAF6F0] leading-none" id="hero_title">
                    Creating Unforgettable <span className="gold-text italic block md:inline">Events</span> & Stunning <span className="text-[#f3e5ab] italic block md:inline">Transformations</span>
                  </h1>

                  <p className="text-amber-100/80 text-sm sm:text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
                    From luxurious royal weddings and corporate galas to professional high-definition airbrush makeovers, we orchestrate every single detail flawlessly in one opulent platform.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <button
                      onClick={() => setActiveTab("booking")}
                      className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#cca43b] via-[#e5c060] to-[#b58d24] text-slate-900 border border-amber-400 font-bold uppercase text-xs tracking-widest rounded-full shadow-lg hover:shadow-yellow-500/20 hover:scale-102 transition-all duration-300 cursor-pointer"
                      id="hero_btn_book"
                    >
                      Book Consultation
                    </button>
                    <button
                      onClick={() => setActiveTab("customize")}
                      className="w-full sm:w-auto px-8 py-4 bg-[#FAF6F0]/10 hover:bg-[#FAF6F0]/20 border border-amber-300/35 text-amber-200 font-bold uppercase text-xs tracking-widest rounded-full transition-all duration-300 backdrop-blur-sm cursor-pointer"
                      id="hero_btn_explore"
                    >
                      AI Personalized Customizer
                    </button>
                  </div>

                  {/* Highlights Bar */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 text-center border-t border-amber-300/10 max-w-3xl mx-auto">
                    <div>
                      <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-[#cca43b]" id="counter_ weddings">150+</h3>
                      <p className="text-[10px] uppercase text-amber-100/70 tracking-widest font-semibold mt-1">Royal Weddings</p>
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-[#cca43b]" id="counter_makeovers">600+</h3>
                      <p className="text-[10px] uppercase text-amber-100/70 tracking-widest font-semibold mt-1">HD Makeovers</p>
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-[#cca43b]" id="counter_galas">40+</h3>
                      <p className="text-[10px] uppercase text-amber-100/70 tracking-widest font-semibold mt-1">Corporate Galas</p>
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-[#cca43b]" id="counter_experience">14+ Years</h3>
                      <p className="text-[10px] uppercase text-amber-100/70 tracking-widest font-semibold mt-1">Mastery Experience</p>
                    </div>
                  </div>

                  {/* Slide Indicators */}
                  <div className="flex items-center justify-center gap-2 pt-4 relative z-20">
                    {HERO_IMAGES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentHeroImageIndex(idx)}
                        className={`transition-all duration-500 rounded-full h-1.5 ${
                          idx === currentHeroImageIndex
                            ? "w-8 bg-[#cca43b]"
                            : "w-1.5 bg-amber-100/30 hover:bg-amber-100/50"
                        }`}
                        title={`Go to slide ${idx + 1}`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* CORE WHY US / THE CONCEPT */}
              <section className="max-w-7xl mx-auto px-4 py-8" id="concept_section">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#cca43b]">Unified Luxury Experience</span>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1e0b36] mt-2">
                    An Exquisite All-In-One Sanctuary
                  </h2>
                  <p className="text-slate-500 text-sm mt-3">
                    Forget coordinating multiple decorators, makeup artists, stylist consultants, and logistics firms. We blend them synchronously under a single premier creative house.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-amber-300/40" id="feature_events">
                    <div className="bg-[#1e0b36]/5 p-3 rounded-xl w-fit text-[#1e0b36] mb-5">
                      <Sparkles className="w-7 h-7 text-[#cca43b]" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#1e0b36] mb-2">Grand Staging & Decor</h3>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                      Custom structural ceilings, crystal chandelier installations, and bespoke imported fresh floral designs compiled to match your exact theme category.
                    </p>
                    <button onClick={() => setActiveTab("services")} className="inline-flex items-center text-xs font-semibold text-[#cca43b] mt-4 hover:translate-x-1 transition-transform cursor-pointer">
                      Explore Decor services <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="bg-white p-8 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-amber-300/40" id="feature_beauty">
                    <div className="bg-[#1e0b36]/5 p-3 rounded-xl w-fit text-[#1e0b36] mb-5">
                      <Scissors className="w-7 h-7 text-[#cca43b]" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#1e0b36] mb-2">High-Definition Makeovers</h3>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                      Our signature prestige airbrush cosmetic artistry is fine-tailored based on facial physics, skin tones, and the precise light spectrum of the venue layouts.
                    </p>
                    <button onClick={() => setActiveTab("services")} className="inline-flex items-center text-xs font-semibold text-[#cca43b] mt-4 hover:translate-x-1 transition-transform cursor-pointer">
                      Explore Makeovers <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="bg-white p-8 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-amber-300/40" id="feature_ai">
                    <div className="bg-[#1e0b36]/5 p-3 rounded-xl w-fit text-[#1e0b36] mb-5">
                      <Compass className="w-7 h-7 text-[#cca43b]" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#1e0b36] mb-2">Bespoke AI Architecture</h3>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                      Our dynamic configuration engine allows you to specify color systems, guest volumes, and facial styling preferences to generate instant timeline blueprints and cost reports.
                    </p>
                    <button onClick={() => setActiveTab("customize")} className="inline-flex items-center text-xs font-semibold text-[#cca43b] mt-4 hover:translate-x-1 transition-transform cursor-pointer">
                      Simulate Event <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </section>

              {/* FEATURED SERVICES GALLERY SHOWCASE - LUXURY BENTO / PHOTO GRID */}
              <section className="max-w-7xl mx-auto px-4 py-10" id="featured_services_gallery_section">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#cca43b] flex items-center justify-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Signature Masterpieces
                  </span>
                  <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1e0b36] mt-2">
                    Our Exquisite Service Portfolios
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-3 max-w-xl mx-auto leading-relaxed">
                    Witness how we craft majestic experiences and iconic transformations. Click any portfolio card below to explore full details and comprehensive offerings.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Service 1 */}
                  <div 
                    onClick={() => {
                      setActiveTab("services");
                      if (setServicesCategoryFilter) setServicesCategoryFilter("event");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group relative h-[420px] rounded-3xl overflow-hidden border border-amber-200/40 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                  >
                    <img 
                      src="https://files.catbox.moe/o0ebzb.jpg" 
                      alt="Bespoke Wedding Design & Canopy Staging" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e0b36] via-[#1e0b36]/30 to-transparent transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-amber-500/20 text-amber-200 border border-amber-400/40 px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-extrabold backdrop-blur-md">
                        Event Service
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2">
                      <h3 className="font-serif text-lg font-bold text-amber-200 group-hover:text-amber-300 transition-colors duration-300 line-clamp-2">
                        Bespoke Wedding Grand Design
                      </h3>
                      <p className="text-[11px] text-slate-350 line-clamp-2 leading-relaxed font-light">
                        Premium imported fresh floral structures, celestial drape installations, and royal canopy settings.
                      </p>
                      <div className="pt-2 flex items-center text-[10px] text-amber-400 font-bold uppercase tracking-wider gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View Offerings <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Service 2 */}
                  <div 
                    onClick={() => {
                      setActiveTab("services");
                      if (setServicesCategoryFilter) setServicesCategoryFilter("event");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group relative h-[420px] rounded-3xl overflow-hidden border border-amber-200/40 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                  >
                    <img 
                      src="https://files.catbox.moe/f3o8ss.webp" 
                      alt="Luxe Floral Architecture & Stage Design" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e0b36] via-[#1e0b36]/30 to-transparent transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-amber-500/20 text-amber-200 border border-amber-400/40 px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-extrabold backdrop-blur-md">
                        Event Service
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2">
                      <h3 className="font-serif text-lg font-bold text-amber-200 group-hover:text-amber-300 transition-colors duration-300 line-clamp-2">
                        Luxe Floral Stage Decoration
                      </h3>
                      <p className="text-[11px] text-slate-350 line-clamp-2 leading-relaxed font-light">
                        Breathtaking floral arrangements of gold-dipped orchids, pastel roses, and premium stage background paneling.
                      </p>
                      <div className="pt-2 flex items-center text-[10px] text-amber-400 font-bold uppercase tracking-wider gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View Offerings <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Service 3 */}
                  <div 
                    onClick={() => {
                      setActiveTab("services");
                      if (setServicesCategoryFilter) setServicesCategoryFilter("event");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group relative h-[420px] rounded-3xl overflow-hidden border border-amber-200/40 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                  >
                    <img 
                      src="https://files.catbox.moe/ic2t3k.jpg" 
                      alt="Grand Stage Architecture & Lighting" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e0b36] via-[#1e0b36]/30 to-transparent transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-amber-500/20 text-amber-200 border border-amber-400/40 px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-extrabold backdrop-blur-md">
                        Event Service
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2">
                      <h3 className="font-serif text-lg font-bold text-amber-200 group-hover:text-amber-300 transition-colors duration-300 line-clamp-2">
                        Grand Stage & Lighting Design
                      </h3>
                      <p className="text-[11px] text-slate-350 line-clamp-2 leading-relaxed font-light">
                        Immersive theatrical light fixtures, grand runway stages, and luxury guest lounges orchestrated perfectly.
                      </p>
                      <div className="pt-2 flex items-center text-[10px] text-amber-400 font-bold uppercase tracking-wider gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View Offerings <ChevronRight className="w-3.5 h-3.5 " />
                      </div>
                    </div>
                  </div>

                  {/* Service 4 */}
                  <div 
                    onClick={() => {
                      setActiveTab("services");
                      if (setServicesCategoryFilter) setServicesCategoryFilter("event");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group relative h-[420px] rounded-3xl overflow-hidden border border-amber-200/40 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                  >
                    <img 
                      src="https://files.catbox.moe/5ydkw9.jpg" 
                      alt="Traditional Curation & Canopy Setups" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e0b36] via-[#1e0b36]/30 to-transparent transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-amber-500/20 text-amber-200 border border-amber-400/40 px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-extrabold backdrop-blur-md">
                        Event Service
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2">
                      <h3 className="font-serif text-lg font-bold text-amber-200 group-hover:text-amber-300 transition-colors duration-300 line-clamp-2">
                        Traditional Curation & Canopies
                      </h3>
                      <p className="text-[11px] text-slate-350 line-clamp-2 leading-relaxed font-light">
                        Intricately aligned ritual mandaps, custom vintage seating setups, and royal guest reception lounge layouts.
                      </p>
                      <div className="pt-2 flex items-center text-[10px] text-amber-400 font-bold uppercase tracking-wider gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View Offerings <ChevronRight className="w-3.5 h-3.5 " />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* HIGHLIGHTED BEFORE/AFTER SHOWCASE */}
              <section className="bg-white py-12 border-y border-amber-100" id="interactive_before_after_section">
                <div className="max-w-5xl mx-auto px-4">
                  <BeforeAfterSlider />
                </div>
              </section>

              {/* TESTIMONIALS & RATING PANEL */}
              <section className="max-w-7xl mx-auto px-4 py-8" id="testimonials_section">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#cca43b]">Echoes of Delight</span>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1e0b36] mt-1">Loved by Elite Patrons</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {TESTIMONIALS_DATA.map((t) => (
                    <div key={t.id} className="bg-[#FAF6F0] p-6 rounded-2xl border border-amber-100 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200">
                      <div>
                        <div className="flex items-center gap-1 mb-4 text-[#cca43b]">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <p className="text-slate-700 italic text-sm leading-relaxed mb-6">
                          "{t.comment}"
                        </p>
                      </div>
                      <div className="flex items-center gap-4 pt-4 border-t border-amber-100/50">
                        <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-amber-200" />
                        <div>
                          <h4 className="font-serif font-bold text-[#1e0b36] text-sm">{t.name}</h4>
                          <p className="text-[10px] text-[#cca43b] tracking-wider uppercase font-semibold">{t.role} • {t.event}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* CALL TO ACTION SECTION */}
              <section className="bg-[#1e0b36] text-[#FAF6F0] py-16 px-4 md:px-8 border-y border-amber-300/20" id="cta_section">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                  <Crown className="w-10 h-10 text-[#cca43b] mx-auto" />
                  <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide">Ready to Co-Create Your Masterpiece?</h2>
                  <p className="text-amber-100/70 text-xs md:text-base max-w-xl mx-auto font-light leading-relaxed">
                    Reserve a session with our Senior Planners and Beauty Stylists today. Let's design an environment representing your personal legacy.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                    <button onClick={() => setActiveTab("booking")} className="px-8 py-3.5 bg-gradient-to-r from-[#cca43b] to-[#b58d24] text-slate-900 border border-amber-400 font-bold uppercase text-xs tracking-widest rounded-full cursor-pointer hover:shadow-lg transition-all duration-200">
                      Reserve Appointment
                    </button>
                    <button onClick={() => setIsAuraOpen(true)} className="px-8 py-3.5 bg-transparent border border-amber-300/30 text-amber-200 font-bold uppercase text-xs tracking-widest rounded-full hover:bg-white/5 transition-all duration-200">
                      Live Chat with Aura
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* 2. SERVICES TAB */}
          {activeTab === "services" && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-7xl mx-auto px-4 py-12 space-y-12"
            >
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#cca43b]">The Selection Spectrum</span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1e0b36]">Our Bespoke Services</h2>
                <p className="text-slate-500 text-sm md:text-base">
                  Every selection incorporates personal customization, pre-event consultations, and precise execution oversight by lead artists and senior technologists.
                </p>
              </div>

              {/* Interactive Services Sub-Tabs */}
              <div className="flex justify-center border-b border-amber-200/20 pb-6">
                <div className="inline-flex bg-slate-200/50 p-1.5 rounded-full border border-amber-200/20 shadow-inner">
                  <button
                    onClick={() => setServicesCategoryFilter("all")}
                    className={`px-5 py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                      servicesCategoryFilter === "all"
                        ? "bg-[#1e0b36] text-[#cca43b] shadow-md"
                        : "text-slate-600 hover:text-[#1e0b36]"
                    }`}
                  >
                    All Services
                  </button>
                  <button
                    onClick={() => setServicesCategoryFilter("event")}
                    className={`px-5 py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                      servicesCategoryFilter === "event"
                        ? "bg-[#1e0b36] text-[#cca43b] shadow-md"
                        : "text-slate-600 hover:text-[#1e0b36]"
                    }`}
                  >
                    Event Services
                  </button>
                  <button
                    onClick={() => setServicesCategoryFilter("makeover")}
                    className={`px-5 py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer relative ${
                      servicesCategoryFilter === "makeover"
                        ? "bg-[#1e0b36] text-[#cca43b] shadow-md"
                        : "text-slate-600 hover:text-[#1e0b36]"
                    }`}
                  >
                    Beauty Services
                  </button>
                </div>
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredServices.map((srv) => (
                  <div 
                    key={srv.id} 
                    className="bg-white rounded-3xl border border-amber-100 overflow-hidden shadow-sm flex flex-col md:flex-row hover:shadow-md transition-all duration-300 group"
                    id={`service_card_${srv.id}`}
                  >
                    <div className="relative w-full md:w-2/5 h-60 md:h-auto overflow-hidden">
                      <img 
                        src={srv.image} 
                        alt={srv.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute top-4 left-4 bg-[#1e0b36] text-[#cca43b] px-3 py-1 rounded text-[10px] tracking-widest uppercase font-bold border border-amber-300/30">
                        {srv.category === "event" ? "Event Logistics" : "Makeover Suite"}
                      </div>
                    </div>
                    
                    <div className="p-6 md:p-8 w-full md:w-3/5 flex flex-col justify-between">
                      <div className="space-y-3">
                        <span className="text-slate-400 text-xs tracking-wider block font-medium">{srv.tagline}</span>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1e0b36]">{srv.title}</h3>
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed leading-normal line-clamp-3">
                          {srv.description}
                        </p>
                        
                        <div className="pt-2 space-y-1.5">
                          {srv.benefits.slice(0, 2).map((benefit, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#cca43b] flex-shrink-0" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 border-t border-amber-100/50 flex items-center justify-between mt-4">
                        <div>
                          <span className="text-[10px] uppercase text-slate-400 tracking-wider font-semibold">Couture Pricing</span>
                          <span className="block text-lg font-bold text-[#1e0b36] leading-none mt-0.5">Starts at {srv.priceStart}</span>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setSelectedService(srv)}
                            className="px-3.5 py-2 rounded-lg bg-amber-50 hover:bg-amber-100/40 text-[#cca43b] text-xs font-bold transition-all duration-200 cursor-pointer"
                          >
                            Details
                          </button>
                          <button 
                            onClick={() => {
                              setEventType(srv.category === "event" ? srv.title.replace("Signature", "").trim() : "Makeover");
                              setActiveTab("booking");
                            }}
                            className="px-4 py-2 rounded-lg bg-[#1e0b36] hover:bg-[#2e1250] text-[#FAF6F0] text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer"
                          >
                            Inquire
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Extended Service Detail Modal overlay */}
              {selectedService && (
                <div className="fixed inset-0 z-50 bg-[#1e0b36]/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-[#FAF6F0] border-2 border-amber-200 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                    <img src={selectedService.image} alt={selectedService.title} className="w-full h-56 object-cover" />
                    <div className="p-6 md:p-8 space-y-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[#cca43b] text-xs uppercase tracking-widest font-semibold">{selectedService.tagline}</span>
                          <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1e0b36] mt-1">{selectedService.title}</h3>
                        </div>
                        <button 
                          onClick={() => setSelectedService(null)}
                          className="p-1 rounded-full bg-slate-200/50 hover:bg-slate-200 text-slate-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <p className="text-slate-600 text-sm leading-relaxed">{selectedService.description}</p>
                        
                        <div className="space-y-2.5">
                          <h4 className="text-xs uppercase font-bold text-[#1e0b36] tracking-wider">Premium Package Achievements</h4>
                          {selectedService.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-[#cca43b] flex-shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 border-t border-amber-200/40 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase tracking-widest">Estimated Investment Entry</span>
                          <p className="text-[#cca43b] text-2xl font-serif font-bold">{selectedService.priceStart}</p>
                        </div>
                        <button 
                          onClick={() => {
                            setEventType(selectedService.title);
                            setSelectedService(null);
                            setActiveTab("booking");
                          }}
                          className="px-6 py-3 bg-[#1e0b36] text-[#FAF6F0] border border-amber-300/20 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-900 transition-colors"
                        >
                          Send Bespoke Inquiry
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* 3. PACKAGES TAB */}
          {activeTab === "packages" && (
            <motion.div
              key="packages"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-7xl mx-auto px-4 py-12 space-y-12"
            >
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#cca43b]">Finely Tailored Tiers</span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1e0b36]">Investment Packages</h2>
                <p className="text-slate-500 text-sm md:text-base">
                  Transparent luxury categories created to suit various hosting scales. Custom adjustments are integrated instantly.
                </p>

                {/* Categories Switch Tabs */}
                <div className="inline-flex bg-slate-200/50 p-1 rounded-full border border-amber-200/30">
                  <button
                    onClick={() => setPricingCategory("wedding")}
                    className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${pricingCategory === 'wedding' ? 'bg-[#1e0b36] text-[#cca43b] shadow-sm' : 'text-slate-600'}`}
                  >
                    Wedding Staging
                  </button>
                  <button
                    onClick={() => setPricingCategory("corporate")}
                    className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${pricingCategory === 'corporate' ? 'bg-[#1e0b36] text-[#cca43b] shadow-sm' : 'text-slate-600'}`}
                  >
                    Corporate Sum
                  </button>
                  <button
                    onClick={() => setPricingCategory("beauty")}
                    className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${pricingCategory === 'beauty' ? 'bg-[#1e0b36] text-[#cca43b] shadow-sm' : 'text-slate-600'}`}
                  >
                    Beauty sets
                  </button>
                </div>
              </div>

              {/* Package cards container */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PRICING_PLANS.filter(p => p.category === pricingCategory).map((plan) => (
                  <div 
                    key={plan.id} 
                    className={`relative rounded-3xl p-8 border bg-white shadow-sm flex flex-col justify-between transition-all duration-300 ${
                      plan.popular 
                        ? 'border-amber-400 ring-2 ring-amber-400/20' 
                        : 'border-amber-100 hover:border-amber-200'
                    }`}
                    id={`package_card_${plan.id}`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full gold-gradient text-slate-900 border border-amber-400 text-[10px] font-bold uppercase tracking-widest shadow-md">
                        Highly Requested Setup
                      </span>
                    )}

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <span className="text-[#cca43b] text-xs font-bold uppercase tracking-widest block">{plan.tier} Tier</span>
                        <h3 className="font-serif text-2xl font-bold text-[#1e0b36]">{plan.title}</h3>
                        <p className="text-slate-500 text-xs font-light">{plan.subtitle}</p>
                      </div>

                      <div className="py-2">
                        <span className="text-[10px] uppercase text-slate-400 tracking-widest font-semibold block">Investment Range</span>
                        <span className="text-3xl md:text-4xl font-serif font-black text-[#1e0b36]">{plan.price}</span>
                      </div>

                      <div className="space-y-3.5 border-t border-amber-100 pt-6">
                        <span className="text-[10px] uppercase text-[#1e0b36] tracking-widest font-bold block">Included Deliverables</span>
                        {plan.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
                            <Check className="w-4 h-4 text-[#cca43b] mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-8 mt-6 border-t border-amber-100/50">
                      <button 
                        onClick={() => {
                          setEventType(`${plan.category.toUpperCase()} - ${plan.title}`);
                          setApproxBudget(plan.tier);
                          setActiveTab("booking");
                        }}
                        className={`w-full py-3.5 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all duration-200 cursor-pointer ${
                          plan.popular 
                            ? 'bg-[#1e0b36] text-[#cca43b] border border-amber-300/40 hover:bg-[#2d1250]' 
                            : 'bg-amber-50 hover:bg-amber-100/40 text-[#cca43b]'
                        }`}
                      >
                        Reserve {plan.tier} Slot
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Custom Blueprint alternative banner */}
              <div className="bg-[#1e0b36] text-[#FAF6F0] rounded-3xl p-8 md:p-12 border border-amber-400/20 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2.5 md:max-w-2xl">
                  <span className="text-[#cca43b] text-xs font-bold uppercase tracking-widest block">No Cookie-Cutter Limitations</span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold">Have Specific Scale Requirements?</h3>
                  <p className="text-amber-100/70 text-xs sm:text-sm font-light leading-relaxed">
                    Access our AI customization generator. Design your theme parameters, indicate guest volumes, outline outfit styling guidance, and let our integrated Model compile tailored cost proposals on-the-fly.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("customize")}
                  className="px-8 py-4 bg-gradient-to-r from-[#cca43b] to-[#b58d24] text-slate-900 border border-amber-400 font-bold uppercase text-xs tracking-widest rounded-xl hover:scale-102 transition-transform cursor-pointer flex-shrink-0 whitespace-nowrap"
                >
                  Launch customizer <ArrowRight className="w-4.5 h-4.5 inline ml-1.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* 4. GALLERY TAB */}
          {activeTab === "gallery" && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-7xl mx-auto px-4 py-12 space-y-12"
            >
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#cca43b]">Visual Masterpieces</span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1e0b36]">The Masterpiece Portfolio</h2>
                <p className="text-slate-500 text-sm md:text-base">
                  Real snapshots of previous royal staging setups and glorious airbrush cosmetic transformations.
                </p>

                {/* Filter Controls Bar */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 pt-4">
                  {[
                    { id: "all", label: "All Works" },
                    { id: "weddings", label: "Weddings" },
                    { id: "corporate", label: "Corporate Galas" },
                    { id: "birthdays", label: "Birthdays" },
                    { id: "bridal", label: "Bridal Sets" },
                    { id: "groom", label: "Groom Styling" }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setGalleryFilter(filter.id)}
                      className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                        galleryFilter === filter.id 
                          ? 'bg-[#1e0b36] text-[#cca43b] border border-amber-300/30' 
                          : 'bg-white hover:bg-slate-200/50 text-slate-600 border border-slate-200/60'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Masonry-like Grid Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery_masonry_grid">
                {filteredGallery.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => setSelectedGalleryItem(item)}
                    className="group relative h-80 rounded-2xl overflow-hidden border border-amber-100 shadow-sm cursor-pointer select-none"
                  >
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                    <div className="absolute bottom-6 left-6 right-6 space-y-1">
                      <span className="text-[#cca43b] text-[10px] tracking-widest font-semibold uppercase">{item.category}</span>
                      <h3 className="font-serif text-lg font-bold text-[#FAF6F0] leading-snug">{item.title}</h3>
                      <p className="text-slate-300 text-xs font-light">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Before/After Embed strictly in gallery */}
              <div className="bg-white py-12 rounded-3xl border border-amber-100 space-y-4">
                <div className="max-w-4xl mx-auto px-4">
                  <BeforeAfterSlider />
                </div>
              </div>

              {/* Photo Lightbox Dialog */}
              {selectedGalleryItem && (
                <div className="fixed inset-0 z-50 bg-[#1e0b36]/90 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-transparent max-w-4xl w-full flex flex-col items-center gap-4">
                    <div className="relative w-full rounded-2xl overflow-hidden border-2 border-amber-400">
                      <img src={selectedGalleryItem.image} alt={selectedGalleryItem.title} className="w-full max-h-[70vh] object-contain bg-black/60" />
                      <button 
                        onClick={() => setSelectedGalleryItem(null)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-[#FAF6F0] border border-white/20"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="text-center space-y-1 max-w-xl">
                      <span className="text-[#cca43b] text-xs uppercase tracking-widest font-bold">{selectedGalleryItem.category}</span>
                      <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF6F0]">{selectedGalleryItem.title}</h4>
                      <p className="text-slate-300 text-xs font-light">{selectedGalleryItem.subtitle}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* 5. ABOUT US TAB */}
          {activeTab === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-7xl mx-auto px-4 py-12 space-y-16"
            >
              {/* Vision section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#cca43b]">The Aura Legacy</span>
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1e0b36] leading-none">
                    Uncompromised Standards of Luxury
                  </h2>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    Founded in 2012 by master designers and premium cosmetologists, Aura sets the golden benchmark for integrated luxury celebrations.
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">
                    Our mandate is simple: eliminate the friction of scheduling disjointed service providers. In our modern sanctuary, the technical mechanics of acoustics, heavy canvas structures, and lighting design synchronize perfectly with high-fashion apparel draping, styling consultations, and airbrush beauty services.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="border-l-2 border-amber-400 pl-4 py-1">
                      <p className="font-serif font-extrabold text-[#1e0b36]">WIPA Certified</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">International Credentials</p>
                    </div>
                    <div className="border-l-2 border-amber-400 pl-4 py-1">
                      <p className="font-serif font-extrabold text-[#1e0b36]">Monaco Gala Awards</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">Top Styling House 2025</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1545232979-8bf34eb9757b?auto=format&fit=crop&q=95&w=1600" alt="About us venue design" className="rounded-3xl shadow-xl border border-amber-200" />
                  <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl border border-amber-200 max-w-xs shadow-lg hidden sm:block">
                    <p className="font-serif font-bold text-sm text-[#1e0b36]">"Design is not what we install. It is how we make our patrons feel."</p>
                    <p className="text-[10px] uppercase text-[#cca43b] font-bold tracking-wider mt-2">— Elena Ross-Chamberlain</p>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div className="space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-[#cca43b] text-xs font-bold uppercase tracking-widest block">Creative Directors</span>
                  <h3 className="font-serif text-3xl font-bold text-[#1e0b36]">Meet Your Senior Consultants</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {TEAM_DATA.map((t) => (
                    <div key={t.id} className="bg-white rounded-2xl border border-amber-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 text-center space-y-4" id={`team_card_${t.id}`}>
                      <img src={t.avatar} alt={t.name} className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-amber-400" />
                      <div className="space-y-1">
                        <h4 className="font-serif font-bold text-lg text-[#1e0b36]">{t.name}</h4>
                        <p className="text-[10px] uppercase text-[#cca43b] tracking-wider font-semibold">{t.role}</p>
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed font-light">{t.bio}</p>
                      
                      <div className="pt-4 border-t border-amber-50 flex flex-wrap justify-center gap-1.5">
                        {t.certifications.map((cert, idx) => (
                          <span key={idx} className="bg-[#1e0b36]/5 text-[#1e0b36] px-2.5 py-1 rounded text-[9px] font-semibold tracking-wider uppercase">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* 6. AI planner / customizer tab */}
          {activeTab === "customize" && (
            <motion.div
              key="customize"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-6xl mx-auto px-4 py-12 space-y-12 animate-in duration-300"
            >
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#cca43b] inline-flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-[#cca43b]" />
                  Aura Bespoke Configurator
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1e0b36]">Customize Your Bespoke Event</h2>
                <p className="text-slate-500 text-sm md:text-base">
                  Drape your dream celebration. Indicate staging, catering, styling levels, and let our embedded **Gemini AI creative director** write custom summaries, structured timelines, and itemized cost reports matching your exact metrics.
                </p>
              </div>

              {/* Progress Steps Indicators */}
              <div className="max-w-xl mx-auto grid grid-cols-4 gap-2 text-center" id="wizard_steps_indicator">
                {[
                  { step: 1, label: "Event Parameters" },
                  { step: 2, label: "Floral & Decor" },
                  { step: 3, label: "Beauty & Style" },
                  { step: 4, label: "Prestige Quote" }
                ].map((item) => (
                  <button 
                    key={item.step}
                    disabled={item.step === 4 && !proposalResult}
                    onClick={() => setWizardStep(item.step)}
                    className="flex flex-col items-center focus:outline-none"
                  >
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs mb-1.5 transition-all duration-200 ${
                      wizardStep === item.step 
                        ? 'bg-[#1e0b36] border-[#cca43b] text-[#cca43b]' 
                        : wizardStep > item.step 
                          ? 'bg-amber-100 border-[#cca43b] text-[#1e0b36]' 
                          : 'bg-white border-slate-300/60 text-slate-400'
                    }`}>
                      {item.step}
                    </div>
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-500">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* STEP 1: EVENT PARAMETERS */}
              {wizardStep === 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-8 rounded-3xl border border-amber-100 max-w-xl mx-auto space-y-6 shadow-sm"
                >
                  <h3 className="font-serif text-xl font-bold text-[#1e0b36] border-b border-amber-50 pb-3 flex items-center gap-2">
                    <PartyPopper className="w-5 h-5 text-[#cca43b]" />
                    Step 1: Core Dimensions
                  </h3>

                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold tracking-wider text-slate-600 block">Select Celebration Type</label>
                    <select 
                      value={customEventType}
                      onChange={(e) => setCustomEventType(e.target.value)}
                      className="w-full bg-[#FAF6F0] border border-amber-200 hover:border-amber-400 rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-700 font-medium"
                    >
                      <option>Wedding Celebration</option>
                      <option>Corporate Award Gala</option>
                      <option>Thematic Birthday Celebration</option>
                      <option>Intimate Engagement Party</option>
                      <option>Private Milestones VIP Dinner</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs uppercase font-bold tracking-wider text-slate-600">
                      <span>Accompanying Guest Volume</span>
                      <span className="text-[#cca43b] font-mono text-sm">{customGuests} Pax</span>
                    </div>
                    <input 
                      type="range" 
                      min="20" 
                      max="1000" 
                      step="10"
                      value={customGuests}
                      onChange={(e) => setCustomGuests(Number(e.target.value))}
                      className="w-full accent-[#cca43b] bg-slate-200"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-semibold uppercase">
                      <span>20 guests</span>
                      <span>500 guests</span>
                      <span>1,000+ guest tier</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs uppercase font-bold tracking-wider text-slate-600 block">Select Styling Accent Theme</label>
                    <div className="grid grid-cols-1 gap-2">
                      {CUSTOM_THEMES.map((theme) => (
                        <label 
                          key={theme.id}
                          className={`flex items-start gap-3.5 p-3.5 rounded-xl border cursor-pointer hover:border-amber-400 transition-all duration-200 ${
                            customTheme === theme.name 
                              ? 'bg-amber-50/40 border-[#cca43b] ring-1 ring-[#cca43b]/10' 
                              : 'bg-[#FAF6F0] border-slate-200'
                          }`}
                        >
                          <input 
                            type="radio" 
                            name="custom_theme_selection" 
                            checked={customTheme === theme.name}
                            onChange={() => setCustomTheme(theme.name)}
                            className="accent-[#cca43b] mt-1"
                          />
                          <div>
                            <span className="font-serif text-sm font-bold text-[#1e0b36] block">{theme.name}</span>
                            <span className="text-[11px] text-slate-500 font-light mt-0.5 block leading-relaxed">{theme.description}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <span></span>
                    <button 
                      onClick={() => setWizardStep(2)}
                      className="px-6 py-3 bg-[#1e0b36] text-[#FAF6F0] border border-amber-300/20 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#2d1250] flex items-center gap-1.5 transition-transform cursor-pointer"
                    >
                      Decor Settings <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: STAGING & FLORAL DECOR */}
              {wizardStep === 2 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-8 rounded-3xl border border-amber-100 max-w-xl mx-auto space-y-6 shadow-sm"
                >
                  <h3 className="font-serif text-xl font-bold text-[#1e0b36] border-b border-amber-50 pb-3 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-[#cca43b]" />
                    Step 2: Scenic Staging & Catering
                  </h3>

                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold tracking-wider text-slate-600 block">Staging & Floristry Magnificence</label>
                    <select
                      value={customDecor}
                      onChange={(e) => setCustomDecor(e.target.value)}
                      className="w-full bg-[#FAF6F0] border border-amber-200 hover:border-amber-400 rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-700 font-medium"
                    >
                      <option>Classic Chandelier & Heavy Silk Draping</option>
                      <option>Royal Imported Florals & Majestic Backplane</option>
                      <option>Glass Catwalk, Concert Sound, Ambient Canopy & Smoke Clouds</option>
                      <option>Intimate Candlelit Garden Clusters with Fairy Canopy</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold tracking-wider text-slate-600 block">Culinary Arts & Catering Preferences</label>
                    <select
                      value={customCatering}
                      onChange={(e) => setCustomCatering(e.target.value)}
                      className="w-full bg-[#FAF6F0] border border-amber-200 hover:border-amber-400 rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-700 font-medium"
                    >
                      <option>Luxury Fine-Dining Multi-Course Plated</option>
                      <option>Continental Gourmet Premium Buffet</option>
                      <option>Organic Canopy Craft Cocktails & Hors D'oeuvres</option>
                      <option>Exquisite Theme Dessert Theater & Cake Placements</option>
                    </select>
                  </div>

                  <div className="space-y-2.5 p-4 rounded-xl bg-amber-50/40 border border-amber-200/50">
                    <div className="flex justify-between items-center cursor-pointer">
                      <div>
                        <span className="font-serif text-sm font-bold text-[#1e0b36] block">Cinematic Visual Recording Coverage</span>
                        <span className="text-[10px] text-slate-500">Premium drones and signature digital look-backs.</span>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={customPhoto}
                        onChange={() => setCustomPhoto(!customPhoto)}
                        className="w-5 h-5 accent-[#cca43b] text-white cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button 
                      onClick={() => setWizardStep(1)}
                      className="px-5 py-3 text-slate-500 font-bold uppercase text-[10px] tracking-wider hover:text-[#1e0b36]"
                    >
                      Back
                    </button>
                    <button 
                      onClick={() => setWizardStep(3)}
                      className="px-6 py-3 bg-[#1e0b36] text-[#FAF6F0] border border-amber-300/20 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#2d1250] flex items-center gap-1.5 transition-transform cursor-pointer"
                    >
                      Beauty & Style <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: BEAUTY & STYLE */}
              {wizardStep === 3 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-8 rounded-3xl border border-amber-100 max-w-xl mx-auto space-y-6 shadow-sm"
                >
                  <h3 className="font-serif text-xl font-bold text-[#1e0b36] border-b border-amber-50 pb-3 flex items-center gap-2">
                    <Scissors className="w-5 h-5 text-[#cca43b]" />
                    Step 3: Haute Makeover Suite
                  </h3>

                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold tracking-wider text-slate-600 block">Preferece Cosmetic Design</label>
                    <select
                      value={customMakeup}
                      onChange={(e) => setCustomMakeup(e.target.value)}
                      className="w-full bg-[#FAF6F0] border border-amber-200 hover:border-amber-400 rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-700 font-medium"
                    >
                      <option>Timeless Radiant Glowing Cosmetics</option>
                      <option>Prestige HD Airbrush Contoured finish</option>
                      <option>Couture Velvet Matte Bold-Lip Vibe</option>
                      <option>Minimalist Fresh Dewy Glow</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold tracking-wider text-slate-600 block">Hair Artistry Signature Style</label>
                    <select
                      value={customHair}
                      onChange={(e) => setCustomHair(e.target.value)}
                      className="w-full bg-[#FAF6F0] border border-amber-200 hover:border-amber-400 rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-700 font-medium"
                    >
                      <option>Couture Sculpted Updo with Tiara/Veil Anchor</option>
                      <option>Cascaded Romantic Soft Curls with Floral Weave</option>
                      <option>High-Branded Traditional Crown Braids</option>
                      <option>Minimalist Slick-back Modern Tailored Bob</option>
                    </select>
                  </div>

                  <div className="space-y-2.5 p-4 rounded-xl bg-amber-50/40 border border-amber-200/50">
                    <div className="flex justify-between items-center cursor-pointer">
                      <div>
                        <span className="font-serif text-sm font-bold text-[#1e0b36] block">Drape, Apparel & Outfit Draping Assistant</span>
                        <span className="text-[10px] text-slate-500">Dedicated fashion advisor checking symmetry live.</span>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={customOutfitHelp}
                        onChange={() => setCustomOutfitHelp(!customOutfitHelp)}
                        className="w-5 h-5 accent-[#cca43b] text-white cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold tracking-wider text-slate-600 block">Estimated Investment Bracket</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Basic", "Premium", "Luxury"].map((tier) => (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => setCustomBudgetCategory(tier)}
                          className={`py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                            customBudgetCategory === tier 
                              ? 'bg-[#1e0b36] text-[#cca43b] border-[#cca43b]' 
                              : 'bg-[#FAF6F0] text-slate-600 border-slate-200'
                          }`}
                        >
                          {tier}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button 
                      onClick={() => setWizardStep(2)}
                      className="px-5 py-3 text-slate-500 font-bold uppercase text-[10px] tracking-wider hover:text-[#1e0b36]"
                    >
                      Back
                    </button>
                    <button 
                      disabled={proposalLoading}
                      onClick={handleCompileProposal}
                      className="px-6 py-3.5 bg-gradient-to-r from-[#cca43b] to-[#b58d24] text-slate-900 border border-amber-400 font-extrabold uppercase text-xs tracking-widest rounded-xl hover:scale-102 flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-md"
                    >
                      {proposalLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-slate-900" />
                          Analyzing Scale...
                        </>
                      ) : (
                        <>
                          <Crown className="w-4 h-4 text-slate-900" />
                          Compile Luxe Proposal
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: BESPOKE AI PROPOSAL RESULTS */}
              {wizardStep === 4 && proposalResult && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl border-2 border-amber-300 md:p-10 p-6 shadow-2xl max-w-4xl mx-auto space-y-8"
                  id="gemini_proposal_result_panel"
                >
                  <div className="text-center space-y-2 border-b border-amber-200/50 pb-6 relative">
                    <span className="absolute top-0 right-0 inline-flex items-center gap-1 px-3 py-1 bg-[#1e0b36] text-[#cca43b] text-[9px] uppercase tracking-wider font-semibold rounded-full border border-amber-400/20">
                      <Sparkles className="w-3.5 h-3.5" /> Approved by Gemini AI
                    </span>
                    <Crown className="w-12 h-12 text-[#cca43b] mx-auto" />
                    <h3 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#1e0b36] tracking-wide">
                      Your Bespoke Royal Strategy
                    </h3>
                    <p className="text-[#cca43b] text-xs font-mono tracking-widest uppercase">
                      Compiled for {customEventType} • {customGuests} Attendees
                    </p>
                  </div>

                  {/* Summary Callout banner */}
                  <div className="bg-[#1e0b36] text-[#FAF6F0] p-6 rounded-2xl border border-amber-200/30 text-xs sm:text-sm font-light leading-relaxed font-serif tracking-normal">
                    <p className="italic text-amber-200 pr-4">"Greetings from our Haute Salon. Aligned with your envisioned luxury tier we have formulated the perfect staging blueprints..."</p>
                    <p className="mt-4 text-[11px] leading-relaxed font-sans text-amber-100/70">{proposalResult.luxeSummary}</p>
                  </div>

                  {/* Themes Suggestions & Makeover design */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-4">
                      <h4 className="font-serif text-lg font-bold text-[#1e0b36] border-b border-amber-100 pb-2 flex items-center gap-2">
                        <Palette className="w-5 h-5 text-[#cca43b]" />
                        Event Visual Themes
                      </h4>
                      <ul className="space-y-3">
                        {proposalResult.eventThemes.map((themeStr, i) => (
                          <li key={i} className="bg-[#FAF6F0] p-4 rounded-xl border border-amber-100 text-xs text-slate-700 leading-normal flex items-start gap-2.5">
                            <span className="bg-[#1e0b36] text-[#cca43b] rounded-full w-5 h-5 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                              {i+1}
                            </span>
                            <span>{themeStr}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-4">
                        <h4 className="font-serif text-lg font-bold text-[#1e0b36] border-b border-amber-100 pb-2 flex items-center gap-2">
                          <Scissors className="w-5 h-5 text-[#cca43b]" />
                          Couture Makeover Design
                        </h4>
                        <div className="bg-[#FAF6F0] p-4 rounded-xl border border-amber-100 text-xs text-slate-700 leading-relaxed">
                          {proposalResult.makeoverDesign}
                          <div className="mt-4 pt-4 border-t border-amber-200/40 flex flex-wrap gap-1.5 justify-start">
                            <span className="bg-[#1e0b36] text-[#cca43b] px-2 py-1 rounded text-[9px] uppercase font-bold">{customMakeup}</span>
                            <span className="bg-[#1e0b36] text-[#cca43b] px-2 py-1 rounded text-[9px] uppercase font-bold">{customHair}</span>
                          </div>
                        </div>
                      </div>

                      {/* Direct Booking short-cut info */}
                      <div className="p-4 rounded-xl border-dashed border-2 border-amber-300 text-center">
                        <p className="text-[10px] uppercase text-slate-400 font-bold block">Reserve this design slot today</p>
                        <p className="text-xs text-slate-700 font-light mt-1">Would you like to lock this blueprint into our event calendar?</p>
                        <button 
                          onClick={() => {
                            setEventType(customEventType);
                            setApproxBudget(customBudgetCategory);
                            setGuestCountInput(customGuests);
                            setSpecialReq(`AI CUSTOM PROPOSAL SECURED:\nMakeup: ${customMakeup}\nHair: ${customHair}\nDecor: ${customDecor}`);
                            setActiveTab("booking");
                          }}
                          className="mt-3.5 px-4 py-2 rounded bg-[#1e0b36] text-white text-[10px] font-bold uppercase tracking-wider hover:bg-[#2d1250] cursor-pointer inline-block"
                        >
                          Book Selected Design
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Structured Timeline */}
                  <div className="space-y-4 pt-4">
                    <h4 className="font-serif text-lg font-bold text-[#1e0b36] border-b border-amber-100 pb-2 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#cca43b]" />
                      Suggested Milestones Timeline
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {proposalResult.suggestedTimeline.map((time, idx) => (
                        <div key={idx} className="bg-[#FAF6F0] border border-amber-100 p-4 rounded-xl flex flex-col justify-between">
                          <span className="text-[#cca43b] font-mono text-[10px] font-bold block">{time.timing}</span>
                          <span className="font-serif font-bold text-slate-800 text-xs block mt-1.5 mb-1 leading-snug">{time.phase}</span>
                          <p className="text-[10px] text-slate-500 leading-normal">{time.activity}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cost breakdown itemized table */}
                  <div className="space-y-4 pt-4">
                    <h4 className="font-serif text-lg font-bold text-[#1e0b36] border-b border-amber-100 pb-2 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-[#cca43b]" />
                      Grand Itemized Budget Compilation
                    </h4>
                    <div className="overflow-x-auto rounded-xl border border-amber-100 shadow-sm">
                      <table className="w-full text-left text-xs bg-[#FAF6F0]">
                        <thead className="bg-[#1e0b36] text-[#cca43b] text-[10px] uppercase tracking-widest font-bold">
                          <tr>
                            <th className="py-3 px-4">Line Category</th>
                            <th className="py-3 px-4">Deliverables Overview</th>
                            <th className="py-3 px-4 text-right">Estimated Investment</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-200/30">
                          {proposalResult.itemizedCost.map((cost, idx) => (
                            <tr key={idx} className="hover:bg-amber-100/10">
                              <td className="py-3 px-4 font-bold text-slate-800 font-serif">{cost.category}</td>
                              <td className="py-3 px-4 text-slate-600 font-light">{cost.service}</td>
                              <td className="py-3 px-4 text-right font-bold text-[#1e0b36] font-mono">{cost.estimatedCost}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Wizard bottom navigation */}
                  <div className="pt-6 border-t border-amber-200/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button 
                      onClick={() => {
                        setWizardStep(1);
                        setProposalResult(null);
                      }}
                      className="text-xs uppercase font-bold tracking-widest text-[#cca43b] hover:text-[#1e0b36]"
                    >
                      Start Over New Blueprint
                    </button>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => window.print()}
                        className="px-4 py-2 text-slate-700 bg-[#FAF6F0] hover:bg-slate-200 rounded border border-slate-300 text-xs font-bold uppercase transition-all duration-200 cursor-pointer"
                      >
                        Print Proposal
                      </button>
                      <button 
                        onClick={() => {
                          alert("Your custom proposal has been securely dispatched to our planning team. We've scheduled an immediate slot confirmation!");
                          setActiveTab("booking");
                        }}
                        className="px-6 py-2.5 bg-[#1e0b36] text-[#FAF6F0] border border-amber-300/20 text-xs font-bold uppercase tracking-wider rounded inline-flex items-center gap-1.5 hover:bg-[#2e1250] transition-transform duration-200 shadow-md cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#cca43b]" /> Secure Calender Slot
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* 7. CONTACT & BOOKING REQUEST */}
          {activeTab === "booking" && (
            <motion.div
              key="booking"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-7xl mx-auto px-4 py-12 space-y-12"
            >
              {/* Tabs inside Booking category */}
              <div className="flex items-center justify-between border-b border-amber-200/50 pb-4">
                <div className="space-y-1">
                  <span className="text-[#cca43b] text-xs font-bold uppercase tracking-widest">Master Calender Reservations</span>
                  <h2 className="font-serif text-3xl font-bold text-[#1e0b36]">
                    {isAdminView ? "Prestige Administration Dashboard" : "Reserve Your Aura Slot"}
                  </h2>
                </div>
                <button
                  onClick={() => setIsAdminView(!isAdminView)}
                  className="px-4 py-1.5 bg-amber-50 hover:bg-amber-100/40 text-[#cca43b] text-[10px] uppercase font-bold tracking-widest rounded-lg border border-amber-200 transition-colors"
                  id="admin_dashboard_toggle"
                >
                  {isAdminView ? "Show Booking Form" : "Manage Bookings (Admin)"}
                </button>
              </div>

              {isAdminView ? (
                // ADMIN MANAGEMET PANEL
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white p-6 md:p-10 rounded-3xl border border-amber-100 shadow-sm space-y-6"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#1e0b36]">Aura Booking Registrations</h3>
                      <p className="text-slate-500 text-xs mt-0.5">Below is a list of premium appointments saved to the local server database.</p>
                    </div>
                    <span className="bg-[#1e0b36] text-[#cca43b] px-3.5 py-1 text-xs font-bold uppercase rounded-lg">
                      Record Volume: {bookings.length} Registered
                    </span>
                  </div>

                  {bookings.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-[#FAF6F0]">
                      <Calendar className="w-12 h-12 text-[#cca43b]/40 mx-auto" />
                      <h4 className="font-serif font-bold text-slate-700 mt-4">Empty Reservations</h4>
                      <p className="text-slate-400 text-xs max-w-sm mx-auto mt-1">No bookings are stored on the server yet. Generate simulated slots or complete the main form.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-xl border border-slate-200/60 shadow-sm">
                      <table className="w-full text-xs text-left bg-white">
                        <thead className="bg-[#1e0b36] text-[#cca43b] text-[10px] uppercase tracking-wider font-bold">
                          <tr>
                            <th className="py-3 px-4">Client Name</th>
                            <th className="py-3 px-4">Contact Credentials</th>
                            <th className="py-3 px-4">Event Preference</th>
                            <th className="py-3 px-4">Date & Time</th>
                            <th className="py-3 px-4">Scale / Budget</th>
                            <th className="py-3 px-4">Special Requests</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-150">
                          {bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-[#FAF6F0]/50">
                              <td className="py-4 px-4 font-bold text-slate-800 font-serif text-sm">{booking.name}</td>
                              <td className="py-4 px-4">
                                <span className="block">{booking.email}</span>
                                <span className="block text-slate-400 font-mono mt-0.5">{booking.phone}</span>
                              </td>
                              <td className="py-4 px-4">
                                <span className="bg-amber-100/60 border border-amber-200 text-[#8a6a24] px-2 py-0.5 rounded text-[10px] uppercase font-bold font-mono">
                                  {booking.eventType}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-slate-600 font-mono text-[11px]">
                                {new Date(booking.dateTime).toLocaleDateString()} at {new Date(booking.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </td>
                              <td className="py-4 px-4">
                                <span className="block font-semibold">{booking.guestCount} Guests</span>
                                <span className="text-[10px] uppercase font-bold text-[#cca43b]">{booking.approxBudget} Tier</span>
                              </td>
                              <td className="py-4 px-4 italic text-slate-500 max-w-xs truncate" title={booking.specialRequirements}>
                                {booking.specialRequirements || "N/A"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              ) : (
                // STANDARD BOOKING FORM + INFORMATION
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left info column */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#1e0b36] text-[#FAF6F0] p-8 rounded-3xl border border-amber-300/20 space-y-6">
                      <div className="space-y-2">
                        <span className="text-[#cca43b] text-xs uppercase tracking-widest font-bold">Contact Directory</span>
                        <h3 className="font-serif text-2xl font-bold">The Aura Suite Residence</h3>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-amber-100/15">
                        <div className="flex items-start gap-3 text-xs leading-relaxed font-light">
                          <MapPin className="w-5 h-5 text-[#cca43b] flex-shrink-0" />
                          <div>
                            <span className="font-bold text-amber-200 block">HQ Flagship Location</span>
                            <span>Avenue of the Gilded Rose, Suite 400, Beverly Hills, CA 90210</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 text-xs leading-relaxed font-light">
                          <Phone className="w-4 h-4 text-[#cca43b] flex-shrink-0" />
                          <div>
                            <span className="font-bold text-amber-200 block">Prestige Concierge Line</span>
                            <span className="font-mono text-sm">+1 (800) 555-AURA</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 text-xs leading-relaxed font-light">
                          <Mail className="w-4 h-4 text-[#cca43b] flex-shrink-0" />
                          <div>
                            <span className="font-bold text-amber-200 block">Electronic Inquiries</span>
                            <span>directorate@aura-luxury.com</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-amber-100/15 text-center">
                        <p className="text-[10px] uppercase text-[#cca43b] font-bold tracking-widest">Connect instaneously via WhatsApp</p>
                        <a 
                          href="https://wa.me/18005552872" 
                          target="_blank" 
                          rel="noreferrer" 
                          className="mt-3 py-2 px-4 rounded-lg bg-emerald-600 block hover:bg-emerald-700 text-[#FAF6F0] text-xs font-bold uppercase tracking-wider transition-colors shadow"
                        >
                          Launch WhatsApp Chat
                        </a>
                      </div>
                    </div>

                    {/* Styled Google Maps Component */}
                    <div className="bg-white rounded-3xl overflow-hidden border border-amber-100 p-4 space-y-3 shadow-md" id="google_maps_holder">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-[#cca43b]" />
                        <h4 className="font-serif font-bold text-slate-800 text-sm">Interactive Salon Location</h4>
                      </div>
                      <div className="bg-slate-200 h-48 rounded-2xl flex items-center justify-center font-mono text-xs text-slate-500 relative bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=400')" }}>
                        <div className="absolute inset-0 bg-slate-900/40"></div>
                        <div className="bg-white/95 px-4 py-2.5 rounded-xl border border-amber-400 text-center z-10 max-w-[200px] shadow-lg">
                          <span className="text-[#1e0b36] font-bold block text-[11px]">Aura Flagship Salon</span>
                          <span className="text-[9px] text-[#cca43b] font-semibold uppercase tracking-wider">Tap to open Maps</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form column */}
                  <div className="lg:col-span-2">
                    <form 
                      onSubmit={handleBookingSubmit} 
                      className="bg-white p-8 md:p-12 rounded-3xl border border-amber-100 shadow-sm space-y-6"
                    >
                      <h3 className="font-serif text-2xl font-bold text-[#1e0b36] border-b border-amber-50 pb-3 flex items-center gap-2">
                        <CalendarDays className="w-6 h-6 text-[#cca43b]" />
                        Bespoke Consultation Booking
                      </h3>

                      {bookingSuccess ? (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-emerald-50 border border-emerald-300 p-6 rounded-2xl text-center space-y-4"
                        >
                          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                          <div className="space-y-1">
                            <h4 className="font-serif font-bold text-emerald-800 text-lg">Bespoke Slot Confirmed</h4>
                            <p className="text-emerald-700 text-xs max-w-md mx-auto">
                              Your luxury reservation has been securely catalogued on our server scheduling ledger. Your senior planning director will email confirmations within 3 hours.
                            </p>
                          </div>
                          <button 
                            type="button" 
                            onClick={() => setBookingSuccess(false)}
                            className="px-5 py-2 bg-[#1e0b36] text-[#cca43b] text-xs font-bold uppercase rounded-lg hover:bg-slate-900 cursor-pointer"
                          >
                            New Appointment
                          </button>
                        </motion.div>
                      ) : (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs uppercase font-bold tracking-wider text-slate-600">Full Name</label>
                              <input 
                                type="text" 
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Genevieve Sterling"
                                className="w-full bg-[#FAF6F0] border border-slate-200 focus:border-[#cca43b] rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-700 font-medium"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-xs uppercase font-bold tracking-wider text-slate-600">Email Address</label>
                              <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="client@luxure.com"
                                className="w-full bg-[#FAF6F0] border border-slate-200 focus:border-[#cca43b] rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-700 font-medium"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs uppercase font-bold tracking-wider text-slate-600">Telephone Line</label>
                              <input 
                                type="tel" 
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+1 (555) 019-2810"
                                className="w-full bg-[#FAF6F0] border border-slate-200 focus:border-[#cca43b] rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-700 font-medium font-mono"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-xs uppercase font-bold tracking-wider text-slate-600">Celebration Category</label>
                              <select 
                                value={eventType}
                                onChange={(e) => setEventType(e.target.value)}
                                className="w-full bg-[#FAF6F0] border border-slate-200 focus:border-[#cca43b] rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-700 font-medium"
                              >
                                <option>Wedding Celebration</option>
                                <option>Thematic Birthday Celebration</option>
                                <option>Corporate Award Gala</option>
                                <option>Intimate Engagement Party</option>
                                <option>Makeover & Hair trials</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs uppercase font-bold tracking-wider text-slate-600">Milestone Date</label>
                              <input 
                                type="date" 
                                required
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                                className="w-full bg-[#FAF6F0] border border-slate-200 focus:border-[#cca43b] rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-700 font-mono"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-xs uppercase font-bold tracking-wider text-slate-600">Estimated Budget</label>
                              <select
                                value={approxBudget}
                                onChange={(e) => setApproxBudget(e.target.value)}
                                className="w-full bg-[#FAF6F0] border border-slate-200 focus:border-[#cca43b] rounded-xl px-4 py-3 text-sm focus:outline-none"
                              >
                                <option>Basic Tier</option>
                                <option>Premium Tier</option>
                                <option>Luxury Royalty Tier</option>
                              </select>
                            </div>

                            <div className="space-y-2">
                              <label className="text-xs uppercase font-bold tracking-wider text-slate-600">Est. Guest Count</label>
                              <input 
                                type="number" 
                                min="1"
                                value={guestCountInput}
                                onChange={(e) => setGuestCountInput(Number(e.target.value))}
                                className="w-full bg-[#FAF6F0] border border-slate-200 focus:border-[#cca43b] rounded-xl px-4 py-3 text-sm focus:outline-none font-mono"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs uppercase font-bold tracking-wider text-slate-600 block">Specific Requirements, Styling Preferences or Makeup request</label>
                            <textarea 
                              rows={4}
                              value={specialReq}
                              onChange={(e) => setSpecialReq(e.target.value)}
                              placeholder="Please describe stage heights, floristry visions, or facial cosmetic styles you desire..."
                              className="w-full bg-[#FAF6F0] border border-slate-200 focus:border-[#cca43b] rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-700 font-medium"
                            ></textarea>
                          </div>

                          <div className="pt-4">
                            <button 
                              type="submit"
                              disabled={bookingLoading}
                              className="w-full py-4 bg-[#1e0b36] hover:bg-[#2d1250] text-[#FAF6F0] border border-amber-300/20 font-bold uppercase text-xs tracking-widest rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                              id="booking_form_submit_btn"
                            >
                              {bookingLoading ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin text-[#cca43b]" />
                                  Cataloguing Slot...
                                </>
                              ) : (
                                <>
                                  <Check className="w-4 h-4 text-[#cca43b]" />
                                  Submit Prestige Reservation
                                </>
                              )}
                            </button>
                          </div>
                        </>
                      )}
                    </form>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FAQs Panel */}
      <section className="bg-white py-12 border-t border-amber-100" id="faqs_accordion">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#cca43b]">Clear Understanding</span>
            <h3 className="font-serif text-2xl font-bold text-[#1e0b36]">Frequently Inquired Logistics</h3>
          </div>

          <div className="space-y-4">
            {FAQS_DATA.map((faq, index) => (
              <div key={index} className="bg-[#FAF6F0] p-5 rounded-2xl border border-amber-150 shadow-sm">
                <span className="font-serif font-bold text-sm text-[#1e0b36] block">{faq.q}</span>
                <p className="text-slate-600 text-xs mt-2 font-light leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prestige Footer */}
      <footer className="bg-slate-950 text-[#FAF6F0] py-16 border-t border-amber-400/20" id="global_prestige_footer">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1 Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#1e0b36] p-2 rounded-lg border border-amber-400">
                <Sparkles className="w-4 h-4 text-[#cca43b]" />
              </div>
              <div>
                <span className="font-serif font-bold tracking-widest text-lg">AURA</span>
                <span className="block text-[8px] tracking-widest text-[#cca43b] uppercase font-bold text-center mt-0.5">Luxury Core</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 font-light leading-relaxed">
              Synthesizing elite staging architecture with high-fashion cosmetic artistry into a single flawless masterpiece.
            </p>
          </div>

          {/* Col 2 Quick navigation links */}
          <div className="space-y-2">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#cca43b]">Aura Navigations</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {['home', 'services', 'packages', 'gallery', 'about'].map((lnk) => (
                <li key={lnk}>
                  <button onClick={() => setActiveTab(lnk)} className="hover:text-[#cca43b] transition-colors cursor-pointer text-left block">
                    {lnk.toUpperCase()} Selection
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 Services overview list */}
          <div className="space-y-2">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#cca43b]">Signature Deliverables</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Royal Weddings Staging</li>
              <li>Elite Airbrush Makeovers</li>
              <li>Global Keynote summits</li>
              <li>Pre-Staging trial makeup</li>
              <li>Couture Tiara anchor lines</li>
            </ul>
          </div>

          {/* Col 4 Newsletter subscription */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#cca43b]">Prestige Dispatch</h4>
              <p className="text-[10px] text-slate-400">Sign up to receive invitations to elite bridal showcases.</p>
            </div>

            {newsletterSubscribed ? (
              <span className="block text-xs text-emerald-400 font-bold">Thank you, check inbox soon.</span>
            ) : (
              <div className="flex bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="name@luxury.com"
                  className="bg-transparent text-xs px-3 focus:outline-none flex-grow"
                />
                <button 
                  onClick={() => {
                    if (newsletterEmail.includes("@")) {
                      setNewsletterSubscribed(true);
                    }
                  }}
                  className="bg-[#cca43b] text-slate-950 px-4 py-2 hover:bg-yellow-500 text-[10px] font-bold uppercase transition-colors"
                >
                  Join
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-slate-900 text-center text-[10px] text-slate-500 tracking-wider flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© 2026 Aura Event & Makeover Inc. All sovereign rights reserved.</span>
          <div className="flex gap-4">
            <span className="hover:text-[#cca43b] cursor-pointer">Sovereign Terms of Service</span>
            <span className="hover:text-[#cca43b] cursor-pointer">Privacy Charter</span>
          </div>
        </div>
      </footer>

      {/* FLOATING COLLAPSIBLE LIVE AI ASSISTANT "AURA" */}
      <div className="fixed bottom-6 right-6 z-40" id="aura_assistant_widget_anchor">
        <button 
          onClick={() => setIsAuraOpen(!isAuraOpen)}
          className="relative group bg-[#1e0b36] hover:bg-[#2d1250] text-[#FAF6F0] border border-amber-300 p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-transform duration-300 active:scale-95"
          id="btn_aura_widget_toggle"
        >
          {/* Notification bubble if unopened */}
          {!isAuraOpen && (
            <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-slate-950 text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce border-2 border-slate-950">
              1
            </span>
          )}
          <MessageSquare className="w-6 h-6 text-[#cca43b]" />
        </button>

        {/* Aura Dialogue panel */}
        <AnimatePresence>
          {isAuraOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-3xl border-2 border-amber-300 shadow-2xl overflow-hidden flex flex-col h-[450px]"
              id="aura_chat_dialogue_panel"
            >
              {/* Box Header */}
              <div className="bg-[#1e0b36] p-4 text-[#FAF6F0] flex items-center justify-between border-b border-amber-300/30">
                <div className="flex items-center gap-2">
                  <div className="bg-amber-150/10 p-1.5 rounded-full">
                    <Sparkles className="w-5 h-5 text-[#cca43b] animate-spin" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-sm tracking-wide block">AURA Coordinator</span>
                    <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest block font-mono">Senior Live Advisor</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAuraOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10 text-slate-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-[#FAF6F0]" id="aura_conversation_viewport">
                {chatMessages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`p-3.5 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-[#1e0b36] text-[#FAF6F0] rounded-tr-none border border-amber-300/10' 
                        : 'bg-white text-slate-700 rounded-tl-none border border-amber-150-50'
                    }`}>
                      {msg.content}
                    </div>
                    <span className="text-[8px] text-slate-400 font-mono mt-1 px-1">{msg.timestamp}</span>
                  </div>
                ))}

                {chatLoading && (
                  <div className="flex items-center gap-2 text-xs text-[#cca43b] italic">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Aura is drafting layout suggestions...</span>
                  </div>
                )}
              </div>

              {/* Bottom sending input form */}
              <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
                <input 
                  type="text" 
                  value={userChatInput}
                  onChange={(e) => setUserChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendAuraMessage()}
                  placeholder="Ask Aura about styles or packages..."
                  className="w-full bg-[#FAF6F0] rounded-xl px-4 py-2 text-xs focus:outline-none text-slate-700"
                />
                <button 
                  onClick={handleSendAuraMessage}
                  className="bg-[#1e0b36] text-[#cca43b] p-2.5 rounded-xl hover:bg-[#2d1250] transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

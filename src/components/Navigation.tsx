import React, { useState } from "react";
import { Sparkles, Menu, X, PhoneCall, CalendarDays, Compass, ChevronDown, PartyPopper, Palette } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  servicesCategoryFilter?: "all" | "event" | "makeover";
  setServicesCategoryFilter?: (filter: "all" | "event" | "makeover") => void;
}

export default function Navigation({ 
  activeTab, 
  setActiveTab,
  servicesCategoryFilter = "all",
  setServicesCategoryFilter
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "packages", label: "Packages" },
    { id: "gallery", label: "Gallery" },
    { id: "customize", label: "AI Planner" },
    { id: "about", label: "About Us" },
    { id: "booking", label: "Booking" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#FAF6F0]/90 backdrop-blur-md border-b border-amber-100/35 px-4 md:px-8 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo Header */}
        <button 
          onClick={() => setActiveTab("home")}
          className="flex items-center gap-2.5 group text-left focus:outline-none"
          id="nav_brand_title"
        >
          <div className="bg-[#1e0b36] p-2 rounded-lg border border-amber-300/30 group-hover:border-amber-400/80 transition-all duration-300 shadow-md">
            <Sparkles className="w-5 h-5 text-[#cca43b] group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div>
            <h1 className="font-serif text-lg md:text-xl font-bold tracking-wider text-[#1e0b36] flex items-center gap-1.5 leading-none">
              AURA
            </h1>
            <p className="text-[9px] md:text-[10px] tracking-widest text-[#cca43b] font-medium uppercase mt-0.5">
              Event & Makeover Studio
            </p>
          </div>
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => {
            if (item.id === "services") {
              return (
                <div 
                  key={item.id}
                  className="relative group"
                  onMouseEnter={() => setIsServicesDropdownOpen(true)}
                  onMouseLeave={() => setIsServicesDropdownOpen(false)}
                >
                  <button
                    onClick={() => {
                      setActiveTab("services");
                      if (setServicesCategoryFilter) setServicesCategoryFilter("all");
                    }}
                    className={`relative px-4 py-2 text-xs uppercase tracking-widest font-medium transition-all duration-300 rounded-md focus:outline-none cursor-pointer flex items-center gap-1 group ${
                      activeTab === "services" 
                        ? "text-[#cca43b]" 
                        : "text-slate-600 hover:text-[#1e0b36] hover:bg-[#1e0b36]/5"
                    }`}
                    id="nav_tab_services"
                  >
                    <span className="relative z-10 flex items-center gap-1.5 font-semibold">
                      {item.label}
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180 text-amber-500/80" />
                    </span>
                    {activeTab === "services" && (
                      <motion.div
                        layoutId="activeNavBubble"
                        className="absolute inset-0 bg-[#1e0b36]/5 border border-[#cca43b]/20 rounded-md -z-0"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>

                  {/* Dropdown with high-end premium sub tabs styling */}
                  <AnimatePresence>
                    {isServicesDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 -translate-x-1/2 mt-1.5 w-52 bg-[#FAF6F0] rounded-2xl border border-amber-200/50 shadow-xl overflow-hidden py-2 z-50 flex flex-col gap-1 ring-4 ring-[#1e0b36]/5"
                      >
                        <button
                          onClick={() => {
                            setActiveTab("services");
                            if (setServicesCategoryFilter) setServicesCategoryFilter("all");
                            setIsServicesDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold transition-all duration-200 flex items-center gap-2.5 ${
                            activeTab === "services" && servicesCategoryFilter === "all"
                              ? "bg-[#1e0b36]/10 text-[#8a6a24] border-l-2 border-amber-500"
                              : "text-slate-600 hover:bg-[#1e0b36]/5 hover:text-[#1e0b36] hover:translate-x-1 duration-200"
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          All Services
                        </button>
                        <button
                          onClick={() => {
                            setActiveTab("services");
                            if (setServicesCategoryFilter) setServicesCategoryFilter("event");
                            setIsServicesDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold transition-all duration-200 flex items-center gap-2.5 ${
                            activeTab === "services" && servicesCategoryFilter === "event"
                              ? "bg-[#1e0b36]/10 text-[#8a6a24] border-l-2 border-amber-500"
                              : "text-slate-600 hover:bg-[#1e0b36]/5 hover:text-[#1e0b36] hover:translate-x-1 duration-200"
                          }`}
                        >
                          <PartyPopper className="w-3.5 h-3.5 text-amber-500" />
                          Event Services
                        </button>
                        <button
                          onClick={() => {
                            setActiveTab("services");
                            if (setServicesCategoryFilter) setServicesCategoryFilter("makeover");
                            setIsServicesDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold transition-all duration-200 flex items-center gap-2.5 ${
                            activeTab === "services" && servicesCategoryFilter === "makeover"
                              ? "bg-[#1e0b36]/10 text-[#8a6a24] border-l-2 border-amber-500"
                              : "text-slate-600 hover:bg-[#1e0b36]/5 hover:text-[#1e0b36] hover:translate-x-1 duration-200"
                          }`}
                        >
                          <Palette className="w-3.5 h-3.5 text-amber-500" />
                          Beauty Services
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-4 py-2 text-xs uppercase tracking-widest font-medium transition-all duration-300 rounded-md focus:outline-none cursor-pointer ${
                  activeTab === item.id 
                    ? "text-[#cca43b]" 
                    : "text-slate-600 hover:text-[#1e0b36] hover:bg-[#1e0b36]/5"
                }`}
                id={`nav_tab_${item.id}`}
              >
                <span className="relative z-10">{item.label}</span>
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeNavBubble"
                    className="absolute inset-0 bg-[#1e0b36]/5 border border-[#cca43b]/20 rounded-md -z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setActiveTab("customize")}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest text-slate-800 bg-amber-50 border border-amber-200/60 hover:border-[#cca43b] hover:bg-amber-100/40 transition-all duration-300 focus:outline-none shadow-sm cursor-pointer"
            id="nav_cta_customize"
          >
            <Compass className="w-4 h-4 text-[#cca43b]" />
            Bespoke Customizer
          </button>
          <button
            onClick={() => setActiveTab("booking")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#FAF6F0] bg-[#1e0b36] hover:bg-[#2d1250] border border-amber-300/20 hover:border-amber-400/40 transition-all duration-300 focus:outline-none shadow-md cursor-pointer"
            id="nav_cta_booking"
          >
            <CalendarDays className="w-4 h-4 text-[#cca43b]" />
            Book Now
          </button>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-[#1e0b36] hover:text-[#cca43b] transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-amber-200 rounded-md"
          aria-label="Toggle navigation menu"
          id="nav_mobile_toggle"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden mt-4 overflow-hidden border-t border-amber-100/20 bg-[#FAF6F0]"
            id="nav_mobile_drawer"
          >
            <div className="flex flex-col gap-2 py-4 px-2">
              {navItems.map((item) => (
                <React.Fragment key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      if (item.id === "services" && setServicesCategoryFilter) {
                        setServicesCategoryFilter("all");
                      }
                      setIsOpen(false);
                    }}
                    className={`w-full text-left py-3 px-4 rounded-lg uppercase text-xs tracking-widest font-semibold transition-all duration-200 flex items-center justify-between ${
                      activeTab === item.id 
                        ? "bg-[#1e0b36] text-[#cca43b] border border-amber-300/20" 
                        : "text-slate-700 hover:bg-[#1e0b36]/5 hover:text-[#1e0b36]"
                    }`}
                    id={`nav_mobile_tab_${item.id}`}
                  >
                    <span>{item.label}</span>
                  </button>

                  {/* Indented mobile sub-tabs for Services event service & beauty service */}
                  {item.id === "services" && (
                    <div className="ml-4 pl-3 border-l-2 border-amber-200/50 flex flex-col gap-1.5 mt-1.5 mb-2.5">
                      <button
                        onClick={() => {
                          setActiveTab("services");
                          if (setServicesCategoryFilter) setServicesCategoryFilter("event");
                          setIsOpen(false);
                        }}
                        className={`w-full text-left py-2 px-3 rounded-lg text-[10px] uppercase tracking-widest font-bold transition-all duration-200 flex items-center gap-2 ${
                          activeTab === "services" && servicesCategoryFilter === "event"
                            ? "bg-amber-100/60 text-[#8a6a24] border border-amber-200"
                            : "text-slate-600 hover:bg-[#1e0b36]/5 hover:text-[#1e0b36]"
                        }`}
                      >
                        <PartyPopper className="w-3.5 h-3.5 text-[#cca43b]" />
                        Event Services
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab("services");
                          if (setServicesCategoryFilter) setServicesCategoryFilter("makeover");
                          setIsOpen(false);
                        }}
                        className={`w-full text-left py-2 px-3 rounded-lg text-[10px] uppercase tracking-widest font-bold transition-all duration-200 flex items-center gap-2 ${
                          activeTab === "services" && servicesCategoryFilter === "makeover"
                            ? "bg-amber-100/60 text-[#8a6a24] border border-amber-200"
                            : "text-slate-600 hover:bg-[#1e0b36]/5 hover:text-[#1e0b36]"
                        }`}
                      >
                        <Palette className="w-3.5 h-3.5 text-[#cca43b]" />
                        Beauty Services
                      </button>
                    </div>
                  )}
                </React.Fragment>
              ))}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-amber-100/40">
                <button
                  onClick={() => {
                    setActiveTab("customize");
                    setIsOpen(false);
                  }}
                  className="py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider text-center border border-amber-200 bg-amber-50 text-slate-800"
                  id="nav_mobile_cta_customize"
                >
                  Custom AI
                </button>
                <button
                  onClick={() => {
                    setActiveTab("booking");
                    setIsOpen(false);
                  }}
                  className="py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider text-center bg-[#1e0b36] text-[#FAF6F0] border border-amber-300/20"
                  id="nav_mobile_cta_booking"
                >
                  Book Slot
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

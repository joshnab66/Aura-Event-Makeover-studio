import React from "react";
import { Sparkles, Award, Star, ShieldCheck } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeLabel = "Bare Complexion (Before)",
  afterLabel = "Prestige HD Airbrush (After)"
}: BeforeAfterSliderProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] uppercase font-semibold tracking-widest bg-amber-50 text-[#8a6a24] border border-amber-200">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive Makeover Transformation
        </span>
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1e0b36] mt-2">
          Bridal HD Transformation
        </h3>
        <p className="text-slate-500 text-xs md:text-sm max-w-lg mt-1.5 mx-auto leading-relaxed">
          Witness the magnificent change from natural elegance to majestic starlight with our signature prestige airbrush cosmetic artistry.
        </p>
      </div>

      <div 
        className="relative w-full max-w-4xl overflow-hidden rounded-3xl border-2 border-amber-200/60 shadow-2xl bg-white select-none group"
        id="makeover_before_after_container"
      >
        {/* Main magnificent showcase image */}
        <div className="relative w-full h-[350px] md:h-[550px] overflow-hidden">
          <img 
            src="https://files.catbox.moe/cjdrm7.png" 
            alt="Prestige Bridal HD Makeover" 
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
          />
          
          {/* Elegant luxury overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e0b36]/90 via-transparent to-transparent opacity-85"></div>
          
          {/* Top badges */}
          <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
            <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-[9px] uppercase tracking-wider font-extrabold backdrop-blur-md shadow-sm">
              Prestige HD Glow
            </span>
          </div>

          <div className="absolute top-4 right-4">
            <div className="bg-[#1e0b36]/90 border border-amber-400/40 text-amber-300 px-3.5 py-1.5 rounded-full text-[9px] uppercase tracking-widest font-extrabold backdrop-blur-md shadow-md flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Aisha Al-Jamil Signature
            </div>
          </div>

          {/* Bottom detail card */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1 md:max-w-md bg-[#1e0b36]/90 p-5 rounded-2xl border border-amber-300/15 backdrop-blur-md shadow-lg">
              <span className="text-[#cca43b] text-[9px] tracking-widest uppercase font-extrabold flex items-center gap-1">
                <Star className="w-3 h-3 fill-current text-amber-400" /> Made for High-definition camera lenses
              </span>
              <h4 className="font-serif text-lg font-bold text-[#FAF6F0]">Couture Airbrush Bridal Transformation</h4>
              <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                Expertly harmonized using premium light-reflective minerals, designed to project flawlessly under dynamic venue light frequencies.
              </p>
            </div>
            
            {/* Luxe Features pill-box */}
            <div className="flex gap-2 flex-wrap bg-[#1e0b36]/80 p-3 rounded-2xl backdrop-blur-md border border-amber-300/15">
              <div className="flex items-center gap-1 text-[10px] text-slate-200 font-semibold px-2 py-1 bg-amber-500/10 rounded border border-amber-500/20">
                <ShieldCheck className="w-3 h-3 text-amber-400" /> HD Airbrush Prep
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-200 font-semibold px-2 py-1 bg-amber-500/10 rounded border border-amber-500/20">
                <ShieldCheck className="w-3 h-3 text-amber-400" /> Flawless 16Hr Wear
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

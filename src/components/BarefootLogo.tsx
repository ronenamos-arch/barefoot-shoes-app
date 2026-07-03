import React, { useState } from "react";

interface BarefootLogoProps {
  variant?: "full" | "header" | "icon" | "seal-only";
  className?: string;
  size?: number;
}

export function BarefootLogo({
  variant = "full",
  className = "",
  size,
}: BarefootLogoProps) {
  const [hasFullError, setHasFullError] = useState(false);
  const [hasSealError, setHasSealError] = useState(false);
  
  // Custom styled CSS to make sure images look crisp on high-res screens
  const imageStyle: React.CSSProperties = {
    height: "auto",
    maxWidth: "100%",
    objectFit: "contain",
  };

  // 1. PURE SEAL LOGO SVG (Shoe, concentric circles, olive branch) - NO curved text
  const renderPureSeal = (customSize: number) => (
    <div 
      className="flex items-center justify-center relative shrink-0" 
      style={{ width: customSize, height: customSize }}
    >
      <svg 
        viewBox="0 0 200 200" 
        className="w-full h-full text-[#bca374]"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Concentric circles (Double outer, single inner dotted) */}
        <path d="M 124,154 C 145,142 158,118 152,82 C 149,60 138,42 126,28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Double concentric outer frames that open on the right for the leaves */}
        <path d="M 134,46 A 76,76 0 1,0 128,148" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 138,41 A 81,81 0 1,0 132,153" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        
        {/* Inner dotted circle framing the shoe */}
        <circle cx="94" cy="100" r="48" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.45" />

        {/* Flexible Barefoot Shoe/Sneaker Detail */}
        <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Outsole / Sole */}
          <path d="M 66,124 C 57,125 46,121 40,116 C 34,111 32,103 36,97 C 39,93 45,89 52,83 C 61,77 71,71 81,71 C 87,71 91,75 91,82 C 91,89 88,98 81,106 C 75,114 71,121 66,124 Z" strokeWidth="2.8" />
          
          {/* Undersole tread line */}
          <path d="M 37,100 C 41,105 49,110 58,111 C 66,112 74,107 79,101 C 84,95 87,89 88,83" opacity="0.5" strokeWidth="1.5" />
          
          {/* Toe cap curve */}
          <path d="M 36,97 C 38,95 42,93 46,93" strokeWidth="1.5" />
          
          {/* Collar / Opening */}
          <path d="M 76,71 C 78,66 82,67 85,71 C 87,74 85,78 82,80" />
          
          {/* Heel pull loop */}
          <path d="M 83,68 C 85,64 89,66 87,70" strokeWidth="1.5" />
          
          {/* Side overlay / barefoot swoop design */}
          <path d="M 51,89 C 58,85 66,85 72,77 C 76,73 78,75 79,80 C 79,84 74,93 68,98 C 62,103 55,105 51,89 Z" fill="currentColor" fillOpacity="0.08" strokeWidth="1.5" />
          
          {/* Laces parallel stripes */}
          <path d="M 55,81 L 61,79" strokeWidth="1.8" />
          <path d="M 59,77 L 65,75" strokeWidth="1.8" />
          <path d="M 63,73 L 69,71" strokeWidth="1.8" />
        </g>

        {/* Olive Branch curving on the right */}
        <g stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Leaves (filled with a beautiful soft gold color) */}
          {/* Leaf 1 (top) */}
          <path d="M 126,28 C 132,18 144,14 148,18 C 144,25 133,27 126,28 Z" fill="currentColor" fillOpacity="0.9" strokeWidth="1.2" />
          {/* Leaf 2 */}
          <path d="M 134,44 C 143,36 153,34 156,38 C 150,44 141,45 134,44 Z" fill="currentColor" fillOpacity="0.9" strokeWidth="1.2" />
          {/* Leaf 3 */}
          <path d="M 142,62 C 153,56 162,56 163,61 C 157,67 148,67 142,62 Z" fill="currentColor" fillOpacity="0.9" strokeWidth="1.2" />
          {/* Leaf 4 */}
          <path d="M 146,82 C 156,82 163,88 161,93 C 154,94 148,89 146,82 Z" fill="currentColor" fillOpacity="0.9" strokeWidth="1.2" />
          {/* Leaf 5 */}
          <path d="M 141,104 C 150,111 152,120 148,124 C 143,121 141,112 141,104 Z" fill="currentColor" fillOpacity="0.9" strokeWidth="1.2" />
          {/* Leaf 6 */}
          <path d="M 132,126 C 139,135 138,144 134,147 C 131,142 131,133 132,126 Z" fill="currentColor" fillOpacity="0.9" strokeWidth="1.2" />
          
          {/* Olive fruit */}
          <ellipse cx="147" cy="72" rx="3.5" ry="5" transform="rotate(25 147 72)" fill="currentColor" />
        </g>
      </svg>
    </div>
  );

  // 2. COMPLETE CIRCULAR SEAL (Badge layout) - WITH curved text inside
  const renderCompleteCircularSeal = (customSize: number) => (
    <div 
      className="flex items-center justify-center relative shrink-0" 
      style={{ width: customSize, height: customSize }}
    >
      <svg 
        viewBox="0 0 200 200" 
        className="w-full h-full text-[#bca374]"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Top arc path for "barefoot" curved text (starts left, goes over the top, ends right) */}
          <path id="barefoot-arc" d="M 44,88 A 58,58 0 0,1 156,88" fill="none" />
          
          {/* Bottom arc path for tagline (curves from right to left so text is upright) */}
          <path id="tagline-arc" d="M 158,110 A 61,61 0 0,1 42,110" fill="none" />
        </defs>

        {/* Concentric circles (Double outer, single inner dotted) */}
        <path d="M 124,154 C 145,142 158,118 152,82 C 149,60 138,42 126,28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 134,46 A 76,76 0 1,0 128,148" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 138,41 A 81,81 0 1,0 132,153" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        
        {/* Inner dotted circle framing the shoe */}
        <circle cx="94" cy="100" r="48" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.45" />

        {/* Shoe */}
        <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 66,124 C 57,125 46,121 40,116 C 34,111 32,103 36,97 C 39,93 45,89 52,83 C 61,77 71,71 81,71 C 87,71 91,75 91,82 C 91,89 88,98 81,106 C 75,114 71,121 66,124 Z" strokeWidth="2.8" />
          <path d="M 37,100 C 41,105 49,110 58,111 C 66,112 74,107 79,101 C 84,95 87,89 88,83" opacity="0.5" strokeWidth="1.5" />
          <path d="M 36,97 C 38,95 42,93 46,93" strokeWidth="1.5" />
          <path d="M 76,71 C 78,66 82,67 85,71 C 87,74 85,78 82,80" />
          <path d="M 83,68 C 85,64 89,66 87,70" strokeWidth="1.5" />
          <path d="M 51,89 C 58,85 66,85 72,77 C 76,73 78,75 79,80 C 79,84 74,93 68,98 C 62,103 55,105 51,89 Z" fill="currentColor" fillOpacity="0.08" strokeWidth="1.5" />
          <path d="M 55,81 L 61,79" strokeWidth="1.8" />
          <path d="M 59,77 L 65,75" strokeWidth="1.8" />
          <path d="M 63,73 L 69,71" strokeWidth="1.8" />
        </g>

        {/* Leaves */}
        <g stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 126,28 C 132,18 144,14 148,18 C 144,25 133,27 126,28 Z" fill="currentColor" fillOpacity="0.9" strokeWidth="1.2" />
          <path d="M 134,44 C 143,36 153,34 156,38 C 150,44 141,45 134,44 Z" fill="currentColor" fillOpacity="0.9" strokeWidth="1.2" />
          <path d="M 142,62 C 153,56 162,56 163,61 C 157,67 148,67 142,62 Z" fill="currentColor" fillOpacity="0.9" strokeWidth="1.2" />
          <path d="M 146,82 C 156,82 163,88 161,93 C 154,94 148,89 146,82 Z" fill="currentColor" fillOpacity="0.9" strokeWidth="1.2" />
          <path d="M 141,104 C 150,111 152,120 148,124 C 143,121 141,112 141,104 Z" fill="currentColor" fillOpacity="0.9" strokeWidth="1.2" />
          <path d="M 132,126 C 139,135 138,144 134,147 C 131,142 131,133 132,126 Z" fill="currentColor" fillOpacity="0.9" strokeWidth="1.2" />
          <ellipse cx="147" cy="72" rx="3.5" ry="5" transform="rotate(25 147 72)" fill="currentColor" />
        </g>

        {/* Curved text "barefoot" at top */}
        <text className="select-none fill-[#bca374]">
          <textPath 
            href="#barefoot-arc" 
            startOffset="50%" 
            textAnchor="middle" 
            className="font-sans font-bold text-[18px] tracking-[0.08em]"
            style={{ fontSize: "16.5px", fontWeight: 800, fill: "#bca374", letterSpacing: "0.14em" }}
          >
            barefoot
          </textPath>
        </text>

        {/* Curved text "natural comfort & freedom" at bottom */}
        <text className="select-none fill-[#bca374]">
          <textPath 
            href="#tagline-arc" 
            startOffset="50%" 
            textAnchor="middle" 
            className="font-sans text-[7.5px] tracking-[0.05em]"
            style={{ fontSize: "7.2px", fontWeight: 500, fill: "#bca374", letterSpacing: "0.06em" }}
          >
            natural comfort & freedom
          </textPath>
        </text>

        {/* Est. 2026 text */}
        <text 
          x="94" 
          y="162" 
          textAnchor="middle" 
          className="font-sans font-bold text-[7px] tracking-wider fill-[#bca374] opacity-80 select-none"
          style={{ fontSize: "7px", fontWeight: 600, fill: "#bca374" }}
        >
          Est. 2026
        </text>
      </svg>
    </div>
  );

  // If they just want the circular seal with no texts (clean)
  if (variant === "seal-only") {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {!hasSealError ? (
          <img
            src="/logo_seal.png"
            alt="Barefoot Seal"
            style={{ ...imageStyle, width: size || 80 }}
            className="select-none pointer-events-none"
            referrerPolicy="no-referrer"
            onError={() => setHasSealError(true)}
          />
        ) : (
          renderPureSeal(size || 80)
        )}
      </div>
    );
  }

  // If they want the round badge icon
  if (variant === "icon") {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {!hasSealError ? (
          <img
            src="/logo_seal.png"
            alt="Barefoot Badge"
            style={{ ...imageStyle, width: size || 80 }}
            className="select-none pointer-events-none"
            referrerPolicy="no-referrer"
            onError={() => setHasSealError(true)}
          />
        ) : (
          renderCompleteCircularSeal(size || 80)
        )}
      </div>
    );
  }

  // Header layout (Horizontal wide logo)
  if (variant === "header") {
    // We want it to be wide and clear, with height constrained to keep the header compact.
    // Let's use logo_full.png, which is the horizontal wide logo!
    // Fallback to the horizontal text + seal layout if image fails.
    const customHeight = size ? Math.min(size * 0.4, 60) : 52; 
    return (
      <div className={`flex items-center justify-center select-none ${className}`}>
        {!hasFullError ? (
          <img
            src="/logo_full.png"
            alt="Barefoot Logo"
            style={{ ...imageStyle, height: customHeight, width: "auto" }}
            className="select-none pointer-events-none transition-transform hover:scale-102 duration-300 max-h-[64px]"
            referrerPolicy="no-referrer"
            onError={() => setHasFullError(true)}
          />
        ) : (
          // Horizontal fallback: text on the left, seal on the right
          <div className="flex items-center gap-3" dir="rtl">
            {renderPureSeal(44)}
            <div className="flex flex-col select-none justify-center text-right">
              <span 
                className="font-serif text-[22px] font-semibold text-[#bca374] tracking-[0.02em] lowercase leading-none"
                style={{ fontFamily: "Georgia, serif" }}
              >
                barefoot
              </span>
              <span 
                className="text-[9px] tracking-wider text-slate-350 font-bold mt-1 uppercase"
              >
                natural comfort & freedom
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Large horizontal presentation or main center branding (Image 1)
  // variant === "full"
  const defaultFullSize = size || 110;
  return (
    <div className={`flex flex-col md:flex-row items-center gap-5 justify-center py-4 select-none ${className}`} dir="rtl">
      {!hasFullError ? (
        <div className="flex items-center justify-center max-w-full">
          <img
            src="/logo_full.png"
            alt="Barefoot Logo"
            style={{ ...imageStyle, width: size ? size * 2.5 : 280 }}
            className="select-none pointer-events-none"
            referrerPolicy="no-referrer"
            onError={() => setHasFullError(true)}
          />
        </div>
      ) : (
        <div className="flex items-center gap-5 justify-center" dir="rtl">
          {/* Pure design seal on the right */}
          {renderPureSeal(defaultFullSize)}

          {/* Brand Text on the left of the seal */}
          <div className="flex flex-col select-none justify-center text-right border-r border-[#1a4b35]/40 pr-5 py-1">
            <h1 
              className="font-serif text-4xl md:text-5xl font-light text-[#bca374] tracking-[0.02em] lowercase leading-none mb-1.5"
              style={{ fontFamily: "Georgia, serif" }}
            >
              barefoot
            </h1>
            
            {/* Subtitle with decorative lines */}
            <div className="flex items-center gap-2 mt-1">
              <span className="h-[1px] bg-[#bca374]/35 w-6 shrink-0"></span>
              <span className="text-xs md:text-sm font-sans font-medium text-slate-300 tracking-wide lowercase whitespace-nowrap">
                natural comfort & freedom
              </span>
              <span className="h-[1px] bg-[#bca374]/35 w-6 shrink-0"></span>
            </div>

            {/* Est. 2026 */}
            <span className="text-[10px] md:text-xs text-slate-400 tracking-wider mt-1.5 font-mono">
              Est. 2026
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

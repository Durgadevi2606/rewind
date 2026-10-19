import React from 'react';

/**
 * Authentic Candy Crush Saga GameTile Entities
 * - Handcrafted high-gloss vector SVGs matching Candy Crush Saga's signature aesthetic
 */

// 1. Red Jelly Bean Candy (Candy Crush Classic Red Candy)
export function RedJellyBean() {
  return (
    <div className="candy-sprite red-jelly-bean" title="Delicious Red Jelly Bean">
      <svg viewBox="0 0 44 44" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="redBeanGrad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFA4B8" />
            <stop offset="25%" stopColor="#FF2F66" />
            <stop offset="70%" stopColor="#D9043C" />
            <stop offset="100%" stopColor="#8A0022" />
          </radialGradient>
          <linearGradient id="redBeanShine" x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <filter id="candyGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#400010" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Soft Drop Shadow */}
        <ellipse cx="22" cy="38" rx="14" ry="4" fill="rgba(20, 5, 10, 0.35)" />

        {/* Bean Body */}
        <path
          d="M14 12 C10 16 8 26 14 32 C18 36 26 36 31 31 C37 25 36 15 28 11 C22 8 18 8 14 12 Z"
          fill="url(#redBeanGrad)"
          filter="url(#candyGlow)"
        />

        {/* 3D Glossy Edge Rim */}
        <path
          d="M14 12 C10 16 8 26 14 32 C18 36 26 36 31 31 C37 25 36 15 28 11 C22 8 18 8 14 12 Z"
          stroke="#FFAEC0"
          strokeWidth="1"
          opacity="0.6"
        />

        {/* Signature Candy Crush Curved White Reflection */}
        <path
          d="M15 15 C13 18 12 25 15 29 C16 30 17 28 17 25 C16 20 18 16 22 14 C23 13 20 12 15 15 Z"
          fill="url(#redBeanShine)"
        />
        <ellipse cx="27" cy="15" rx="3.5" ry="2" transform="rotate(-20 27 15)" fill="rgba(255,255,255,0.7)" />
        <circle cx="21" cy="28" r="1.5" fill="rgba(255,255,255,0.4)" />
      </svg>
    </div>
  );
}

// 2. Yellow Lemon Drop (Candy Crush Round Lemon Candy)
export function YellowLemonDrop() {
  return (
    <div className="candy-sprite yellow-lemon-drop" title="Lemon Drop Candy">
      <svg viewBox="0 0 44 44" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="lemonGrad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFFFA6" />
            <stop offset="30%" stopColor="#FFE01A" />
            <stop offset="75%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </radialGradient>
          <radialGradient id="lemonShine" cx="30%" cy="25%" r="40%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="22" cy="38" rx="14" ry="4" fill="rgba(40, 20, 0, 0.35)" />

        {/* Round candy body */}
        <circle cx="22" cy="22" r="15" fill="url(#lemonGrad)" />
        <circle cx="22" cy="22" r="15" stroke="#FFE97D" strokeWidth="1" opacity="0.7" />

        {/* Top curved glare */}
        <ellipse cx="18" cy="16" rx="7" ry="4" transform="rotate(-30 18 16)" fill="url(#lemonShine)" />
        <circle cx="27" cy="26" r="2" fill="rgba(255,255,255,0.5)" />
      </svg>
    </div>
  );
}

// 3. Orange Lozenge (Candy Crush Oval Orange Candy)
export function OrangeLozenge() {
  return (
    <div className="candy-sprite orange-lozenge" title="Sweet Orange Lozenge">
      <svg viewBox="0 0 44 44" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="orangeGrad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFE0B2" />
            <stop offset="25%" stopColor="#FF9800" />
            <stop offset="70%" stopColor="#F57C00" />
            <stop offset="100%" stopColor="#C43E00" />
          </radialGradient>
        </defs>
        <ellipse cx="22" cy="38" rx="15" ry="4" fill="rgba(40, 15, 0, 0.35)" />
        <ellipse cx="22" cy="22" rx="16" ry="11" fill="url(#orangeGrad)" />
        <ellipse cx="22" cy="22" rx="16" ry="11" stroke="#FFCC80" strokeWidth="1" opacity="0.6" />
        <ellipse cx="19" cy="17" rx="8" ry="3.5" transform="rotate(-15 19 17)" fill="rgba(255,255,255,0.75)" />
      </svg>
    </div>
  );
}

// 4. MemoryFragment wrapper: displays a random or id-based delicious Candy Crush candy
export function MemoryFragment({ id = 'c1' }) {
  // c1 gets Red Jelly Bean, c2 gets Yellow Lemon Drop, others get Orange Lozenge
  if (id === 'c2') {
    return (
      <div className="entity-fragment">
        <YellowLemonDrop />
      </div>
    );
  }
  return (
    <div className="entity-fragment">
      <RedJellyBean />
    </div>
  );
}

// 5. Pushable Pedestal -> Candy Crush WRAPPED CANDY (Glossy striped candy with wrapper twists)
export function PushablePedestal() {
  return (
    <div className="entity-pushable candy-crush-wrapped" title="Wrapped Candy Booster (Pushable)">
      <svg viewBox="0 0 48 48" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="wrappedBodyGrad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#FFAEC0" />
            <stop offset="35%" stopColor="#FF2A5F" />
            <stop offset="75%" stopColor="#C40030" />
            <stop offset="100%" stopColor="#690018" />
          </radialGradient>
          <linearGradient id="wrapperTwistLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF0F5" />
            <stop offset="50%" stopColor="#FF85B1" />
            <stop offset="100%" stopColor="#C40030" />
          </linearGradient>
          <linearGradient id="wrapperTwistRight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF0F5" />
            <stop offset="50%" stopColor="#FF85B1" />
            <stop offset="100%" stopColor="#C40030" />
          </linearGradient>
        </defs>

        {/* Drop shadow */}
        <ellipse cx="24" cy="42" rx="18" ry="4" fill="rgba(25, 5, 10, 0.45)" />

        {/* Left Wrapper Twist */}
        <path
          d="M14 24 L2 14 C1 13 1 20 2 24 C3 28 1 35 2 34 L14 24 Z"
          fill="url(#wrapperTwistLeft)"
          stroke="#FFE0E8"
          strokeWidth="0.8"
        />

        {/* Right Wrapper Twist */}
        <path
          d="M34 24 L46 14 C47 13 47 20 46 24 C45 28 47 35 46 34 L34 24 Z"
          fill="url(#wrapperTwistRight)"
          stroke="#FFE0E8"
          strokeWidth="0.8"
        />

        {/* Main Wrapped Candy Square/Pillow */}
        <rect
          x="10"
          y="12"
          width="28"
          height="24"
          rx="8"
          fill="url(#wrappedBodyGrad)"
          stroke="#FFE5EC"
          strokeWidth="1.2"
        />

        {/* Iconic White Sugar Stripes */}
        <path d="M12 18 Q24 22 36 18" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="3" strokeLinecap="round" />
        <path d="M12 24 Q24 28 36 24" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="3" strokeLinecap="round" />
        <path d="M14 30 Q24 34 34 30" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="3" strokeLinecap="round" />

        {/* Shiny corner flare */}
        <ellipse cx="18" cy="16" rx="4" ry="2" fill="rgba(255,255,255,0.85)" />
      </svg>
    </div>
  );
}

// 6. Pressure Plate -> Candy Crush Golden Waffle / Cookie Button
export function PressureSwitch({ active = false }) {
  return (
    <div className={`entity-switch candy-switch ${active ? 'active' : ''}`} title="Waffle Switch">
      <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="waffleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={active ? '#48D626' : '#FFD966'} />
            <stop offset="50%" stopColor={active ? '#2FB310' : '#F59E0B'} />
            <stop offset="100%" stopColor={active ? '#1B6608' : '#B45309'} />
          </linearGradient>
        </defs>

        {/* Waffle base */}
        <rect x="4" y="4" width="28" height="28" rx="8" fill="url(#waffleGrad)" stroke="#FFFFFF" strokeWidth="1.5" />

        {/* Waffle grid grooves */}
        <line x1="13" y1="6" x2="13" y2="30" stroke={active ? '#1B6608' : '#78350F'} strokeWidth="1.5" />
        <line x1="23" y1="6" x2="23" y2="30" stroke={active ? '#1B6608' : '#78350F'} strokeWidth="1.5" />
        <line x1="6" y1="13" x2="30" y2="13" stroke={active ? '#1B6608' : '#78350F'} strokeWidth="1.5" />
        <line x1="6" y1="23" x2="30" y2="23" stroke={active ? '#1B6608' : '#78350F'} strokeWidth="1.5" />

        {/* Rainbow Sprinkles on switch */}
        <rect x="7" y="7" width="3" height="3" rx="1" fill="#FF1E56" />
        <rect x="17" y="7" width="3" height="3" rx="1" fill="#00C2FF" />
        <rect x="26" y="17" width="3" height="3" rx="1" fill="#FFF" />
        <rect x="17" y="26" width="3" height="3" rx="1" fill="#FF8400" />
      </svg>
    </div>
  );
}

// 7. Vine Gate -> Peppermint Candy Cane Barrier
export function VineGate({ open = false }) {
  return (
    <div className={`entity-gate candy-cane-gate ${open ? 'open' : 'closed'}`} title="Peppermint Gate">
      <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        {open ? (
          /* Opened / Melted state */
          <g opacity="0.3">
            <rect x="6" y="28" width="24" height="6" rx="3" fill="#FF477E" />
            <circle cx="12" cy="31" r="2" fill="white" />
            <circle cx="24" cy="31" r="2" fill="white" />
          </g>
        ) : (
          /* Closed peppermint bars */
          <g>
            {/* 3 Striped Peppermint Candy Bars */}
            <rect x="7" y="4" width="6" height="28" rx="3" fill="#FFFFFF" stroke="#C40030" strokeWidth="1" />
            <rect x="15" y="4" width="6" height="28" rx="3" fill="#FFFFFF" stroke="#C40030" strokeWidth="1" />
            <rect x="23" y="4" width="6" height="28" rx="3" fill="#FFFFFF" stroke="#C40030" strokeWidth="1" />

            {/* Peppermint Diagonal Red Stripes */}
            <path d="M7 8 L13 12 M7 16 L13 20 M7 24 L13 28" stroke="#E60039" strokeWidth="2.5" />
            <path d="M15 8 L21 12 M15 16 L21 20 M15 24 L21 28" stroke="#E60039" strokeWidth="2.5" />
            <path d="M23 8 L29 12 M23 16 L29 20 M23 24 L29 28" stroke="#E60039" strokeWidth="2.5" />

            {/* Crossbar lock */}
            <rect x="4" y="15" width="28" height="6" rx="3" fill="#FFC400" stroke="#7A4200" strokeWidth="1" />
            <circle cx="18" cy="18" r="2" fill="#7A4200" />
          </g>
        )}
      </svg>
    </div>
  );
}

// 8. Exit Portal -> Candy Crush Giant Rainbow Swirl Lollipop (The Goal!)
export function ExitPortal({ active = false }) {
  return (
    <div className={`entity-portal candy-lollipop-portal ${active ? 'portal-active' : 'portal-dormant'}`} title="Rainbow Sugar Portal">
      <svg viewBox="0 0 48 48" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="portalGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE600" stopOpacity={active ? 0.8 : 0.2} />
            <stop offset="50%" stopColor="#FF1E56" stopOpacity={active ? 0.5 : 0.1} />
            <stop offset="100%" stopColor="#00C2FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Pulsing Aura */}
        <circle cx="24" cy="22" r="20" fill="url(#portalGlow)" className={active ? 'pulse-aura' : ''} />

        {/* Lollipop Stick */}
        <rect x="22" y="28" width="4" height="18" rx="2" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="0.8" />

        {/* Rainbow Swirl Lollipop Head */}
        <g className={active ? 'spinning-lollipop' : ''}>
          {/* Base Circle */}
          <circle cx="24" cy="20" r="16" fill="#FF2A5F" stroke="#FFFFFF" strokeWidth="1.5" />

          {/* Rainbow Pinwheel Spirals */}
          <path d="M24 20 L24 4 A16 16 0 0 1 36 9 Z" fill="#FFA500" />
          <path d="M24 20 L36 9 A16 16 0 0 1 40 20 Z" fill="#FFEB3B" />
          <path d="M24 20 L40 20 A16 16 0 0 1 36 31 Z" fill="#4CAF50" />
          <path d="M24 20 L36 31 A16 16 0 0 1 24 36 Z" fill="#00BCD4" />
          <path d="M24 20 L24 36 A16 16 0 0 1 12 31 Z" fill="#2196F3" />
          <path d="M24 20 L12 31 A16 16 0 0 1 8 20 Z" fill="#9C27B0" />
          <path d="M24 20 L8 20 A16 16 0 0 1 12 9 Z" fill="#E91E63" />

          {/* Center sugar core */}
          <circle cx="24" cy="20" r="4.5" fill="#FFFFFF" />
          <circle cx="24" cy="20" r="2.5" fill="#FF2A5F" />

          {/* Glossy sheen */}
          <ellipse cx="19" cy="14" rx="6" ry="3" transform="rotate(-30 19 14)" fill="rgba(255,255,255,0.75)" />
        </g>

        {/* Golden Stars when Active */}
        {active && (
          <>
            <polygon points="10,8 11.5,12 15,12 12,14 13,18 10,15 7,18 8,14 5,12 8.5,12" fill="#FFDF00" />
            <polygon points="38,10 39,13 42,13 39.5,15 40.5,18 38,16 35.5,18 36.5,15 34,13 37,13" fill="#FFDF00" />
          </>
        )}
      </svg>
    </div>
  );
}

// 9. Rewind Trace -> Sugar Sprinkles / Footprints
export function RewindTrace() {
  return (
    <div className="entity-trace sugar-dust-trace" aria-hidden="true">
      <svg viewBox="0 0 20 20" width="100%" height="100%">
        <circle cx="7" cy="8" r="2.5" fill="#FF85B1" opacity="0.65" />
        <circle cx="13" cy="12" r="2" fill="#FFE066" opacity="0.65" />
        <circle cx="10" cy="15" r="1.5" fill="#5CD9D4" opacity="0.6" />
      </svg>
    </div>
  );
}

import React from 'react';

/**
 * Character Component: Candy Crush Mascot "Tiffi Candy Buddy"
 * 
 * An iconic, high-gloss, adorable Candy Crush character with
 * shiny candy hat, large sparkling eyes, rosy cheeks, yellow candy bowtie,
 * and responsive directional sprites.
 */
export function Character({ facing = 'down', isMoving = false }) {
  return (
    <div className={`character-sprite cc-mascot facing-${facing} ${isMoving ? 'is-moving' : ''}`}>
      <svg viewBox="0 0 52 52" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="mascotHeadGrad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFE8D6" />
            <stop offset="65%" stopColor="#FFCBB2" />
            <stop offset="100%" stopColor="#E59877" />
          </radialGradient>
          <radialGradient id="candyCheekGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF477E" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#FF477E" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF5277" />
            <stop offset="50%" stopColor="#D9043C" />
            <stop offset="100%" stopColor="#8A0022" />
          </linearGradient>
          <linearGradient id="bowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF275" />
            <stop offset="100%" stopColor="#E5A100" />
          </linearGradient>
        </defs>

        {/* Soft Drop Shadow under feet */}
        <ellipse cx="26" cy="48" rx="16" ry="3.5" fill="rgba(30, 10, 5, 0.4)" />

        {/* FACING DOWN (FRONT) */}
        {facing === 'down' && (
          <g>
            {/* Candy Hair Tuft / Ears */}
            <circle cx="13" cy="24" r="5" fill="#C43800" />
            <circle cx="39" cy="24" r="5" fill="#C43800" />

            {/* Head */}
            <circle cx="26" cy="27" r="16" fill="url(#mascotHeadGrad)" stroke="#B36545" strokeWidth="1" />

            {/* Rosy Blush Cheeks */}
            <circle cx="17" cy="31" r="4.5" fill="url(#candyCheekGrad)" />
            <circle cx="35" cy="31" r="4.5" fill="url(#candyCheekGrad)" />

            {/* Big Sparkly Cartoon Eyes */}
            <ellipse cx="20" cy="25" rx="3.5" ry="4.2" fill="#2E1505" />
            <ellipse cx="32" cy="25" rx="3.5" ry="4.2" fill="#2E1505" />
            {/* Primary Catchlights */}
            <circle cx="21.5" cy="23.5" r="1.6" fill="#FFFFFF" />
            <circle cx="33.5" cy="23.5" r="1.6" fill="#FFFFFF" />
            {/* Secondary Catchlights */}
            <circle cx="19" cy="26.5" r="0.8" fill="#FFFFFF" opacity="0.8" />
            <circle cx="31" cy="26.5" r="0.8" fill="#FFFFFF" opacity="0.8" />

            {/* Happy Candy Smile */}
            <path d="M22 32 Q26 36 30 32" stroke="#661D00" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <circle cx="26" cy="34" r="1.2" fill="#FF477E" />

            {/* Candy Chef / Crown Hat */}
            <path d="M16 16 C16 9 20 6 26 6 C32 6 36 9 36 16 Z" fill="url(#hatGrad)" stroke="#690018" strokeWidth="1" />
            <ellipse cx="26" cy="16" rx="11" ry="2.5" fill="#FF7B99" />
            {/* White icing puff on hat */}
            <circle cx="26" cy="5" r="3" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.8" />

            {/* Yellow Candy Bowtie */}
            <polygon points="21,41 26,43 21,45" fill="url(#bowGrad)" stroke="#996000" strokeWidth="0.8" />
            <polygon points="31,41 26,43 31,45" fill="url(#bowGrad)" stroke="#996000" strokeWidth="0.8" />
            <circle cx="26" cy="43" r="2.2" fill="#FFE500" stroke="#996000" strokeWidth="0.8" />
          </g>
        )}

        {/* FACING UP (BACK) */}
        {facing === 'up' && (
          <g>
            <circle cx="13" cy="24" r="5" fill="#C43800" />
            <circle cx="39" cy="24" r="5" fill="#C43800" />
            <circle cx="26" cy="27" r="16" fill="#C43800" />
            {/* Hat from back */}
            <path d="M16 16 C16 9 20 6 26 6 C32 6 36 9 36 16 Z" fill="url(#hatGrad)" stroke="#690018" strokeWidth="1" />
            <ellipse cx="26" cy="16" rx="11" ry="2.5" fill="#FF7B99" />
            <circle cx="26" cy="5" r="3" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.8" />
            {/* Back collar */}
            <path d="M21 41 Q26 44 31 41" stroke="#FF7B99" strokeWidth="3" fill="none" />
          </g>
        )}

        {/* FACING LEFT */}
        {facing === 'left' && (
          <g>
            <circle cx="36" cy="24" r="5" fill="#C43800" />
            <circle cx="25" cy="27" r="16" fill="url(#mascotHeadGrad)" stroke="#B36545" strokeWidth="1" />
            <circle cx="16" cy="31" r="4.5" fill="url(#candyCheekGrad)" />
            {/* Eye looking left */}
            <ellipse cx="18" cy="25" rx="3.5" ry="4.2" fill="#2E1505" />
            <circle cx="17" cy="23.5" r="1.6" fill="#FFFFFF" />
            <circle cx="19" cy="26.5" r="0.8" fill="#FFFFFF" opacity="0.8" />
            <path d="M18 32 Q22 35 25 32" stroke="#661D00" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            {/* Hat */}
            <path d="M15 16 C15 9 19 6 25 6 C31 6 35 9 35 16 Z" fill="url(#hatGrad)" stroke="#690018" strokeWidth="1" />
            <ellipse cx="25" cy="16" rx="11" ry="2.5" fill="#FF7B99" />
            <circle cx="25" cy="5" r="3" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.8" />
            {/* Side bow */}
            <polygon points="20,41 25,43 20,45" fill="url(#bowGrad)" stroke="#996000" strokeWidth="0.8" />
            <circle cx="25" cy="43" r="2.2" fill="#FFE500" stroke="#996000" strokeWidth="0.8" />
          </g>
        )}

        {/* FACING RIGHT */}
        {facing === 'right' && (
          <g>
            <circle cx="16" cy="24" r="5" fill="#C43800" />
            <circle cx="27" cy="27" r="16" fill="url(#mascotHeadGrad)" stroke="#B36545" strokeWidth="1" />
            <circle cx="36" cy="31" r="4.5" fill="url(#candyCheekGrad)" />
            {/* Eye looking right */}
            <ellipse cx="34" cy="25" rx="3.5" ry="4.2" fill="#2E1505" />
            <circle cx="35" cy="23.5" r="1.6" fill="#FFFFFF" />
            <circle cx="33" cy="26.5" r="0.8" fill="#FFFFFF" opacity="0.8" />
            <path d="M27 32 Q30 35 34 32" stroke="#661D00" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            {/* Hat */}
            <path d="M17 16 C17 9 21 6 27 6 C33 6 37 9 37 16 Z" fill="url(#hatGrad)" stroke="#690018" strokeWidth="1" />
            <ellipse cx="27" cy="16" rx="11" ry="2.5" fill="#FF7B99" />
            <circle cx="27" cy="5" r="3" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.8" />
            {/* Side bow */}
            <polygon points="32,41 27,43 32,45" fill="url(#bowGrad)" stroke="#996000" strokeWidth="0.8" />
            <circle cx="27" cy="43" r="2.2" fill="#FFE500" stroke="#996000" strokeWidth="0.8" />
          </g>
        )}
      </svg>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';

// Helper Components - defined outside main component
const Squiggle = ({ color = '#E07A5F', width = 100 }) => (
  <svg width={width} height="12" viewBox="0 0 100 12" fill="none" style={{ display: 'block' }}>
    <path 
      d="M2 6C12 2 18 10 28 6C38 2 44 10 54 6C64 2 70 10 80 6C90 2 96 10 98 6" 
      stroke={color} 
      strokeWidth="3" 
      strokeLinecap="round"
    />
  </svg>
);

const KawaiiCoconut = () => (
  <svg width="90" height="95" viewBox="0 0 90 95" fill="none">
    <path d="M45 28 Q25 10 15 20" stroke="#5B8C5A" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M45 26 Q45 5 45 15" stroke="#6B9B6A" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M45 28 Q65 10 75 20" stroke="#5B8C5A" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M45 27 Q32 12 25 18" stroke="#7BAB7A" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M45 27 Q58 12 65 18" stroke="#7BAB7A" strokeWidth="2" strokeLinecap="round" fill="none" />
    <ellipse cx="45" cy="58" rx="35" ry="32" fill="#C4956A" />
    <ellipse cx="45" cy="55" rx="32" ry="29" fill="#D4A574" />
    <ellipse cx="32" cy="52" rx="5" ry="6" fill="#4A3728" />
    <ellipse cx="58" cy="52" rx="5" ry="6" fill="#4A3728" />
    <circle cx="34" cy="50" r="2" fill="white" />
    <circle cx="60" cy="50" r="2" fill="white" />
    <ellipse cx="22" cy="60" rx="6" ry="4" fill="#FFB4A2" opacity="0.5" />
    <ellipse cx="68" cy="60" rx="6" ry="4" fill="#FFB4A2" opacity="0.5" />
    <path d="M38 65 Q45 72 52 65" stroke="#4A3728" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <text x="72" y="30" fontSize="12">✨</text>
  </svg>
);

const KawaiiFace = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
    <circle cx="30" cy="30" r="28" fill="#FFE5D9" stroke="#E07A5F" strokeWidth="2" />
    <circle cx="20" cy="25" r="4" fill="#3D2914" />
    <circle cx="40" cy="25" r="4" fill="#3D2914" />
    <circle cx="22" cy="24" r="1.5" fill="white" />
    <circle cx="42" cy="24" r="1.5" fill="white" />
    <ellipse cx="15" cy="32" rx="5" ry="3" fill="#FFB4A2" opacity="0.6" />
    <ellipse cx="45" cy="32" rx="5" ry="3" fill="#FFB4A2" opacity="0.6" />
    <path d="M24 38 Q30 44 36 38" stroke="#3D2914" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

const ConstructionCone = () => (
  <svg width="40" height="50" viewBox="0 0 40 50" fill="none">
    <path d="M20 5 L35 45 H5 Z" fill="#FF8C42" stroke="#E07A5F" strokeWidth="2" />
    <rect x="8" y="20" width="24" height="4" fill="white" />
    <rect x="10" y="30" width="20" height="4" fill="white" />
  </svg>
);

const BUBBLES_DATA = [
  { size: 12, left: 15, bottom: 8, duration: 4.2, delay: 0.3 },
  { size: 18, left: 32, bottom: 22, duration: 5.1, delay: 1.1 },
  { size: 10, left: 48, bottom: 5, duration: 3.8, delay: 0.7 },
  { size: 22, left: 65, bottom: 18, duration: 4.9, delay: 1.5 },
  { size: 14, left: 78, bottom: 12, duration: 4.4, delay: 0.2 },
  { size: 16, left: 25, bottom: 28, duration: 5.5, delay: 1.8 },
  { size: 11, left: 55, bottom: 15, duration: 3.5, delay: 0.9 },
  { size: 20, left: 85, bottom: 25, duration: 4.7, delay: 1.3 },
  { size: 13, left: 40, bottom: 10, duration: 4.0, delay: 0.5 },
  { size: 17, left: 70, bottom: 20, duration: 5.2, delay: 1.6 },
  { size: 9, left: 20, bottom: 6, duration: 3.6, delay: 0.4 },
  { size: 15, left: 60, bottom: 24, duration: 4.8, delay: 1.0 },
];

const BubblingMolecules = () => (
  <div className="absolute inset-0 overflow-hidden">
    {BUBBLES_DATA.map((bubble, i) => (
      <div
        key={i}
        className="absolute rounded-full"
        style={{
          width: `${bubble.size}px`,
          height: `${bubble.size}px`,
          background: ['#81B29A', '#E07A5F', '#F2CC8F', '#3D405B'][i % 4],
          left: `${bubble.left}%`,
          bottom: `${bubble.bottom}%`,
          opacity: 0.7,
          animation: `bubble ${bubble.duration}s ease-in-out ${bubble.delay}s infinite`
        }}
      />
    ))}
  </div>
);

// Starry Night Background Component
const STARS_DATA = [
  { size: 2, top: 5, left: 10, duration: 3, delay: 0 },
  { size: 1, top: 12, left: 25, duration: 4, delay: 0.5 },
  { size: 3, top: 8, left: 45, duration: 2.5, delay: 1 },
  { size: 1, top: 20, left: 60, duration: 3.5, delay: 0.3 },
  { size: 2, top: 15, left: 80, duration: 4, delay: 0.8 },
  { size: 1, top: 25, left: 15, duration: 3, delay: 1.2 },
  { size: 2, top: 30, left: 35, duration: 2.8, delay: 0.2 },
  { size: 3, top: 22, left: 55, duration: 3.2, delay: 0.7 },
  { size: 1, top: 35, left: 75, duration: 4.2, delay: 1.5 },
  { size: 2, top: 40, left: 90, duration: 3.8, delay: 0.4 },
  { size: 1, top: 45, left: 5, duration: 3, delay: 0.9 },
  { size: 2, top: 50, left: 20, duration: 2.6, delay: 1.1 },
  { size: 3, top: 42, left: 40, duration: 3.5, delay: 0.6 },
  { size: 1, top: 55, left: 65, duration: 4, delay: 1.3 },
  { size: 2, top: 48, left: 85, duration: 2.9, delay: 0.1 },
  { size: 1, top: 60, left: 12, duration: 3.3, delay: 0.8 },
  { size: 2, top: 65, left: 30, duration: 4.1, delay: 1.4 },
  { size: 1, top: 58, left: 50, duration: 3, delay: 0.5 },
  { size: 3, top: 70, left: 70, duration: 2.7, delay: 1 },
  { size: 2, top: 62, left: 88, duration: 3.6, delay: 0.3 },
  { size: 1, top: 75, left: 8, duration: 4, delay: 0.7 },
  { size: 2, top: 80, left: 22, duration: 3.2, delay: 1.2 },
  { size: 1, top: 72, left: 42, duration: 2.8, delay: 0.4 },
  { size: 3, top: 85, left: 58, duration: 3.4, delay: 0.9 },
  { size: 2, top: 78, left: 78, duration: 4.2, delay: 1.6 },
  { size: 1, top: 90, left: 18, duration: 3, delay: 0.2 },
  { size: 2, top: 88, left: 48, duration: 3.8, delay: 1.1 },
  { size: 1, top: 95, left: 68, duration: 2.5, delay: 0.6 },
  { size: 2, top: 92, left: 92, duration: 3.5, delay: 1.4 },
  { size: 3, top: 3, left: 70, duration: 4, delay: 0.8 },
];

// Borderlands-style Mountain Range - Smoother curves with trees
const MountainRange = ({ darkMode }) => (
  <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ zIndex: 1 }}>
    {/* Far mountains - gentle rolling hills */}
    <svg className="absolute bottom-0 w-full" height="250" viewBox="0 0 1440 250" preserveAspectRatio="none">
      <path 
        d="M0 250 L0 160 Q60 145 120 155 Q180 165 240 140 Q320 105 400 130 Q480 155 560 115 Q640 75 720 100 Q800 125 880 95 Q960 65 1040 85 Q1120 105 1200 80 Q1280 55 1360 75 Q1400 90 1440 100 L1440 250 Z" 
        fill={darkMode ? '#1a1a3e' : '#7BA3A3'}
        stroke={darkMode ? '#2a2a5a' : '#5A8282'}
        strokeWidth="3"
      />
    </svg>
    
    {/* Mid mountains with trees */}
    <svg className="absolute bottom-0 w-full" height="200" viewBox="0 0 1440 200" preserveAspectRatio="none">
      <path 
        d="M0 200 L0 130 Q80 145 160 115 Q240 85 320 110 Q400 135 480 95 Q560 55 640 80 Q720 105 800 70 Q880 35 960 60 Q1040 85 1120 55 Q1200 25 1280 50 Q1360 75 1440 60 L1440 200 Z" 
        fill={darkMode ? '#12122a' : '#5A8282'}
        stroke={darkMode ? '#1a1a3e' : '#3D6363'}
        strokeWidth="4"
      />
      {/* Abstract trees - triangular pines */}
      <g fill={darkMode ? '#0a1a0a' : '#2A4A30'} stroke={darkMode ? '#1a2a1a' : '#1A3A20'} strokeWidth="2">
        <path d="M200 130 L210 95 L220 130 Z" />
        <path d="M215 130 L225 100 L235 130 Z" />
        <path d="M400 110 L412 70 L424 110 Z" />
        <path d="M418 110 L428 80 L438 110 Z" />
        <path d="M700 85 L712 50 L724 85 Z" />
        <path d="M715 85 L725 55 L735 85 Z" />
        <path d="M730 85 L740 60 L750 85 Z" />
        <path d="M1000 75 L1012 40 L1024 75 Z" />
        <path d="M1015 75 L1025 45 L1035 75 Z" />
        <path d="M1250 65 L1262 30 L1274 65 Z" />
        <path d="M1268 65 L1278 38 L1288 65 Z" />
      </g>
      {/* Tree highlight strokes */}
      <g fill={darkMode ? '#1a3a1a' : '#3D6040'}>
        <path d="M205 120 L210 100 L215 120 Z" />
        <path d="M405 100 L412 78 L419 100 Z" />
        <path d="M705 75 L712 58 L719 75 Z" />
        <path d="M1005 65 L1012 48 L1019 65 Z" />
        <path d="M1255 55 L1262 38 L1269 55 Z" />
      </g>
    </svg>
    
    {/* Near mountains with more trees */}
    <svg className="absolute bottom-0 w-full" height="150" viewBox="0 0 1440 150" preserveAspectRatio="none">
      <path 
        d="M0 150 L0 100 Q80 115 160 85 Q240 55 320 80 Q400 105 480 70 Q560 35 640 55 Q720 75 800 45 Q880 15 960 40 Q1040 65 1120 35 Q1200 5 1280 30 Q1360 55 1440 40 L1440 150 Z" 
        fill={darkMode ? '#0a0a1a' : '#3D6363'}
        stroke={darkMode ? '#12122a' : '#2A4A4A'}
        strokeWidth="5"
      />
      {/* Closer, larger trees */}
      <g fill={darkMode ? '#050a05' : '#1A3A20'} stroke={darkMode ? '#0a1a0a' : '#0A2A10'} strokeWidth="3">
        <path d="M100 100 L118 50 L136 100 Z" />
        <path d="M125 100 L140 60 L155 100 Z" />
        <path d="M300 80 L320 30 L340 80 Z" />
        <path d="M330 80 L345 45 L360 80 Z" />
        <path d="M550 60 L570 15 L590 60 Z" />
        <path d="M575 60 L590 25 L605 60 Z" />
        <path d="M600 60 L612 30 L624 60 Z" />
        <path d="M850 55 L870 10 L890 55 Z" />
        <path d="M875 55 L890 20 L905 55 Z" />
        <path d="M1100 50 L1120 5 L1140 50 Z" />
        <path d="M1125 50 L1140 15 L1155 50 Z" />
        <path d="M1150 50 L1162 22 L1174 50 Z" />
        <path d="M1350 55 L1368 15 L1386 55 Z" />
        <path d="M1372 55 L1385 25 L1398 55 Z" />
      </g>
      {/* Tree highlights */}
      <g fill={darkMode ? '#0a1a0a' : '#2A4A30'}>
        <path d="M108 90 L118 58 L128 90 Z" />
        <path d="M310 70 L320 40 L330 70 Z" />
        <path d="M560 50 L570 25 L580 50 Z" />
        <path d="M860 45 L870 20 L880 45 Z" />
        <path d="M1110 40 L1120 15 L1130 40 Z" />
        <path d="M1358 45 L1368 22 L1378 45 Z" />
      </g>
    </svg>
  </div>
);

// Borderlands-style Islands with Palm Trees - Enhanced shading
const IslandScene = ({ darkMode, opacity }) => (
  <div 
    className="absolute bottom-0 left-0 right-0 pointer-events-none transition-opacity duration-500" 
    style={{ zIndex: 1, opacity }}
  >
    {/* Ocean with gradient layers */}
    <div 
      className="absolute bottom-0 left-0 right-0 h-40"
      style={{
        background: darkMode 
          ? 'linear-gradient(180deg, #0a1a2a 0%, #071520 50%, #051015 100%)'
          : 'linear-gradient(180deg, #5BA3B5 0%, #3D8A9C 40%, #2D6B7A 100%)',
      }}
    />
    {/* Ocean highlight line */}
    <div 
      className="absolute left-0 right-0 h-1"
      style={{
        bottom: '160px',
        background: darkMode ? '#1a4a5a' : '#7BC3D5',
        opacity: 0.6
      }}
    />
    
    {/* Far island - left */}
    <svg className="absolute bottom-28 left-[8%]" width="220" height="130" viewBox="0 0 220 130">
      {/* Island base with gradient */}
      <defs>
        <linearGradient id="islandGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={darkMode ? '#2a4a3a' : '#D4A574'} />
          <stop offset="100%" stopColor={darkMode ? '#1a3a2a' : '#A07A5A'} />
        </linearGradient>
      </defs>
      <ellipse cx="110" cy="110" rx="100" ry="20" fill="url(#islandGrad1)" stroke={darkMode ? '#3a5a4a' : '#8B6344'} strokeWidth="4" />
      {/* Sand highlight */}
      <ellipse cx="110" cy="105" rx="80" ry="12" fill={darkMode ? '#3a5a4a' : '#E8C49A'} opacity="0.4" />
      
      {/* Palm tree trunk with shading */}
      <path d="M100 110 Q95 70 100 35" stroke={darkMode ? '#1a2a1a' : '#4A3020'} strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M103 110 Q98 70 103 38" stroke={darkMode ? '#2a3a2a' : '#6B5040'} strokeWidth="3" fill="none" strokeLinecap="round" />
      
      {/* Palm leaves with gradients and bold outlines */}
      <path d="M100 40 Q60 25 45 45" stroke={darkMode ? '#1a3a1a' : '#3D6030'} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M100 40 Q65 30 55 45" stroke={darkMode ? '#3a6a4a' : '#5B8C4A'} strokeWidth="3" fill="none" strokeLinecap="round" />
      
      <path d="M100 38 Q100 10 85 20" stroke={darkMode ? '#1a3a1a' : '#3D6030'} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M100 38 Q100 15 90 22" stroke={darkMode ? '#3a6a4a' : '#6B9B5A'} strokeWidth="3" fill="none" strokeLinecap="round" />
      
      <path d="M100 40 Q140 25 155 45" stroke={darkMode ? '#1a3a1a' : '#3D6030'} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M100 40 Q135 30 145 45" stroke={darkMode ? '#3a6a4a' : '#5B8C4A'} strokeWidth="3" fill="none" strokeLinecap="round" />
      
      <path d="M100 38 Q115 15 130 25" stroke={darkMode ? '#1a3a1a' : '#3D6030'} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M100 38 Q112 18 125 27" stroke={darkMode ? '#3a6a4a' : '#6B9B5A'} strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
    
    {/* Main island - right with multiple palm trees */}
    <svg className="absolute bottom-24 right-[10%]" width="400" height="200" viewBox="0 0 400 200">
      <defs>
        <linearGradient id="islandGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={darkMode ? '#2a4a3a' : '#D4A574'} />
          <stop offset="50%" stopColor={darkMode ? '#1a3a2a' : '#C4956A'} />
          <stop offset="100%" stopColor={darkMode ? '#0a2a1a' : '#A07A5A'} />
        </linearGradient>
        <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={darkMode ? '#1a2a1a' : '#3D2510'} />
          <stop offset="50%" stopColor={darkMode ? '#2a3a2a' : '#6B5040'} />
          <stop offset="100%" stopColor={darkMode ? '#1a2a1a' : '#4A3020'} />
        </linearGradient>
      </defs>
      
      {/* Island base */}
      <ellipse cx="200" cy="175" rx="180" ry="30" fill="url(#islandGrad2)" stroke={darkMode ? '#3a5a4a' : '#8B6344'} strokeWidth="5" />
      {/* Sand highlight stripe */}
      <ellipse cx="200" cy="168" rx="150" ry="18" fill={darkMode ? '#3a5a4a' : '#E8C49A'} opacity="0.5" />
      {/* Shadow on sand */}
      <ellipse cx="180" cy="178" rx="60" ry="8" fill={darkMode ? '#0a1a0a' : '#8B6344'} opacity="0.3" />
      
      {/* Big palm tree */}
      <path d="M160 175 Q150 110 165 50" stroke={darkMode ? '#0a1a0a' : '#2A1808'} strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M160 175 Q150 110 165 50" stroke="url(#trunkGrad)" strokeWidth="8" fill="none" strokeLinecap="round" />
      {/* Trunk texture lines */}
      <path d="M155 140 L170 138" stroke={darkMode ? '#0a1a0a' : '#2A1808'} strokeWidth="2" opacity="0.5" />
      <path d="M154 120 L172 117" stroke={darkMode ? '#0a1a0a' : '#2A1808'} strokeWidth="2" opacity="0.5" />
      <path d="M156 100 L173 97" stroke={darkMode ? '#0a1a0a' : '#2A1808'} strokeWidth="2" opacity="0.5" />
      <path d="M160 80 L174 77" stroke={darkMode ? '#0a1a0a' : '#2A1808'} strokeWidth="2" opacity="0.5" />
      
      {/* Big palm leaves */}
      <path d="M165 55 Q100 30 70 55" stroke={darkMode ? '#0a2a0a' : '#2A4A20'} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M165 55 Q110 35 85 55" stroke={darkMode ? '#2a5a2a' : '#4A7A40'} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M165 55 Q115 40 95 55" stroke={darkMode ? '#4a7a4a' : '#6B9B5A'} strokeWidth="2" fill="none" strokeLinecap="round" />
      
      <path d="M165 52 Q150 10 125 25" stroke={darkMode ? '#0a2a0a' : '#2A4A20'} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M165 52 Q152 18 135 28" stroke={darkMode ? '#2a5a2a' : '#4A7A40'} strokeWidth="4" fill="none" strokeLinecap="round" />
      
      <path d="M165 55 Q220 30 250 55" stroke={darkMode ? '#0a2a0a' : '#2A4A20'} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M165 55 Q210 35 235 55" stroke={darkMode ? '#2a5a2a' : '#4A7A40'} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M165 55 Q205 40 225 55" stroke={darkMode ? '#4a7a4a' : '#6B9B5A'} strokeWidth="2" fill="none" strokeLinecap="round" />
      
      <path d="M165 52 Q190 15 210 30" stroke={darkMode ? '#0a2a0a' : '#2A4A20'} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M165 52 Q185 20 200 32" stroke={darkMode ? '#2a5a2a' : '#4A7A40'} strokeWidth="4" fill="none" strokeLinecap="round" />
      
      <path d="M165 48 Q165 5 155 15" stroke={darkMode ? '#0a2a0a' : '#2A4A20'} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M165 48 Q165 12 158 18" stroke={darkMode ? '#3a6a3a' : '#5B8C4A'} strokeWidth="3" fill="none" strokeLinecap="round" />
      
      {/* Small palm tree */}
      <path d="M280 175 Q285 130 282 95" stroke={darkMode ? '#0a1a0a' : '#2A1808'} strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M280 175 Q285 130 282 95" stroke={darkMode ? '#2a3a2a' : '#5D4030'} strokeWidth="5" fill="none" strokeLinecap="round" />
      
      <path d="M282 100 Q250 85 235 100" stroke={darkMode ? '#0a2a0a' : '#2A4A20'} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M282 100 Q255 88 245 100" stroke={darkMode ? '#3a6a3a' : '#5B8C4A'} strokeWidth="3" fill="none" strokeLinecap="round" />
      
      <path d="M282 100 Q310 85 325 100" stroke={darkMode ? '#0a2a0a' : '#2A4A20'} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M282 100 Q305 88 315 100" stroke={darkMode ? '#3a6a3a' : '#5B8C4A'} strokeWidth="3" fill="none" strokeLinecap="round" />
      
      <path d="M282 97 Q282 70 275 78" stroke={darkMode ? '#0a2a0a' : '#2A4A20'} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M282 97 Q282 75 278 80" stroke={darkMode ? '#4a7a4a' : '#6B9B5A'} strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
    
    {/* Small rock with detail */}
    <svg className="absolute bottom-20 left-[42%]" width="100" height="70" viewBox="0 0 100 70">
      <defs>
        <linearGradient id="rockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={darkMode ? '#2a3a3a' : '#9B8370'} />
          <stop offset="100%" stopColor={darkMode ? '#1a2a2a' : '#7B6350'} />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="55" rx="45" ry="15" fill="url(#rockGrad)" stroke={darkMode ? '#3a4a4a' : '#5D4037'} strokeWidth="4" />
      <ellipse cx="50" cy="50" rx="35" ry="8" fill={darkMode ? '#3a4a4a' : '#B8A090'} opacity="0.4" />
    </svg>
  </div>
);

// Borderlands-style Sun
const BorderlandsSun = () => (
  <div 
    className="absolute"
    style={{
      top: '8%',
      right: '12%',
      width: '80px',
      height: '80px',
    }}
  >
    {/* Rays with bold outlines */}
    <div 
      className="absolute inset-0"
      style={{ animation: 'spin 30s linear infinite' }}
    >
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
            width: '6px',
            height: '25px',
            background: '#FFD700',
            border: '2px solid #CC9900',
            transformOrigin: 'center -20px',
            transform: `rotate(${i * 30}deg) translateY(-40px)`,
            borderRadius: '3px',
          }}
        />
      ))}
    </div>
    
    {/* Sun body with bold outline */}
    <div 
      className="absolute rounded-full"
      style={{
        top: '10px',
        left: '10px',
        width: '60px',
        height: '60px',
        background: 'linear-gradient(135deg, #FFE87C 0%, #FFD700 50%, #FFA500 100%)',
        border: '4px solid #CC8800',
        boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)',
      }}
    >
      {/* Kawaii face with bold lines */}
      <div className="absolute rounded-full" style={{ width: '8px', height: '10px', background: '#CC6600', top: '18px', left: '16px', border: '1px solid #AA4400' }} />
      <div className="absolute rounded-full" style={{ width: '8px', height: '10px', background: '#CC6600', top: '18px', right: '16px', border: '1px solid #AA4400' }} />
      <div className="absolute" style={{ width: '16px', height: '8px', borderBottom: '3px solid #CC6600', borderRadius: '0 0 50% 50%', top: '32px', left: '50%', transform: 'translateX(-50%)' }} />
    </div>
  </div>
);

// Borderlands-style Moon
const BorderlandsMoon = () => (
  <div 
    className="absolute"
    style={{
      top: '10%',
      right: '10%',
      width: '70px',
      height: '70px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #F5F5DC 0%, #FFFACD 50%, #E8E8C8 100%)',
      border: '4px solid #C0C090',
      boxShadow: '0 0 20px rgba(255, 250, 205, 0.5), 0 0 40px rgba(255, 250, 205, 0.3)',
    }}
  >
    {/* Craters with outlines */}
    <div className="absolute rounded-full" style={{ width: '12px', height: '12px', background: '#D8D8B8', border: '2px solid #B0B090', top: '12px', left: '18px' }} />
    <div className="absolute rounded-full" style={{ width: '10px', height: '10px', background: '#D8D8B8', border: '2px solid #B0B090', top: '35px', left: '38px' }} />
    <div className="absolute rounded-full" style={{ width: '8px', height: '8px', background: '#D8D8B8', border: '2px solid #B0B090', top: '25px', left: '10px' }} />
  </div>
);

// Borderlands-style Cloud
const BorderlandsCloud = ({ top, left, scale, duration, delay }) => (
  <div
    className="absolute"
    style={{
      top: `${top}%`,
      left: `${left}%`,
      transform: `scale(${scale})`,
      animation: `floatCloud ${duration}s linear ${delay}s infinite`,
    }}
  >
    <svg width="140" height="70" viewBox="0 0 140 70" fill="none">
      <ellipse cx="40" cy="50" rx="30" ry="18" fill="white" stroke="#D0D0D0" strokeWidth="3" />
      <ellipse cx="70" cy="40" rx="38" ry="25" fill="white" stroke="#D0D0D0" strokeWidth="3" />
      <ellipse cx="100" cy="50" rx="30" ry="18" fill="white" stroke="#D0D0D0" strokeWidth="3" />
      <ellipse cx="55" cy="55" rx="22" ry="14" fill="white" />
      <ellipse cx="85" cy="55" rx="22" ry="14" fill="white" />
    </svg>
  </div>
);

// Night cloud for dark mode
const NightCloud = ({ top, left, scale, duration, delay }) => (
  <div
    className="absolute"
    style={{
      top: `${top}%`,
      left: `${left}%`,
      transform: `scale(${scale})`,
      animation: `floatCloud ${duration}s linear ${delay}s infinite`,
      opacity: 0.3,
    }}
  >
    <svg width="140" height="70" viewBox="0 0 140 70" fill="none">
      <ellipse cx="40" cy="50" rx="30" ry="18" fill="#4a4a7a" stroke="#3a3a5a" strokeWidth="2" />
      <ellipse cx="70" cy="40" rx="38" ry="25" fill="#4a4a7a" stroke="#3a3a5a" strokeWidth="2" />
      <ellipse cx="100" cy="50" rx="30" ry="18" fill="#4a4a7a" stroke="#3a3a5a" strokeWidth="2" />
    </svg>
  </div>
);

// Borderlands-style Star
const BorderlandsStar = ({ size, top, left, duration, delay }) => (
  <div
    className="absolute"
    style={{
      top: `${top}%`,
      left: `${left}%`,
      animation: `twinkle ${duration}s ease-in-out ${delay}s infinite`,
    }}
  >
    <svg width={size * 4} height={size * 4} viewBox="0 0 20 20" fill="none">
      <path 
        d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" 
        fill="white" 
        stroke="#CCCCCC" 
        strokeWidth="1"
      />
    </svg>
  </div>
);

const CLOUDS_DATA = [
  { top: 8, left: -10, scale: 1, duration: 60, delay: 0 },
  { top: 18, left: -10, scale: 0.7, duration: 75, delay: 20 },
  { top: 12, left: -10, scale: 0.85, duration: 65, delay: 35 },
  { top: 22, left: -10, scale: 0.6, duration: 80, delay: 10 },
];

const Cloud = ({ top, left, scale, duration, delay }) => (
  <div
    className="absolute"
    style={{
      top: `${top}%`,
      left: `${left}%`,
      transform: `scale(${scale})`,
      animation: `floatCloud ${duration}s linear ${delay}s infinite`,
      opacity: 0.9,
    }}
  >
    <svg width="120" height="50" viewBox="0 0 120 50" fill="none">
      <ellipse cx="35" cy="35" rx="25" ry="15" fill="white" />
      <ellipse cx="60" cy="30" rx="30" ry="20" fill="white" />
      <ellipse cx="85" cy="35" rx="25" ry="15" fill="white" />
      <ellipse cx="50" cy="38" rx="20" ry="12" fill="white" />
      <ellipse cx="70" cy="38" rx="20" ry="12" fill="white" />
    </svg>
  </div>
);

const DaytimeSkyBackground = ({ scrollProgress }) => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
    {/* Sky gradient */}
    <div 
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(180deg, #5B9BD5 0%, #87CEEB 30%, #B0E0E6 60%, #E0F4FF 100%)',
      }}
    />
    
    {/* Borderlands Sun */}
    <BorderlandsSun />
    
    {/* Borderlands Clouds */}
    {CLOUDS_DATA.map((cloud, i) => (
      <BorderlandsCloud key={i} {...cloud} />
    ))}
    
    {/* Mountains - fade out as you scroll */}
    <div style={{ opacity: 1 - scrollProgress }}>
      <MountainRange darkMode={false} />
    </div>
    
    {/* Islands - fade in as you scroll */}
    <IslandScene darkMode={false} opacity={scrollProgress} />
  </div>
);

const StarryBackground = ({ scrollProgress }) => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
    {/* Night sky gradient */}
    <div 
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(180deg, #0a0a20 0%, #1a1a3e 40%, #24243e 100%)',
      }}
    />
    
    {/* Borderlands Stars */}
    {STARS_DATA.map((star, i) => (
      <BorderlandsStar key={i} {...star} />
    ))}
    
    {/* Night Clouds */}
    {CLOUDS_DATA.map((cloud, i) => (
      <NightCloud key={i} {...cloud} />
    ))}
    
    {/* Borderlands Moon */}
    <BorderlandsMoon />
    
    {/* Mountains - fade out as you scroll */}
    <div style={{ opacity: 1 - scrollProgress }}>
      <MountainRange darkMode={true} />
    </div>
    
    {/* Islands - fade in as you scroll */}
    <IslandScene darkMode={true} opacity={scrollProgress} />
  </div>
);

// Dark mode toggle icons
const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

// Main Component
const JuanitoDev = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedHobby, setExpandedHobby] = useState(null);
  const containerRef = useRef(null);

  // Track scroll progress for scenery transition
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const windowHeight = window.innerHeight;
      // Transition from mountains to islands over the first 1.5 screen heights
      const progress = Math.min(scrollTop / (windowHeight * 1.5), 1);
      setScrollProgress(progress);
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const interests = [
    {
      id: 'physics',
      icon: '🔬',
      label: 'Physics',
      sub: 'Quantum consciousness',
      mentor: { name: 'Roger Penrose', why: 'Orch-OR theory — consciousness arising from quantum processes in microtubules' },
      funFact: 'Currently obsessed with: the measurement problem and why observation seems to collapse possibilities into reality',
      bookRec: '📖 Reading: "The Emperor\'s New Mind"'
    },
    {
      id: 'psychology',
      icon: '🧠',
      label: 'Psychology',
      sub: 'Evolution & decisions',
      mentor: { name: 'Richard Dawkins', why: 'The Selfish Gene changed how I see every human behavior' },
      funFact: 'Hot take: most of what we think is "choice" is just evolutionary programming running in the background',
      bookRec: '📖 Reading: "The Selfish Gene"'
    },
    {
      id: 'philosophy',
      icon: '📐',
      label: 'Philosophy',
      sub: 'What is real?',
      mentor: { name: 'Immanuel Kant', why: 'We can never know things as they truly are — only as they appear through our senses' },
      funFact: 'The question that keeps me up: if our senses evolved for survival, not truth, what are we actually missing?',
      bookRec: '📖 Exploring: Epistemology & Metaphysics'
    },
    {
      id: 'systems',
      icon: '🔄',
      label: 'Systems',
      sub: 'Emergence & design',
      mentor: { name: 'Donella Meadows', why: 'Thinking in Systems — the most practical framework for understanding anything complex' },
      funFact: 'I see feedback loops everywhere now. Supply chains, coffee shops, relationships — it\'s all systems.',
      bookRec: '📖 Reading: "Thinking in Systems"'
    }
  ];

  const journey = [
    { company: 'My Own Café', role: 'Founder', icon: '☕', detail: 'The beginning' },
    { company: 'Blue Bottle', role: 'General Manager', icon: '💧', detail: 'Chelsea & High Line' },
    { company: 'Califia Farms', role: 'Field Marketing Manager East', role2: 'Territory Dev Manager', icon: '🌱', detail: 'Northeast expansion' },
    { company: 'Numilk', role: 'Head of Sales', icon: '🥛', detail: 'National rollout' },
  ];

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Theme colors
  const theme = darkMode ? {
    bg: 'linear-gradient(180deg, #0f0c29 0%, #1a1a3e 50%, #24243e 100%)',
    navBg: 'rgba(15, 12, 41, 0.9)',
    navBorder: '#2a2a5a',
    text: '#E8E6F0',
    textMuted: '#A0A0C0',
    textSubtle: '#7070A0',
    accent: '#E07A5F',
    cardBg: 'rgba(30, 30, 60, 0.8)',
    cardBorder: '#3a3a6a',
    cardShadow: '#1a1a3a',
    sectionAlt: 'rgba(20, 20, 50, 0.9)',
    inputBg: 'rgba(40, 40, 70, 0.8)',
  } : {
    bg: 'transparent',
    navBg: 'rgba(255, 255, 255, 0.85)',
    navBorder: '#E8DDD4',
    text: '#3D2914',
    textMuted: '#5D4037',
    textSubtle: '#8B7355',
    accent: '#E07A5F',
    cardBg: 'rgba(255, 252, 248, 0.95)',
    cardBorder: '#E8DDD4',
    cardShadow: '#E8DDD4',
    sectionAlt: 'rgba(245, 237, 230, 0.95)',
    inputBg: 'rgba(250, 246, 241, 0.95)',
  };

  return (
    <div ref={containerRef} className="h-screen overflow-y-auto relative" style={{
      background: theme.bg,
      fontFamily: "'Inter', -apple-system, sans-serif",
      color: theme.text
    }}>
      
      {/* Starry background for dark mode */}
      {darkMode && <StarryBackground scrollProgress={scrollProgress} />}
      
      {/* Daytime sky for light mode */}
      {!darkMode && <DaytimeSkyBackground scrollProgress={scrollProgress} />}
      
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 md:py-5 flex justify-between items-center" style={{
        background: theme.navBg,
        backdropFilter: 'blur(20px)',
        borderBottom: `2px solid ${theme.navBorder}`
      }}>
        <span 
          className="text-sm font-semibold tracking-wide cursor-pointer hover:opacity-70 transition-opacity" 
          style={{ color: theme.textMuted }}
          onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Juan Hernandez
        </span>
        <div className="flex gap-6 text-sm items-center" style={{ color: theme.textSubtle }}>
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:opacity-70 transition-opacity cursor-pointer">About</a>
          <a href="#interests" onClick={(e) => scrollToSection(e, 'interests')} className="hover:opacity-70 transition-opacity cursor-pointer">Interests</a>
          <a href="#hobbies" onClick={(e) => scrollToSection(e, 'hobbies')} className="hover:opacity-70 transition-opacity cursor-pointer">Hobbies</a>
          <a href="#connect" onClick={(e) => scrollToSection(e, 'connect')} className="hover:opacity-70 transition-opacity cursor-pointer">Connect</a>
          
          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 p-2 rounded-full transition-all duration-300 hover:scale-110"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              color: theme.textMuted
            }}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-4 md:px-8 pt-24 md:pt-20 relative overflow-hidden">
        
        <div className="max-w-3xl text-center relative z-10">
          <div className="inline-block px-5 py-2 rounded-full text-xs tracking-widest uppercase mb-8 relative" style={{
            background: darkMode ? 'rgba(255,255,255,0.1)' : '#F5EDE6',
            color: theme.textSubtle,
            border: `2px dashed ${darkMode ? 'rgba(255,255,255,0.2)' : '#D4C4B0'}`
          }}>
            Polymath in progress ✨
          </div>
          <h1 className="text-4xl md:text-7xl font-light leading-tight mb-4" style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            letterSpacing: '-0.02em',
            color: theme.text,
            textShadow: darkMode ? 'none' : '0 2px 10px rgba(255,255,255,0.8)'
          }}>
            From Utuado, Puerto Rico's mountains
          </h1>
          <div className="flex justify-center mb-4">
            <Squiggle color="#E07A5F" width={200} />
          </div>
          <h1 className="text-4xl md:text-7xl font-light leading-tight mb-8" style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            letterSpacing: '-0.02em',
            color: theme.text,
            textShadow: darkMode ? 'none' : '0 2px 10px rgba(255,255,255,0.8)'
          }}>
            to building beverage programs
          </h1>
          <p className="text-lg leading-relaxed max-w-xl mx-auto px-4" style={{ 
            color: theme.textMuted,
            textShadow: darkMode ? 'none' : '0 1px 8px rgba(255,255,255,0.9)'
          }}>
            CS major. Barista at heart. Amateur ceramicist.
          </p>
          <p className="text-lg leading-relaxed max-w-xl mx-auto mt-2 px-4" style={{ 
            color: theme.textMuted,
            textShadow: darkMode ? 'none' : '0 1px 8px rgba(255,255,255,0.9)'
          }}>
            Director of Foodservice Sales by day.
          </p>
          <p className="text-lg leading-relaxed max-w-xl mx-auto mt-2 px-4" style={{ 
            color: theme.textMuted,
            textShadow: darkMode ? 'none' : '0 1px 8px rgba(255,255,255,0.9)'
          }}>
            Web developer and game dev enthusiast by night.
          </p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="min-h-screen px-4 md:px-8 py-20 md:py-24 relative z-10" style={{ scrollMarginTop: '80px' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs tracking-widest uppercase" style={{ color: theme.textSubtle }}>01</span>
                <div className="w-8 h-0.5" style={{ background: darkMode ? 'rgba(255,255,255,0.2)' : '#D4C4B0' }} />
                <span className="text-xs tracking-widest uppercase" style={{ color: theme.textSubtle }}>Background</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light leading-snug mb-8" style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                color: theme.text
              }}>
                I grew up in Caguana, Utuado — surrounded by Taíno heritage and wild coffee trees.
              </h2>
              <Squiggle color="#81B29A" width={80} />
              <div className="space-y-6 text-base leading-relaxed mt-8" style={{ color: theme.textMuted }}>
                <p>
                  I've been in specialty coffee and beverage for almost 20 years now. Started behind the bar, 
                  opened my own café, ran operations at Blue Bottle, then made the jump to sales.
                </p>
                <p>
                  These days I'm focused on national accounts and building beverage programs that 
                  actually make sense for operators.
                </p>
              </div>
            </div>
            
            {/* Current Role */}
            <div className="space-y-6">
              <div className="p-8 rounded-3xl relative overflow-hidden" style={{ 
                background: darkMode ? 'rgba(30, 30, 60, 0.8)' : 'linear-gradient(135deg, #FFF8F0 0%, #FDF3E7 100%)',
                border: `3px solid ${theme.cardBorder}`,
                boxShadow: `8px 8px 0px ${theme.cardShadow}`
              }}>
                <div className="absolute top-3 right-3">
                  <KawaiiCoconut />
                </div>
                <div className="relative z-10">
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4" style={{
                    background: '#81B29A',
                    color: 'white'
                  }}>
                    Current Adventure
                  </div>
                  <h3 className="text-xl font-medium mb-3" style={{ 
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    color: theme.text
                  }}>
                    Vita Coco 🥥
                  </h3>
                  <h3 className="text-2xl font-medium" style={{ 
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    color: theme.text
                  }}>
                    Director of Foodservice
                  </h3>
                  <h3 className="text-2xl font-medium mb-4" style={{ 
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    color: theme.text
                  }}>
                    Commercial Sales
                  </h3>
                  <p className="text-sm" style={{ color: theme.textSubtle }}>New York City</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl" style={{ 
                background: theme.inputBg,
                border: `2px dashed ${darkMode ? 'rgba(255,255,255,0.1)' : '#D4C4B0'}`
              }}>
                <span className="text-xs tracking-widest uppercase block mb-4" style={{ color: theme.textSubtle }}>
                  The day-to-day
                </span>
                <div className="space-y-3">
                  {[
                    'Dreaming up new drinks with R&D teams',
                    'Building beverage programs that operators actually want',
                    'Connecting coconut water with coffee, smoothies & QSR',
                    'Making the case at trade shows across the country',
                    'Growing relationships with national accounts'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-lg" style={{ color: '#E07A5F' }}>→</span>
                      <span className="text-sm" style={{ color: theme.textMuted }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Journey */}
              <div className="p-6 rounded-2xl" style={{ 
                background: darkMode ? 'rgba(30, 30, 60, 0.6)' : 'linear-gradient(180deg, #F5EDE6 0%, #FAF6F1 100%)',
                border: `2px solid ${theme.cardBorder}`
              }}>
                <span className="text-xs tracking-widest uppercase block mb-5" style={{ color: theme.textSubtle }}>
                  The journey here
                </span>
                <div className="space-y-4">
                  {journey.map((stop, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-transform group-hover:scale-110 group-hover:rotate-6 flex-shrink-0 mt-1" style={{
                        background: darkMode ? 'rgba(255,255,255,0.1)' : '#FFF8F0',
                        border: `2px solid ${theme.cardBorder}`
                      }}>
                        {stop.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm" style={{ color: theme.text }}>{stop.company}</p>
                        <p className="text-xs" style={{ color: theme.textMuted }}>{stop.role}</p>
                        {stop.role2 && (
                          <p className="text-xs" style={{ color: theme.textMuted }}>{stop.role2}</p>
                        )}
                        <p className="text-xs mt-1 italic" style={{ color: theme.textSubtle }}>{stop.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interests */}
      <section id="interests" className="py-20 md:py-24 px-4 md:px-8 relative z-10" style={{ background: theme.sectionAlt, scrollMarginTop: '80px' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs tracking-widest uppercase" style={{ color: theme.textSubtle }}>02</span>
            <div className="w-8 h-0.5" style={{ background: darkMode ? 'rgba(255,255,255,0.2)' : '#D4C4B0' }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: theme.textSubtle }}>Interests</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light leading-snug mb-4" style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            color: theme.text
          }}>
            I'm drawn to where fields intersect.
          </h2>
          <Squiggle color="#E07A5F" width={120} />
          <p className="text-base mb-12 mt-6" style={{ color: theme.textSubtle }}>
            Click a card to explore what I'm thinking about.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {interests.map((item, i) => (
              <div 
                key={item.id}
                className="rounded-3xl transition-all duration-500 cursor-pointer overflow-hidden"
                style={{ 
                  background: theme.cardBg,
                  boxShadow: expandedCard === item.id 
                    ? `8px 8px 0px ${darkMode ? '#4a4a8a' : '#C4A77D'}` 
                    : `4px 4px 0px ${theme.cardShadow}`,
                  border: expandedCard === item.id 
                    ? `3px solid ${darkMode ? '#5a5a9a' : '#C4A77D'}` 
                    : `3px solid ${theme.cardBorder}`,
                  transform: expandedCard === item.id ? 'translate(-2px, -2px)' : 'none'
                }}
                onClick={() => toggleCard(item.id)}
              >
                <div 
                  className="p-6 flex items-start justify-between"
                  style={{
                    animation: expandedCard === item.id ? 'none' : `float 4s ease-in-out ${i * 0.5}s infinite`
                  }}
                >
                  <div>
                    <span className="text-3xl block mb-3">{item.icon}</span>
                    <h3 className="font-semibold text-lg mb-1" style={{ color: theme.text }}>{item.label}</h3>
                    <p className="text-sm" style={{ color: theme.textSubtle }}>{item.sub}</p>
                  </div>
                  <span 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-light transition-all duration-300"
                    style={{ 
                      background: expandedCard === item.id ? '#E07A5F' : (darkMode ? 'rgba(255,255,255,0.1)' : '#F5EDE6'),
                      color: expandedCard === item.id ? 'white' : theme.textSubtle,
                      transform: expandedCard === item.id ? 'rotate(45deg)' : 'rotate(0deg)'
                    }}
                  >
                    +
                  </span>
                </div>
                
                <div 
                  className="overflow-hidden transition-all duration-500"
                  style={{
                    maxHeight: expandedCard === item.id ? '400px' : '0px',
                    opacity: expandedCard === item.id ? 1 : 0
                  }}
                >
                  <div className="px-6 pb-6">
                    <div className="mb-4">
                      <Squiggle color="#81B29A" width={60} />
                    </div>
                    
                    <span className="text-xs tracking-widest uppercase block mb-3" style={{ color: theme.textSubtle }}>
                      Key Influence
                    </span>
                    <div className="flex gap-3 mb-5">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: '#E07A5F' }} />
                      <div>
                        <h4 className="font-medium text-sm" style={{ color: theme.text }}>{item.mentor.name}</h4>
                        <p className="text-sm" style={{ color: theme.textMuted }}>{item.mentor.why}</p>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl mb-4" style={{ background: theme.inputBg, border: `1px dashed ${darkMode ? 'rgba(255,255,255,0.1)' : '#D4C4B0'}` }}>
                      <p className="text-sm italic" style={{ color: theme.textMuted }}>{item.funFact}</p>
                    </div>
                    
                    <p className="text-xs" style={{ color: theme.textSubtle }}>{item.bookRec}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hobbies */}
      <section id="hobbies" className="py-20 md:py-24 px-4 md:px-8 relative z-10" style={{ background: theme.sectionAlt, scrollMarginTop: '80px' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs tracking-widest uppercase" style={{ color: theme.textSubtle }}>03</span>
            <div className="w-8 h-0.5" style={{ background: darkMode ? 'rgba(255,255,255,0.2)' : '#D4C4B0' }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: theme.textSubtle }}>Hobbies</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light leading-snug mb-4" style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            color: theme.text
          }}>
            When I'm not working, you'll find me...
          </h2>
          <Squiggle color="#81B29A" width={100} />
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {/* Ceramics */}
            <div 
              className="rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: theme.cardBg,
                border: `3px solid ${theme.cardBorder}`,
                boxShadow: `6px 6px 0px ${theme.cardShadow}`
              }}
              onClick={() => setExpandedHobby(expandedHobby === 'ceramics' ? null : 'ceramics')}
            >
              <div className="p-6">
                <span className="text-4xl block mb-4">🏺</span>
                <h3 className="font-semibold text-lg mb-2" style={{ color: theme.text }}>Ceramics</h3>
                <p className="text-sm mb-4" style={{ color: theme.textMuted }}>
                  Amateur ceramicist exploring wheel throwing and hand-building. There's something meditative about shaping clay.
                </p>
                <span className="text-xs" style={{ color: theme.accent }}>Click to learn more →</span>
              </div>
              <div className="h-40 flex flex-col items-center justify-center" style={{ 
                background: darkMode ? 'rgba(40, 40, 70, 0.8)' : 'repeating-linear-gradient(45deg, #F5EDE6, #F5EDE6 10px, #FAF6F1 10px, #FAF6F1 20px)',
                borderTop: `2px dashed ${darkMode ? 'rgba(255,255,255,0.1)' : '#D4C4B0'}`
              }}>
                <span className="text-5xl">🫖</span>
              </div>
            </div>

            {/* Game Dev - Primordial Soup */}
            <div 
              className="rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: theme.cardBg,
                border: `3px solid ${theme.cardBorder}`,
                boxShadow: `6px 6px 0px ${theme.cardShadow}`
              }}
              onClick={() => setExpandedHobby(expandedHobby === 'gamedev' ? null : 'gamedev')}
            >
              <div className="p-6">
                <span className="text-4xl block mb-4">🎮</span>
                <h3 className="font-semibold text-lg mb-2" style={{ color: theme.text }}>Game Dev</h3>
                <p className="text-sm mb-4" style={{ color: theme.textMuted }}>
                  Building worlds where systems thinking meets play. Currently crafting "Primordial Soup" — an evolution sim.
                </p>
                <span className="text-xs" style={{ color: theme.accent }}>Click to learn more →</span>
              </div>
              <div className="h-40 flex flex-col items-center justify-center relative overflow-hidden" style={{ 
                background: 'linear-gradient(180deg, #2D3A3A 0%, #1A2626 100%)',
                borderTop: '2px dashed #81B29A'
              }}>
                <BubblingMolecules />
                <div className="relative z-10 text-center">
                  <KawaiiFace />
                </div>
              </div>
            </div>

            {/* Bouldering */}
            <div 
              className="rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: theme.cardBg,
                border: `3px solid ${theme.cardBorder}`,
                boxShadow: `6px 6px 0px ${theme.cardShadow}`
              }}
              onClick={() => setExpandedHobby(expandedHobby === 'bouldering' ? null : 'bouldering')}
            >
              <div className="p-6">
                <span className="text-4xl block mb-4">🧗</span>
                <h3 className="font-semibold text-lg mb-2" style={{ color: theme.text }}>Bouldering</h3>
                <p className="text-sm mb-4" style={{ color: theme.textMuted }}>
                  Problem-solving with your body. Every route is a puzzle that demands both strength and strategy.
                </p>
                <span className="text-xs" style={{ color: theme.accent }}>Click to learn more →</span>
              </div>
              <div className="h-40 flex flex-col items-center justify-center relative overflow-hidden" style={{ 
                background: 'linear-gradient(180deg, #3D405B 0%, #2C3049 100%)',
                borderTop: '2px solid #4A4E6A'
              }}>
                {/* Climbing holds */}
                <div className="absolute" style={{ top: '15%', left: '20%' }}>
                  <div className="w-6 h-6 rounded-full" style={{ background: '#E07A5F', boxShadow: '2px 2px 0 #B85A45' }} />
                </div>
                <div className="absolute" style={{ top: '45%', right: '25%' }}>
                  <div className="w-8 h-5 rounded-full" style={{ background: '#81B29A', boxShadow: '2px 2px 0 #5A8A6A' }} />
                </div>
                <div className="absolute" style={{ bottom: '20%', left: '35%' }}>
                  <div className="w-5 h-7 rounded-full" style={{ background: '#F2CC8F', boxShadow: '2px 2px 0 #C9A66A' }} />
                </div>
                <div className="absolute" style={{ top: '30%', left: '55%' }}>
                  <div className="w-4 h-4 rounded-full" style={{ background: '#E07A5F', boxShadow: '2px 2px 0 #B85A45' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Second row of hobbies */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {/* Cooking */}
            <div 
              className="rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: theme.cardBg,
                border: `3px solid ${theme.cardBorder}`,
                boxShadow: `6px 6px 0px ${theme.cardShadow}`
              }}
              onClick={() => setExpandedHobby(expandedHobby === 'cooking' ? null : 'cooking')}
            >
              <div className="p-6 flex gap-6">
                <div className="flex-1">
                  <span className="text-4xl block mb-4">👨‍🍳</span>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: theme.text }}>Cooking</h3>
                  <p className="text-sm mb-4" style={{ color: theme.textMuted }}>
                    Elaborate meals are my love language. From wagyu preparations to Puerto Rican classics, the kitchen is where I experiment.
                  </p>
                  <span className="text-xs" style={{ color: theme.accent }}>Click to learn more →</span>
                </div>
                <div className="w-32 h-32 rounded-2xl flex items-center justify-center" style={{ 
                  background: darkMode ? 'rgba(40, 40, 70, 0.8)' : '#FAF6F1'
                }}>
                  <span className="text-6xl">🥩</span>
                </div>
              </div>
            </div>

            {/* Reading/Learning */}
            <div 
              className="rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: theme.cardBg,
                border: `3px solid ${theme.cardBorder}`,
                boxShadow: `6px 6px 0px ${theme.cardShadow}`
              }}
              onClick={() => setExpandedHobby(expandedHobby === 'reading' ? null : 'reading')}
            >
              <div className="p-6 flex gap-6">
                <div className="flex-1">
                  <span className="text-4xl block mb-4">📚</span>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: theme.text }}>Systems Thinking</h3>
                  <p className="text-sm mb-4" style={{ color: theme.textMuted }}>
                    Obsessed with how things connect. From Buckminster Fuller's synergetics to emergence theory — patterns are everywhere.
                  </p>
                  <span className="text-xs" style={{ color: theme.accent }}>Click to learn more →</span>
                </div>
                <div className="w-32 h-32 rounded-2xl flex items-center justify-center" style={{ 
                  background: darkMode ? 'rgba(40, 40, 70, 0.8)' : '#FAF6F1'
                }}>
                  <span className="text-6xl">🔮</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Hobby Card Popup */}
      {expandedHobby && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={() => setExpandedHobby(null)}
        >
          <div 
            className="relative max-w-2xl w-full rounded-3xl overflow-hidden"
            style={{
              background: theme.cardBg,
              border: `4px solid ${theme.cardBorder}`,
              boxShadow: '0 25px 80px rgba(0,0,0,0.4)',
              transform: 'perspective(1000px) rotateX(2deg)',
              animation: 'popIn 0.3s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-xl z-10 hover:scale-110 transition-transform"
              style={{ background: theme.accent, color: 'white' }}
              onClick={() => setExpandedHobby(null)}
            >
              ×
            </button>

            {expandedHobby === 'ceramics' && (
              <div className="p-8">
                <span className="text-6xl block mb-6">🏺</span>
                <h3 className="text-2xl font-semibold mb-4" style={{ color: theme.text, fontFamily: "'Instrument Serif', Georgia, serif" }}>Ceramics</h3>
                <div className="space-y-4 text-base" style={{ color: theme.textMuted }}>
                  <p>
                    I started ceramics as a way to disconnect from screens and work with my hands. There's something deeply satisfying about transforming a lump of clay into something functional and beautiful.
                  </p>
                  <p>
                    Currently focusing on wheel throwing — mostly mugs and bowls. The centering process is incredibly meditative. When you're at the wheel, your mind has to be fully present.
                  </p>
                  <p>
                    Next goal: mastering glazing techniques. There's a whole chemistry aspect to it that appeals to my systems-thinking brain.
                  </p>
                </div>
                <div className="mt-6 p-4 rounded-2xl" style={{ background: darkMode ? 'rgba(129, 178, 154, 0.1)' : 'rgba(129, 178, 154, 0.15)' }}>
                  <span className="text-sm font-medium" style={{ color: '#81B29A' }}>📍 Currently learning at: </span>
                  <span className="text-sm" style={{ color: theme.textMuted }}>Local studio in Brooklyn</span>
                </div>
              </div>
            )}

            {expandedHobby === 'gamedev' && (
              <div className="p-8">
                <span className="text-6xl block mb-6">🎮</span>
                <h3 className="text-2xl font-semibold mb-4" style={{ color: theme.text, fontFamily: "'Instrument Serif', Georgia, serif" }}>Game Development</h3>
                <div className="space-y-4 text-base" style={{ color: theme.textMuted }}>
                  <p>
                    Game development is where all my interests collide — systems thinking, physics, psychology, design. Every world you build has its own rules, its own logic, its own life.
                  </p>
                  <p>
                    <strong style={{ color: theme.text }}>Primordial Soup</strong> is my current project: an evolution simulation where chemistry meets life. Watch elements combine, molecules form, and simple creatures emerge from the chaos.
                  </p>
                  <p>
                    I'm drawn to the places where technology creates something you can explore and feel. 3D environments, interactive experiences, simulations that surprise you.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['React', 'Three.js', 'WebGL', 'Node.js', 'MongoDB'].map(tech => (
                    <span key={tech} className="px-3 py-1 rounded-full text-sm" style={{ 
                      background: darkMode ? 'rgba(129, 178, 154, 0.2)' : 'rgba(129, 178, 154, 0.2)',
                      color: '#81B29A',
                      border: '1px solid #81B29A'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {expandedHobby === 'bouldering' && (
              <div className="p-8">
                <span className="text-6xl block mb-6">🧗</span>
                <h3 className="text-2xl font-semibold mb-4" style={{ color: theme.text, fontFamily: "'Instrument Serif', Georgia, serif" }}>Bouldering</h3>
                <div className="space-y-4 text-base" style={{ color: theme.textMuted }}>
                  <p>
                    Bouldering is problem-solving with your body. Every route (called a "problem") demands a unique combination of strength, flexibility, balance, and strategy.
                  </p>
                  <p>
                    I climb at Vital LES in Manhattan. There's a great community there — climbers are always willing to share beta (tips) and celebrate sends together.
                  </p>
                  <p>
                    What I love most is the mental aspect. You study the wall, visualize your sequence, and then execute. When you finally send a problem you've been projecting for weeks, the feeling is unmatched.
                  </p>
                </div>
                <div className="mt-6 p-4 rounded-2xl" style={{ background: darkMode ? 'rgba(224, 122, 95, 0.1)' : 'rgba(224, 122, 95, 0.15)' }}>
                  <span className="text-sm font-medium" style={{ color: '#E07A5F' }}>🏋️ Current grade: </span>
                  <span className="text-sm" style={{ color: theme.textMuted }}>Working on V4s</span>
                </div>
              </div>
            )}

            {expandedHobby === 'cooking' && (
              <div className="p-8">
                <span className="text-6xl block mb-6">👨‍🍳</span>
                <h3 className="text-2xl font-semibold mb-4" style={{ color: theme.text, fontFamily: "'Instrument Serif', Georgia, serif" }}>Cooking</h3>
                <div className="space-y-4 text-base" style={{ color: theme.textMuted }}>
                  <p>
                    Cooking elaborate meals is how I show love. There's something deeply satisfying about transforming quality ingredients into an experience for people you care about.
                  </p>
                  <p>
                    I gravitate toward two poles: <strong style={{ color: theme.text }}>premium preparations</strong> (wagyu, dry-aged steaks, whole fish) and <strong style={{ color: theme.text }}>Puerto Rican comfort food</strong> (mofongo, pernil, arroz con gandules).
                  </p>
                  <p>
                    Recent highlight: Thanksgiving wagyu tenderloin with roasted vegetables, homemade chimichurri, and a red wine reduction. Six hours of prep, gone in forty minutes of pure joy.
                  </p>
                </div>
                <div className="mt-6 flex gap-4">
                  <span className="text-4xl">🥩</span>
                  <span className="text-4xl">🍚</span>
                  <span className="text-4xl">🧄</span>
                  <span className="text-4xl">🌿</span>
                </div>
              </div>
            )}

            {expandedHobby === 'reading' && (
              <div className="p-8">
                <span className="text-6xl block mb-6">📚</span>
                <h3 className="text-2xl font-semibold mb-4" style={{ color: theme.text, fontFamily: "'Instrument Serif', Georgia, serif" }}>Systems Thinking</h3>
                <div className="space-y-4 text-base" style={{ color: theme.textMuted }}>
                  <p>
                    I'm fascinated by how things connect. Systems thinking isn't just a framework — it's a lens that reveals patterns everywhere, from ecosystems to organizations to code.
                  </p>
                  <p>
                    <strong style={{ color: theme.text }}>Buckminster Fuller</strong> has been a huge influence. His concept of "synergetics" — how systems behave in ways their individual parts can't — changed how I approach problem-solving.
                  </p>
                  <p>
                    Currently exploring: emergence theory, complexity science, and how these ideas apply to game design and simulation. Every game world is a system waiting to surprise you.
                  </p>
                </div>
                <div className="mt-6 p-4 rounded-2xl" style={{ background: darkMode ? 'rgba(61, 64, 91, 0.3)' : 'rgba(61, 64, 91, 0.1)' }}>
                  <span className="text-sm font-medium" style={{ color: '#3D405B' }}>📖 Currently reading: </span>
                  <span className="text-sm" style={{ color: theme.textMuted }}>Thinking in Systems by Donella Meadows</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Connect */}
      <section id="connect" className="py-20 md:py-24 px-4 md:px-8 relative z-10" style={{ background: darkMode ? 'rgba(10, 10, 30, 0.9)' : '#3D2914', color: '#FDF8F3', scrollMarginTop: '80px' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-xs tracking-widest uppercase" style={{ color: darkMode ? '#7070A0' : '#A08060' }}>04</span>
            <div className="w-8 h-0.5" style={{ background: darkMode ? 'rgba(255,255,255,0.2)' : '#5D4037' }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: darkMode ? '#7070A0' : '#A08060' }}>Connect</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{
            fontFamily: "'Instrument Serif', Georgia, serif"
          }}>
            Let's connect
          </h2>
          <div className="flex justify-center mb-12">
            <Squiggle color="#E07A5F" width={80} />
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            {[
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/juan-hernandez-a3880276/' },
              { label: 'Instagram', href: 'https://www.instagram.com/mytoehertz/' },
              { label: 'GitHub', href: 'https://github.com/mytoehertz' }
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  background: 'transparent',
                  border: `2px solid ${darkMode ? 'rgba(255,255,255,0.2)' : '#5D4037'}`,
                  color: '#FDF8F3',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#E07A5F';
                  e.target.style.borderColor = '#E07A5F';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.borderColor = darkMode ? 'rgba(255,255,255,0.2)' : '#5D4037';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="mt-16 text-xs" style={{ color: darkMode ? '#5050A0' : '#6B5344' }}>
            © 2024 Juan Hernandez · Built with coffee and curiosity
          </p>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        
        @keyframes float3d {
          0%, 100% { transform: translateZ(var(--z, 50px)) translateY(0); }
          50% { transform: translateZ(var(--z, 50px)) translateY(-12px); }
        }
        
        @keyframes bubble {
          0%, 100% { 
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
          50% { 
            transform: translateY(-30px) scale(1.1);
            opacity: 0.4;
          }
        }
        
        @keyframes bounceHold {
          0%, 100% { 
            transform: translateY(0) scale(1);
          }
          50% { 
            transform: translateY(-12px) scale(1.1);
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes twinkle {
          0%, 100% { 
            opacity: 1;
            transform: scale(1);
          }
          50% { 
            opacity: 0.3;
            transform: scale(0.8);
          }
        }
        
        @keyframes floatCloud {
          0% {
            transform: translateX(0) scale(var(--scale, 1));
          }
          100% {
            transform: translateX(100vw) scale(var(--scale, 1));
          }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        
        @keyframes popIn {
          0% { 
            opacity: 0; 
            transform: perspective(1000px) rotateX(10deg) scale(0.9);
          }
          100% { 
            opacity: 1; 
            transform: perspective(1000px) rotateX(2deg) scale(1);
          }
        }
        
        .animate-wiggle {
          animation: wiggle 0.3s ease-in-out;
        }
        
        ::selection {
          background: #E07A5F;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default JuanitoDev;
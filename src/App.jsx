import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { 
  MapPin, TrendingUp, Lock, Sparkles, Bot,
  Sun, Moon, Linkedin, Instagram, Github,
  Wine, ChefHat, Brain, Mountain, BookOpen,
  Briefcase, Globe, Gamepad2, Wrench, Construction, Ban,
  Calculator, Scale, Coffee, Flame, Network, Palette, Soup,
  Atom, Compass, RefreshCw
} from 'lucide-react';

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
// Parallax Mountain Layers - Each layer moves at different speed
const MountainLayerFar = ({ darkMode, offsetY = 0 }) => (
  <svg 
    className="absolute bottom-0 w-full transition-transform duration-100" 
    height="250" 
    viewBox="0 0 1440 250" 
    preserveAspectRatio="none"
    style={{ transform: `translateY(${offsetY}px)` }}
  >
    <defs>
      <linearGradient id="farMountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={darkMode ? '#2a2a5a' : '#8BB3B3'} />
        <stop offset="100%" stopColor={darkMode ? '#1a1a3e' : '#7BA3A3'} />
      </linearGradient>
    </defs>
    <path 
      d="M0 250 L0 160 Q60 145 120 155 Q180 165 240 140 Q320 105 400 130 Q480 155 560 115 Q640 75 720 100 Q800 125 880 95 Q960 65 1040 85 Q1120 105 1200 80 Q1280 55 1360 75 Q1400 90 1440 100 L1440 250 Z" 
      fill="url(#farMountainGrad)"
      stroke={darkMode ? '#3a3a6a' : '#6A9292'}
      strokeWidth="2"
    />
    {/* Mist/haze overlay for depth */}
    <path 
      d="M0 250 L0 180 Q200 170 400 185 Q600 200 800 175 Q1000 150 1200 170 Q1400 190 1440 180 L1440 250 Z" 
      fill={darkMode ? 'rgba(10,10,30,0.3)' : 'rgba(255,255,255,0.2)'}
    />
  </svg>
);

const MountainLayerMid = ({ darkMode, offsetY = 0 }) => (
  <svg 
    className="absolute bottom-0 w-full transition-transform duration-100" 
    height="200" 
    viewBox="0 0 1440 200" 
    preserveAspectRatio="none"
    style={{ transform: `translateY(${offsetY}px)` }}
  >
    <defs>
      <linearGradient id="midMountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={darkMode ? '#1a1a3e' : '#6A9292'} />
        <stop offset="100%" stopColor={darkMode ? '#12122a' : '#5A8282'} />
      </linearGradient>
      <filter id="mountainShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="-4" stdDeviation="6" floodColor={darkMode ? '#000' : '#2A4A4A'} floodOpacity="0.3"/>
      </filter>
    </defs>
    <path 
      d="M0 200 L0 130 Q80 145 160 115 Q240 85 320 110 Q400 135 480 95 Q560 55 640 80 Q720 105 800 70 Q880 35 960 60 Q1040 85 1120 55 Q1200 25 1280 50 Q1360 75 1440 60 L1440 200 Z" 
      fill="url(#midMountainGrad)"
      stroke={darkMode ? '#2a2a4a' : '#4A7272'}
      strokeWidth="3"
      filter="url(#mountainShadow)"
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
);

const MountainLayerNear = ({ darkMode, offsetY = 0 }) => (
  <svg 
    className="absolute bottom-0 w-full transition-transform duration-100" 
    height="150" 
    viewBox="0 0 1440 150" 
    preserveAspectRatio="none"
    style={{ transform: `translateY(${offsetY}px)` }}
  >
    <defs>
      <linearGradient id="nearMountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={darkMode ? '#12122a' : '#4A7272'} />
        <stop offset="100%" stopColor={darkMode ? '#0a0a1a' : '#3D6363'} />
      </linearGradient>
      <filter id="nearShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="-6" stdDeviation="10" floodColor={darkMode ? '#000' : '#1A3A3A'} floodOpacity="0.4"/>
      </filter>
    </defs>
    <path 
      d="M0 150 L0 100 Q80 115 160 85 Q240 55 320 80 Q400 105 480 70 Q560 35 640 55 Q720 75 800 45 Q880 15 960 40 Q1040 65 1120 35 Q1200 5 1280 30 Q1360 55 1440 40 L1440 150 Z" 
      fill="url(#nearMountainGrad)"
      stroke={darkMode ? '#1a1a3a' : '#2A5050'}
      strokeWidth="4"
      filter="url(#nearShadow)"
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
);

// Combined Mountain Range with Parallax
const MountainRange = ({ darkMode, scrollOffset = 0 }) => (
  <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ zIndex: 1 }}>
    {/* Far mountains - slowest parallax */}
    <MountainLayerFar darkMode={darkMode} offsetY={scrollOffset * 0.15} />
    {/* Mid mountains - medium parallax */}
    <MountainLayerMid darkMode={darkMode} offsetY={scrollOffset * 0.3} />
    {/* Near mountains - fastest parallax */}
    <MountainLayerNear darkMode={darkMode} offsetY={scrollOffset * 0.5} />
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
    
    {/* Ocean waves/ripples */}
    <svg className="absolute bottom-24 left-0 right-0 w-full" height="40" preserveAspectRatio="none" viewBox="0 0 1440 40">
      <path 
        d="M0 20 Q60 10 120 20 Q180 30 240 20 Q300 10 360 20 Q420 30 480 20 Q540 10 600 20 Q660 30 720 20 Q780 10 840 20 Q900 30 960 20 Q1020 10 1080 20 Q1140 30 1200 20 Q1260 10 1320 20 Q1380 30 1440 20" 
        stroke={darkMode ? '#1a4a5a' : '#7BC3D5'}
        strokeWidth="2"
        fill="none"
        opacity="0.4"
      />
    </svg>
    
    {/* Cute swimming shark - swimming right */}
    <svg className="absolute shark-swim" style={{ bottom: '60px', left: '20%' }} width="80" height="50" viewBox="0 0 80 50">
      {/* Shark body */}
      <ellipse cx="40" cy="28" rx="28" ry="14" fill={darkMode ? '#2a4a5a' : '#6B8B9B'} />
      {/* Shark belly */}
      <ellipse cx="40" cy="32" rx="20" ry="8" fill={darkMode ? '#3a5a6a' : '#9BB0BD'} />
      {/* Dorsal fin */}
      <path d="M40 14 L35 28 L45 28 Z" fill={darkMode ? '#1a3a4a' : '#5A7A8A'} />
      {/* Tail fin - now on left */}
      <path d="M12 28 L0 18 L0 38 Z" fill={darkMode ? '#1a3a4a' : '#5A7A8A'} />
      {/* Side fin */}
      <ellipse cx="48" cy="35" rx="8" ry="4" fill={darkMode ? '#1a3a4a' : '#5A7A8A'} transform="rotate(20 48 35)" />
      {/* Cute eye - now on right */}
      <circle cx="60" cy="25" r="5" fill="white" />
      <circle cx="61" cy="24" r="3" fill={darkMode ? '#1a1a3e' : '#2A3040'} />
      <circle cx="62" cy="23" r="1" fill="white" />
      {/* Happy smile - now on right */}
      <path d="M58 32 Q62 36 68 32" stroke={darkMode ? '#0a1a2a' : '#3A4A5A'} strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Blush */}
      <ellipse cx="56" cy="30" rx="3" ry="2" fill="#E07A5F" opacity="0.5" />
    </svg>
    
    {/* Second small shark in background - also flipped */}
    <svg className="absolute shark-swim-slow" style={{ bottom: '90px', right: '30%' }} width="50" height="30" viewBox="0 0 80 50" opacity="0.6">
      <ellipse cx="40" cy="28" rx="28" ry="14" fill={darkMode ? '#1a3a4a' : '#5A7A8A'} />
      <path d="M40 14 L35 28 L45 28 Z" fill={darkMode ? '#0a2a3a' : '#4A6A7A'} />
      <path d="M12 28 L0 18 L0 38 Z" fill={darkMode ? '#0a2a3a' : '#4A6A7A'} />
    </svg>
    
    {/* Far island - left */}
    <svg className="absolute bottom-28 left-[8%]" width="220" height="130" viewBox="0 0 220 130">
      {/* Island base with gradient */}
      <defs>
        <linearGradient id="islandGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={darkMode ? '#2a4a3a' : '#E8C49A'} />
          <stop offset="50%" stopColor={darkMode ? '#1a3a2a' : '#D4A574'} />
          <stop offset="100%" stopColor={darkMode ? '#0a2a1a' : '#A07A5A'} />
        </linearGradient>
        <pattern id="sandTexture1" patternUnits="userSpaceOnUse" width="4" height="4">
          <circle cx="2" cy="2" r="0.5" fill={darkMode ? '#3a5a4a' : '#F0D8B0'} opacity="0.5" />
        </pattern>
      </defs>
      <ellipse cx="110" cy="110" rx="100" ry="20" fill="url(#islandGrad1)" stroke={darkMode ? '#3a5a4a' : '#8B6344'} strokeWidth="4" />
      {/* Sand texture overlay */}
      <ellipse cx="110" cy="110" rx="95" ry="17" fill="url(#sandTexture1)" />
      {/* Sand highlight */}
      <ellipse cx="110" cy="105" rx="80" ry="12" fill={darkMode ? '#3a5a4a' : '#F5E0B8'} opacity="0.5" />
      {/* Wet sand near water */}
      <ellipse cx="110" cy="118" rx="90" ry="8" fill={darkMode ? '#1a3a2a' : '#B08A60'} opacity="0.4" />
      
      {/* Message in a bottle on beach! */}
      <g transform="translate(145, 100) rotate(-15)">
        <ellipse cx="0" cy="0" rx="8" ry="4" fill={darkMode ? '#2a5a5a' : '#7BC3D5'} opacity="0.8" />
        <rect x="-6" y="-10" width="12" height="14" rx="3" fill={darkMode ? '#3a6a6a' : '#98D4E0'} stroke={darkMode ? '#1a4a4a' : '#5BA3B5'} strokeWidth="1.5" />
        <rect x="-4" y="-12" width="8" height="3" fill={darkMode ? '#4a3a2a' : '#A07A5A'} rx="1" />
        {/* Cork */}
        <ellipse cx="0" cy="-12" rx="3" ry="2" fill={darkMode ? '#5a4a3a' : '#C4956A'} />
        {/* Paper inside */}
        <rect x="-3" y="-6" width="6" height="8" fill={darkMode ? '#d0d0c0' : '#FFF8E8'} rx="1" />
      </g>
      
      {/* Palm tree trunk with texture */}
      <path d="M100 110 Q95 70 100 35" stroke={darkMode ? '#1a2a1a' : '#4A3020'} strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M100 110 Q95 70 100 35" stroke={darkMode ? '#2a3a2a' : '#6B5040'} strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* Trunk segments */}
      <path d="M94 95 Q100 93 106 95" stroke={darkMode ? '#1a2a1a' : '#3A2010'} strokeWidth="2" fill="none" />
      <path d="M95 80 Q100 78 105 80" stroke={darkMode ? '#1a2a1a' : '#3A2010'} strokeWidth="2" fill="none" />
      <path d="M96 65 Q100 63 104 65" stroke={darkMode ? '#1a2a1a' : '#3A2010'} strokeWidth="2" fill="none" />
      <path d="M97 50 Q100 48 103 50" stroke={darkMode ? '#1a2a1a' : '#3A2010'} strokeWidth="2" fill="none" />
      
      {/* Palm fronds - more realistic with multiple layers */}
      {/* Left drooping frond */}
      <path d="M100 38 Q70 30 40 50 Q55 40 100 38" fill={darkMode ? '#2a5a3a' : '#4A7A40'} stroke={darkMode ? '#1a3a2a' : '#3D6030'} strokeWidth="2" />
      <path d="M100 38 Q75 35 50 48" stroke={darkMode ? '#3a6a4a' : '#6B9B5A'} strokeWidth="1.5" fill="none" />
      
      {/* Upper left frond */}
      <path d="M100 36 Q85 15 70 25 Q80 18 100 36" fill={darkMode ? '#2a5a3a' : '#5B8C4A'} stroke={darkMode ? '#1a3a2a' : '#3D6030'} strokeWidth="2" />
      <path d="M100 36 Q88 20 75 26" stroke={darkMode ? '#4a7a5a' : '#7BAC6A'} strokeWidth="1.5" fill="none" />
      
      {/* Right drooping frond */}
      <path d="M100 38 Q130 30 160 50 Q145 40 100 38" fill={darkMode ? '#2a5a3a' : '#4A7A40'} stroke={darkMode ? '#1a3a2a' : '#3D6030'} strokeWidth="2" />
      <path d="M100 38 Q125 35 150 48" stroke={darkMode ? '#3a6a4a' : '#6B9B5A'} strokeWidth="1.5" fill="none" />
      
      {/* Upper right frond */}
      <path d="M100 36 Q115 15 130 25 Q120 18 100 36" fill={darkMode ? '#2a5a3a' : '#5B8C4A'} stroke={darkMode ? '#1a3a2a' : '#3D6030'} strokeWidth="2" />
      <path d="M100 36 Q112 20 125 26" stroke={darkMode ? '#4a7a5a' : '#7BAC6A'} strokeWidth="1.5" fill="none" />
      
      {/* Center frond going up */}
      <path d="M100 35 Q100 10 95 5 Q105 5 100 35" fill={darkMode ? '#3a6a4a' : '#5B8C4A'} stroke={darkMode ? '#1a3a2a' : '#3D6030'} strokeWidth="2" />
      <path d="M100 35 Q100 15 98 8" stroke={darkMode ? '#4a7a5a' : '#7BAC6A'} strokeWidth="1.5" fill="none" />
      
      {/* Coconut cluster */}
      <circle cx="96" cy="42" r="6" fill={darkMode ? '#3a4a3a' : '#8B6B40'} stroke={darkMode ? '#1a2a1a' : '#5A4030'} strokeWidth="2" />
      <circle cx="104" cy="44" r="5" fill={darkMode ? '#3a4a3a' : '#9B7B50'} stroke={darkMode ? '#1a2a1a' : '#5A4030'} strokeWidth="2" />
      <circle cx="100" cy="48" r="5" fill={darkMode ? '#2a3a2a' : '#7B5B30'} stroke={darkMode ? '#1a2a1a' : '#5A4030'} strokeWidth="2" />
      {/* Coconut highlights */}
      <circle cx="94" cy="40" r="2" fill={darkMode ? '#4a5a4a' : '#AB8B60'} />
      <circle cx="102" cy="42" r="1.5" fill={darkMode ? '#4a5a4a' : '#AB8B60'} />
    </svg>
    
    {/* Main island - right with multiple palm trees */}
    <svg className="absolute bottom-24 right-[10%]" width="400" height="200" viewBox="0 0 400 200">
      <defs>
        <linearGradient id="islandGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={darkMode ? '#2a4a3a' : '#F5E0B8'} />
          <stop offset="30%" stopColor={darkMode ? '#1a3a2a' : '#D4A574'} />
          <stop offset="70%" stopColor={darkMode ? '#0a2a1a' : '#C4956A'} />
          <stop offset="100%" stopColor={darkMode ? '#051a0a' : '#A07A5A'} />
        </linearGradient>
        <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={darkMode ? '#1a2a1a' : '#3D2510'} />
          <stop offset="50%" stopColor={darkMode ? '#2a3a2a' : '#6B5040'} />
          <stop offset="100%" stopColor={darkMode ? '#1a2a1a' : '#4A3020'} />
        </linearGradient>
        <pattern id="sandTexture2" patternUnits="userSpaceOnUse" width="6" height="6">
          <circle cx="3" cy="3" r="0.8" fill={darkMode ? '#3a5a4a' : '#F0D8B0'} opacity="0.4" />
          <circle cx="1" cy="5" r="0.5" fill={darkMode ? '#2a4a3a' : '#E8D0A8'} opacity="0.3" />
        </pattern>
      </defs>
      
      {/* Island base */}
      <ellipse cx="200" cy="175" rx="180" ry="30" fill="url(#islandGrad2)" stroke={darkMode ? '#3a5a4a' : '#8B6344'} strokeWidth="5" />
      {/* Sand texture */}
      <ellipse cx="200" cy="175" rx="175" ry="27" fill="url(#sandTexture2)" />
      {/* Sand highlight stripe */}
      <ellipse cx="200" cy="165" rx="150" ry="15" fill={darkMode ? '#3a5a4a' : '#FFF0D8'} opacity="0.5" />
      {/* Wet sand near water */}
      <ellipse cx="200" cy="188" rx="170" ry="10" fill={darkMode ? '#0a2a1a' : '#A08060'} opacity="0.4" />
      {/* Shadow on sand */}
      <ellipse cx="180" cy="178" rx="60" ry="8" fill={darkMode ? '#0a1a0a' : '#8B6344'} opacity="0.3" />
      
      {/* Bottles washed up on shore */}
      {/* Green bottle */}
      <g transform="translate(320, 168) rotate(25)">
        <rect x="-4" y="-12" width="8" height="16" rx="2" fill={darkMode ? '#2a5a3a' : '#81B29A'} stroke={darkMode ? '#1a4a2a' : '#5A8A6A'} strokeWidth="1.5" />
        <rect x="-2" y="-16" width="4" height="5" fill={darkMode ? '#2a5a3a' : '#81B29A'} stroke={darkMode ? '#1a4a2a' : '#5A8A6A'} strokeWidth="1" />
        <ellipse cx="0" cy="-16" rx="2.5" ry="1.5" fill={darkMode ? '#4a3a2a' : '#A07A5A'} />
      </g>
      
      {/* Blue bottle */}
      <g transform="translate(90, 172) rotate(-10)">
        <rect x="-3" y="-10" width="6" height="12" rx="2" fill={darkMode ? '#2a4a6a' : '#5BA3B5'} stroke={darkMode ? '#1a3a5a' : '#3D8A9C'} strokeWidth="1.5" />
        <rect x="-1.5" y="-13" width="3" height="4" fill={darkMode ? '#2a4a6a' : '#5BA3B5'} stroke={darkMode ? '#1a3a5a' : '#3D8A9C'} strokeWidth="1" />
      </g>
      
      {/* Seashell */}
      <g transform="translate(250, 175)">
        <path d="M0 0 Q-8 -8 0 -12 Q8 -8 0 0" fill={darkMode ? '#6a5a5a' : '#F5E0D0'} stroke={darkMode ? '#4a4a4a' : '#D4B8A8'} strokeWidth="1.5" />
        <path d="M0 -2 L0 -10" stroke={darkMode ? '#4a4a4a' : '#D4B8A8'} strokeWidth="1" />
        <path d="M-3 -3 L-5 -9" stroke={darkMode ? '#4a4a4a' : '#D4B8A8'} strokeWidth="1" />
        <path d="M3 -3 L5 -9" stroke={darkMode ? '#4a4a4a' : '#D4B8A8'} strokeWidth="1" />
      </g>
      
      {/* Small starfish */}
      <g transform="translate(130, 178)">
        <path d="M0 -6 L1.5 -2 L6 -2 L2.5 1 L4 5 L0 2.5 L-4 5 L-2.5 1 L-6 -2 L-1.5 -2 Z" fill={darkMode ? '#6a4a4a' : '#E07A5F'} stroke={darkMode ? '#4a3a3a' : '#C45A45'} strokeWidth="1" />
      </g>
      
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
      
      {/* Coconuts cluster */}
      <circle cx="162" cy="55" r="6" fill={darkMode ? '#2a3a2a' : '#6B5040'} stroke={darkMode ? '#1a2a1a' : '#4A3020'} strokeWidth="2" />
      <circle cx="170" cy="58" r="5" fill={darkMode ? '#3a4a3a' : '#7B6050'} stroke={darkMode ? '#1a2a1a' : '#4A3020'} strokeWidth="2" />
      <circle cx="165" cy="62" r="4" fill={darkMode ? '#2a3a2a' : '#8B7060'} stroke={darkMode ? '#1a2a1a' : '#4A3020'} strokeWidth="1.5" />
      
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
    
    {/* CSS for shark animation */}
    <style>{`
      .shark-swim {
        animation: sharkSwim 8s ease-in-out infinite;
      }
      .shark-swim-slow {
        animation: sharkSwimSlow 12s ease-in-out infinite;
      }
      @keyframes sharkSwim {
        0%, 100% { transform: translateX(0) scaleX(1); }
        45% { transform: translateX(100px) scaleX(1); }
        50% { transform: translateX(100px) scaleX(-1); }
        95% { transform: translateX(0) scaleX(-1); }
      }
      @keyframes sharkSwimSlow {
        0%, 100% { transform: translateX(0) scaleX(-1); }
        45% { transform: translateX(-80px) scaleX(-1); }
        50% { transform: translateX(-80px) scaleX(1); }
        95% { transform: translateX(0) scaleX(1); }
      }
    `}</style>
  </div>
);

// Borderlands-style Sun
const BorderlandsSun = () => (
  <div 
    className="absolute"
    style={{
      top: '8%',
      right: '12%',
      width: '100px',
      height: '100px',
    }}
  >
    {/* Outer glow */}
    <div 
      className="absolute rounded-full"
      style={{
        top: '10px',
        left: '10px',
        width: '80px',
        height: '80px',
        background: 'radial-gradient(circle, rgba(255,215,0,0.4) 0%, rgba(255,215,0,0) 70%)',
        animation: 'pulse 3s ease-in-out infinite',
      }}
    />
    
    {/* Rays with bold outlines */}
    <div 
      className="absolute inset-0"
      style={{ animation: 'spin 60s linear infinite' }}
    >
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
            width: '8px',
            height: '28px',
            background: 'linear-gradient(to top, #FFD700, #FFEC8B)',
            border: '2px solid #DAA520',
            transformOrigin: 'center -15px',
            transform: `rotate(${i * 30}deg) translateY(-45px)`,
            borderRadius: '4px',
          }}
        />
      ))}
    </div>
    
    {/* Sun body with gradient */}
    <div 
      className="absolute rounded-full"
      style={{
        top: '15px',
        left: '15px',
        width: '70px',
        height: '70px',
        background: 'radial-gradient(circle at 30% 30%, #FFF8DC 0%, #FFE87C 20%, #FFD700 50%, #FFA500 100%)',
        border: '4px solid #DAA520',
        boxShadow: '0 0 40px rgba(255, 215, 0, 0.6), inset -8px -8px 20px rgba(255,140,0,0.4)',
      }}
    >
      {/* Kawaii eyes */}
      <div className="absolute" style={{ top: '20px', left: '15px', width: '12px', height: '14px' }}>
        <div className="absolute w-full h-full rounded-full" style={{ background: '#4A3000', border: '2px solid #2A1A00' }} />
        <div className="absolute rounded-full" style={{ width: '5px', height: '5px', background: 'white', top: '3px', left: '2px' }} />
      </div>
      <div className="absolute" style={{ top: '20px', right: '15px', width: '12px', height: '14px' }}>
        <div className="absolute w-full h-full rounded-full" style={{ background: '#4A3000', border: '2px solid #2A1A00' }} />
        <div className="absolute rounded-full" style={{ width: '5px', height: '5px', background: 'white', top: '3px', left: '2px' }} />
      </div>
      
      {/* Rosy cheeks */}
      <div className="absolute rounded-full" style={{ width: '10px', height: '6px', background: '#FF9999', opacity: 0.7, top: '32px', left: '8px' }} />
      <div className="absolute rounded-full" style={{ width: '10px', height: '6px', background: '#FF9999', opacity: 0.7, top: '32px', right: '8px' }} />
      
      {/* Happy smile */}
      <svg className="absolute" style={{ top: '36px', left: '50%', transform: 'translateX(-50%)' }} width="24" height="14" viewBox="0 0 24 14">
        <path d="M2 2 Q12 14 22 2" stroke="#4A3000" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  </div>
);

// Borderlands-style Moon with kawaii face
const BorderlandsMoon = () => (
  <div 
    className="absolute"
    style={{
      top: '10%',
      right: '10%',
      width: '90px',
      height: '90px',
    }}
  >
    {/* Outer glow */}
    <div 
      className="absolute rounded-full"
      style={{
        top: '5px',
        left: '5px',
        width: '80px',
        height: '80px',
        background: 'radial-gradient(circle, rgba(255,250,205,0.3) 0%, rgba(255,250,205,0) 70%)',
      }}
    />
    
    {/* Moon body */}
    <div 
      className="absolute rounded-full"
      style={{
        top: '10px',
        left: '10px',
        width: '70px',
        height: '70px',
        background: 'radial-gradient(circle at 30% 30%, #FFFFF0 0%, #FFFACD 30%, #F5F5DC 70%, #E8E8C8 100%)',
        border: '4px solid #B8B890',
        boxShadow: '0 0 25px rgba(255, 250, 205, 0.5), inset -6px -6px 15px rgba(200,200,180,0.4)',
      }}
    >
      {/* Craters */}
      <div className="absolute rounded-full" style={{ width: '10px', height: '10px', background: 'rgba(200,200,180,0.5)', border: '1px solid #B0B090', top: '8px', left: '12px' }} />
      <div className="absolute rounded-full" style={{ width: '8px', height: '8px', background: 'rgba(200,200,180,0.5)', border: '1px solid #B0B090', top: '45px', left: '40px' }} />
      <div className="absolute rounded-full" style={{ width: '6px', height: '6px', background: 'rgba(200,200,180,0.5)', border: '1px solid #B0B090', top: '20px', left: '45px' }} />
      
      {/* Kawaii eyes - sleepy/content */}
      <svg className="absolute" style={{ top: '22px', left: '12px' }} width="14" height="8" viewBox="0 0 14 8">
        <path d="M2 6 Q7 2 12 6" stroke="#6B6B50" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
      <svg className="absolute" style={{ top: '22px', right: '12px' }} width="14" height="8" viewBox="0 0 14 8">
        <path d="M2 6 Q7 2 12 6" stroke="#6B6B50" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
      
      {/* Rosy cheeks */}
      <div className="absolute rounded-full" style={{ width: '8px', height: '5px', background: '#FFB6C1', opacity: 0.6, top: '32px', left: '6px' }} />
      <div className="absolute rounded-full" style={{ width: '8px', height: '5px', background: '#FFB6C1', opacity: 0.6, top: '32px', right: '6px' }} />
      
      {/* Small content smile */}
      <svg className="absolute" style={{ top: '38px', left: '50%', transform: 'translateX(-50%)' }} width="16" height="10" viewBox="0 0 16 10">
        <path d="M3 3 Q8 9 13 3" stroke="#6B6B50" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    </div>
    
    {/* Stars around moon */}
    <div className="absolute" style={{ top: '-5px', right: '0px', fontSize: '10px', color: '#FFFACD', textShadow: '0 0 5px rgba(255,250,205,0.8)' }}>✦</div>
    <div className="absolute" style={{ bottom: '5px', left: '-5px', fontSize: '8px', color: '#FFFACD', textShadow: '0 0 5px rgba(255,250,205,0.8)' }}>✦</div>
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

const DaytimeSkyBackground = ({ scrollProgress, scrollY }) => (
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
    
    {/* Mountains - fade out as you scroll with parallax */}
    <div style={{ opacity: 1 - scrollProgress }}>
      <MountainRange darkMode={false} scrollOffset={scrollY} />
    </div>
    
    {/* Islands - fade in as you scroll */}
    <IslandScene darkMode={false} opacity={scrollProgress} />
  </div>
);

const StarryBackground = ({ scrollProgress, scrollY }) => (
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
    
    {/* Mountains - fade out as you scroll with parallax */}
    <div style={{ opacity: 1 - scrollProgress }}>
      <MountainRange darkMode={true} scrollOffset={scrollY} />
    </div>
    
    {/* Islands - fade in as you scroll */}
    <IslandScene darkMode={true} opacity={scrollProgress} />
  </div>
);

// Main Component
const JuanitoDev = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [expandedHobby, setExpandedHobby] = useState(null);
  const [showPostHanc, setShowPostHanc] = useState(false);
  const containerRef = useRef(null);

  // Track scroll progress for scenery transition and parallax
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const windowHeight = window.innerHeight;
      // Transition from mountains to islands over the first 1.5 screen heights
      const progress = Math.min(scrollTop / (windowHeight * 1.5), 1);
      setScrollProgress(progress);
      setScrollY(scrollTop);
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
      Icon: Atom,
      color: '#5BA3B5',
      label: 'Physics',
      sub: 'Quantum consciousness',
      mentor: { name: 'Roger Penrose', why: 'Orch-OR theory — consciousness arising from quantum processes in microtubules' },
      funFact: 'Currently obsessed with: the measurement problem and why observation seems to collapse possibilities into reality',
      bookRec: 'Next: "The Emperor\'s New Mind"'
    },
    {
      id: 'psychology',
      Icon: Brain,
      color: '#E07A5F',
      label: 'Psychology',
      sub: 'Evolution & decisions',
      mentor: { name: 'Richard Dawkins', why: 'The Selfish Gene changed how I see every human behavior' },
      funFact: 'Hot take: most of what we think is "choice" is just evolutionary programming running in the background',
      bookRec: 'Reading: "The Selfish Gene"'
    },
    {
      id: 'philosophy',
      Icon: Compass,
      color: '#9B59B6',
      label: 'Philosophy',
      sub: 'What is real?',
      mentor: { name: 'Immanuel Kant', why: 'We can never know things as they truly are — only as they appear through our senses' },
      funFact: 'The question that keeps me up: if our senses evolved for survival, not truth, what are we actually missing?',
      bookRec: 'Exploring: Epistemology & Metaphysics'
    },
    {
      id: 'systems',
      Icon: RefreshCw,
      color: '#81B29A',
      label: 'Systems',
      sub: 'Emergence & design',
      mentor: { name: 'Donella Meadows', why: 'Thinking in Systems — the most practical framework for understanding anything complex' },
      funFact: 'I see feedback loops everywhere now. Supply chains, coffee shops, relationships — it\'s all systems.',
      bookRec: 'Next: "Thinking in Systems"'
    }
  ];

  const journey = [
    { company: 'My Own Café', role: 'Founder', detail: 'The beginning' },
    { company: 'Blue Bottle', role: 'General Manager', detail: 'Chelsea & High Line' },
    { company: 'Califia Farms', role: 'Field Marketing Manager East', role2: 'Territory Dev Manager', detail: 'Northeast expansion' },
    { company: 'Numilk', role: 'Head of Sales', detail: 'National rollout' },
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
      {darkMode && <StarryBackground scrollProgress={scrollProgress} scrollY={scrollY} />}
      
      {/* Daytime sky for light mode */}
      {!darkMode && <DaytimeSkyBackground scrollProgress={scrollProgress} scrollY={scrollY} />}
      
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
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:opacity-70 transition-opacity cursor-pointer hidden md:block">About</a>
          <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="hover:opacity-70 transition-opacity cursor-pointer">Experience</a>
          <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hover:opacity-70 transition-opacity cursor-pointer">Projects</a>
          <a href="#interests" onClick={(e) => scrollToSection(e, 'interests')} className="hover:opacity-70 transition-opacity cursor-pointer hidden md:block">Interests</a>
          <a href="#hobbies" onClick={(e) => scrollToSection(e, 'hobbies')} className="hover:opacity-70 transition-opacity cursor-pointer">Hobbies</a>
          <a href="#connect" onClick={(e) => scrollToSection(e, 'connect')} className="hover:opacity-70 transition-opacity cursor-pointer">Connect</a>
          
          {/* Dark mode toggle */}
          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 p-2 rounded-full transition-all duration-300 hover:scale-110"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              color: theme.textMuted
            }}
            aria-label="Toggle dark mode"
            whileTap={{ scale: 0.9, rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-4 md:px-8 pt-24 md:pt-20 relative overflow-hidden">
        
        <motion.div 
          className="max-w-3xl text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Name */}
          <h1 className="text-4xl md:text-6xl font-light leading-tight mb-2" style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            letterSpacing: '-0.02em',
            color: theme.text,
            textShadow: darkMode ? 'none' : '0 2px 10px rgba(255,255,255,0.8)'
          }}>
            Juan Hernandez
          </h1>
          
          {/* Subtext - From Utuado */}
          <p className="text-base md:text-lg mb-4" style={{ 
            color: theme.textSubtle,
            textShadow: darkMode ? 'none' : '0 1px 8px rgba(255,255,255,0.9)'
          }}>
            From Utuado, Puerto Rico's mountains
          </p>
          
          {/* Currently Reading - smaller pill */}
          <div 
            className={`inline-block px-4 py-2 rounded-full mb-8 relative ${darkMode ? 'neon-flicker' : ''}`}
            style={{
              background: darkMode 
                ? 'rgba(20, 20, 50, 0.9)'
                : 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
              color: darkMode ? '#81B29A' : '#5B8C5A',
              border: darkMode 
                ? '2px solid #81B29A'
                : '1px solid rgba(0,0,0,0.08)',
              boxShadow: darkMode 
                ? '0 0 10px #81B29A, 0 0 20px rgba(129, 178, 154, 0.5), 0 0 40px rgba(129, 178, 154, 0.3)'
                : '0 4px 12px rgba(0,0,0,0.08)',
              fontFamily: darkMode ? "'Instrument Serif', Georgia, serif" : 'inherit',
              fontSize: '0.75rem',
              letterSpacing: darkMode ? '0.05em' : 'normal'
            }}
          >
            {darkMode && (
              <div 
                className="absolute inset-0 rounded-full opacity-30 blur-xl neon-glow"
                style={{ background: '#81B29A' }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <BookOpen className="w-3 h-3" />
              Currently reading: <span style={{ fontStyle: 'italic' }}>The Selfish Gene</span>
            </span>
          </div>
          
          <div className="flex justify-center mb-4">
            <Squiggle color="#E07A5F" width={150} />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-light leading-tight mb-8" style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            letterSpacing: '-0.02em',
            color: theme.text,
            textShadow: darkMode ? 'none' : '0 2px 10px rgba(255,255,255,0.8)'
          }}>
            Building beverage programs
          </h2>
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
        </motion.div>
      </section>

      {/* About / Background */}
      <section id="about" className="py-20 md:py-24 px-4 md:px-8 relative z-10" style={{ scrollMarginTop: '80px' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs tracking-widest uppercase" style={{ color: theme.textSubtle }}>01</span>
            <div className="w-8 h-0.5" style={{ background: darkMode ? 'rgba(255,255,255,0.2)' : '#D4C4B0' }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: theme.textSubtle }}>Background</span>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-light leading-snug mb-8" style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                color: theme.text
              }}>
                I grew up in Caguana, Utuado — surrounded by Taíno heritage, citrus hybrids, coffee, wild raspberries, and a fully functioning animal farm.
              </h2>
              <Squiggle color="#81B29A" width={80} />
              <div className="space-y-6 text-base leading-relaxed mt-8" style={{ color: theme.textMuted }}>
                <p>
                  Puerto Rico shaped how I see the world. The mountains, the culture, the resilience of the people — 
                  it all comes with me wherever I go.
                </p>
                <p>
                  I studied Computer Science, but found my first real passion behind an espresso machine. 
                  That led me down a path I never expected — from barista to café owner to beverage industry executive.
                </p>
                <p>
                  Now based in Brooklyn, I'm an aspiring polymath — still chasing that intersection of craft, technology, and human connection.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-80 rounded-3xl overflow-hidden" style={{
                  border: `3px solid ${theme.cardBorder}`,
                  boxShadow: `8px 8px 0px ${theme.cardShadow}`
                }}>
                  <img 
                    src="/juan.jpg" 
                    alt="Juan in a blue cloud sweater holding a fancy drink"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-full text-sm" style={{
                  background: '#E07A5F',
                  color: 'white',
                  boxShadow: '0 2px 8px rgba(224, 122, 95, 0.4)'
                }}>
                  📍 Brooklyn, NY
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-20 md:py-24 px-4 md:px-8 relative z-10" style={{ background: theme.sectionAlt, scrollMarginTop: '80px' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs tracking-widest uppercase" style={{ color: theme.textSubtle }}>02</span>
            <div className="w-8 h-0.5" style={{ background: darkMode ? 'rgba(255,255,255,0.2)' : '#D4C4B0' }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: theme.textSubtle }}>Experience</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light leading-snug mb-4" style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            color: theme.text
          }}>
            Almost 20 years in specialty coffee & beverage
          </h2>
          <Squiggle color="#E07A5F" width={100} />
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Current Adventure */}
            <div className="p-8 rounded-3xl relative overflow-hidden" style={{ 
              background: darkMode 
                ? 'linear-gradient(135deg, #1a1a3e 0%, #24243e 100%)'
                : 'linear-gradient(135deg, #FFF8F0 0%, #FAF6F1 50%, #FDF3E7 100%)',
              border: `3px solid ${theme.cardBorder}`,
              boxShadow: `8px 8px 0px ${theme.cardShadow}`
            }}>
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${darkMode ? 'ffffff' : 'E07A5F'}' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-6" style={{
                  background: darkMode 
                    ? 'linear-gradient(135deg, #E07A5F 0%, #c96a52 100%)'
                    : 'linear-gradient(135deg, #E07A5F 0%, #d4705a 100%)',
                  color: 'white',
                  boxShadow: '0 2px 8px rgba(224, 122, 95, 0.4)'
                }}>
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  Current Role
                </div>
                
                <h3 className="text-2xl md:text-3xl font-medium mb-2" style={{ 
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  color: theme.text
                }}>
                  Vita Coco 🥥
                </h3>
                <h3 className="text-lg md:text-xl font-medium mb-2" style={{ 
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  color: theme.accent
                }}>
                  Director of Foodservice Commercial Sales
                </h3>
                <p className="text-sm mb-5 flex items-center gap-2" style={{ color: theme.textSubtle }}>
                  <MapPin className="w-3 h-3" />
                  Union Square, New York
                </p>
                
                <p className="text-base md:text-sm mb-4 leading-relaxed" style={{ color: theme.textMuted }}>
                  Spearhead the commercial strategy and national expansion of Vita Coco's foodservice portfolio. 
                  Driving revenue growth, velocity, and brand visibility across QSR, Fast Casual, Specialty Coffee, and Hospitality.
                </p>
                
                <div className="space-y-3 mb-5">
                  {[
                    { title: 'Strategic Growth', desc: 'Develop and execute go-to-market strategies that increase distribution and market share.' },
                    { title: 'National Partnerships', desc: 'Identify, negotiate, and secure partnerships with key national accounts and hospitality groups.' },
                    { title: 'Menu Innovation', desc: 'Consult with partners on menu development, LTOs, and drink applications that drive velocity.' },
                    { title: 'Cross-Functional Leadership', desc: 'Collaborate with marketing, supply chain, and finance on large-scale rollouts.' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#E07A5F' }} />
                      <div>
                        <span className="text-sm font-medium" style={{ color: theme.text }}>{item.title}: </span>
                        <span className="text-sm" style={{ color: theme.textMuted }}>{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {['Food Service', 'Commercial Strategy', 'Key Account Management', 'Go-to-Market', 'Beverage Industry'].map(skill => (
                    <span key={skill} className="px-3 py-1 rounded-full text-xs" style={{
                      background: darkMode ? 'rgba(224, 122, 95, 0.2)' : 'rgba(224, 122, 95, 0.15)',
                      color: '#E07A5F',
                      border: '1px solid rgba(224, 122, 95, 0.3)'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Journey */}
            <div className="p-6 rounded-2xl" style={{ 
              background: darkMode ? '#1a1a3e' : 'linear-gradient(180deg, #F5EDE6 0%, #FAF6F1 100%)',
              border: `2px solid ${theme.cardBorder}`
            }}>
              <span className="text-xs tracking-widest uppercase block mb-5" style={{ color: theme.textSubtle }}>
                The journey here
              </span>
              <div className="space-y-4">
                {journey.map((stop, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-3 h-3 rounded-full mt-1.5" style={{
                        background: 'linear-gradient(135deg, #E07A5F 0%, #c96a52 100%)',
                        boxShadow: '0 2px 4px rgba(224, 122, 95, 0.3)'
                      }} />
                      {i < journey.length - 1 && (
                        <div className="w-0.5 h-12 mt-1" style={{
                          background: darkMode ? 'rgba(255,255,255,0.1)' : '#D4C4B0'
                        }} />
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <p className="font-semibold text-base md:text-sm" style={{ color: theme.text }}>{stop.company}</p>
                      <p className="text-sm md:text-xs" style={{ color: theme.textMuted }}>{stop.role}</p>
                      {stop.role2 && (
                        <p className="text-sm md:text-xs" style={{ color: theme.textMuted }}>{stop.role2}</p>
                      )}
                      <p className="text-sm md:text-xs mt-1 italic" style={{ color: theme.textSubtle }}>{stop.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Day to day */}
          <div className="mt-8 p-6 rounded-2xl" style={{ 
            background: theme.inputBg,
            border: `2px solid ${darkMode ? 'rgba(224, 122, 95, 0.2)' : 'rgba(224, 122, 95, 0.3)'}`
          }}>
            <span className="text-xs tracking-widest uppercase block mb-4" style={{ color: theme.textSubtle }}>
              The day-to-day
            </span>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                'Collaborating with R&D on signature drinks',
                'Building national account relationships',
                'Designing beverage programs',
                'Strategic account planning',
                'Trade shows across the country',
                'Market expansion strategy'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-2 rounded-lg">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#E07A5F' }} />
                  <span className="text-base md:text-sm" style={{ color: theme.textMuted }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 md:py-24 px-4 md:px-8 relative z-10" style={{ scrollMarginTop: '80px' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs tracking-widest uppercase" style={{ color: theme.textSubtle }}>03</span>
              <div className="w-8 h-0.5" style={{ background: darkMode ? 'rgba(255,255,255,0.2)' : '#D4C4B0' }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: theme.textSubtle }}>Projects</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light leading-snug mb-4" style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              color: theme.text
            }}>
              Tools I build, problems I solve
            </h2>
            <p className="text-base mb-4" style={{ color: theme.textMuted }}>
              I code to make my work easier — and sometimes just for fun.
            </p>
            <Squiggle color="#E07A5F" width={100} />
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-6 mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
          >
            {/* Foodservice Market Map - Featured Next Project */}
            <div className="rounded-3xl overflow-hidden group transition-all duration-300 hover:translate-y-[-4px]" style={{
              background: darkMode 
                ? 'linear-gradient(135deg, #1a2a3a 0%, #0d1a2a 100%)'
                : 'linear-gradient(135deg, #E8F4F8 0%, #D0E8F0 100%)',
              border: `3px solid ${darkMode ? '#2a4a5a' : '#B0D0E0'}`,
              boxShadow: `8px 8px 0px ${darkMode ? '#0a1a2a' : '#90B0C0'}`
            }}>
              <div className="h-48 relative overflow-hidden flex items-center justify-center">
                {/* Map grid pattern */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23${darkMode ? 'ffffff' : '3D8A9C'}' stroke-width='1'%3E%3Cpath d='M0 20h40M20 0v40'/%3E%3C/g%3E%3C/svg%3E")`,
                }} />
                {/* Animated pins */}
                <div className="relative w-full h-full">
                  <MapPin className="absolute text-red-500 w-6 h-6 animate-bounce" style={{ top: '20%', left: '25%', animationDelay: '0s' }} />
                  <MapPin className="absolute text-blue-500 w-5 h-5 animate-bounce" style={{ top: '40%', left: '60%', animationDelay: '0.2s' }} />
                  <MapPin className="absolute text-green-500 w-6 h-6 animate-bounce" style={{ top: '60%', left: '35%', animationDelay: '0.4s' }} />
                  <MapPin className="absolute text-yellow-500 w-5 h-5 animate-bounce" style={{ top: '30%', left: '75%', animationDelay: '0.6s' }} />
                  <MapPin className="absolute text-purple-500 w-6 h-6 animate-bounce" style={{ top: '70%', left: '70%', animationDelay: '0.8s' }} />
                </div>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ 
                    background: 'rgba(224, 122, 95, 0.3)', 
                    color: '#E07A5F',
                    border: '1px solid rgba(224, 122, 95, 0.4)'
                  }}>
                    Building Now
                  </span>
                </div>
              </div>
              <div className="p-6" style={{ background: theme.cardBg }}>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2" style={{ color: theme.text, fontFamily: "'Instrument Serif', Georgia, serif" }}>
                  <MapPin className="w-5 h-5" style={{ color: '#E07A5F' }} />
                  Foodservice Market Map
                </h3>
                <p className="text-base md:text-sm mb-4" style={{ color: theme.textMuted }}>
                  Territory planning tool I'm building for my team. Visualize accounts, track voids, and find whitespace opportunities by region.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Mapbox', 'Supabase'].map(tech => (
                    <span key={tech} className="px-2 py-1 rounded text-xs" style={{ 
                      background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', 
                      color: theme.textSubtle 
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* SipSignal - Beverage Trend Intelligence */}
            <div className="rounded-3xl overflow-hidden group transition-all duration-300 hover:translate-y-[-4px] relative" style={{
              background: darkMode 
                ? 'linear-gradient(135deg, #2a1a3a 0%, #1a0d2a 100%)'
                : 'linear-gradient(135deg, #F8E8F8 0%, #F0D8F0 100%)',
              border: `3px solid ${darkMode ? '#4a2a5a' : '#D0A0D0'}`,
              boxShadow: `8px 8px 0px ${darkMode ? '#1a0a2a' : '#B080B0'}`
            }}>
              <div className="h-48 relative overflow-hidden flex items-center justify-center">
                {/* Trend lines animation */}
                <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 200 100" preserveAspectRatio="none">
                  <path d="M0 80 Q50 60 100 50 T200 30" stroke={darkMode ? '#81B29A' : '#5B8C5A'} strokeWidth="2" fill="none" />
                  <path d="M0 70 Q50 50 100 60 T200 40" stroke={darkMode ? '#E07A5F' : '#c96a52'} strokeWidth="2" fill="none" />
                  <path d="M0 90 Q50 70 100 40 T200 20" stroke={darkMode ? '#9B59B6' : '#8E44AD'} strokeWidth="2" fill="none" />
                </svg>
                <div className="relative z-10 text-center">
                  <TrendingUp className="w-16 h-16 mx-auto mb-2" style={{ color: darkMode ? '#9B59B6' : '#8E44AD' }} />
                </div>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ 
                    background: 'rgba(129, 178, 154, 0.2)', 
                    color: '#81B29A',
                    border: '1px solid rgba(129, 178, 154, 0.3)'
                  }}>
                    In Development
                  </span>
                </div>
              </div>
              <div className="p-6" style={{ background: theme.cardBg }}>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2" style={{ color: theme.text, fontFamily: "'Instrument Serif', Georgia, serif" }}>
                  <Sparkles className="w-5 h-5" style={{ color: '#9B59B6' }} />
                  SipSignal
                </h3>
                <p className="text-base md:text-sm mb-4" style={{ color: theme.textMuted }}>
                  Beverage trend intelligence. Track emerging drinks, flavor profiles, and market signals from across the foodservice industry.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['AI/ML', 'Web Scraping', 'Analytics'].map(tech => (
                    <span key={tech} className="px-2 py-1 rounded text-xs" style={{ 
                      background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', 
                      color: theme.textSubtle 
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Agents & Automation */}
            <div className="rounded-3xl overflow-hidden group transition-all duration-300 hover:translate-y-[-4px]" style={{
              background: darkMode 
                ? 'linear-gradient(135deg, #1a2a3a 0%, #0d1a2a 100%)'
                : 'linear-gradient(135deg, #E8F0F8 0%, #D8E8F0 100%)',
              border: `3px solid ${darkMode ? '#2a4a6a' : '#A0C0D0'}`,
              boxShadow: `8px 8px 0px ${darkMode ? '#0a1a2a' : '#80A0B0'}`
            }}>
              <div className="h-48 relative overflow-hidden flex items-center justify-center">
                {/* Neural network pattern */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23${darkMode ? '81B29A' : '3D8A9C'}' stroke-width='1'%3E%3Ccircle cx='10' cy='10' r='3'/%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3Ccircle cx='50' cy='10' r='3'/%3E%3Ccircle cx='50' cy='50' r='3'/%3E%3Ccircle cx='10' cy='50' r='3'/%3E%3Cpath d='M10 10L30 30M50 10L30 30M50 50L30 30M10 50L30 30'/%3E%3C/g%3E%3C/svg%3E")`,
                }} />
                <div className="relative z-10 text-center">
                  <Bot className="w-16 h-16 mx-auto" style={{ color: darkMode ? '#81B29A' : '#3D8A9C' }} />
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ 
                    background: 'rgba(129, 178, 154, 0.2)', 
                    color: '#81B29A',
                    border: '1px solid rgba(129, 178, 154, 0.3)'
                  }}>
                    Experimenting
                  </span>
                </div>
              </div>
              <div className="p-6" style={{ background: theme.cardBg }}>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2" style={{ color: theme.text, fontFamily: "'Instrument Serif', Georgia, serif" }}>
                  <Bot className="w-5 h-5" style={{ color: '#3D8A9C' }} />
                  AI Agents & Automation
                </h3>
                <p className="text-base md:text-sm mb-4" style={{ color: theme.textMuted }}>
                  Building AI-powered tools for sales management, data gathering, and workflow automation. Exploring how emerging tech can give commercial teams an edge.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['LLMs', 'Automation', 'Data Pipelines'].map(tech => (
                    <span key={tech} className="px-2 py-1 rounded text-xs" style={{ 
                      background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', 
                      color: theme.textSubtle 
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Beverage Calculator */}
            <a 
              href="/calculator" 
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-3xl overflow-hidden group transition-all duration-300 hover:translate-y-[-4px] block cursor-pointer"
              style={{
                background: theme.cardBg,
                border: `3px solid ${theme.cardBorder}`,
                boxShadow: `8px 8px 0px ${theme.cardShadow}`,
                textDecoration: 'none'
              }}
            >
              <div className="h-48 relative overflow-hidden flex items-center justify-center" style={{
                background: darkMode 
                  ? 'linear-gradient(135deg, rgba(91, 163, 181, 0.2) 0%, rgba(61, 138, 156, 0.3) 100%)'
                  : 'linear-gradient(135deg, #E0F4FF 0%, #B0E0E6 100%)'
              }}>
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{
                  background: darkMode ? 'rgba(91, 163, 181, 0.3)' : 'rgba(91, 163, 181, 0.2)'
                }}>
                  <Calculator className="w-10 h-10" style={{ color: '#3D8A9C' }} />
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ 
                    background: 'rgba(129, 178, 154, 0.2)', 
                    color: '#81B29A',
                    border: '1px solid rgba(129, 178, 154, 0.3)'
                  }}>
                    Live
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ 
                    background: '#E07A5F', 
                    color: 'white'
                  }}>
                    Try it →
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: theme.text, fontFamily: "'Instrument Serif', Georgia, serif" }}>
                  Beverage Program Calculator
                </h3>
                <p className="text-base md:text-sm mb-4" style={{ color: theme.textMuted }}>
                  Calculate drink costs, pricing, and profit margins. Built for operators who need quick answers.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Cost Analysis', 'Free'].map(tech => (
                    <span key={tech} className="px-2 py-1 rounded text-xs" style={{ 
                      background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', 
                      color: theme.textSubtle 
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </a>

            {/* Recipe Scaler */}
            <a 
              href="/scaler" 
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-3xl overflow-hidden group transition-all duration-300 hover:translate-y-[-4px] block cursor-pointer"
              style={{
                background: theme.cardBg,
                border: `3px solid ${theme.cardBorder}`,
                boxShadow: `8px 8px 0px ${theme.cardShadow}`,
                textDecoration: 'none'
              }}
            >
              <div className="h-48 relative overflow-hidden flex items-center justify-center" style={{
                background: darkMode 
                  ? 'linear-gradient(135deg, rgba(224, 122, 95, 0.2) 0%, rgba(180, 90, 70, 0.3) 100%)'
                  : 'linear-gradient(135deg, #FFF0E8 0%, #FFE0D0 100%)'
              }}>
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{
                  background: darkMode ? 'rgba(224, 122, 95, 0.3)' : 'rgba(224, 122, 95, 0.2)'
                }}>
                  <Scale className="w-10 h-10" style={{ color: '#E07A5F' }} />
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ 
                    background: 'rgba(129, 178, 154, 0.2)', 
                    color: '#81B29A',
                    border: '1px solid rgba(129, 178, 154, 0.3)'
                  }}>
                    Live
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ 
                    background: '#E07A5F', 
                    color: 'white'
                  }}>
                    Try it →
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: theme.text, fontFamily: "'Instrument Serif', Georgia, serif" }}>
                  Recipe Scaler
                </h3>
                <p className="text-base md:text-sm mb-4" style={{ color: theme.textMuted }}>
                  Scale drinks from single servings to batches. Convert between oz, ml, cups, and more.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Unit Conversion', 'Free'].map(tech => (
                    <span key={tech} className="px-2 py-1 rounded text-xs" style={{ 
                      background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', 
                      color: theme.textSubtle 
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </a>

            {/* This Portfolio */}
            <div className="rounded-3xl overflow-hidden group transition-all duration-300 hover:translate-y-[-4px]" style={{
              background: theme.cardBg,
              border: `3px solid ${theme.cardBorder}`,
              boxShadow: `8px 8px 0px ${theme.cardShadow}`
            }}>
              <div className="h-48 relative overflow-hidden" style={{
                background: darkMode 
                  ? 'linear-gradient(180deg, #0a0a20 0%, #1a1a3e 100%)'
                  : 'linear-gradient(180deg, #5B9BD5 0%, #87CEEB 100%)'
              }}>
                {/* Sun/Moon */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full" style={{
                  background: darkMode ? '#FFFACD' : '#FFD700',
                  boxShadow: '0 0 15px rgba(255, 215, 0, 0.5)'
                }} />
                {/* Clouds */}
                <svg className="absolute" style={{ top: '25%', left: '10%' }} width="60" height="30" viewBox="0 0 60 30">
                  <ellipse cx="20" cy="20" rx="18" ry="10" fill={darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.9)'} />
                  <ellipse cx="35" cy="18" rx="14" ry="8" fill={darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.9)'} />
                  <ellipse cx="48" cy="20" rx="12" ry="8" fill={darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.9)'} />
                </svg>
                <svg className="absolute" style={{ top: '40%', right: '15%' }} width="50" height="25" viewBox="0 0 50 25">
                  <ellipse cx="15" cy="16" rx="14" ry="8" fill={darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.85)'} />
                  <ellipse cx="30" cy="14" rx="12" ry="7" fill={darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.85)'} />
                  <ellipse cx="40" cy="16" rx="10" ry="6" fill={darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.85)'} />
                </svg>
                <svg className="absolute" style={{ bottom: '20%', left: '30%' }} width="45" height="22" viewBox="0 0 45 22">
                  <ellipse cx="12" cy="14" rx="11" ry="6" fill={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.8)'} />
                  <ellipse cx="25" cy="12" rx="10" ry="6" fill={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.8)'} />
                  <ellipse cx="35" cy="14" rx="9" ry="5" fill={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.8)'} />
                </svg>
                <div className="absolute bottom-4 left-4">
                  <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ 
                    background: 'rgba(224, 122, 95, 0.2)', 
                    color: '#E07A5F',
                    border: '1px solid rgba(224, 122, 95, 0.3)'
                  }}>
                    Live
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: theme.text, fontFamily: "'Instrument Serif', Georgia, serif" }}>
                  juanito.dev
                </h3>
                <p className="text-base md:text-sm mb-4" style={{ color: theme.textMuted }}>
                  This site. A personal portfolio built to share who I am.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Tailwind', 'Vite'].map(tech => (
                    <span key={tech} className="px-2 py-1 rounded text-xs" style={{ 
                      background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', 
                      color: theme.textSubtle 
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Primordial Soup */}
            <div className="rounded-3xl overflow-hidden group transition-all duration-300 hover:translate-y-[-4px]" style={{
              background: darkMode 
                ? 'linear-gradient(135deg, #1a2a2a 0%, #0d1a1a 100%)'
                : 'linear-gradient(135deg, #E8F8F0 0%, #D0F0E0 100%)',
              border: `3px solid ${darkMode ? '#2a4a4a' : '#A0D0B0'}`,
              boxShadow: `8px 8px 0px ${darkMode ? '#0a1a1a' : '#80B090'}`
            }}>
              <div className="h-48 relative overflow-hidden">
                <BubblingMolecules />
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0d1a1a] to-transparent" style={{
                  background: darkMode 
                    ? 'linear-gradient(to top, #0d1a1a, transparent)'
                    : 'linear-gradient(to top, #D0F0E0, transparent)'
                }} />
                <div className="absolute bottom-4 left-4">
                  <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ 
                    background: 'rgba(129, 178, 154, 0.2)', 
                    color: '#81B29A',
                    border: '1px solid rgba(129, 178, 154, 0.3)'
                  }}>
                    In Development
                  </span>
                </div>
              </div>
              <div className="p-6" style={{ background: theme.cardBg }}>
                <h3 className="text-xl font-semibold mb-2" style={{ color: theme.text, fontFamily: "'Instrument Serif', Georgia, serif" }}>
                  Primordial Soup 🧬
                </h3>
                <p className="text-base md:text-sm mb-4" style={{ color: theme.textMuted }}>
                  An evolution simulation where chemistry meets life. Watch elements combine, molecules form, and creatures emerge.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Phaser', 'React', 'WebGL'].map(tech => (
                    <span key={tech} className="px-2 py-1 rounded text-xs" style={{ 
                      background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', 
                      color: theme.textSubtle 
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Post Hanc - Mobile Game */}
            <div 
              className="rounded-3xl overflow-hidden group transition-all duration-300 hover:translate-y-[-4px] cursor-pointer"
              style={{
                background: darkMode 
                  ? 'linear-gradient(135deg, #2a2a1a 0%, #1a1a0d 100%)'
                  : 'linear-gradient(135deg, #F8F0E0 0%, #F0E8D0 100%)',
                border: `3px solid ${darkMode ? '#4a4a2a' : '#D0C0A0'}`,
                boxShadow: `8px 8px 0px ${darkMode ? '#1a1a0a' : '#B0A080'}`
              }}
              onClick={() => setShowPostHanc(true)}
            >
              <div className="h-48 relative overflow-hidden flex items-center justify-center">
                {/* Ancient/mystical pattern */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23${darkMode ? 'D4A574' : '8B7355'}' stroke-width='1'%3E%3Cpath d='M20 0v40M0 20h40M10 10l20 20M30 10L10 30'/%3E%3C/g%3E%3C/svg%3E")`,
                }} />
                <div className="relative z-10 text-center">
                  <span className="text-5xl">⚔️</span>
                </div>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ 
                    background: 'rgba(212, 165, 116, 0.2)', 
                    color: '#D4A574',
                    border: '1px solid rgba(212, 165, 116, 0.3)'
                  }}>
                    Since 2020
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ 
                    background: 'rgba(224, 122, 95, 0.2)', 
                    color: '#E07A5F',
                    border: '1px solid rgba(224, 122, 95, 0.3)'
                  }}>
                    Passion Project
                  </span>
                </div>
              </div>
              <div className="p-6" style={{ background: theme.cardBg }}>
                <h3 className="text-xl font-semibold mb-2" style={{ color: theme.text, fontFamily: "'Instrument Serif', Georgia, serif" }}>
                  Post Hanc
                </h3>
                <p className="text-base md:text-sm mb-4" style={{ color: theme.textMuted }}>
                  A mobile game in development since 2020. A passion project with a rich storyline that explores the echoes of choices across time.
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {['Unity', 'C#', 'Narrative'].map(tech => (
                    <span key={tech} className="px-2 py-1 rounded text-xs" style={{ 
                      background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', 
                      color: theme.textSubtle 
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="text-sm md:text-xs" style={{ color: theme.accent }}>Click to see more →</span>
              </div>
            </div>

            
            {/* More coming - spans all 3 columns */}
            <div className="md:col-span-3 p-8 rounded-2xl text-center" style={{ 
              background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
              border: `2px dashed ${darkMode ? 'rgba(255,255,255,0.25)' : '#B0A090'}`
            }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{
                background: darkMode ? 'rgba(242, 204, 143, 0.25)' : 'rgba(242, 204, 143, 0.4)',
                border: `2px solid ${darkMode ? 'rgba(212, 165, 116, 0.4)' : 'rgba(212, 165, 116, 0.5)'}`
              }}>
                <Construction className="w-7 h-7" style={{ color: '#C49664' }} />
              </div>
              <p className="text-base font-medium mb-1" style={{ color: theme.text }}>
                More on the way
              </p>
              <p className="text-base md:text-sm" style={{ color: theme.textMuted }}>
                Always building something new.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interests */}
      <section id="interests" className="py-20 md:py-24 px-4 md:px-8 relative z-10" style={{ background: theme.sectionAlt, scrollMarginTop: '80px' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs tracking-widest uppercase" style={{ color: theme.textSubtle }}>04</span>
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
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: `${item.color}20` }}>
                      <item.Icon className="w-6 h-6" style={{ color: item.color }} />
                    </div>
                    <h3 className="font-semibold text-lg mb-1" style={{ color: theme.text }}>{item.label}</h3>
                    <p className="text-base md:text-sm" style={{ color: theme.textSubtle }}>{item.sub}</p>
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
                        <h4 className="font-medium text-base md:text-sm" style={{ color: theme.text }}>{item.mentor.name}</h4>
                        <p className="text-base md:text-sm" style={{ color: theme.textMuted }}>{item.mentor.why}</p>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl mb-4" style={{ background: theme.inputBg, border: `1px dashed ${darkMode ? 'rgba(255,255,255,0.1)' : '#D4C4B0'}` }}>
                      <p className="text-base md:text-sm italic" style={{ color: theme.textMuted }}>{item.funFact}</p>
                    </div>
                    
                    <p className="text-sm md:text-xs flex items-center gap-2" style={{ color: theme.textSubtle }}>
                      <BookOpen className="w-4 h-4" />
                      {item.bookRec}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hobbies */}
      <section id="hobbies" className="py-20 md:py-24 px-4 md:px-8 relative z-10" style={{ scrollMarginTop: '80px' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs tracking-widest uppercase" style={{ color: theme.textSubtle }}>05</span>
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
          
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {/* Ceramics */}
            <div 
              className="rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:translate-x-1"
              style={{
                background: theme.cardBg,
                border: `3px solid ${theme.cardBorder}`,
                boxShadow: `6px 6px 0px ${theme.cardShadow}`
              }}
              onClick={() => setExpandedHobby(expandedHobby === 'ceramics' ? null : 'ceramics')}
            >
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: darkMode ? 'rgba(212, 165, 116, 0.2)' : 'rgba(212, 165, 116, 0.15)' }}>
                    <Palette className="w-6 h-6" style={{ color: '#D4A574' }} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: theme.text }}>Ceramics</h3>
                  <p className="text-base md:text-sm mb-4" style={{ color: theme.textMuted }}>
                    My way of slowing down. There's something grounding about working with clay — no screens, just your hands shaping something real.
                  </p>
                  <span className="text-sm md:text-xs" style={{ color: theme.accent }}>Click to learn more →</span>
                </div>
                <div className="w-full md:w-48 h-40 md:h-auto flex items-center justify-center" style={{ 
                  background: darkMode ? 'rgba(40, 40, 70, 0.8)' : 'repeating-linear-gradient(45deg, #F5EDE6, #F5EDE6 10px, #FAF6F1 10px, #FAF6F1 20px)',
                  borderLeft: `2px dashed ${darkMode ? 'rgba(255,255,255,0.1)' : '#D4C4B0'}`
                }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: darkMode ? 'rgba(212, 165, 116, 0.3)' : 'rgba(212, 165, 116, 0.25)' }}>
                    <Soup className="w-8 h-8" style={{ color: '#C49664' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Game Dev */}
            <div 
              className="rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:translate-x-1"
              style={{
                background: theme.cardBg,
                border: `3px solid ${theme.cardBorder}`,
                boxShadow: `6px 6px 0px ${theme.cardShadow}`
              }}
              onClick={() => setExpandedHobby(expandedHobby === 'gamedev' ? null : 'gamedev')}
            >
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: darkMode ? 'rgba(129, 178, 154, 0.2)' : 'rgba(129, 178, 154, 0.15)' }}>
                    <Gamepad2 className="w-6 h-6" style={{ color: '#81B29A' }} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: theme.text }}>Game Dev</h3>
                  <p className="text-base md:text-sm mb-4" style={{ color: theme.textMuted }}>
                    Building worlds where systems thinking meets play. Currently crafting "Primordial Soup" — an evolution sim.
                  </p>
                  <span className="text-sm md:text-xs" style={{ color: theme.accent }}>Click to learn more →</span>
                </div>
                <div className="w-full md:w-48 h-40 md:h-auto flex items-center justify-center relative overflow-hidden" style={{ 
                  background: 'linear-gradient(180deg, #2D3A3A 0%, #1A2626 100%)',
                  borderLeft: '2px dashed #81B29A'
                }}>
                  <BubblingMolecules />
                  <div className="relative z-10">
                    <KawaiiFace />
                  </div>
                </div>
              </div>
            </div>

            {/* Bouldering */}
            <div 
              className="rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:translate-x-1"
              style={{
                background: theme.cardBg,
                border: `3px solid ${theme.cardBorder}`,
                boxShadow: `6px 6px 0px ${theme.cardShadow}`
              }}
              onClick={() => setExpandedHobby(expandedHobby === 'bouldering' ? null : 'bouldering')}
            >
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: darkMode ? 'rgba(224, 122, 95, 0.2)' : 'rgba(224, 122, 95, 0.15)' }}>
                    <Mountain className="w-6 h-6" style={{ color: '#E07A5F' }} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: theme.text }}>Bouldering</h3>
                  <p className="text-base md:text-sm mb-4" style={{ color: theme.textMuted }}>
                    Problem-solving with your body. Every route is a puzzle that demands both strength and strategy.
                  </p>
                  <span className="text-sm md:text-xs" style={{ color: theme.accent }}>Click to learn more →</span>
                </div>
                <div className="w-full md:w-48 h-40 md:h-auto flex items-center justify-center relative overflow-hidden" style={{ 
                  background: 'linear-gradient(180deg, #3D405B 0%, #2C3049 100%)',
                  borderLeft: '2px solid #4A4E6A'
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

            {/* Drink Creations */}
            <div 
              className="rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:translate-x-1"
              style={{
                background: theme.cardBg,
                border: `3px solid ${theme.cardBorder}`,
                boxShadow: `6px 6px 0px ${theme.cardShadow}`
              }}
              onClick={() => setExpandedHobby(expandedHobby === 'drinks' ? null : 'drinks')}
            >
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: darkMode ? 'rgba(91, 163, 181, 0.2)' : 'rgba(91, 163, 181, 0.15)' }}>
                    <Wine className="w-6 h-6" style={{ color: '#5BA3B5' }} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: theme.text }}>Drink Creations</h3>
                  <p className="text-base md:text-sm mb-4" style={{ color: theme.textMuted }}>
                    Part of my job, part of my passion. Developing signature beverages and pushing what coconut water can do.
                  </p>
                  <span className="text-sm md:text-xs" style={{ color: theme.accent }}>Click to learn more →</span>
                </div>
                <div className="w-full md:w-48 h-40 md:h-auto flex items-center justify-center relative overflow-hidden" style={{ 
                  background: 'linear-gradient(180deg, #5BA3B5 0%, #3D8A9C 100%)',
                  borderLeft: '2px solid #7BC3D5'
                }}>
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
                      <Sparkles className="w-6 h-6" style={{ color: 'white' }} />
                    </div>
                    <span className="text-xl font-bold" style={{ color: 'white' }}>+</span>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
                      <Coffee className="w-6 h-6" style={{ color: 'white' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cooking */}
            <div 
              className="rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:translate-x-1"
              style={{
                background: theme.cardBg,
                border: `3px solid ${theme.cardBorder}`,
                boxShadow: `6px 6px 0px ${theme.cardShadow}`
              }}
              onClick={() => setExpandedHobby(expandedHobby === 'cooking' ? null : 'cooking')}
            >
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: darkMode ? 'rgba(242, 204, 143, 0.2)' : 'rgba(242, 204, 143, 0.15)' }}>
                    <ChefHat className="w-6 h-6" style={{ color: '#D4A574' }} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: theme.text }}>Cooking</h3>
                  <p className="text-base md:text-sm mb-4" style={{ color: theme.textMuted }}>
                    Elaborate meals are my love language. Wagyu, Puerto Rican classics, and everything in between.
                  </p>
                  <span className="text-sm md:text-xs" style={{ color: theme.accent }}>Click to learn more →</span>
                </div>
                <div className="w-full md:w-48 h-40 md:h-auto flex items-center justify-center" style={{ 
                  background: darkMode ? 'rgba(40, 40, 70, 0.8)' : 'linear-gradient(180deg, #FAF6F1 0%, #F5EDE6 100%)',
                  borderLeft: `2px dashed ${darkMode ? 'rgba(255,255,255,0.1)' : '#D4C4B0'}`
                }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: darkMode ? 'rgba(242, 204, 143, 0.3)' : 'rgba(242, 204, 143, 0.25)' }}>
                    <Flame className="w-8 h-8" style={{ color: '#E07A5F' }} />
                  </div>
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
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6" style={{ background: darkMode ? 'rgba(212, 165, 116, 0.2)' : 'rgba(212, 165, 116, 0.15)' }}>
                  <Palette className="w-10 h-10" style={{ color: '#D4A574' }} />
                </div>
                <h3 className="text-2xl font-semibold mb-4" style={{ color: theme.text, fontFamily: "'Instrument Serif', Georgia, serif" }}>Ceramics</h3>
                <div className="space-y-4 text-base" style={{ color: theme.textMuted }}>
                  <p>
                    Ceramics is my way of slowing down. In a world of screens and notifications, there's something grounding about sitting at a wheel with nothing but clay and your hands.
                  </p>
                  <p>
                    It forces presence. You can't rush centering. You can't multitask while pulling walls. Your mind quiets because it has to — the clay demands your full attention.
                  </p>
                  <p>
                    I'm drawn to functional pieces — mugs, bowls, things you actually use. There's something special about drinking your morning coffee from something you made yourself.
                  </p>
                </div>
                <div className="mt-6 p-4 rounded-2xl" style={{ background: darkMode ? 'rgba(129, 178, 154, 0.1)' : 'rgba(129, 178, 154, 0.15)' }}>
                  <span className="text-base md:text-sm font-medium" style={{ color: '#81B29A' }}>🎯 Current focus: </span>
                  <span className="text-base md:text-sm" style={{ color: theme.textMuted }}>Wheel throwing — getting consistent wall thickness</span>
                </div>
              </div>
            )}

            {expandedHobby === 'gamedev' && (
              <div className="p-8">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6" style={{ background: darkMode ? 'rgba(129, 178, 154, 0.2)' : 'rgba(129, 178, 154, 0.15)' }}>
                  <Gamepad2 className="w-10 h-10" style={{ color: '#81B29A' }} />
                </div>
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
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6" style={{ background: darkMode ? 'rgba(224, 122, 95, 0.2)' : 'rgba(224, 122, 95, 0.15)' }}>
                  <Mountain className="w-10 h-10" style={{ color: '#E07A5F' }} />
                </div>
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
                  <span className="text-base md:text-sm font-medium" style={{ color: '#E07A5F' }}>🏋️ Current grade: </span>
                  <span className="text-base md:text-sm" style={{ color: theme.textMuted }}>Working on V4s</span>
                </div>
              </div>
            )}

            {expandedHobby === 'cooking' && (
              <div className="p-8">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6" style={{ background: darkMode ? 'rgba(242, 204, 143, 0.2)' : 'rgba(242, 204, 143, 0.15)' }}>
                  <ChefHat className="w-10 h-10" style={{ color: '#D4A574' }} />
                </div>
                <h3 className="text-2xl font-semibold mb-4" style={{ color: theme.text, fontFamily: "'Instrument Serif', Georgia, serif" }}>Cooking</h3>
                <div className="space-y-4 text-base" style={{ color: theme.textMuted }}>
                  <p>
                    I love food. Cooking elaborate meals is how I show love — there's something deeply satisfying about transforming quality ingredients into an experience for people you care about.
                  </p>
                  <p>
                    I enjoy working with different cuisines, but my favorites come from <strong style={{ color: theme.text }}>Asia</strong> and <strong style={{ color: theme.text }}>Latin America</strong>. The bold flavors, the layering of spices, the way a dish can tell a story about a place and its people.
                  </p>
                  <p>
                    Whether it's mastering a new technique or recreating something I tasted while traveling, the kitchen is where I experiment and unwind.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['Asian', 'Latin American', 'Puerto Rican', 'Japanese', 'Thai', 'Mexican'].map(cuisine => (
                    <span key={cuisine} className="px-3 py-1 rounded-full text-sm" style={{ 
                      background: darkMode ? 'rgba(224, 122, 95, 0.2)' : 'rgba(224, 122, 95, 0.15)',
                      color: '#E07A5F',
                      border: '1px solid rgba(224, 122, 95, 0.3)'
                    }}>
                      {cuisine}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {expandedHobby === 'drinks' && (
              <div className="p-8">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6" style={{ background: darkMode ? 'rgba(91, 163, 181, 0.2)' : 'rgba(91, 163, 181, 0.15)' }}>
                  <Wine className="w-10 h-10" style={{ color: '#5BA3B5' }} />
                </div>
                <h3 className="text-2xl font-semibold mb-4" style={{ color: theme.text, fontFamily: "'Instrument Serif', Georgia, serif" }}>Drink Creations</h3>
                <div className="space-y-4 text-base" style={{ color: theme.textMuted }}>
                  <p>
                    This is where work and passion blur. Part of my job at Vita Coco is developing signature beverages with R&D teams — figuring out how coconut water can elevate coffee drinks, smoothies, and specialty beverages.
                  </p>
                  <p>
                    I love the creative challenge: balancing flavor profiles, understanding what operators need for their menus, and creating something people actually want to order twice.
                  </p>
                  <p>
                    The barista background helps. Twenty years of understanding extraction, texture, and flavor layering translates directly to beverage development. I know what works behind the bar because I've been there.
                  </p>
                </div>
                <div className="mt-6 p-4 rounded-2xl" style={{ background: darkMode ? 'rgba(91, 163, 181, 0.15)' : 'rgba(91, 163, 181, 0.15)' }}>
                  <span className="text-base md:text-sm font-medium flex items-center gap-2" style={{ color: '#3D8A9C' }}>
                    <Sparkles className="w-4 h-4" />
                    Current favorite:
                  </span>
                  <span className="text-base md:text-sm block mt-1" style={{ color: theme.textMuted }}>Coconut cold brew with a splash of vanilla</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Coconut Water', 'Cold Brew', 'Smoothies', 'Specialty Lattes', 'Refreshers'].map(drink => (
                    <span key={drink} className="px-3 py-1 rounded-full text-sm" style={{ 
                      background: darkMode ? 'rgba(91, 163, 181, 0.2)' : 'rgba(91, 163, 181, 0.15)',
                      color: '#3D8A9C',
                      border: '1px solid rgba(91, 163, 181, 0.3)'
                    }}>
                      {drink}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Post Hanc Popup */}
      {showPostHanc && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={() => setShowPostHanc(false)}
        >
          <div 
            className="relative max-w-lg w-full rounded-3xl overflow-hidden"
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
              style={{ background: '#D4A574', color: 'white' }}
              onClick={() => setShowPostHanc(false)}
            >
              ×
            </button>

            <div className="p-8">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">⚔️</span>
                <div>
                  <h3 className="text-2xl font-semibold" style={{ color: theme.text, fontFamily: "'Instrument Serif', Georgia, serif" }}>
                    Post Hanc
                  </h3>
                  <p className="text-sm" style={{ color: theme.textMuted }}>Mobile Game · In Development Since 2020</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-base mb-6" style={{ color: theme.textMuted }}>
                <em>Post Hanc</em> — Latin for "after this" — is a narrative-driven mobile game that explores how our choices echo across time. A passion project built in Unity, weaving together storylines that intersect in unexpected ways.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {['Unity', 'C#', 'Narrative', 'Mobile', 'Indie'].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-sm" style={{ 
                    background: darkMode ? 'rgba(212, 165, 116, 0.2)' : 'rgba(212, 165, 116, 0.15)',
                    color: '#D4A574',
                    border: '1px solid rgba(212, 165, 116, 0.3)'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Instagram Link */}
              <a
                href="https://www.instagram.com/post.hanc/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                style={{ 
                  background: 'linear-gradient(135deg, #833AB4 0%, #E1306C 50%, #F77737 100%)',
                  color: 'white',
                  textDecoration: 'none'
                }}
              >
                <Instagram className="w-5 h-5" />
                <span className="font-medium">Follow @post.hanc</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Connect */}
      <section id="connect" className="py-20 md:py-24 px-4 md:px-8 relative z-10" style={{ background: theme.sectionAlt, scrollMarginTop: '80px' }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-xs tracking-widest uppercase" style={{ color: theme.textSubtle }}>06</span>
            <div className="w-8 h-0.5" style={{ background: darkMode ? 'rgba(255,255,255,0.2)' : '#D4C4B0' }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: theme.textSubtle }}>Connect</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-center" style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            color: theme.text
          }}>
            Let's connect
          </h2>
          <div className="flex justify-center mb-8">
            <Squiggle color="#E07A5F" width={80} />
          </div>
          
          {/* Social Links */}
          <div className="flex gap-4 justify-center flex-wrap mb-12">
            {[
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/juan-hernandez-a3880276/', icon: Linkedin },
              { label: 'Instagram', href: 'https://www.instagram.com/mytoehertz/', icon: Instagram },
              { label: 'GitHub', href: 'https://github.com/mytoehertz', icon: Github }
            ].map(link => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full transition-colors duration-300 flex items-center justify-center"
                style={{
                  background: 'transparent',
                  border: `2px solid ${theme.cardBorder}`,
                  color: theme.text,
                  textDecoration: 'none'
                }}
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: '#E07A5F',
                  borderColor: '#E07A5F',
                  color: 'white'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon className="w-5 h-5" strokeWidth={2} />
              </motion.a>
            ))}
          </div>

          {/* Expertise Section */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {/* Expertise */}
            <div className="p-6 rounded-2xl" style={{
              background: theme.cardBg,
              border: `2px solid ${theme.cardBorder}`
            }}>
              <h3 className="text-xl font-medium mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: theme.text }}>
                Expertise
              </h3>
              <p className="text-base md:text-sm mb-6" style={{ color: theme.textMuted }}>
                Where my skills and experience intersect.
              </p>
              <div className="space-y-3">
                {[
                  { Icon: Briefcase, title: 'Beverage Strategy', desc: 'Go-to-market, menu development, and brand positioning for F&B', color: '#E07A5F' },
                  { Icon: Network, title: 'Sales Operations Systems', desc: 'Building tools and workflows that make teams more effective', color: '#5BA3B5' },
                  { Icon: Wrench, title: 'Digital Product Prototyping', desc: 'Turning ideas into functional web apps and internal tools', color: '#81B29A' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{
                    background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'
                  }}>
                    {item.Icon ? (
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${item.color}20` }}>
                        <item.Icon className="w-4 h-4" style={{ color: item.color }} />
                      </div>
                    ) : (
                      <span className="text-xl">{item.icon}</span>
                    )}
                    <div>
                      <p className="font-medium text-base md:text-sm" style={{ color: theme.text }}>{item.title}</p>
                      <p className="text-sm md:text-xs" style={{ color: theme.textMuted }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-6 rounded-2xl" style={{
              background: theme.cardBg,
              border: `2px solid ${theme.cardBorder}`
            }}>
              <h3 className="text-xl font-medium mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: theme.text }}>
                Get in touch
              </h3>
              <form 
                name="contact" 
                method="POST" 
                data-netlify="true"
                netlify-honeypot="bot-field"
                className="space-y-4"
              >
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>Don't fill this out: <input name="bot-field" /></label>
                </p>
                
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: theme.textMuted }}>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    disabled
                    className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                    style={{
                      background: theme.inputBg,
                      border: `2px solid ${theme.cardBorder}`,
                      color: theme.text,
                      opacity: 0.5,
                      cursor: 'not-allowed'
                    }}
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: theme.textMuted }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    disabled
                    className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                    style={{
                      background: theme.inputBg,
                      border: `2px solid ${theme.cardBorder}`,
                      color: theme.text,
                      opacity: 0.5,
                      cursor: 'not-allowed'
                    }}
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: theme.textMuted }}>
                    Project Type
                  </label>
                  <select
                    name="project-type"
                    disabled
                    className="w-full px-4 py-3 rounded-xl text-sm"
                    style={{
                      background: theme.inputBg,
                      border: `2px solid ${theme.cardBorder}`,
                      color: theme.text,
                      opacity: 0.5,
                      cursor: 'not-allowed'
                    }}
                  >
                    <option value="">Select a service...</option>
                    <option value="consulting">Consulting</option>
                    <option value="landing-page">Landing Page</option>
                    <option value="game-dev">Game Development</option>
                    <option value="ceramics">Custom Ceramics</option>
                    <option value="personal-project">Personal Project</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: theme.textMuted }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    disabled
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl text-sm resize-none"
                    style={{
                      background: theme.inputBg,
                      border: `2px solid ${theme.cardBorder}`,
                      color: theme.text,
                      opacity: 0.5,
                      cursor: 'not-allowed'
                    }}
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled
                  className="w-full py-3 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: 'rgba(224, 122, 95, 0.2)',
                    border: '2px solid rgba(224, 122, 95, 0.3)',
                    color: theme.textMuted,
                    cursor: 'not-allowed'
                  }}
                >
                  Send Message (Unavailable)
                </button>
              </form>
            </div>
          </div>

          <p className="mt-16 text-xs text-center" style={{ color: theme.textSubtle }}>
            © 2025 Juan Hernandez · Built with coffee and curiosity
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
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.6;
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
        
        @keyframes neonFlicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            opacity: 1;
            text-shadow: 0 0 10px #81B29A, 0 0 20px #81B29A, 0 0 30px #81B29A;
            box-shadow: 0 0 10px #81B29A, 0 0 20px rgba(129, 178, 154, 0.5), 0 0 40px rgba(129, 178, 154, 0.3), inset 0 0 10px rgba(129, 178, 154, 0.1);
          }
          20%, 24%, 55% {
            opacity: 0.6;
            text-shadow: none;
            box-shadow: 0 0 5px #81B29A, 0 0 10px rgba(129, 178, 154, 0.3);
          }
        }
        
        .neon-flicker {
          animation: neonFlicker 4s infinite;
        }
        
        @keyframes neonGlow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .neon-glow {
          animation: neonGlow 2s ease-in-out infinite;
        }
        
        @keyframes redNeonFlicker {
          0%, 18%, 22%, 25%, 53%, 57%, 100% {
            opacity: 1;
            text-shadow: 0 0 10px #E07A5F, 0 0 20px #E07A5F, 0 0 30px #E07A5F;
            box-shadow: 0 0 10px #E07A5F, 0 0 20px rgba(224, 122, 95, 0.5), 0 0 40px rgba(224, 122, 95, 0.3);
          }
          20%, 24%, 55% {
            opacity: 0.5;
            text-shadow: 0 0 5px #E07A5F;
            box-shadow: 0 0 5px #E07A5F, 0 0 10px rgba(224, 122, 95, 0.3);
          }
        }
        
        .red-neon-flicker {
          animation: redNeonFlicker 3s infinite;
        }
        
        .coral-neon-flicker {
          animation: redNeonFlicker 3s infinite;
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
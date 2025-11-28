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

// Main Component
const JuanitoDev = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const codeRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (codeRef.current) {
        const rect = codeRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 25;
        const y = (e.clientY - rect.top - rect.height / 2) / 25;
        setMousePos({ x, y });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const skills = ['React', 'Three.js', 'Node.js', 'JavaScript', 'WebGL', 'Game Dev', 'MongoDB', 'CSS'];

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

  return (
    <div ref={containerRef} className="h-screen overflow-y-auto" style={{
      background: '#FDF8F3',
      fontFamily: "'Inter', -apple-system, sans-serif",
      color: '#2C1810'
    }}>
      
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex justify-between items-center" style={{
        background: 'rgba(253, 248, 243, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '2px solid #E8DDD4'
      }}>
        <span className="text-sm font-semibold tracking-wide" style={{ color: '#5D4037' }}>Juan Hernandez</span>
        <div className="flex gap-6 text-sm" style={{ color: '#8B7355' }}>
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-amber-800 transition-colors cursor-pointer">About</a>
          <a href="#interests" onClick={(e) => scrollToSection(e, 'interests')} className="hover:text-amber-800 transition-colors cursor-pointer">Interests</a>
          <a href="#work" onClick={(e) => scrollToSection(e, 'work')} className="hover:text-amber-800 transition-colors cursor-pointer">Work</a>
          <a href="#hobbies" onClick={(e) => scrollToSection(e, 'hobbies')} className="hover:text-amber-800 transition-colors cursor-pointer">Hobbies</a>
          <a href="#connect" onClick={(e) => scrollToSection(e, 'connect')} className="hover:text-amber-800 transition-colors cursor-pointer">Connect</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-8 pt-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4C4B0' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <div className="max-w-3xl text-center relative z-10">
          <div className="inline-block px-5 py-2 rounded-full text-xs tracking-widest uppercase mb-8 relative" style={{
            background: '#F5EDE6',
            color: '#8B7355',
            border: '2px dashed #D4C4B0'
          }}>
            Polymath in progress ✨
          </div>
          <h1 className="text-5xl md:text-7xl font-light leading-tight mb-4" style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            letterSpacing: '-0.02em',
            color: '#3D2914'
          }}>
            From Puerto Rico's mountains
          </h1>
          <div className="flex justify-center mb-4">
            <Squiggle color="#E07A5F" width={200} />
          </div>
          <h1 className="text-5xl md:text-7xl font-light leading-tight mb-8" style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            letterSpacing: '-0.02em',
            color: '#3D2914'
          }}>
            to building beverage programs
          </h1>
          <p className="text-lg leading-relaxed max-w-xl mx-auto" style={{ color: '#6B5344' }}>
            CS major. Barista at heart.
          </p>
          <p className="text-lg leading-relaxed max-w-xl mx-auto mt-2" style={{ color: '#6B5344' }}>
            Director of Foodservice Sales by day.
          </p>
          <p className="text-lg leading-relaxed max-w-xl mx-auto mt-2" style={{ color: '#6B5344' }}>
            Web developer and game dev enthusiast by night.
          </p>
          
          <div className="mt-16 flex justify-center">
            <div className="w-1 h-16 rounded-full" style={{ background: 'linear-gradient(180deg, #D4C4B0, transparent)' }} />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="min-h-screen px-8 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs tracking-widest uppercase" style={{ color: '#A08060' }}>01</span>
                <div className="w-8 h-0.5" style={{ background: '#D4C4B0' }} />
                <span className="text-xs tracking-widest uppercase" style={{ color: '#A08060' }}>Background</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light leading-snug mb-8" style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                color: '#3D2914'
              }}>
                I grew up in Caguana, Utuado — surrounded by Taíno heritage and wild coffee trees.
              </h2>
              <Squiggle color="#81B29A" width={80} />
              <div className="space-y-6 text-base leading-relaxed mt-8" style={{ color: '#5D4037' }}>
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
                background: 'linear-gradient(135deg, #FFF8F0 0%, #FDF3E7 100%)',
                border: '3px solid #E8DDD4',
                boxShadow: '8px 8px 0px #E8DDD4'
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
                    color: '#3D2914'
                  }}>
                    Vita Coco 🥥
                  </h3>
                  <h3 className="text-2xl font-medium" style={{ 
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    color: '#3D2914'
                  }}>
                    Director of Foodservice
                  </h3>
                  <h3 className="text-2xl font-medium mb-4" style={{ 
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    color: '#3D2914'
                  }}>
                    Commercial Sales
                  </h3>
                  <p className="text-sm" style={{ color: '#8B7355' }}>New York City</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl" style={{ 
                background: '#FAF6F1',
                border: '2px dashed #D4C4B0'
              }}>
                <span className="text-xs tracking-widest uppercase block mb-4" style={{ color: '#A08060' }}>
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
                      <span className="text-sm" style={{ color: '#5D4037' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Journey */}
              <div className="p-6 rounded-2xl" style={{ 
                background: 'linear-gradient(180deg, #F5EDE6 0%, #FAF6F1 100%)',
                border: '2px solid #E8DDD4'
              }}>
                <span className="text-xs tracking-widest uppercase block mb-5" style={{ color: '#A08060' }}>
                  The journey here
                </span>
                <div className="space-y-4">
                  {journey.map((stop, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-transform group-hover:scale-110 group-hover:rotate-6 flex-shrink-0 mt-1" style={{
                        background: '#FFF8F0',
                        border: '2px solid #E8DDD4'
                      }}>
                        {stop.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm" style={{ color: '#3D2914' }}>{stop.company}</p>
                        <p className="text-xs" style={{ color: '#6B5344' }}>{stop.role}</p>
                        {stop.role2 && (
                          <p className="text-xs" style={{ color: '#6B5344' }}>{stop.role2}</p>
                        )}
                        <p className="text-xs mt-1 italic" style={{ color: '#A08060' }}>{stop.detail}</p>
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
      <section id="interests" className="py-24 px-8" style={{ background: '#F5EDE6' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs tracking-widest uppercase" style={{ color: '#A08060' }}>02</span>
            <div className="w-8 h-0.5" style={{ background: '#D4C4B0' }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: '#A08060' }}>Interests</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light leading-snug mb-4" style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            color: '#3D2914'
          }}>
            I'm drawn to where fields intersect.
          </h2>
          <Squiggle color="#E07A5F" width={120} />
          <p className="text-base mb-12 mt-6" style={{ color: '#8B7355' }}>
            Click a card to explore what I'm thinking about.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {interests.map((item, i) => (
              <div 
                key={item.id}
                className="rounded-3xl transition-all duration-500 cursor-pointer overflow-hidden"
                style={{ 
                  background: '#FFFCF8',
                  boxShadow: expandedCard === item.id 
                    ? '8px 8px 0px #C4A77D' 
                    : '4px 4px 0px #E8DDD4',
                  border: expandedCard === item.id 
                    ? '3px solid #C4A77D' 
                    : '3px solid #E8DDD4',
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
                    <h3 className="font-semibold text-lg mb-1" style={{ color: '#3D2914' }}>{item.label}</h3>
                    <p className="text-sm" style={{ color: '#8B7355' }}>{item.sub}</p>
                  </div>
                  <span 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-light transition-all duration-300"
                    style={{ 
                      background: expandedCard === item.id ? '#E07A5F' : '#F5EDE6',
                      color: expandedCard === item.id ? 'white' : '#8B7355',
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
                    
                    <span className="text-xs tracking-widest uppercase block mb-3" style={{ color: '#A08060' }}>
                      Key Influence
                    </span>
                    <div className="flex gap-3 mb-5">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: '#E07A5F' }} />
                      <div>
                        <h4 className="font-medium text-sm" style={{ color: '#3D2914' }}>{item.mentor.name}</h4>
                        <p className="text-sm" style={{ color: '#6B5344' }}>{item.mentor.why}</p>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl mb-4" style={{ background: '#FAF6F1', border: '1px dashed #D4C4B0' }}>
                      <p className="text-sm italic" style={{ color: '#5D4037' }}>{item.funFact}</p>
                    </div>
                    
                    <p className="text-xs" style={{ color: '#A08060' }}>{item.bookRec}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code / Building - World Creation Focus */}
      <section id="work" className="min-h-screen px-8 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(rgba(61, 41, 20, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(61, 41, 20, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center top'
        }} />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs tracking-widest uppercase" style={{ color: '#A08060' }}>03</span>
                <div className="w-8 h-0.5" style={{ background: '#D4C4B0' }} />
                <span className="text-xs tracking-widest uppercase" style={{ color: '#A08060' }}>Building</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light leading-snug mb-4" style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                color: '#3D2914'
              }}>
                I use code to create worlds.
              </h2>
              <Squiggle color="#3D405B" width={100} />
              <div className="space-y-6 text-base leading-relaxed mt-8" style={{ color: '#5D4037' }}>
                <p>
                  Game development is where all my interests collide — systems thinking, physics, psychology, design. 
                  Every world you build has its own rules, its own logic, its own life.
                </p>
                <p>
                  I'm drawn to the places where technology creates something you can explore and feel. 
                  3D environments, interactive experiences, simulations that surprise you.
                </p>
                <p className="text-sm pt-4 italic" style={{ color: '#8B7355' }}>
                  This site? I built it. ✌️
                </p>
              </div>
            </div>
            
            {/* 3D Floating Skills */}
            <div 
              ref={codeRef}
              className="relative h-96 md:h-[500px]"
              style={{ perspective: '1000px' }}
            >
              <div 
                className="absolute inset-0 transition-transform duration-100"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg)`
                }}
              >
                <div 
                  className="absolute top-1/2 left-1/2 w-64 h-80 rounded-2xl"
                  style={{
                    transform: 'translate(-50%, -50%) translateZ(-50px)',
                    background: 'linear-gradient(135deg, #3D405B 0%, #2C3049 100%)',
                    boxShadow: '20px 20px 60px rgba(0,0,0,0.3)',
                    border: '2px solid #4A4E6A'
                  }}
                >
                  <div className="p-4 space-y-2 opacity-40">
                    {[65, 42, 78, 55, 38, 70, 48, 62, 45, 72, 50, 58].map((width, i) => (
                      <div key={i} className="flex gap-2">
                        <div className="h-2 rounded" style={{ width: `${width}%`, background: i % 3 === 0 ? '#E07A5F' : i % 3 === 1 ? '#81B29A' : '#F2CC8F' }} />
                      </div>
                    ))}
                  </div>
                </div>

                {skills.map((skill, i) => {
                  const positions = [
                    { top: '10%', left: '5%', z: 80 },
                    { top: '5%', left: '65%', z: 60 },
                    { top: '30%', left: '0%', z: 100 },
                    { top: '45%', left: '70%', z: 40 },
                    { top: '60%', left: '10%', z: 70 },
                    { top: '75%', left: '60%', z: 90 },
                    { top: '85%', left: '30%', z: 50 },
                    { top: '20%', left: '40%', z: 110 }
                  ];
                  const colors = ['#E07A5F', '#81B29A', '#3D405B', '#F2CC8F', '#E07A5F', '#81B29A', '#3D405B', '#F2CC8F'];
                  const pos = positions[i];
                  
                  return (
                    <div
                      key={skill}
                      className="absolute px-5 py-3 rounded-2xl text-sm font-medium transition-all duration-300 hover:scale-110 cursor-default"
                      style={{
                        background: '#FFFCF8',
                        boxShadow: `4px 4px 0px ${colors[i]}, 8px 8px 20px rgba(0,0,0,0.15)`,
                        border: `2px solid ${colors[i]}`,
                        color: '#3D2914',
                        top: pos.top,
                        left: pos.left,
                        transform: `translateZ(${pos.z}px)`,
                        animation: `float3d 5s ease-in-out ${i * 0.4}s infinite`
                      }}
                    >
                      {skill}
                    </div>
                  );
                })}

                <div 
                  className="absolute text-6xl font-light"
                  style={{ top: '15%', left: '80%', color: '#E07A5F', transform: 'translateZ(30px)', opacity: 0.6 }}
                >
                  {'{'}
                </div>
                <div 
                  className="absolute text-6xl font-light"
                  style={{ bottom: '20%', left: '85%', color: '#E07A5F', transform: 'translateZ(30px)', opacity: 0.6 }}
                >
                  {'}'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hobbies */}
      <section id="hobbies" className="py-24 px-8" style={{ background: '#FAF6F1' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs tracking-widest uppercase" style={{ color: '#A08060' }}>04</span>
            <div className="w-8 h-0.5" style={{ background: '#D4C4B0' }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: '#A08060' }}>Hobbies</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light leading-snug mb-4" style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            color: '#3D2914'
          }}>
            When I'm not working, you'll find me...
          </h2>
          <Squiggle color="#81B29A" width={100} />
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {/* Ceramics */}
            <div className="rounded-3xl overflow-hidden" style={{
              background: '#FFFCF8',
              border: '3px solid #E8DDD4',
              boxShadow: '6px 6px 0px #E8DDD4'
            }}>
              <div className="p-6">
                <span className="text-4xl block mb-4">🏺</span>
                <h3 className="font-semibold text-lg mb-2" style={{ color: '#3D2914' }}>Ceramics</h3>
                <p className="text-sm mb-4" style={{ color: '#6B5344' }}>
                  Amateur ceramicist. There's something meditative about shaping clay — it forces you to be present.
                </p>
              </div>
              <div className="h-48 flex flex-col items-center justify-center" style={{ 
                background: 'repeating-linear-gradient(45deg, #F5EDE6, #F5EDE6 10px, #FAF6F1 10px, #FAF6F1 20px)',
                borderTop: '2px dashed #D4C4B0'
              }}>
                <span className="text-3xl mb-2">📸</span>
                <span className="text-sm font-medium" style={{ color: '#A08060' }}>Photos coming soon!</span>
                <span className="text-xs mt-1" style={{ color: '#C4A77D' }}>stay tuned~</span>
              </div>
            </div>

            {/* Game Dev - Primordial Soup */}
            <div className="rounded-3xl overflow-hidden" style={{
              background: '#FFFCF8',
              border: '3px solid #E8DDD4',
              boxShadow: '6px 6px 0px #E8DDD4'
            }}>
              <div className="p-6">
                <span className="text-4xl block mb-4">🎮</span>
                <h3 className="font-semibold text-lg mb-2" style={{ color: '#3D2914' }}>Game Dev</h3>
                <p className="text-sm mb-4" style={{ color: '#6B5344' }}>
                  Building "Primordial Soup" — an evolution sim where chemistry meets life. Watch elements combine and creatures emerge.
                </p>
              </div>
              <div className="h-48 flex flex-col items-center justify-center relative overflow-hidden" style={{ 
                background: 'linear-gradient(180deg, #2D3A3A 0%, #1A2626 100%)',
                borderTop: '2px dashed #81B29A'
              }}>
                <BubblingMolecules />
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <ConstructionCone />
                    <KawaiiFace />
                    <div style={{ transform: 'scaleX(-1)' }}>
                      <ConstructionCone />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-white block">Primordial Soup</span>
                  <span className="text-xs" style={{ color: '#81B29A' }}>Under construction!</span>
                  <span className="text-xs block mt-1" style={{ color: '#A0A4C1' }}>｡◕‿◕｡</span>
                </div>
              </div>
            </div>

            {/* Bouldering with bouncing holds */}
            <div className="rounded-3xl overflow-hidden" style={{
              background: '#FFFCF8',
              border: '3px solid #E8DDD4',
              boxShadow: '6px 6px 0px #E8DDD4'
            }}>
              <div className="p-6">
                <span className="text-4xl block mb-4">🧗</span>
                <h3 className="font-semibold text-lg mb-2" style={{ color: '#3D2914' }}>Bouldering</h3>
                <p className="text-sm mb-4" style={{ color: '#6B5344' }}>
                  Amateur boulderer at Vital LES. It's problem-solving with your body — every route is a puzzle.
                </p>
              </div>
              <div className="h-48 flex flex-col items-center justify-center relative overflow-hidden" style={{ 
                background: 'linear-gradient(180deg, #3D405B 0%, #2C3049 100%)',
                borderTop: '2px solid #4A4E6A'
              }}>
                {/* Rotating triangles */}
                <div className="absolute" style={{ top: '10%', left: '10%', animation: 'spin 8s linear infinite' }}>
                  <div style={{ width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '18px solid #E07A5F' }} />
                </div>
                <div className="absolute" style={{ top: '15%', right: '12%', animation: 'spin 6s linear infinite reverse' }}>
                  <div style={{ width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderBottom: '14px solid #81B29A' }} />
                </div>
                <div className="absolute" style={{ bottom: '20%', left: '8%', animation: 'spin 7s linear infinite' }}>
                  <div style={{ width: 0, height: 0, borderLeft: '12px solid transparent', borderRight: '12px solid transparent', borderBottom: '20px solid #F2CC8F' }} />
                </div>
                <div className="absolute" style={{ bottom: '15%', right: '10%', animation: 'spin 9s linear infinite reverse' }}>
                  <div style={{ width: 0, height: 0, borderLeft: '9px solid transparent', borderRight: '9px solid transparent', borderBottom: '16px solid #E07A5F' }} />
                </div>
                <div className="absolute" style={{ top: '50%', left: '5%', animation: 'spin 5s linear infinite' }}>
                  <div style={{ width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderBottom: '12px solid #81B29A' }} />
                </div>
                <div className="absolute" style={{ top: '45%', right: '6%', animation: 'spin 10s linear infinite reverse' }}>
                  <div style={{ width: 0, height: 0, borderLeft: '11px solid transparent', borderRight: '11px solid transparent', borderBottom: '18px solid #F2CC8F' }} />
                </div>
                
                <div className="relative z-10 text-center">
                  <span className="text-sm font-medium text-white">Vital Climbing</span>
                  <span className="block text-xs mt-1" style={{ color: '#A0A4C1' }}>Lower East Side</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect */}
      <section id="connect" className="py-24 px-8" style={{ background: '#3D2914', color: '#FDF8F3' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-xs tracking-widest uppercase" style={{ color: '#A08060' }}>05</span>
            <div className="w-8 h-0.5" style={{ background: '#5D4037' }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: '#A08060' }}>Connect</span>
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
                  border: '2px solid #5D4037',
                  color: '#FDF8F3',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#E07A5F';
                  e.target.style.borderColor = '#E07A5F';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.borderColor = '#5D4037';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="mt-16 text-xs" style={{ color: '#6B5344' }}>
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
        
        ::selection {
          background: #E07A5F;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default JuanitoDev;
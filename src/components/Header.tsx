import React, { useState } from 'react';
import { Menu, X, ChevronDown, Cpu, Shield, PhoneCall, Building2, HelpCircle, MessageSquare } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function Header({ currentView, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuItems = [
    {
      id: 'products',
      label: '제품소개',
      icon: Cpu,
      subItems: [
        { name: '스마트홈 / 홈 IoT', val: 'iot' },
        { name: '비디오폰', val: 'videophone' },
        { name: '공동현관 로비폰', val: 'lobby' },
        { name: '디지털 도어락', val: 'doorlock' },
        { name: 'CCTV / 시큐리티', val: 'cctv' },
        { name: '스마트 LED 조명', val: 'lighting' },
        { name: '인터폰 / 주택설비', val: 'interphone' },
      ]
    },
    {
      id: 'finder',
      label: '나에게 맞는 제품 찾기',
      icon: Shield,
    },
    {
      id: 'company',
      label: '회사소개',
      icon: Building2,
      subItems: [
        { name: '인사말', val: 'greeting' },
        { name: '기업연혁', val: 'timeline' },
        { name: '찾아오시는 길', val: 'location' },
      ]
    },
    {
      id: 'support',
      label: '고객지원 & AI',
      icon: PhoneCall,
      subItems: [
        { name: 'AI 스마트 원격 자문', val: 'ai_chat' },
        { name: 'A/S 센터 찾기', val: 'as_center' },
        { name: '고객센터 연락망', val: 'contact' },
      ]
    }
  ];

  const handleMenuClick = (view: string) => {
    onNavigate(view);
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-2.5 cursor-pointer group select-none"
            onClick={() => handleMenuClick('home')}
          >
            <div className="w-8.5 h-8.5 bg-blue-700 rounded-sm flex items-center justify-center shadow transition-all group-hover:bg-blue-800 shrink-0">
              <div className="w-4 h-4 border-2.5 border-white"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-blue-800 leading-none group-hover:text-blue-700 transition-colors">KOCOM</span>
              <span className="text-[9px] text-slate-400 font-bold tracking-tight mt-0.5 uppercase">Smart Home IoT</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-7 items-center">
            <button
              onClick={() => handleMenuClick('home')}
              className={`text-xs font-black tracking-widest uppercase transition-colors duration-200 py-2 cursor-pointer ${
                currentView === 'home' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-slate-500 hover:text-blue-600'
              }`}
            >
              HOME
            </button>

            {menuItems.map((item) => (
              <div 
                key={item.id} 
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className={`flex items-center space-x-1 text-xs font-black tracking-widest uppercase transition-colors duration-200 py-2 cursor-pointer ${
                    currentView === item.id ? 'text-blue-700 border-b-2 border-blue-700' : 'text-slate-500 hover:text-blue-600'
                  }`}
                >
                  <span>{item.id === 'products' ? 'PRODUCT' : item.id === 'finder' ? 'FINDER' : item.id === 'company' ? 'COMPANY' : 'SUPPORT'}</span>
                  {item.subItems && (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-250 shrink-0" />
                  )}
                </button>

                {/* Dropdown Menu */}
                {item.subItems && activeDropdown === item.id && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-56 rounded-xl bg-white border border-slate-100 shadow-xl py-2 flex flex-col z-50 duration-200">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2.5 h-2.5 bg-white border-t border-l border-slate-100 rotate-45"></div>
                    {item.subItems.map((sub, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleMenuClick(item.id)}
                        className="text-left px-5 py-2.5 text-xs text-slate-650 hover:text-blue-700 hover:bg-slate-50 font-bold transition-colors"
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Quick Contact Badge / Highlighted Button */}
            <button
              onClick={() => handleMenuClick('support')}
              className="flex items-center space-x-1.5 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-full text-xs font-black tracking-wider shadow-md hover:shadow-blue-500/10 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>AI CHAT</span>
            </button>
          </nav>

          {/* Mobile hamburger menu */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-500 hover:text-slate-700 p-2 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/98 backdrop-blur-md absolute top-full left-0 w-full shadow-lg z-50 max-h-[85vh] overflow-y-auto duration-200">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <button
              onClick={() => handleMenuClick('home')}
              className={`w-full text-left py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
                currentView === 'home' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              홈 (KOCOM Main)
            </button>

            {menuItems.map((item) => (
              <div key={item.id} className="border-b border-slate-50 pb-2 mb-2 last:border-b-0 last:pb-0 last:mb-0">
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full text-left py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-between transition-colors ${
                    currentView === item.id ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className="w-4 h-4 text-slate-400" />
                    <span>{item.label}</span>
                  </div>
                  {item.subItems && <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>

                {item.subItems && (
                  <div className="pl-8 pt-1 space-y-1.5 border-l-2 border-slate-100 ml-5 mt-1.5">
                    {item.subItems.map((sub, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleMenuClick(item.id)}
                        className="w-full text-left text-xs font-medium text-slate-500 hover:text-blue-600 block py-1.5"
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={() => handleMenuClick('support')}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md mt-4 transition-transform active:scale-[0.98]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>AI 원격마스터 연결</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

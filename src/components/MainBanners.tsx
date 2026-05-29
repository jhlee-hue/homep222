import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, ArrowRight, Shield, Sparkles, Smartphone, Lightbulb } from 'lucide-react';

interface MainBannersProps {
  onNavigate: (view: string) => void;
}

export default function MainBanners({ onNavigate }: MainBannersProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 0,
      title: "SMART Mirror Wallpad",
      subtitle: "거울 속 스마트 세상, 공간에 완벽히 동화되다",
      description: "풀미러 고휘도 글래스 가동 시스템과 올라운드 IoT 환경제어를 하나의 아름다운 글래스 거울 위에서 실시간 영위하십시오.",
      accent: "K6B WP-101AMI",
      themeColor: "from-slate-900 via-indigo-950 to-slate-900 border-indigo-500/20",
      icon: Sparkles,
      tag: "FLAGSHIP SMART HOME",
      badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-400/30",
      buttonText: "스마트 월패드 살펴보기",
      view: "products",
      featurePoints: ["10.1인치 IPS 풀터치 리얼 밀러", "스마트폰 원격 조명/가스/난방 제어", "하이브리드 공동 현관선 통합 연동"]
    },
    {
      id: 1,
      title: "Premium Vertical 'Align' Wallpad",
      subtitle: "벽면과 혼용 일체되는 프리미엄 세로형 디자인",
      description: "돌출을 최소화하고 시각적 세련미를 최고조로 끌어올린 세로형 얼라인 스마트 월패드. 인테리어의 미학적 정점이 완성됩니다.",
      accent: "K1A-100",
      themeColor: "from-slate-950 via-slate-900 to-blue-950 border-blue-500/20",
      icon: Smartphone,
      tag: "PREMIUM ART DESIGN",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-400/30",
      buttonText: "프리미엄 얼라인 바로가기",
      view: "products",
      featurePoints: ["초슬림 플랫 매립형 설계", "능동형 에어순환 및 실내 온도 모니터링", "세대 입차 알림 및 엘리베이터 호출"]
    },
    {
      id: 2,
      title: "Smart Home & Safe Town IoT",
      subtitle: "사람과 안전, 내일의 주거를 스마트하게 연결하다",
      description: "로비폰, 비디오폰, 디지털 도어락, 실시간 CCTV 보안 돔에 스마트 LED 제어까지 코콤의 원포인트 일괄 네트워킹을 경험해 보세요.",
      accent: "KOCOM TOTAL SOLUTON",
      themeColor: "from-blue-950 via-slate-900 to-slate-950 border-cyan-500/20",
      icon: Shield,
      tag: "TOTAL HOME SECURITY",
      badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-400/30",
      buttonText: "종합 제품군 조회하기",
      view: "products",
      featurePoints: ["해킹 원천차단 고도 보안 보안망", "200만 고화질 IR 주야간 CCTV 연동", "푸시풀 도어락 이중 암호 원격 개방"]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const current = slides[currentSlide];

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 border-y border-slate-800/60 shadow-2xl h-[560px] md:h-[620px] select-none">
      
      {/* Decorative ambient background glows */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-600/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl"></div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className={`absolute inset-0 flex items-center bg-gradient-to-r ${current.themeColor}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="md:col-span-7 text-left space-y-4 md:space-y-6 z-10">
              
              {/* Tag Badge */}
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider border ${current.badgeColor}`}>
                  {current.tag}
                </span>
                <span className="text-xs text-blue-400 font-bold bg-blue-900/40 px-2 py-0.5 rounded border border-blue-800/40 font-mono">
                  {current.accent}
                </span>
              </div>

              {/* Title & subtitle */}
              <div className="space-y-3">
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-white text-4xl sm:text-5xl lg:text-6.5xl font-black tracking-tighter leading-[1.05] uppercase"
                >
                  {current.title}
                </motion.h1>
                <motion.p 
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-blue-400 text-lg sm:text-xl font-black tracking-tight"
                >
                  {current.subtitle}
                </motion.p>
              </div>

              {/* Description */}
              <motion.p 
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl font-bold"
              >
                {current.description}
              </motion.p>

              {/* Highlights Bullet layout */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2"
              >
                {current.featurePoints.map((point, index) => (
                  <div key={index} className="flex items-center space-x-1.5 bg-white/7 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 text-slate-200">
                    <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0"></div>
                    <span className="text-[11px] font-black tracking-tight leading-none">{point}</span>
                  </div>
                ))}
              </motion.div>

              {/* Call to Actions */}
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-3.5 pt-4"
              >
                <button
                  onClick={() => onNavigate(current.view)}
                  className="flex items-center space-x-1.5 bg-blue-700 hover:bg-blue-800 text-white font-black text-xs px-8 py-4 rounded-full shadow-xl transition-all cursor-pointer tracking-wider uppercase"
                >
                  <span>{current.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('support')}
                  className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 text-white font-black text-xs px-8 py-4 rounded-full border border-white/20 transition-all cursor-pointer tracking-wider uppercase backdrop-blur-md"
                >
                  <Play className="w-3.5 h-3.5 fill-white text-white" />
                  <span>AI CHAT ASSISTANT</span>
                </button>
              </motion.div>

            </div>

            {/* Right Interactive Mockup Column */}
            <div className="hidden md:col-span-5 md:flex justify-center items-center z-10">
              <motion.div
                initial={{ scale: 0.85, opacity: 0, rotateY: 15 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative w-80 h-96 bg-slate-900 rounded-3xl p-4 border border-white/15 shadow-2xl flex flex-col justify-between overflow-hidden"
              >
                {/* Mirror reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transform -skew-x-12"></div>

                {/* Top smart pad bar */}
                <div className="flex justify-between items-center bg-slate-800/80 px-3 py-2 rounded-xl border border-white/5">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-[10px] text-slate-300 font-mono font-bold tracking-tight">KOCOM OS v12.4</span>
                  </div>
                  <span className="text-[9px] text-slate-400 font-bold bg-slate-950 px-2 py-0.5 rounded font-mono">ONLINE</span>
                </div>

                {/* Middle interactive display icon */}
                <div className="my-auto flex flex-col items-center justify-center space-y-4">
                  <div className="p-6 bg-gradient-to-tr from-blue-600/20 to-blue-500/20 text-blue-400 rounded-full border border-blue-500/30 shadow-inner animate-bounce">
                    <current.icon className="w-12 h-12" />
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-500">SYSTEM HEALTH</span>
                    <h4 className="text-white text-sm font-bold tracking-tight mt-1">KOCOM IoT NETWORK</h4>
                    <p className="text-[10px] text-blue-400 font-semibold mt-1">모든 세대 장치 정상 작동 중</p>
                  </div>
                </div>

                {/* Bottom Control buttons panel */}
                <div className="grid grid-cols-4 gap-1.5 mt-auto">
                  {["조명", "가스", "난방", "엘베"].map((ctrl, idx) => (
                    <div key={idx} className="bg-slate-800/40 border border-white/5 rounded-lg py-2.5 flex flex-col items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600/30 hover:border-blue-500/30 transition-all cursor-pointer">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mb-1"></div>
                      <span className="text-[9px] font-extrabold tracking-tight">{ctrl}</span>
                    </div>
                  ))}
                </div>

              </motion.div>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Indicator slide bullet dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-8 h-1 px-1 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-blue-500 w-12' : 'bg-slate-700 hover:bg-slate-500'
            }`}
          ></button>
        ))}
      </div>

      {/* Slide Navigation Left/Right buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/35 hover:bg-blue-600/70 text-white rounded-full p-2.5 z-20 border border-white/10 transition-colors cursor-pointer hidden sm:block"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/35 hover:bg-blue-600/70 text-white rounded-full p-2.5 z-20 border border-white/10 transition-colors cursor-pointer hidden sm:block"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

    </div>
  );
}

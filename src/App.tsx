import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MainBanners from './components/MainBanners';
import ProductCatalog from './components/ProductCatalog';
import ProductFinder from './components/ProductFinder';
import AIChatSupport from './components/AIChatSupport';
import ASCenterFinder from './components/ASCenterFinder';
import CompanyHistory from './components/CompanyHistory';
import { NEWS, PRODUCTS } from './data';
import { 
  Building2, 
  Tv, 
  KeyRound, 
  Eye, 
  Lightbulb, 
  PhoneCall, 
  Sparkles, 
  ArrowRight, 
  Check, 
  HelpCircle, 
  Users2, 
  Play, 
  Wrench, 
  MessageSquare,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedBestTab, setSelectedBestTab] = useState<'iot' | 'videophone' | 'doorlock' | 'cctv'>('iot');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const triggerToast = (message: string) => {
    setActiveToast(message);
    setTimeout(() => {
      setActiveToast(null);
    }, 4500);
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bestProducts = PRODUCTS.filter(p => p.category === selectedBestTab).slice(0, 2);

  return (
    <div id="kocom-applet" className="min-h-screen bg-white text-slate-800 font-sans flex flex-col justify-between">
      
      {/* 1. Header (STAYS STICKY TOP) */}
      <Header currentView={currentView} onNavigate={handleNavigate} />

      {/* 2. Main Content coordination */}
      <main className="flex-grow">
        
        {currentView === 'home' && (
          <div className="space-y-16">
            
            {/* Slide Banners */}
            <MainBanners onNavigate={handleNavigate} />

            {/* Product Category Bento Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-3 mb-10">
                <span className="text-[10px] text-blue-600 font-black uppercase tracking-widest leading-none bg-blue-50 px-3 py-1 rounded-full border border-blue-105">
                  KOCOM CORE CATEGORIES
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">코콤 핵심 사업 분야</h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl mx-auto">
                  조명제어부터 시큐리티, 무선 홈 IoT 융합 플랫폼에 이르기까지 내일을 구축하는 KOCOM의 대표 도메인입니다.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { label: '스마트홈 / 월패드', view: 'products', cat: 'iot', desc: '세대 스마트 주거 허브', color: 'bg-indigo-50 border-indigo-100 hover:border-indigo-400 text-indigo-700', icon: Cpu },
                  { label: '디지털 비디오폰', view: 'products', cat: 'videophone', desc: '고선명 방문 오디오 확인', color: 'bg-blue-50 border-blue-100 hover:border-blue-400 text-blue-700', icon: Tv },
                  { label: '스마트 디지털 도어락', view: 'products', cat: 'doorlock', desc: '안전한 출입 통제 관리', color: 'bg-emerald-50 border-emerald-100 hover:border-emerald-400 text-emerald-700', icon: KeyRound },
                  { label: '지능형 CCTV 보안', view: 'products', cat: 'cctv', desc: '주야간 전천후 녹화 감시', color: 'bg-slate-50 border-slate-200 hover:border-slate-450 text-slate-800', icon: Eye },
                  { label: '삼성 정품 LED 조명', view: 'products', cat: 'lighting', desc: '스마트 감성 친환경 전력', color: 'bg-amber-50 border-amber-100 hover:border-amber-400 text-amber-700', icon: Lightbulb },
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavigate(item.view)}
                    className={`flex flex-col justify-between items-start text-left p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg h-36 cursor-pointer group ${item.color}`}
                  >
                    <div className="p-3 bg-white hover:bg-slate-50 shadow-sm rounded-xl border border-slate-100">
                      <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm tracking-tight leading-none">{item.label}</h4>
                      <p className="text-[10px] text-slate-500 font-semibold mt-1.5 leading-none">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Best Products (KOCOM BEST SELLER SHOWROOM) */}
            <section className="bg-slate-50 py-16 border-y border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
                  <div className="space-y-2 text-center md:text-left">
                    <span className="text-[10px] text-blue-600 font-black uppercase tracking-widest leading-none">
                      BEST RECOMMENDED PRODUCTS
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">이달의 추천 인기 모델</h2>
                  </div>

                  {/* Tab switches */}
                  <div className="flex flex-wrap gap-1 bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
                    {[
                      { id: 'iot', label: '홈 IoT' },
                      { id: 'videophone', label: '비디오폰' },
                      { id: 'doorlock', label: '도어락' },
                      { id: 'cctv', label: 'CCTV 보안' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedBestTab(tab.id as any)}
                        className={`px-4 py-2.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                          selectedBestTab === tab.id 
                            ? 'bg-slate-900 text-white shadow' 
                            : 'text-slate-500 hover:text-slate-850'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Best Product showcase display cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {bestProducts.map((p) => (
                    <div 
                      key={p.id}
                      onClick={() => handleNavigate('products')}
                      className="bg-white border border-slate-100 rounded-3xl p-5 sm:p-7 flex flex-col justify-between hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                          <span className="text-[9px] uppercase font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                            RECOM MODEL
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100/50">
                            {p.model}
                          </span>
                        </div>
                        <h3 className="text-slate-850 font-black text-base group-hover:text-blue-600 transition-colors">
                          {p.name}
                        </h3>
                        <p className="text-slate-500 text-[11.5px] leading-relaxed">
                          {p.description}
                        </p>
                        <div className="space-y-1.5 pt-2">
                          {p.features.slice(0, 3).map((feat, i) => (
                            <div key={i} className="flex items-start space-x-1.5 text-[10.5px] text-slate-600 font-medium">
                              <Check className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between text-xs text-blue-600 font-black">
                        <span>전시 제품 품목 조회 및 매뉴얼</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* Interactive smart assistant banner shortcut */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 text-white rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden select-none">
                
                {/* Visual mesh overlay lines */}
                <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none"></div>

                <div className="space-y-3.5 text-center md:text-left z-10 max-w-lg">
                  <span className="text-[9px] uppercase font-bold text-yellow-300 bg-yellow-400/20 border border-yellow-400/30 px-3 py-1 rounded-full">
                    FREE CONSULT DIAGNOSIS
                  </span>
                  <h3 className="text-2xl font-black tracking-tight leading-none mt-2">나에게 가장 어울리는 코콤 제품은?</h3>
                  <p className="text-xs text-blue-100/90 leading-relaxed font-semibold">
                    아파트 대단지 통신선 매립 방식부터 노상 단독 빌라 비디오폰 교체까지 단 1분 만에 설치 환경과 기기 간 무선 보정 수용력을 완벽 진단받아보세요.
                  </p>
                </div>

                <button
                  onClick={() => handleNavigate('finder')}
                  className="bg-white hover:bg-slate-50 text-blue-700 font-extrabold text-xs px-6 py-4 rounded-xl shadow-lg hover:shadow-white/10 transition-transform active:scale-[0.98] shrink-0 block cursor-pointer z-10"
                >
                  무상 스마트 설계진단 시작
                </button>

              </div>
            </section>

            {/* PR Video & Corporation intro section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                
                {/* Left side text info */}
                <div className="md:col-span-5 space-y-5 text-left">
                  <span className="text-[10px] text-blue-600 font-black uppercase tracking-widest leading-none">
                    KOCOM PROMOTION VIDEO
                  </span>
                  <h2 className="text-2xl sm:text-3.5xl font-black text-slate-900 tracking-tight leading-tight">
                    공간의 생명을 불어넣는<br />
                    코콤의 미래 스마트 보안 기술
                  </h2>
                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-semibold">
                    코콤 한 번의 연결로 집 밖에서도 스마트폰을 꺼내 들어 현관 로비폰 방문자 화상을 동축으로 확인하고 원클릭 비밀번호 연동 문열림을 완수할 수 있습니다. 
                  </p>
                  <div className="space-y-4 pt-1.5 text-[11px] text-slate-600">
                    <div className="flex items-start space-x-2">
                      <div className="p-1 px-1.5 bg-blue-50 text-blue-600 font-extrabold rounded">01</div>
                      <p><strong>편리한 무선 메시 솔루션:</strong> 기존 배선 벽타공 손상 없이 간편히 페어링</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="p-1 px-1.5 bg-blue-50 text-blue-600 font-extrabold rounded">02</div>
                      <p><strong>해킹 완벽 방어 물리 장비:</strong> 세대 보안 정보 및 BLE 인증 암호화 보안 적용</p>
                    </div>
                  </div>
                </div>

                {/* Right side Video Mockup overlay layout */}
                <div className="md:col-span-7">
                  <div className="relative aspect-video bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex items-center justify-center group cursor-pointer">
                    {/* Background tech ambient grid */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950/80 to-slate-950 opacity-70"></div>
                    
                    {/* Glowing pulse rings around center play button */}
                    <div className="absolute w-24 h-24 bg-blue-600/20 rounded-full animate-ping pointer-events-none"></div>
                    <div className="absolute w-18 h-18 bg-indigo-500/30 rounded-full animate-pulse pointer-events-none"></div>
                    
                    <button 
                      onClick={() => setShowVideoModal(true)}
                      className="bg-white hover:bg-blue-600 hover:text-white text-slate-900 rounded-full p-6 shadow-2xl z-10 duration-200 transform hover:scale-110 active:scale-95 cursor-pointer"
                    >
                      <Play className="w-7 h-7 fill-current pl-1" />
                    </button>

                    {/* Left overlay text tag */}
                    <div className="absolute bottom-4 left-5 text-left text-white/50 text-[10px] uppercase font-bold tracking-widest font-mono select-none z-10 flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
                      <span>KOCOM PR STREAM ● LIVE RESOLUTION</span>
                    </div>

                  </div>
                </div>

              </div>
            </section>

            {/* News and announcements board node display */}
            <section className="bg-slate-900 text-white py-16 border-t border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center space-y-3 mb-12">
                  <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest leading-none bg-blue-950 border border-blue-900/50 px-3 py-1 rounded-full">
                    KOCOM BREAKING NEWS
                  </span>
                  <h2 className="text-2xl sm:text-3.5xl font-black text-white tracking-tight">코콤 소식 &amp; 공지관</h2>
                  <p className="text-xs sm:text-sm text-slate-400 font-semibold max-w-xl mx-auto leading-relaxed">
                    품질 연속 1위 수상부터 신모델 공식 발표 소식까지 코콤 브랜드의 가장 최근 이슈를 조회하실 수 있습니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {NEWS.map((node) => (
                    <div 
                      key={node.id}
                      className="bg-slate-950 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5.5 space-y-4 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-bold font-mono">
                          <span className="text-blue-400 bg-blue-950/50 border border-blue-900/35 px-2 py-0.5 rounded">
                            {node.category}
                          </span>
                          <span className="text-slate-500">{node.date}</span>
                        </div>
                        <h4 className="font-extrabold text-xs sm:text-[13px] text-slate-100 tracking-tight leading-snug hover:text-blue-400 transition-colors cursor-pointer">
                          {node.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-semibold line-clamp-3">
                          {node.summary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-850 text-[10.5px] text-blue-400 font-extrabold flex items-center justify-between cursor-pointer">
                        <span>보도자료 상세</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            </section>

          </div>
        )}

        {/* Dynamic Nav views controller */}
        {currentView === 'products' && <ProductCatalog />}
        {currentView === 'finder' && <ProductFinder />}
        {currentView === 'support' && (
          <div className="divide-y divide-slate-100 bg-white">
            <section className="bg-slate-900 text-white py-12 border-b border-slate-800">
              <div className="max-w-4xl mx-auto text-center space-y-3">
                <div className="inline-flex items-center space-x-1 bg-blue-950 border border-blue-900 text-blue-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>KOCOM SMART SUPPORT MODULE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">AI 비디오폰 및 오토 원격자문</h2>
                <p className="text-xs sm:text-sm text-slate-400 leading-normal max-w-xl mx-auto font-medium">
                  코콤의 축적된 공식 데이터웨어와 직접 연동하는 최첨단 AI 자문 서비스입니다. 고장 진단 복구 매뉴얼, 비화 및 비밀번호 변경 가이드를 1초 만에 검출해 보세요!
                </p>
              </div>
              <AIChatSupport />
            </section>
            
            <section className="bg-white">
              <ASCenterFinder />
            </section>
          </div>
        )}
        {currentView === 'company' && <CompanyHistory />}

      </main>

      {/* 3. Footer */}
      <Footer />

      {/* Modern Mock Video Theater Modal Overlay */}
      {showVideoModal && (
        <div className="fixed inset-0 z-55 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col justify-between">
            {/* Topbar */}
            <div className="p-5.5 border-b border-slate-800 flex justify-between items-center bg-slate-950">
              <div className="flex items-center space-x-2.5">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
                <span className="text-[10px] uppercase font-black text-blue-400 tracking-widest font-mono">KOCOM Media Hub</span>
                <span className="text-[9px] bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded font-mono">1080P UltraHD</span>
              </div>
              <button 
                onClick={() => setShowVideoModal(false)}
                className="text-xs font-black tracking-wider text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-750 px-3.5 py-1.5 rounded-full border border-slate-700 transition-colors"
              >
                닫기 CH-X
              </button>
            </div>

            {/* Video Canvas Screen Mock */}
            <div className="aspect-video bg-black relative flex flex-col justify-between p-6 overflow-hidden">
              {/* Graphic scanlines overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none opacity-40"></div>
              
              {/* Spinning compass loading indicator */}
              <div className="my-auto flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full border-4 border-blue-600 border-t-transparent animate-spin flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <div className="w-10 h-10 rounded-full border-2 border-indigo-400 border-b-transparent animate-reverse-spin"></div>
                </div>
                <div className="text-center space-y-1 z-10">
                  <h4 className="text-white font-black text-sm tracking-tight animate-pulse">코콤 스마트 가상 룸 페어링 스트리밍...</h4>
                  <p className="text-[10px] text-blue-400 font-mono font-bold uppercase tracking-widest">Resolving Coaxial Network Interlock</p>
                </div>
              </div>

              {/* Subtitles Overlay */}
              <div className="mt-auto bg-black/60 backdrop-blur-md border border-slate-800/60 p-3 rounded-2xl max-w-xl mx-auto text-center z-10 animate-pulse">
                <p className="text-xs text-yellow-300 font-bold text-center leading-relaxed">
                  "코콤 홈 IoT 스마트 월패드로 언제 어디서나 집안의 안전을 터치하고 조명을 제어하세요."
                </p>
              </div>
            </div>

            {/* Bottom playback controllers bar */}
            <div className="p-4 bg-slate-950 border-t border-slate-850 flex items-center justify-between">
              <div className="flex items-center space-x-3 text-white">
                <button className="p-2 bg-blue-700 hover:bg-blue-650 rounded-lg text-white font-black text-xs transition-colors">
                  PLAY
                </button>
                <div className="w-32 bg-slate-800 h-1.5 rounded-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-3/5 bg-blue-500 h-full rounded-full"></div>
                </div>
                <span className="text-[10px] text-slate-400 font-mono font-bold font-semibold">01:45 / 03:20</span>
              </div>
              <div className="text-[10px] text-slate-500 font-bold leading-none">
                수리 및 설치 가이드 문의: 1577-8251
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating high-contrast notification toast notifications */}
      {activeToast && (
        <div className="fixed bottom-6 right-6 z-55 max-w-md bg-slate-900 border border-slate-800 text-white rounded-2xl p-4.5 shadow-2xl flex items-center space-x-3.5 animate-bounce">
          <div className="p-2 bg-blue-600 text-white rounded-xl">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="space-y-0.5">
            <h5 className="text-[10px] uppercase font-black tracking-widest text-blue-400">KOCOM SYSTEM ACTION</h5>
            <p className="text-xs text-slate-200 font-bold leading-normal">{activeToast}</p>
          </div>
        </div>
      )}

    </div>
  );
}

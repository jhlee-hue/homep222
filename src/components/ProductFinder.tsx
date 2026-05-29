import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, Home, Building, ShieldCheck, Heart, Sparkles, RefreshCw, KeyRound, Wrench, Smartphone, ArrowRight, ArrowLeft } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

export default function ProductFinder() {
  const [step, setStep] = useState(1);
  const [houseType, setHouseType] = useState<string | null>(null);
  const [needFeature, setNeedFeature] = useState<string | null>(null);
  const [systemType, setSystemType] = useState<string | null>(null);

  const resetFinder = () => {
    setStep(1);
    setHouseType(null);
    setNeedFeature(null);
    setSystemType(null);
  };

  const recommendedProduct = (): Product => {
    // Elegant rules to resolve one core matching KOCOM model
    if (houseType === 'apartment') {
      if (needFeature === 'iot') {
        return PRODUCTS.find(p => p.model === 'K6B WP-101AMI') || PRODUCTS[0];
      }
      return PRODUCTS.find(p => p.model === 'K1A-100') || PRODUCTS[1];
    } else if (houseType === 'villa') {
      if (systemType === 'digital') {
        return PRODUCTS.find(p => p.model === 'K6B WP-70A') || PRODUCTS[2];
      }
      return PRODUCTS.find(p => p.model === 'KCV-S701') || PRODUCTS[3];
    } else { // 단독주택 (single)
      if (needFeature === 'doorlock') {
        return PRODUCTS.find(p => p.model === 'KDL-3710') || PRODUCTS[7];
      }
      return PRODUCTS.find(p => p.model === 'KCV-372') || PRODUCTS[4];
    }
  };

  const currentRecommendation = recommendedProduct();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
        
        {/* Title bar */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KOCOM Smart Assist</span>
          </div>
          <h2 className="text-2xl sm:text-3.5xl font-black text-slate-900 tracking-tight">나에게 맞는 시스템 찾기</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            주거환경과 편의 요구사항에 가장 귀속성이 높은 최적의 코콤 홈 IoT 및 비디오폰 솔루션을 점검해 보세요.
          </p>
        </div>

        {/* Progress horizontal steps indicator */}
        <div className="flex justify-between items-center max-w-md mx-auto relative pt-4 pb-2">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-slate-100 -z-10"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-blue-600 -z-10 transition-all duration-300"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          ></div>
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s} 
              className={`w-7.5 h-7.5 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all ${
                s <= step 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white border-2 border-slate-150 text-slate-400'
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Dynamic Questionnaire Steps Panel */}
        <AnimatePresence mode="wait">
          
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-base sm:text-lg font-black text-slate-800 text-center">
                Q1. 거주하시는 주택의 유형이 어떻게 되시나요?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'apartment', title: '아파트 / 대단지 오피스텔', desc: '공동 로비폰과 복합 무인관리실이 연동되는 고단위 주거 공간', icon: Building },
                  { id: 'villa', title: '빌라 / 다세대 연립', desc: '세대수가 비교적 밀접하고 버스 포맷의 다인 공동 출입 구조', icon: Landmark },
                  { id: 'single', title: '단독주택 / 전원주택', desc: '외부 초인종 카메라와 단독 문열림 개방이 유연한 전원 공간', icon: Home },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setHouseType(item.id);
                      setStep(2);
                    }}
                    className={`p-5 rounded-2xl border text-left flex flex-col justify-between h-48 transition-all hover:shadow-lg cursor-pointer ${
                      houseType === item.id 
                        ? 'border-blue-600 bg-blue-50/20' 
                        : 'border-slate-150 bg-white'
                    }`}
                  >
                    <div className="p-3 bg-slate-50 text-slate-600 rounded-xl border border-slate-100">
                      <item.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800 mt-4 leading-tight">{item.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-1 lines-clamp-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <button 
                onClick={() => setStep(1)}
                className="flex items-center space-x-1 text-xs font-bold text-slate-500 hover:text-slate-850"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>이전 단계로</span>
              </button>
              <h3 className="text-base sm:text-lg font-black text-slate-800 text-center">
                Q2. 가장 필요로 하시는 홈 솔루션 핵심 편의 기능은 무엇입니까?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'iot', title: '스마트 앱 홈 원격제어', desc: '외부에서도 폰으로 보일러, 조명, 가스를 켜고 끄는 능동 통제', icon: Smartphone },
                  { id: 'doorlock', title: '디지털 원터치 문열림 연동', desc: '방문 확인 시 거실 일체형으로 현관 도어락을 한 번에 개방', icon: KeyRound },
                  { id: 'security', title: '강화 야간 시큐리티 검사', desc: '야간에도 세대 앞 움직임을 검출하고 도난/외부 침입을 차단', icon: ShieldCheck },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setNeedFeature(item.id);
                      setStep(3);
                    }}
                    className={`p-5 rounded-2xl border text-left flex flex-col justify-between h-48 transition-all hover:shadow-lg cursor-pointer ${
                      needFeature === item.id 
                        ? 'border-blue-600 bg-blue-50/20' 
                        : 'border-slate-150 bg-white'
                    }`}
                  >
                    <div className="p-3 bg-slate-50 text-slate-600 rounded-xl border border-slate-100">
                      <item.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800 mt-4 leading-tight">{item.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-1 lines-clamp-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <button 
                onClick={() => setStep(2)}
                className="flex items-center space-x-1 text-xs font-bold text-slate-500 hover:text-slate-850"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>이전 단계로</span>
              </button>
              <h3 className="text-base sm:text-lg font-black text-slate-800 text-center">
                Q3. 거주단지 또는 건물의 내부 통신 포맷 선로 형태를 알고 계시나요?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'digital', title: '디지털 선로 포맷', desc: '공동 로비폰에서 호수를 누르면 경비실과 세대폰이 일체형으로 연결되는 신식 버스망', icon: Landmark },
                  { id: 'analog', title: '아날로그 4선식 포맷', desc: '세대 개별 현관 카메라와 양방향 4선식 통신선으로 호출하는 독립형 수용망', icon: Wrench },
                  { id: 'unknown', title: '잘 모르겠습니다 / 자가조회 필요', desc: '기존 벽지에 부착된 비디오폰에 꽂힌 뒷면 동축 케이블 파악이 필요한 경우', icon: Heart },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSystemType(item.id);
                      setStep(4);
                    }}
                    className={`p-5 rounded-2xl border text-left flex flex-col justify-between h-48 transition-all hover:shadow-lg cursor-pointer ${
                      systemType === item.id 
                        ? 'border-blue-600 bg-blue-50/20' 
                        : 'border-slate-150 bg-white'
                    }`}
                  >
                    <div className="p-3 bg-slate-50 text-slate-600 rounded-xl border border-slate-100">
                      <item.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800 mt-4 leading-tight">{item.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-1 lines-clamp-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="space-y-6 text-center"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-lg space-y-4 max-w-xl mx-auto">
                <ShieldCheck className="w-12 h-12 text-yellow-300 mx-auto animate-bounce" />
                <div className="space-y-1">
                  <h4 className="text-[10px] uppercase font-bold text-blue-200 tracking-widest leading-none">ANALYSIS COMPLETE</h4>
                  <h3 className="text-lg font-black tracking-tight mt-1.5">고객님을 위한 주춧돌 맞춤 코콤 장치</h3>
                </div>
                <div className="bg-slate-900/60 p-5 rounded-xl border border-white/10 space-y-2">
                  <span className="text-[9px] font-bold text-blue-400 bg-blue-900/60 border border-blue-800 px-2.5 py-0.5 rounded-full uppercase">
                    {currentRecommendation.category}
                  </span>
                  <h5 className="text-sm font-black text-slate-100">{currentRecommendation.name}</h5>
                  <p className="text-[10px] text-slate-400 font-mono font-semibold">Model Code: {currentRecommendation.model}</p>
                </div>
                <p className="text-xs text-white/85 leading-normal max-w-sm mx-auto font-medium">
                  "{currentRecommendation.description}"
                </p>
              </div>

              {/* Specs and trigger diagnostic */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 max-w-xl mx-auto text-left space-y-3.5">
                <h4 className="text-xs font-black text-slate-800 border-l-3 border-blue-600 pl-2">설계 권장 사항 (System Fit Details)</h4>
                <div className="divide-y divide-slate-150 text-[10px] text-slate-600 font-medium">
                  <div className="flex justify-between py-1.5">
                    <span>거주 유형 적합도</span>
                    <span className="text-slate-850 font-bold">매우 우수 (95%)</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span>권장 시스템 배선 방식</span>
                    <span className="text-blue-600 font-bold">{systemType === 'digital' ? '디지털 중계선 방식' : '아날로그 4선식 동선망'}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span>무선 도어락 개방 모듈</span>
                    <span className="text-slate-850 font-bold">연동 최적화 수용 가능</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-xl mx-auto pt-2">
                <button
                  onClick={resetFinder}
                  className="bg-slate-100 hover:bg-slate-205 text-slate-700 font-semibold text-xs py-3 px-6 rounded-xl flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>진단 다시 받기</span>
                </button>
                <a
                  href={`tel:1577-8251`}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs py-3 px-6 rounded-xl flex items-center justify-center space-x-1.5 cursor-pointer shadow-lg hover:shadow-blue-500/10 transition-transform active:scale-[0.98]"
                >
                  <span>1577-8251 정식 전시장 설계 접수</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}

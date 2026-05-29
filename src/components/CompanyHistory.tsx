import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Award, Map, Compass, Landmark, Users2, Sparkles, Building2, Eye, Network } from 'lucide-react';
import { TIMELINE } from '../data';

export default function CompanyHistory() {
  const [activeTab, setActiveTab] = useState<'greet' | 'history' | 'location'>('greet');

  const tabs = [
    { id: 'greet', label: 'CEO 인사말', icon: Compass },
    { id: 'history', label: '기업 연혁', icon: Calendar },
    { id: 'location', label: '찾아오시는 길', icon: Map },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      
      {/* Tab Controller */}
      <div className="flex border-b border-slate-100 mb-10 justify-center">
        <div className="flex space-x-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-1.5 px-6 py-3.5 text-xs font-black transition-all cursor-pointer border-b-2 ${
                  isActive 
                    ? 'border-blue-600 text-blue-600 font-black' 
                    : 'border-transparent text-slate-500 hover:text-slate-850'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Tabs view switches */}
      <div>
        
        {/* TAB 1: GREETINGS */}
        {activeTab === 'greet' && (
          <div className="space-y-10">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl.5 font-black text-slate-900 tracking-tight leading-none">
                "사람과 주거 공간의 가치를 더하는 코콤"
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                안전하고 스마트한 내일의 홈 라이프 스타일을 코콤의 첨단 IoT 플랫폼 기술력과 디자인 철학으로 약속드립니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-100">
              
              <div className="md:col-span-8 space-y-5 text-slate-650 text-xs sm:text-sm leading-relaxed text-left font-medium">
                <p>
                  안녕하십니까, 고객 여러분.<br />
                  주식회사 코콤을 변함없이 신뢰하고 아껴주시는 고객과 주주 여러분께 진심으로 깊은 감사의 인사를 올립니다.
                </p>
                <p>
                  코콤은 1976년 창사 이래, 무선 유선 영상 통신 분야의 순수 국산 기술 자립을 꿈꾸며 첫출발을 하였습니다. 끊임없는 한계 극복정신과 연구개발을 토대로, 한국 최초 다화면 CCTV 카메라 개발, 홈오토 비디오폰 보급화, 그리고 현재의 최첨단 스마트 미러 아파트 홈 IoT 월패드에 이르기까지 한국 스마트홈 산업의 전설적인 혁신 역사를 개척해 왔습니다.
                </p>
                <p>
                  이제 주거 공간은 단순히 휴식을 취하는 일차원적 물리 공간을 넘어, 스마트 환경제어 솔루션을 매개로 거주자의 안전, 감정, 라이프스캔 건강과 유기적으로 소통하는 능동 생태계로 거듭나고 있습니다. 
                </p>
                <p>
                  저희 코콤 전 임직원은 스마트 빌딩, 하이브리드 무선 보안, 친환경 Smart LED 조명과 AI 홈서포트 원격 제어 솔루션 구축에 이르기까지 최고의 성능 철학과 국가대표 신뢰 디자인 기술을 바탕으로 보답할 것을 굳건히 약속 올립니다.
                </p>
                <div className="pt-4 flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-100/60 shadow-sm mt-3">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold block leading-none">주식회사 코콤 대표이사</span>
                    <span className="font-extrabold text-base text-slate-850">고 성 희</span>
                  </div>
                  <span className="text-xs text-blue-600 font-mono font-bold border border-blue-100 bg-blue-50 px-3 py-1 rounded">
                    ESTD. 1976
                  </span>
                </div>
              </div>

              {/* Slogan Banner graphics mockup */}
              <div className="md:col-span-4 bg-gradient-to-tr from-slate-900 to-blue-900 rounded-2xl p-6 text-white text-center space-y-4 border border-white/5 shadow-lg h-full flex flex-col justify-center py-10 min-h-[280px]">
                <Users2 className="w-12 h-12 text-blue-400 mx-auto" />
                <div className="space-y-1">
                  <h4 className="text-[10px] text-blue-300 font-extrabold uppercase tracking-widest leading-none">Company Core Values</h4>
                  <h3 className="font-black text-sm tracking-tight mt-2.5">신뢰 · 기술 · 인간지향</h3>
                </div>
                <p className="text-[10.5px] text-slate-300 leading-normal font-medium">
                  코콤은 사람을 향한 따뜻한 기술력을 중심에 두고 안전과 품질의 최고 가치를 완수합니다.
                </p>
              </div>

            </div>

            {/* Core Capabilities Icons banner list */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-center">
              {[
                { title: '수출 선두 혁신기업', desc: '전 세계 50여 개국 비디오폰 및 인터폰 수출망 구축 최고의 글로벌 경쟁력', icon: Network },
                { title: '글로벌 지식특허 보유', desc: '홈 IoT 지능형 월패드 및 도어 연동 BLE 무선 무장 등 120여 건의 핵심 지적권 등록', icon: Sparkles },
                { title: 'KOSDAQ 20년 상장 명가', desc: '투명하고 책임감 높은 기업 지배 구조와 지속가능 ESG 친가치 경영 수립', icon: Landmark }
              ].map((cap, i) => (
                <div key={i} className="bg-white border border-slate-100/60 shadow-sm rounded-2xl p-6 space-y-3 hover:shadow-md transition-shadow">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto border border-blue-100">
                    <cap.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-850">{cap.title}</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">{cap.desc}</p>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: HISTORY TIMELINE */}
        {activeTab === 'history' && (
          <div className="space-y-8 max-w-2xl mx-auto">
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">코콤의 대서사 역사의 발자취</h2>
              <p className="text-xs text-slate-500 font-normal">
                1976년 창립부터 현재에 이르기까지 최초와 혁신만을 수놓아 온 주식회사 코콤의 타임라인을 공개합니다.
              </p>
            </div>

            {/* Timeline track list */}
            <div className="relative border-l-2 border-blue-100 pl-6 space-y-8 ml-4 pt-2">
              {TIMELINE.map((node, index) => (
                <div key={index} className="relative space-y-1">
                  
                  {/* Circle locator bullet pointer */}
                  <div className="absolute -left-[31px] top-1 bg-white border-2 border-blue-600 w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-inner">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  </div>

                  {/* Header labels */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-black text-blue-600 font-mono tracking-tight leading-none">
                      {node.year}.{node.month}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">
                      MILESTONE
                    </span>
                  </div>

                  {/* Node Description Text */}
                  <p className="text-xs sm:text-[13px] text-slate-700 font-bold font-sans tracking-tight">
                    {node.event}
                  </p>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: LOCATION MAPS */}
        {activeTab === 'location' && (
          <div className="space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">본사 및 한국 영업소 안내</h2>
              <p className="text-xs text-slate-500">
                주식회사 코콤의 메인 거점별 세부 위치 및 대면 방문 접수 길 안내 지침입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
              
              {/* Point 1: Bucheon Headquarter */}
              <div className="bg-white border border-slate-150-100 rounded-2xl p-5.5 space-y-3 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">통합 제조 본사</span>
                  <span className="text-[10px] text-slate-400 font-bold font-mono">ESTD R&amp;D</span>
                </div>
                <h3 className="text-sm font-bold text-slate-850">부천 신흥로 종합 본사</h3>
                <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                  주소: 경기도 부천시 신흥로 383 (삼정동, 코콤빌딩)<br />
                  대중교통: 서울지하철 7호선 신중동역 하차 후 버스 환승 (삼정랜드 방향 도보 3분)<br />
                  운용 서비스: 무상 기술 실장 연구실, 생산 기지, 통합 CS AS 수리 센터
                </p>
                <div className="pt-2">
                  <a 
                    href="https://map.kakao.com/?q=경기도 부천시 신흥로 383"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="w-full block text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-2.5 rounded-xl border border-slate-200 cursor-pointer"
                  >
                    부천 본사 카카오맵 바로가기
                  </a>
                </div>
              </div>

              {/* Point 2: Seoul Office */}
              <div className="bg-white border border-slate-150-100 rounded-2xl p-5.5 space-y-3 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">서울 영업 대리점</span>
                  <span className="text-[10px] text-slate-400 font-bold font-mono">SEOUL OFFICE</span>
                </div>
                <h3 className="text-sm font-bold text-slate-850">서울 구로 영업소</h3>
                <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                  주소: 서울특별시 구로구 디지털로31길 19, 에이스테크노타워 2차 204호<br />
                  대중교통: 서울지하철 2호선 대림역(구로구청역) 4번출구에서 도보 8분<br />
                  운용 서비스: 서울/경인 총괄 영업 영업단, 공인 전시장 쇼룸, AS 직송 접수실
                </p>
                <div className="pt-2">
                  <a 
                    href="https://map.kakao.com/?q=서울특별시 구로구 디지털로31길 19"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="w-full block text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-2.5 rounded-xl border border-slate-200 cursor-pointer"
                  >
                    서울 영업소 카카오맵 바로가기
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

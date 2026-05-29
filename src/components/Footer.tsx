import React, { useState } from 'react';
import { Phone, MapPin, Printer, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const [selectedSite, setSelectedSite] = useState('');

  const familySites = [
    { name: '패밀리 사이트 선택', url: '' },
    { name: '코콤 스마트홈 몰', url: 'https://kocom-smarthome.com' },
    { name: '코콤 조명 종합몰', url: 'https://planlux.co.kr' },
    { name: '코콤 공식 고객지원', url: 'https://kocomcenter.com' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top footer row: logo & links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-slate-800 pb-12">
          
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="bg-slate-800 text-white font-extrabold px-3 py-1 rounded text-sm tracking-wider">KOCOM</span>
              <span className="font-bold text-white text-md uppercase tracking-wider">주식회사 코콤</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              코콤은 1976년 창사 이래, 앞선 혁신 기술력을 바탕으로 대한민국의 홈 IoT와 지능형 보안 산업의 성장을 리드해 온 글로벌 혁신 강소기업입니다.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-slate-200 text-xs font-bold uppercase tracking-wider">주요 제품군</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-white transition-colors cursor-pointer">스마트홈 IoT 월패드</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">선명한 디지털 비디오폰</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">공동현관 로비폰 시스템</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">푸시풀 디지털 도어락</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">실시간 지능형 CCTV</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">플리커프리 Smart LED 조명</span></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-slate-200 text-xs font-bold uppercase tracking-wider">이용 안내</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-white transition-colors cursor-pointer">자주 묻는 질문 (FAQ)</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">사용 제품 매뉴얼 다운로드</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">자가진단 가이드북</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">전국 A/S 지정점 확인</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">개인정보처리방침</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">이메일무단수집거부</span></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-slate-200 text-xs font-bold uppercase tracking-wider">고객 감동 센터</h4>
            <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-white">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="font-extrabold text-lg">1577-8251</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-normal">
                - 평일: 09:00 - 18:00 (토,일,공휴일 휴무)<br />
                - 점심시간: 12:00 - 13:00 (접수 대기)<br />
                - 본사 직영 AS 수리 센터 신속 대응
              </p>
            </div>

            {/* Family site select */}
            <div>
              <select
                value={selectedSite}
                onChange={(e) => {
                  setSelectedSite(e.target.value);
                  if (e.target.value) {
                    window.open(e.target.value, '_blank');
                  }
                }}
                className="w-full bg-slate-850 border border-slate-800 text-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                {familySites.map((site, index) => (
                  <option key={index} value={site.url}>
                    {site.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* Corporate Address & Registration Information */}
        <div className="pt-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 text-[11px] text-slate-500 leading-relaxed">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span><strong>주식회사 코콤</strong></span>
              <span>대표이사: 고성희</span>
              <span>사업자등록번호: 130-81-22923</span>
              <span>통신판매업 신고번호: 제2022-부천삼정-0422호</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-600" />
                본사: 경기도 부천시 신흥로 383 (삼정동, 코콤빌딩민생부)
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-600" />
                서울 사업소: 서울특별시 구로구 디지털로31길 19, 2층 204호
              </span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span>대표전화: 1577-8251</span>
              <span>팩스: 02-851-8255</span>
              <span>개인정보보호책임자: 정보보호본부 최고책임자</span>
            </div>
            <p className="text-[10px] text-slate-600 mt-2">
              Copyright &copy; 2026 KOCOM CO., LTD. All Rights Reserved. 스마트홈 &amp; 스마트타운 홈 IoT 선두주자 코콤.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-850 px-4 py-2.5 rounded-lg border border-slate-800 select-none">
            <ShieldCheck className="w-7 h-7 text-blue-500" />
            <div className="flex flex-col text-[10px]">
              <span className="text-slate-300 font-bold">국가인증 우수 서비스 점포</span>
              <span className="text-slate-600">지식경제부 기술표준원 승인</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

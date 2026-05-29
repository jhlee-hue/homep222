import React, { useState, useMemo } from 'react';
import { MapPin, Phone, Clock, Search, HelpCircle, Wrench, Landmark } from 'lucide-react';
import { ASCENTERS } from '../data';

export default function ASCenterFinder() {
  const [selectedRegion, setSelectedRegion] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');

  const regions = ['전체', '서울', '경기/인천', '충청/강원', '전라/광주', '경상/대구/부산'];

  const filteredCenters = useMemo(() => {
    return ASCENTERS.filter((center) => {
      const matchRegion = selectedRegion === '전체' || center.region === selectedRegion;
      const matchSearch = 
        center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.phone.replace(/-/g, '').includes(searchQuery.replace(/-/g, ''));
      return matchRegion && matchSearch;
    });
  }, [selectedRegion, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      
      {/* Title bar */}
      <div className="text-center space-y-4 mb-10">
        <div className="inline-flex items-center space-x-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
          <Wrench className="w-3.5 h-3.5" />
          <span>KOCOM SERVICE NETWORK</span>
        </div>
        <h2 className="text-2xl sm:text-3.5xl font-black text-slate-900 tracking-tight">전국 A/S 서비스 지정점 찾기</h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl mx-auto">
          코콤은 신속하고 신뢰할 수 있는 고객 사후 품질 보증을 위해 전국 단위의 직영 대리점 및 서비스 케어 망을 탄탄히 운영하고 있습니다.
        </p>
      </div>

      {/* Grid search and select */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-md mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Regions selector */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedRegion === reg 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>

        {/* Local Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="지정점 명칭명 / 도로명 주소 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-xl pl-9.5 pr-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-800 transition-all shadow-inner"
          />
        </div>

      </div>

      {/* Centers Display list */}
      {filteredCenters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCenters.map((center) => (
            <div 
              key={center.id}
              className="bg-white border border-slate-100 rounded-2xl p-5.5 space-y-4 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Visual badge */}
                <div className="flex justify-between items-center">
                  <span className="text-[9px] uppercase font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    {center.region}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold font-mono">KOCOM CARE</span>
                </div>

                {/* Center Title */}
                <h3 className="text-slate-850 font-black text-xs sm:text-sm tracking-tight leading-snug">
                  {center.name}
                </h3>

                {/* Meta list */}
                <div className="space-y-2 pt-1 text-[11px] text-slate-500 font-medium">
                  
                  <div className="flex items-start gap-1.5 leading-relaxed">
                    <MapPin className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{center.address}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <a href={`tel:${center.phone}`} className="text-blue-600 font-bold hover:underline">
                      {center.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{center.hours}</span>
                  </div>

                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4.5 border-t border-slate-50 flex gap-2">
                <a
                  href={`tel:${center.phone}`}
                  className="flex-1 bg-blue-50 hover:bg-blue-150 text-blue-700 font-extrabold text-[10px] sm:text-xs py-2 rounded-xl text-center cursor-pointer border border-blue-100 transition-colors"
                >
                  지정점 전화하기
                </a>
                <button
                  onClick={() => {
                    alert(`[코콤 안내] 카카오맵/네이버맵 연동을 통해 '${center.name}'(${center.address}) 위치 조회를 진행합니다.`);
                  }}
                  className="flex-1 bg-slate-55 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-[10px] sm:text-xs py-2 rounded-xl text-center cursor-pointer border border-slate-200"
                >
                  지도 위치 보기
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-150 space-y-4">
          <HelpCircle className="w-12 h-12 text-slate-350 mx-auto" />
          <h3 className="text-slate-700 font-extrabold text-sm">해당 검색어와 일치하는 지점 정보가 부재합니다.</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-normal">
            지역 시/도 명칭(예: 서울, 부천, 부산 등)을 다시 확인해 보세요. 본사 서비스 총 고객만족실: 1577-8251 접수도 동일 유효합니다.
          </p>
          <button 
            onClick={() => { setSelectedRegion('전체'); setSearchQuery(''); }}
            className="text-xs text-blue-600 bg-white border border-slate-200 px-4 py-2 rounded-xl font-bold cursor-pointer"
          >
            지역 필터 초기화
          </button>
        </div>
      )}

      {/* Service Policy Note bottom banner */}
      <div className="mt-12 bg-indigo-50/40 rounded-2xl p-5 sm:p-7 border border-indigo-100/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h4 className="text-xs sm:text-sm font-black text-slate-900 flex items-center space-x-1.5">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>코콤의 무상 품질 보증 가이드라인 안내</span>
          </h4>
          <p className="text-[10px] sm:text-xs text-slate-500 leading-normal font-medium max-w-2xl">
            코콤 공식 유통을 거쳐 구매하고 설치를 완료한 신품 하드웨어 장비는 설치일 기준 기본 **1년간 무상 수리 품질 보증**을 보장받으실 수 있습니다. 단, 과전압 번개 낙뢰, 사용자 낙하 파손, 무단 임의 리배선 고장에 대해서는 유상 처리 대상이 오니 지정 기술 대리점을 통해 안전히 접수하세요.
          </p>
        </div>
        <a
          href="https://www.kocom.co.kr"
          target="_blank"
          referrerPolicy="no-referrer"
          className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-md shrink-0 block text-center min-w-[120px]"
        >
          정식 A/S 자가접수
        </a>
      </div>

    </div>
  );
}

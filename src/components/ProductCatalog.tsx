import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Cpu, Tv, Smartphone, Lock, Eye, Lightbulb, Phone, Check, ArrowRight, X, FileDown, Settings } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
// @ts-ignore
import mirrorWallpadImg from '../assets/images/스크린샷 2025-01-13 161917.png';

interface ProductCatalogProps {
  initialCategory?: string;
}

export default function ProductCatalog({ initialCategory = 'all' }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [downloadedModel, setDownloadedModel] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const categories = [
    { label: '전체보기', id: 'all', icon: SlidersHorizontal },
    { label: '스마트홈 / IoT', id: 'iot', icon: Cpu },
    { label: '비디오폰', id: 'videophone', icon: Tv },
    { label: '로비폰', id: 'lobby', icon: Smartphone },
    { label: '디지털도어락', id: 'doorlock', icon: Lock },
    { label: 'CCTV / 보안', id: 'cctv', icon: Eye },
    { label: '스마트 조명', id: 'lighting', icon: Lightbulb },
    { label: '인터폰 / 설비', id: 'interphone', icon: Phone },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchCat = selectedCategory === 'all' || product.category === selectedCategory;
      const matchSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Helper to render product mock icons beautifully
  const renderProductIcon = (type: string) => {
    switch (type) {
      case 'mirror_wallpad':
        if (imageError) {
          return (
            <div className="relative w-full h-44 bg-gradient-to-tr from-slate-950 to-indigo-950 rounded-2xl flex items-center justify-center p-4 border border-indigo-500/30 overflow-hidden">
              <div className="absolute top-2 left-2 bg-indigo-500/20 text-indigo-300 font-extrabold text-[8px] px-2 py-0.5 rounded font-mono border border-indigo-500/20 z-10">MIRROR 10.1" (Fallback)</div>
              <div className="w-28 h-36 bg-slate-900/90 rounded-lg border border-indigo-500/20 shadow-2xl flex flex-col p-2 justify-between backdrop-blur-md">
                <div className="flex justify-between items-center text-[7px] text-indigo-400 font-bold border-b border-indigo-500/10 pb-1">
                  <span>KOCOM SMART HOME</span>
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="text-center py-2">
                  <Tv className="w-7 h-7 text-indigo-400 mx-auto opacity-80" />
                </div>
                <div className="bg-indigo-950/40 p-1 rounded text-center border border-indigo-500/10 mb-1">
                  <span className="text-[6.5px] font-mono text-indigo-300 block font-bold leading-none">이미지 대기 중</span>
                  <span className="text-[5px] text-slate-400 block mt-0.5 leading-none">src/assets/images에 업로드</span>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="relative w-full h-44 bg-slate-900 rounded-2xl flex items-center justify-center border border-indigo-500/25 overflow-hidden">
            <div className="absolute top-2 left-2 bg-indigo-650 text-white font-black text-[9px] px-2 py-0.5 rounded font-sans tracking-widest border border-indigo-500/20 z-10 shadow uppercase">
              MIRROR 10.1"
            </div>
            <img 
              src={mirrorWallpadImg}
              alt="KOCOM Smart Mirror Wallpad (K6B WP-101AMI)"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
            />
          </div>
        );
      case 'align_wallpad':
        return (
          <div className="relative w-full h-44 bg-gradient-to-tr from-slate-950 to-blue-950 rounded-xl flex items-center justify-center p-4 border border-blue-500/30 overflow-hidden">
            <div className="absolute top-2 left-2 bg-blue-500/20 text-blue-300 font-bold text-[8px] px-1.5 py-0.5 rounded font-mono border border-blue-500/20">ALIGN VERTICAL</div>
            <div className="w-20 h-36 bg-slate-900 rounded-lg border border-white/20 shadow-2xl flex flex-col p-2 justify-between">
              <div className="w-3.5 h-1 bg-blue-500 rounded mx-auto"></div>
              <Smartphone className="w-8 h-8 text-blue-400 mx-auto" />
              <div className="w-full bg-slate-800 h-6.5 rounded flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        );
      case 'wp_70a':
        return (
          <div className="relative w-full h-44 bg-gradient-to-tr from-slate-900 to-slate-850 rounded-xl flex items-center justify-center p-4 border border-slate-700/35 overflow-hidden">
            <div className="absolute top-2 left-2 bg-slate-800 text-slate-300 font-bold text-[8px] px-1.5 py-0.5 rounded font-mono">WP-70A</div>
            <div className="w-32 h-20 bg-slate-950 rounded-lg border border-slate-700 shadow-2xl flex flex-col p-1.5 justify-between">
              <div className="flex justify-between items-center">
                <div className="w-12 h-1 bg-blue-500 rounded"></div>
                <div className="w-1 h-1 bg-red-500 rounded-full"></div>
              </div>
              <Cpu className="w-7 h-7 text-blue-500 mx-auto" />
              <div className="w-full bg-slate-800 h-2.5 rounded"></div>
            </div>
          </div>
        );
      case 'kcv_s701':
        return (
          <div className="relative w-full h-44 bg-gradient-to-tr from-indigo-950 to-slate-900 rounded-xl flex items-center justify-center p-4 border border-indigo-500/20 overflow-hidden">
            <div className="absolute top-2 left-2 bg-slate-800 text-indigo-400 font-bold text-[8px] px-1.5 py-0.5 rounded font-mono">7" S701</div>
            <div className="w-36 h-22 bg-white rounded-lg shadow-xl border border-slate-100 flex p-2 justify-between items-center text-slate-800">
              <div className="w-24 h-18 bg-slate-900 rounded border border-slate-800 flex items-center justify-center">
                <Tv className="w-7 h-7 text-white/70" />
              </div>
              <div className="flex flex-col gap-1.5 pl-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                <div className="w-2 h-2 rounded-full bg-slate-200"></div>
              </div>
            </div>
          </div>
        );
      case 'kcv_372':
        return (
          <div className="relative w-full h-44 bg-gradient-to-tr from-slate-900 to-indigo-950 rounded-xl flex items-center justify-center p-4 border border-indigo-500/10">
            <div className="absolute top-2 left-2 bg-slate-800 text-slate-400 font-bold text-[8px] px-1.5 py-0.5 rounded font-mono">ANALOG 372</div>
            <div className="w-24 h-32 bg-slate-50 rounded shadow-lg border border-slate-150 flex flex-col justify-between p-2">
              <div className="w-full h-11 bg-slate-800 rounded flex items-center justify-center">
                <Tv className="w-5 h-5 text-slate-350" />
              </div>
              <div className="flex justify-between items-center mt-3">
                <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
                <div className="w-10 h-2 bg-slate-200 rounded-full"></div>
              </div>
              <div className="flex gap-2 justify-center mt-2">
                <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[7px] text-slate-400 font-bold border border-slate-250">TALK</div>
                <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[7px] text-slate-400 font-bold border border-slate-250">OPEN</div>
              </div>
            </div>
          </div>
        );
      case 'klp_c100':
        return (
          <div className="relative w-full h-44 bg-gradient-to-tr from-slate-950 to-slate-900 rounded-xl flex items-center justify-center p-4 border border-silver/10">
            <div className="absolute top-2 left-2 bg-slate-850 text-slate-300 font-bold text-[8px] px-1.5 py-0.5 rounded font-mono">LOBBY KLP-C100</div>
            <div className="w-24 h-36 bg-gradient-to-b from-slate-700 to-slate-850 rounded border border-slate-600 shadow-xl flex flex-col justify-between p-2">
              <div className="w-full h-6 bg-slate-900 rounded flex items-center justify-center">
                <Eye className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              </div>
              <div className="grid grid-cols-3 gap-1 my-1">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-slate-800 w-full h-2 rounded-[2px] flex items-center justify-center text-[5px] text-slate-500 font-mono font-bold">{i+1}</div>
                ))}
              </div>
              <div className="w-full h-4 bg-slate-950 border border-slate-800 rounded flex items-center justify-center text-[5px] text-silver font-bold">CARD TOUCH</div>
            </div>
          </div>
        );
      case 'klp_650':
        return (
          <div className="relative w-full h-44 bg-gradient-to-tr from-slate-900 to-slate-800 border border-slate-700/30 rounded-xl flex items-center justify-center p-4">
            <div className="absolute top-2 left-2 bg-slate-800 text-slate-400 font-bold text-[8px] px-1.5 py-0.5 rounded font-mono">650 SERIES</div>
            <div className="w-22 h-34 bg-slate-300 rounded border border-slate-400 shadow-lg flex flex-col justify-between p-1.5">
              <div className="w-full h-5 bg-slate-800 rounded flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-slate-650 flex items-center justify-center border border-white/10"></div>
              </div>
              <div className="grid grid-cols-3 gap-0.5 my-2">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-slate-400 w-full h-2.5 rounded-[1px]"></div>
                ))}
              </div>
              <div className="w-full h-3 bg-red-600 rounded-[1px]"></div>
            </div>
          </div>
        );
      case 'kdl_3710':
        return (
          <div className="relative w-full h-44 bg-gradient-to-tr from-slate-950 to-indigo-950 rounded-xl flex items-center justify-center p-4 border border-indigo-500/20 overflow-hidden">
            <div className="absolute top-2 left-2 bg-slate-800 text-indigo-400 font-bold text-[8px] px-1.5 py-0.5 rounded font-mono">PUSH-PULL LOCK</div>
            <div className="w-14 h-36 bg-slate-900 border border-slate-750 shadow-2xl rounded-2xl flex flex-col justify-between p-2">
              <div className="w-full bg-slate-950 h-10 rounded-lg flex flex-col justify-center items-center text-blue-400 text-[10px] font-bold font-mono">
                <span>* 2 3 *</span>
              </div>
              <div className="w-full h-4.5 bg-blue-600/30 rounded border border-blue-500/30 text-[7px] text-blue-300 flex items-center justify-center font-black">TOUCH</div>
              <div className="w-full h-11 bg-slate-800 border-t border-slate-700 rounded-b-xl flex flex-col items-center justify-center">
                <div className="w-5 h-2 bg-slate-600 rounded"></div>
                <span className="text-[6px] text-slate-500 font-extrabold mt-1">PUSH</span>
              </div>
            </div>
          </div>
        );
      case 'kdl_1300s':
        return (
          <div className="relative w-full h-44 bg-gradient-to-tr from-slate-900 to-slate-800 border border-slate-700/30 rounded-xl flex items-center justify-center p-4">
            <div className="absolute top-2 left-2 bg-slate-800 text-slate-400 font-bold text-[8px] px-1.5 py-0.5 rounded font-mono">MUTAGONG LOCK</div>
            <div className="w-12 h-34 bg-slate-800 border border-slate-700 shadow-xl rounded-lg flex flex-col justify-between p-1.5">
              <div className="w-full bg-slate-950 h-5.5 rounded flex items-center justify-center text-[7px] text-blue-400 font-bold">1300S</div>
              <div className="w-full bg-slate-900 border border-slate-700 h-14 rounded my-1"></div>
              <div className="w-12 h-3.5 bg-slate-600 rounded-r shadow transform translate-x-1.5"></div>
            </div>
          </div>
        );
      case 'kcg_200d':
        return (
          <div className="relative w-full h-44 bg-gradient-to-tr from-slate-950 to-slate-900 rounded-xl flex items-center justify-center p-4 border border-white/5">
            <div className="absolute top-2 left-2 bg-slate-800 text-slate-300 font-bold text-[8px] px-1.5 py-0.5 rounded font-mono">DOME CCTV</div>
            <div className="w-28 h-28 bg-white shadow-xl rounded-full border border-slate-100 flex items-center justify-center relative overflow-hidden">
              <div className="w-20 h-20 bg-slate-850 rounded-full flex items-center justify-center border border-slate-200">
                <div className="w-10 h-10 bg-slate-950 rounded-full border border-slate-800 flex items-center justify-center">
                  <div className="w-3.5 h-3.5 bg-blue-600 rounded-full animate-ping"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'kco_200d':
        return (
          <div className="relative w-full h-44 bg-gradient-to-tr from-slate-950 to-indigo-950 rounded-xl flex items-center justify-center p-4 border border-indigo-500/10">
            <div className="absolute top-2 left-2 bg-slate-800 text-indigo-300 font-bold text-[8px] px-1.5 py-0.5 rounded font-mono">BULLET CCTV IP66</div>
            <div className="flex flex-col items-center">
              <div className="w-28 h-12 bg-white shadow-lg border border-slate-150 rounded-r-2xl rounded-l flex items-center justify-between p-1">
                <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center">
                  <Eye className="w-5 h-5 text-blue-400 animate-pulse" />
                </div>
                <div className="w-2 h-2 rounded-full bg-slate-300 mr-2"></div>
              </div>
              <div className="w-4 h-14 bg-slate-100 border-x border-slate-250 transform rotate-12 -mt-1.5 -ml-4"></div>
            </div>
          </div>
        );
      case 'luce_r60w':
        return (
          <div className="relative w-full h-44 bg-gradient-to-tr from-slate-900 to-indigo-900 rounded-xl flex items-center justify-center p-4 border border-indigo-550/20 overflow-hidden">
            <div className="absolute top-2 left-2 bg-slate-800 text-indigo-300 font-bold text-[8px] px-1.5 py-0.5 rounded font-mono">SAMSUNG LED 60W</div>
            <div className="relative w-32 h-32 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-tr from-yellow-300/30 to-orange-400/30 rounded-full animate-pulse flex items-center justify-center border border-yellow-300/20">
                <Lightbulb className="w-10 h-10 text-yellow-300" />
              </div>
            </div>
          </div>
        );
      case 'kip_611pg':
        return (
          <div className="relative w-full h-44 bg-gradient-to-tr from-slate-900 to-slate-800 border border-slate-700/30 rounded-xl flex items-center justify-center p-4">
            <div className="absolute top-2 left-2 bg-slate-800 text-slate-400 font-bold text-[8px] px-1.5 py-0.5 rounded font-mono">KIP-611PG</div>
            <div className="w-26 h-28 bg-white shadow-md border border-slate-150 rounded flex p-1.5 justify-between">
              <div className="w-6 h-24 bg-slate-100 border border-slate-250 rounded flex flex-col justify-between py-2 items-center">
                <div className="w-2.5 h-6 bg-slate-300 rounded"></div>
                <div className="w-2.5 h-2 bg-slate-300 rounded"></div>
              </div>
              <div className="flex-1 pl-1.5 flex flex-col justify-between">
                <div className="w-full bg-slate-800 h-5.5 rounded flex items-center justify-center">
                  <div className="w-10 h-1 bg-red-500 rounded"></div>
                </div>
                <div className="grid grid-cols-2 gap-1 my-1">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-slate-200 w-full h-3.5 rounded-[1px] flex items-center justify-center text-[7px] text-slate-500 font-bold">O</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full h-44 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
            <Cpu className="w-12 h-12" />
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Page Title */}
      <div className="text-center space-y-4 mb-10">
        <h2 className="text-2xl sm:text-3.5xl font-black text-slate-900 tracking-tight">KOCOM 대표 제품 전시관</h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl mx-auto">
          국가대표 홈 IoT 전문 브랜드 코콤의 핵심 주력 스마트 기기들을 한눈에 감상하고 상세 명세와 운용 가이드를 조회하실 수 있습니다.
        </p>
      </div>

      {/* Filter and Search Layout Grid */}
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-8 pb-6 border-b border-slate-100">
        
        {/* Horizontal Category selector */}
        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Real-time search entry bar */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="제품명 / 모델번호 통합 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/70 focus:bg-white rounded-xl pl-9.5 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-medium text-slate-800"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650 text-xs"
            >
              지우기
            </button>
          )}
        </div>

      </div>

      {/* Grid displays filtered results */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="space-y-3.5">
                {/* Visual Icon Illustration */}
                {renderProductIcon(product.image)}

                {/* Sub category + Model code */}
                <div className="flex justify-between items-center pt-1.5">
                  <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full uppercase">
                    {product.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100/50">
                    {product.model}
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="text-slate-800 font-bold text-sm tracking-tight group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

                {/* Minimal description */}
                <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2">
                  {product.description}
                </p>
              </div>

              {/* Bullet highlights overview */}
              <div className="space-y-1.5 my-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                {product.features.slice(0, 2).map((feat, i) => (
                  <div key={i} className="flex items-start space-x-1">
                    <Check className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-[10px] text-slate-600 leading-none truncate font-medium">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Trigger details drawer button */}
              <button
                className="w-full flex items-center justify-center space-x-1 py-2.5 rounded-xl text-[11px] font-extrabold bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-all border border-blue-100 group-hover:border-blue-600"
              >
                <span>상세 명세 및 기술지원</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </button>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
          <Settings className="w-12 h-12 text-slate-350 mx-auto animate-spin" />
          <h3 className="text-slate-700 font-extrabold text-sm font-sans">조건에 만족하는 코콤 정품 조회가 어렵습니다.</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            검색 키워드를 단순화하거나 다른 카테고리를 선택해 조회해 주십시오. 1577-8251로 연락 시 더 많은 제품의 스펙 확인이 가능합니다.
          </p>
          <button 
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="text-xs text-blue-600 font-bold bg-white border border-slate-200 px-4 py-2 rounded-xl"
          >
            카테고리 초기화
          </button>
        </div>
      )}

      {/* Details drawer modal popup */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl border border-slate-150 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col justify-between">
            
            {/* Header details bar */}
            <div className="p-5 border-b border-slate-100 flex justify-between items-start sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <div className="space-y-1">
                <span className="text-[9px] uppercase font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                  KOCOM GENUINE PRODUCT
                </span>
                <h3 className="text-slate-900 font-black text-base">{selectedProduct.name}</h3>
                <p className="text-xs font-mono font-bold text-slate-400">Model: {selectedProduct.model}</p>
              </div>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-50 rounded-full border border-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mid panel detailed content */}
            <div className="p-6 space-y-6">
              
              {/* Product Visual Banner */}
              <div className="w-full">
                {renderProductIcon(selectedProduct.image)}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-slate-900 border-l-3 border-blue-600 pl-2">특징 및 강점 (Core Features)</h4>
                  <ul className="space-y-2">
                    {selectedProduct.features.map((feat, i) => (
                      <li key={i} className="flex items-start space-x-1.5 text-xs text-slate-600 leading-normal font-medium">
                        <Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
                  <h4 className="text-xs font-black text-slate-800 border-l-3 border-slate-400 pl-2">기기 사양 명세 (Specifications)</h4>
                  <div className="divide-y divide-slate-100 text-[10px] text-slate-600">
                    {Object.entries(selectedProduct.specs).map(([label, val], idx) => (
                      <div key={idx} className="flex justify-between py-1.5">
                        <span className="font-extrabold text-slate-500">{label}</span>
                        <span className="text-slate-800 text-right font-medium">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-900 border-l-3 border-blue-600 pl-2">제품 설명 (Detailed Description)</h4>
                <p className="text-slate-500 text-xs leading-normal bg-indigo-50/20 p-4 rounded-xl border border-indigo-100/30">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Downloads & manual files */}
              <div className="bg-blue-50/50 rounded-xl p-4.5 border border-blue-105/40 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left space-y-1">
                  <h5 className="text-[11px] font-black text-slate-900">사용 설명서 및 카탈로그 다운로드</h5>
                  <p className="text-[10px] text-slate-500 leading-none">제품의 결선도, 규격, 품질 인가 인증 서류가 동봉된 정규 Manual 파일입니다.</p>
                </div>
                {downloadedModel === selectedProduct.model ? (
                  <div className="w-full sm:w-auto bg-emerald-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-lg flex items-center justify-center space-x-1 shadow animate-pulse">
                    <Check className="w-4 h-4" />
                    <span>다운로드 완료 (4.2MB)</span>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      setDownloadedModel(selectedProduct.model);
                    }}
                    className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs px-5 py-2.5 rounded-lg flex items-center justify-center space-x-1 shadow-md cursor-pointer transition-all active:scale-[0.98]"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>매뉴얼(PDF) 받기</span>
                  </button>
                )}
              </div>

            </div>

            {/* Bottom contact bar */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-3 justify-between items-center">
              <span className="text-[10px] text-slate-400">본사 수리 및 상담문의 대표전화: 1577-8251</span>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="bg-slate-200 hover:bg-slate-250 text-slate-700 font-bold text-xs px-5 py-2 rounded-xl cursor-pointer"
              >
                확인 및 닫기
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

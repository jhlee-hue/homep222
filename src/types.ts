export interface Product {
  id: string;
  category: 'iot' | 'videophone' | 'lobby' | 'doorlock' | 'cctv' | 'lighting' | 'interphone';
  name: string;
  model: string;
  image: string; // Tailwind icon/avatar styling or SVG or high-quality illustration representation
  features: string[];
  specs: { [key: string]: string };
  description: string;
}

export interface News {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
}

export interface ASCenter {
  id: string;
  region: '서울' | '경기/인천' | '충청/강원' | '전라/광주' | '경상/대구/부산';
  name: string;
  address: string;
  phone: string;
  hours: string;
}

export interface TimelineEvent {
  year: string;
  month: string;
  event: string;
}

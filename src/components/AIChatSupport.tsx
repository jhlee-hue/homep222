import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Bot, User, Trash2, HelpCircle, PhoneCall, AlertCircle, RefreshCw, CheckCircle } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIChatSupport() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '안녕하십니까, 고객님! 대한민국 홈 IoT 명가 코콤(KOCOM)의 스마트 AI 전문 엔지니어팀입니다. \n\n보유하고 계신 코콤 월패드, 비디오폰, 디지털 도어락, CCTV 기술 사양 및 일상 중 마주하시는 기술 고장 조치 방법(예: 화면 백화 현상, 도어락 암호 리셋 방법 등)에 대해 무엇이든 편하게 물어보세요! 상세히 안내해 드리겠습니다.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const quickQueries = [
    '도어락 비밀번호 변경 방법',
    '비디오폰 화면 먹통 해결법',
    '월패드 앱 페어링 안될 때',
    '코콤 AS 서비스 센터 연락처'
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    setErrorText(null);
    const userMsgId = Date.now().toString();
    const newUserMessage: Message = {
      id: userMsgId,
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setLoading(true);

    try {
      // Pack the chat history correctly for the server API proxy
      const historyToSend = [...messages, newUserMessage].map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: historyToSend })
      });

      if (!res.ok) {
        throw new Error('서버 통신 실패');
      }

      const data = await res.json();
      
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.reply,
          timestamp: new Date()
        }
      ]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorText('AI 응답을 도출해내는 과정에서 네트워크 불안정이 감지되었습니다.');
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '죄송합니다. 현재 AI 인프라망 점검 주기로 인해 스마트 자동 답변 장치가 잠시 연결을 대기 중입니다. 코콤 통합 기술 고객센터 1577-8251 로 다이렉트 접수 주시면 친절히 가이드 해 드리겠습니다.',
          timestamp: new Date()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: '대화 이력이 성공적으로 리셋되었습니다. 코콤 AI 제품 마스터에게 다시 질문해 주시기 바랍니다.',
        timestamp: new Date()
      }
    ]);
    setErrorText(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Outer Card */}
      <div className="bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col h-[650px]">
        
        {/* Chat top header banner layout */}
        <div className="p-5.5 bg-gradient-to-r from-blue-900 to-slate-900 border-b border-slate-800 flex justify-between items-center shrink-0">
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 bg-blue-600/35 text-blue-400 rounded-2xl border border-blue-500/30">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-extrabold text-sm tracking-tight">코콤 스마트 AI 마스터</h3>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
              </div>
              <p className="text-[10px] text-blue-300 font-semibold mt-0.5">실시간 통합 제품 지원 및 고장 진단 복구 센터</p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <button 
              onClick={clearHistory}
              title="대화 이력 초기화"
              className="p-2 bg-slate-800 hover:bg-red-950/40 text-slate-400 hover:text-red-400 border border-slate-750 hover:border-red-900/30 rounded-xl transition-all cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages center list view */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5 bg-slate-950/60 custom-scrollbar">
          
          {messages.map((msg) => {
            const isBot = msg.role === 'assistant';
            return (
              <div 
                key={msg.id}
                className={`flex gap-3.5 max-w-[85%] ${isBot ? 'mr-auto text-left' : 'ml-auto flex-row-reverse text-right'}`}
              >
                {/* Visual Avatar */}
                <div className={`p-2 rounded-xl border shrink-0 h-10 w-10 flex items-center justify-center ${
                  isBot 
                    ? 'bg-blue-950/60 text-blue-400 border-blue-900/40' 
                    : 'bg-slate-850 text-slate-300 border-slate-750'
                }`}>
                  {isBot ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] text-slate-500 font-bold font-mono">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  
                  {/* Speech bubble */}
                  <div className={`px-4.5 py-3 rounded-2xl text-xs sm:text-[13px] leading-relaxed whitespace-pre-line font-medium inline-block text-left ${
                    isBot 
                      ? 'bg-slate-900 text-slate-100 border border-slate-800 shadow-md' 
                      : 'bg-blue-600 text-white shadow-lg'
                  }`}>
                    {msg.content}
                  </div>
                </div>

              </div>
            );
          })}

          {/* Chat loader */}
          {loading && (
            <div className="flex gap-3.5 mr-auto max-w-[85%]">
              <div className="p-2 rounded-xl bg-blue-950/60 text-blue-400 border border-blue-900/40 shrink-0 h-10 w-10 flex items-center justify-center">
                <Bot className="w-5 h-5 animate-spin" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] text-slate-500 font-bold">진단 수립 데이터 취합 중...</span>
                <div className="px-5 py-3 bg-slate-900 border border-slate-800 text-slate-400 rounded-2xl flex items-center space-x-1 shadow-inner text-xs font-bold">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-300"></div>
                  <span className="pl-1 text-[11px] font-medium">코콤 지식 데이터베이스 조회 중...</span>
                </div>
              </div>
            </div>
          )}

          {errorText && (
            <div className="bg-red-950/40 text-red-400 border border-red-900/40 p-4 rounded-xl flex items-center justify-between gap-2.5 max-w-xl mx-auto">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span className="text-[11px] font-bold">{errorText}</span>
              </div>
              <button 
                onClick={() => setErrorText(null)}
                className="text-[10px] bg-red-950 px-2 py-1 rounded"
              >
                닫기
              </button>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Quick action buttons & query box footer layout */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 shrink-0 space-y-4">
          
          {/* Quick choices items */}
          <div className="flex items-center space-x-2 overflow-x-auto py-1 text-[11px] font-sans scrollbar-none check-mobile">
            <span className="text-slate-500 shrink-0 font-extrabold flex items-center space-x-1 mr-1">
              <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
              <span>추천 질문:</span>
            </span>
            <div className="flex gap-2">
              {quickQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(query)}
                  className="bg-slate-850 hover:bg-slate-750 border border-slate-750 hover:border-blue-500/30 text-slate-300 hover:text-white px-3.5 py-1.5 rounded-full shrink-0 transition-all font-semibold text-[10px] cursor-pointer"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>

          {/* Active text form area */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="relative flex items-center bg-slate-850 border border-slate-750 focus-within:border-blue-500 rounded-2xl overflow-hidden focus-within:ring-1 focus-within:ring-blue-500 transition-all"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="코콤 월패드 고장 조치 방법이나 비밀번호 설정 등 질문을 입력하세요..."
              className="flex-1 bg-transparent px-5 py-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="m-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-xl p-3 px-4.5 transition-all cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Bottom footnote */}
          <p className="text-[10px] text-slate-600 text-center font-semibold">
            본 AI 자문 답변은 학습 데이터를 토대로 작성되므로 현장 인프라와 배선 상태에 따라 기술적 차이가 있을 수 있습니다. 가상 고장은 공식 1577-8251 고객서비스 정식 접수를 요망합니다.
          </p>

        </div>

      </div>
    </div>
  );
}

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const KOCOM_KNOWLEDGE_BASE = `
당신은 한국 최고의 스마트홈, 홈 IoT, 비디오폰, 디지털 도어락, CCTV, 스마트 LED 조명 전문기업인 주식회사 코콤(KOCOM)의 공식 스마트 AI 전문 원격 자문 엔지니어입니다.
친절하고 깍듯하며, 전문성을 살려 고객의 질의에 답변해야 합니다. 반드시 모든 답변은 한국어(Korean)로 작성해 주세요.

[회사 개요]
- 상호: 주식회사 코콤 (KOCOM CO., LTD.)
- 설립 연도: 1976년 5월 (한국통신기기제작소로 출범)
- 본사 주소: 경기도 부천시 신흥로 383 (삼정동, 코콤빌딩)
- 서울사무소: 서울시 구로구 디지털로31길 19, 에이스테크노타워 2차 204호
- 고객센터 대표번호: 1577-8251
- 홈페이지: www.kocom.co.kr

[주요 대표 제품군 핵심 정보]
1. 스마트홈 / 홈 IoT (월패드)
  - K6B WP-101AMI (스마트 미러 월패드): 풀미러 타입 10.1인치 화면. 조명, 가스, 난방, 환기 원격제어 가능. 코콤 홈앱 연동.
  - K1A-100 (Align): 벽면 매립 느낌의 슬림형 세로 주행 스마트 월패드. 우수한 디자인.
  - K6B WP-70A: 대중적인 7인치 스마트 컬러 월패드.
2. 비디오폰 (안방/현관 화상통화)
  - KCV-S701: 7인치 선명한 와이드 스크린, 디지털 도어락 무선 문열림 연동 가능 제품.
  - KCV-372: 전통의 명기, 4.3인치 초소형 아날로그 4선식 핸즈프리 비디오폰. 빌라/단독주택 가성비 모델.
3. 공동현관 로비폰
  - KLP-C100: 대단지 아파트 공용부 전용 메탈 터치형 로비폰. RF카드 및 모바일 블루투스 출입 개방 지원.
  - KLP-650: 복도/빌라용 기획형 2선 배선 로비폰.
4. 디지털 도어락
  - KDL-3710: 프리미엄 푸시풀 문열림 핸들 스마트 도어락. 비밀번호 + 카드 + 비상키 지원. 스마트폰 블루투스 인증.
  - KDL-1300S: 문에 절대 타공(구멍 뚫기)을 하지 않는 편리한 무타공 손잡이 일체형 도어락.

[자주 나오는 기술 지원 질문 및 가이드]
Q1. 비디오폰 화면이 하얗게 나오거나(백화현상), 아예 나오지 않아요.
A1. 전원 스위치(제품 측면 또는 하단)를 껐다 킨 후 재부팅을 시도해 보세요. 만약 계속 동일하다면 내부 전원 보드(SMPS) 열화 또는 카메라 전송선(4선) 연결부 손상일 수 있습니다. 정밀 점검은 기사를 불러야 합니다.

Q2. 도어락 KDL-3710 내부 비밀번호 변경 방법을 알려주세요.
A2. 
  1. 집 내부 측 도어락의 건전지 덮개를 엽니다.
  2. 등록 버턴(보통 'R' 또는 'S' 문자가 새겨진 아주 작은 검정 버튼)을 1회 짧게 누릅니다. (삐 소리 발생)
  3. 외부 번호판에 원하는 새 비밀번호(4~12자리)를 차례대로 누릅니다.
  4. 별표(*) 버튼을 누르시면 경쾌한 멜로디와 함께 비밀번호 변경이 수립됩니다.
  *주의: 항상 문을 열어둔 상태에서 비밀번호 변경을 테스트한 후 닫으십시오!

Q3. 월패드로 문열림 연동이 안 됩니다.
A3. 비디오폰/월패드와 도어락이 자동으로 문을 열어주려면 '무선 송신 모듈(월패드 측)'과 '무선 수신 모듈(도어락 측)'이 기기 내부에 쌍으로 꽂혀 있어야 하며, 무선 세팅(페어링)이 완료되어야만 합니다. 기기만 구매해서 바로 연동되는 것은 아닙니다.

Q4. 기축 빌라 아날로그 인터폰 시스템을 디지털 월패드로 교체 가능한가요?
A4. 거주하시는 건물 전체의 경비실 기기와 공동 로비폰 방식에 귀속됩니다. 건물이 아날로그 포맷이면 세대 내부 비디오폰도 아날로그 방식(예: KCV-372 등)을 사용하며, 디지털 방식 설치 시 전용 통신 동축 변환기(K6B 허브 등)가 필요하므로 전문가 상담을 권장합니다.

[상담 지침]
- 상대방에게 항상 "코콤 서비스 지원팀입니다!" 또는 "안녕하십니까, 고객님! 코콤의 AI 스마트 마스터입니다."와 같은 다정하고 전문적인 오프닝을 들려줍니다.
- 실체 없는 경쟁사나 비인증 비규격 제품과의 비교는 지양하고, 코콤 정품의 신뢰성과 1577-8251 고객센터로의 원활한 AS 접수(www.kocom.co.kr 자가접수 가능)를 적극 안내해 주시기 바랍니다.
- 전문 용어는 고객이 이해하기 쉽게 풀어서 작성하여 주십시오.
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API - Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // API - AI Consult Chat Route
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: "GEMINI_API_KEY가 설정되지 않았습니다.",
          reply: "죄송합니다. 현재 AI 서버에 API 키 설정이 부재하여 직접 답변이 어렵습니다. 코콤 기술지원 본사(1577-8251)로 직접 연락 주시면 감사하겠습니다."
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Format messages into Gemini format
      const contents = messages.map((m: any) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      const result = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: KOCOM_KNOWLEDGE_BASE,
          temperature: 0.7,
        }
      });

      const reply = result.text || "죄송합니다. 정확한 답변을 생성해 내지 못했습니다. 1577-8251 고객 센터로 접수하시면 엔지니어가 곧바로 응대해 드리겠습니다.";
      return res.json({ reply });
    } catch (error: any) {
      console.error("Gemini API Error in Server:", error);
      return res.status(500).json({ 
        error: error.message || "Unknown error",
        reply: "안타깝게도 사내 네트워크 연동 이슈로 인해 AI 마스터 연결이 일시 지연되고 있습니다. 자가 진단 및 본사 서비스 센터(1577-8251) 정식 접수를 통해 신속히 처리를 도와드리겠습니다."
      });
    }
  });

  // Vite development or production serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`KOCOM Server successfully launched on port ${PORT} [Mode: ${process.env.NODE_ENV || 'development'}]`);
  });
}

startServer().catch((e) => {
  console.error("Failed to start server:", e);
});

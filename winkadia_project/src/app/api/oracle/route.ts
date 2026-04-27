// src/app/api/oracle/route.ts

import { NextRequest, NextResponse } from "next/server"; // Next.js API 요청과 응답 객체를 가져옴

export async function POST(req: NextRequest) { // POST 요청으로 오늘의 신탁 메시지를 생성하는 API 함수임
  try {
    const { lang } = await req.json(); // 요청 body에서 언어 값을 꺼냄
    const isKo = lang === "ko"; // 현재 요청 언어가 한국어인지 확인함

    // 신탁 희귀도를 랜덤으로 정함
    // rare 60%, epic 30%, legend 10% 확률로 나뉨
    const roll = Math.random(); // 0 이상 1 미만의 랜덤 숫자를 생성함
    const rarity: "rare" | "epic" | "legend" =
      roll < 0.6 ? "rare" : roll < 0.9 ? "epic" : "legend"; // 랜덤 숫자에 따라 희귀도를 결정함

    const rarityPrompt =
      rarity === "rare"
        ? "a gentle, hopeful"
        : rarity === "epic"
          ? "a mysterious, profound"
          : "a grand, legendary and awe-inspiring"; // 영어 프롬프트에 넣을 희귀도별 분위기 문구를 정함

    const prompt = isKo
      ? `당신은 윙카디아라는 로맨스 판타지 세계의 신입니다. 운명과 사랑을 주관합니다. 신탁을 구하는 자에게 ${rarity === "rare" ? "부드럽고 희망적인" : rarity === "epic" ? "신비롭고 심오한" : "웅장하고 전설적인"} 신탁 메시지를 한 문장으로 전해주세요. 30자에서 60자 사이로 작성하세요. 로맨스 판타지 세계관에 맞는 시적이고 아름다운 문체로 작성하세요. 따옴표나 부가 설명 없이 신탁 메시지만 출력하세요.`
      : `You are Winkadia, the god of destiny and love in a romance fantasy world. Deliver ${rarityPrompt} oracle message in one sentence to a seeker of fate. Keep it between 10 and 25 words. Use poetic, beautiful language fitting a romance fantasy world. Output only the oracle message without quotes or explanations.`; // 언어에 따라 OpenAI에게 보낼 신탁 생성 프롬프트를 만듦

    const apiKey = process.env.OPENAI_API_KEY; // 서버 환경변수에서 OpenAI API 키를 가져옴
    if (!apiKey) {
      // API 키가 없을 때 사용할 기본 신탁 메시지 목록임
      const fallbacks = isKo
        ? {
            rare: [
              "그대의 앞길에 따뜻한 빛이 드리워질 것이니, 두려워하지 마소서.",
              "잊고 있던 마음의 씨앗이 곧 꽃을 피우리라.",
              "오늘 스쳐 지나간 인연이 내일의 운명이 될지니.",
            ],
            epic: [
              "별들이 교차하는 밤, 그대의 숨겨진 힘이 깨어나리라.",
              "운명의 실타래가 풀리기 시작하니, 선택의 순간이 다가오고 있소.",
              "그대가 흘린 눈물이 마법이 되어 세계를 바꾸리라.",
            ],
            legend: [
              "천년에 한 번 나타나는 별 아래 태어난 자여, 그대가 바로 예언의 주인공이로다.",
              "세계의 균열을 꿰맬 수 있는 자는 오직 그대뿐이니, 왕관을 들어올려라.",
              "신들조차 그대의 운명 앞에 숨을 죽이니, 전설이 시작되리라.",
            ],
          }
        : {
            rare: [
              "A warm light shall grace thy path ahead; fear not, blessed one.",
              "A forgotten seed within thy heart shall soon bloom magnificently.",
              "The encounter you overlooked today may become tomorrow's destiny.",
            ],
            epic: [
              "On the night when stars align, thy hidden power shall awaken at last.",
              "The threads of fate unravel now; a moment of great choice draws near.",
              "Thy tears shall become magic that reshapes the very world.",
            ],
            legend: [
              "Born beneath a star that appears once in a millennium, thou art the protagonist of prophecy.",
              "Only thou canst mend the fracture of worlds; raise the crown and claim thy destiny.",
              "Even the gods hold their breath before thy fate; a legend is about to begin.",
            ],
          }; // 한국어 또는 영어에 따라 기본 메시지 목록을 선택함

      const msgs = fallbacks[rarity]; // 현재 희귀도에 맞는 기본 메시지 배열을 가져옴
      const message = msgs[Math.floor(Math.random() * msgs.length)]; // 해당 희귀도 메시지 중 하나를 랜덤으로 선택함
      return NextResponse.json({ message, rarity }); // 선택된 메시지와 희귀도를 JSON으로 응답함
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", { // OpenAI Chat Completions API에 신탁 메시지 생성을 요청함
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`, // OpenAI API 인증을 위해 Bearer 토큰을 넣음
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // 신탁 문장을 생성할 OpenAI 모델을 지정함
        messages: [{ role: "user", content: prompt }], // 위에서 만든 프롬프트를 사용자 메시지로 전달함
        max_tokens: 150, // 응답 최대 토큰 수를 제한함
        temperature: rarity === "legend" ? 1.0 : rarity === "epic" ? 0.9 : 0.8, // 희귀도가 높을수록 더 창의적인 문장이 나오도록 온도를 조절함
      }),
    });

    const data = await response.json(); // OpenAI 응답을 JSON으로 변환함
    const message =
      data.choices?.[0]?.message?.content?.trim() ||
      (isKo
        ? "운명의 별이 아직 그대의 길을 비추지 않았소."
        : "The stars of destiny have not yet illuminated thy path."); // OpenAI 응답 메시지가 있으면 사용하고 없으면 기본 문구를 사용함

    return NextResponse.json({ message, rarity }); // 생성된 신탁 메시지와 희귀도를 JSON으로 응답함
  } catch (error) {
    console.error("Oracle API error:", error); // API 실행 중 발생한 에러를 서버 콘솔에 출력함
    return NextResponse.json(
      {
        message: "신탁의 힘이 일시적으로 약해졌습니다. 다시 시도해주세요.", // 에러가 났을 때 사용자에게 보여줄 기본 메시지임
        rarity: "rare" as const, // 에러 응답의 기본 희귀도를 rare로 지정함
      },
      { status: 500 } // 서버 에러 상태 코드로 응답함
    );
  }
}
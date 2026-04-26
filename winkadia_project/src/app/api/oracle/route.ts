import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { lang } = await req.json();
    const isKo = lang === "ko";

    // Determine rarity: 60% rare, 30% epic, 10% legend
    const roll = Math.random();
    const rarity: "rare" | "epic" | "legend" =
      roll < 0.6 ? "rare" : roll < 0.9 ? "epic" : "legend";

    const rarityPrompt =
      rarity === "rare"
        ? "a gentle, hopeful"
        : rarity === "epic"
          ? "a mysterious, profound"
          : "a grand, legendary and awe-inspiring";

    const prompt = isKo
      ? `당신은 윙카디아라는 로맨스 판타지 세계의 신입니다. 운명과 사랑을 주관합니다. 신탁을 구하는 자에게 ${rarity === "rare" ? "부드럽고 희망적인" : rarity === "epic" ? "신비롭고 심오한" : "웅장하고 전설적인"} 신탁 메시지를 한 문장으로 전해주세요. 30자에서 60자 사이로 작성하세요. 로맨스 판타지 세계관에 맞는 시적이고 아름다운 문체로 작성하세요. 따옴표나 부가 설명 없이 신탁 메시지만 출력하세요.`
      : `You are Winkadia, the god of destiny and love in a romance fantasy world. Deliver ${rarityPrompt} oracle message in one sentence to a seeker of fate. Keep it between 10 and 25 words. Use poetic, beautiful language fitting a romance fantasy world. Output only the oracle message without quotes or explanations.`;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Fallback messages if no API key
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
          };

      const msgs = fallbacks[rarity];
      const message = msgs[Math.floor(Math.random() * msgs.length)];
      return NextResponse.json({ message, rarity });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
        temperature: rarity === "legend" ? 1.0 : rarity === "epic" ? 0.9 : 0.8,
      }),
    });

    const data = await response.json();
    const message =
      data.choices?.[0]?.message?.content?.trim() ||
      (isKo
        ? "운명의 별이 아직 그대의 길을 비추지 않았소."
        : "The stars of destiny have not yet illuminated thy path.");

    return NextResponse.json({ message, rarity });
  } catch (error) {
    console.error("Oracle API error:", error);
    return NextResponse.json(
      {
        message: "신탁의 힘이 일시적으로 약해졌습니다. 다시 시도해주세요.",
        rarity: "rare" as const,
      },
      { status: 500 }
    );
  }
}

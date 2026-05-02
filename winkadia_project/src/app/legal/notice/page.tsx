// src/app/legal/notice/page.tsx

import LegalDocument, { type LegalContent } from "../_components/LegalDocument";

const ko: LegalContent = {
  title: "법적 고지",
  effectiveDate: "최종 갱신일: 2026년 5월 2일",
  intro:
    "본 페이지는 Winkadia 플랫폼 및 그 콘텐츠에 관한 운영 주체, 저작권, 상표권, 면책 사항 등 법적 정보를 제공합니다.",
  sections: [
    {
      heading: "1. 운영 주체",
      body: [
        "- 서비스명: Winkadia (윙카디아)\n- 운영자: (사업자 정보는 정식 등록 후 본 페이지에 갱신될 예정입니다)\n- 문의 이메일: its.winkadia@gmail.com",
      ],
    },
    {
      heading: "2. 콘텐츠 저작권",
      body: [
        "Winkadia 플랫폼에서 제공되는 모든 영상, 이미지, 디자인, 텍스트, 음원, 캐릭터, UI 등 콘텐츠는 Winkadia 또는 정당한 권리자의 자산이며, 대한민국 「저작권법」 및 관련 국제 협약에 의해 보호됩니다.",
        "사전 서면 동의 없이 본 콘텐츠를 복제, 배포, 공중 송신, 출판, 방송, 캡처 후 외부 유포, 2차 저작물 작성 등의 방식으로 이용하는 행위는 금지되며, 위반 시 관련 법령에 따른 민·형사상 책임이 부과될 수 있습니다.",
      ],
    },
    {
      heading: "3. 상표권 및 디자인",
      body: [
        "\"Winkadia\", \"윙카디아\" 명칭, 로고, 캐릭터 디자인 및 관련 시각적 자산은 Winkadia 의 상표 또는 디자인 자산입니다. 무단 사용 시 「상표법」 및 「부정경쟁방지법」에 따른 책임이 부과될 수 있습니다.",
      ],
    },
    {
      heading: "4. 제3자 콘텐츠 및 라이선스",
      body: [
        "서비스 내 일부 콘텐츠는 제3자로부터 라이선스를 받아 제공될 수 있으며, 해당 콘텐츠의 저작권은 원 저작권자에게 귀속됩니다. 라이선스 기간이 종료되거나 변경된 경우 해당 콘텐츠는 사전 통지 후 서비스에서 제거되거나 수정될 수 있습니다.",
      ],
    },
    {
      heading: "5. 면책 사항",
      body: [
        "1. 서비스 내 일부 기능은 베타(시험 운영) 상태로 제공될 수 있으며, 회사는 이를 사전에 명시합니다.\n2. 회사는 천재지변, 전쟁, 정전, 통신 장애, 외부 클라우드 서비스 장애 등 불가항력적 사유로 인한 서비스 중단 또는 데이터 손실에 대해 책임을 지지 않습니다.\n3. 회사는 회원이 게시한 게시물(댓글 등)의 내용에 대해 책임을 지지 않으며, 해당 책임은 작성자에게 귀속됩니다. 다만 명백히 위법한 게시물은 회사가 신고를 받아 검토 후 삭제할 수 있습니다.",
      ],
    },
    {
      heading: "6. 침해 신고 및 콘텐츠 삭제 요청",
      body: [
        "본 서비스 내에서 자신의 저작권, 상표권, 초상권, 명예 등 권리를 침해하는 콘텐츠를 발견하신 경우, 다음 정보를 포함하여 아래 이메일로 신고해 주시기 바랍니다.\n\n- 권리 보유자(또는 대리인)의 성함 및 연락처\n- 침해된 권리의 종류 및 근거\n- 침해 콘텐츠의 위치(URL 등)\n- 권리 침해를 주장하는 사유\n\n신고 이메일: its.winkadia@gmail.com",
      ],
    },
    {
      heading: "7. 준거법 및 분쟁 해결",
      body: [
        "본 페이지에 기재된 법적 사항과 관련하여 분쟁이 발생할 경우 대한민국 법령을 준거법으로 하며, 회사 본점 소재지를 관할하는 법원을 제1심 관할법원으로 합니다.",
      ],
    },
    {
      heading: "8. 문의",
      body: [
        "법적 사항 또는 콘텐츠와 관련된 문의 사항은 다음 연락처로 보내주시기 바랍니다.\n이메일: its.winkadia@gmail.com",
      ],
    },
  ],
  closing: "본 법적 고지는 2026년 5월 2일 자로 갱신되었으며, 향후 변경 사항은 서비스 내 공지를 통해 안내됩니다.",
};

const en: LegalContent = {
  title: "Legal Notice",
  effectiveDate: "Last Updated: May 2, 2026",
  intro:
    "This page provides legal information regarding the operator, copyright, trademark rights, and disclaimers for the Winkadia platform and its content.",
  sections: [
    {
      heading: "1. Operator Information",
      body: [
        "- Service Name: Winkadia\n- Operator: (Business registration details will be updated on this page upon formal registration.)\n- Contact: its.winkadia@gmail.com",
      ],
    },
    {
      heading: "2. Content Copyright",
      body: [
        "All content provided on the Winkadia platform — including video, images, design, text, audio, characters, and UI — is the property of Winkadia or its rightful licensors and is protected under the Copyright Act of the Republic of Korea and applicable international treaties.",
        "Reproducing, distributing, publicly transmitting, publishing, broadcasting, capturing for external distribution, or creating derivative works of this content without prior written consent is prohibited. Violations may result in civil and criminal liability under applicable law.",
      ],
    },
    {
      heading: "3. Trademarks and Design",
      body: [
        "\"Winkadia\", the corresponding Korean mark \"윙카디아\", the logo, character designs, and related visual assets are trademarks or design assets of Winkadia. Unauthorized use may result in liability under the Trademark Act and the Unfair Competition Prevention Act.",
      ],
    },
    {
      heading: "4. Third-Party Content and Licensing",
      body: [
        "Some content within the Service may be provided under license from third parties, with copyright belonging to the original rights holders. Upon expiration or modification of such licenses, the relevant content may be removed or modified from the Service after prior notice.",
      ],
    },
    {
      heading: "5. Disclaimers",
      body: [
        "1. Some features within the Service may be provided in beta (test) status, and the Company will indicate such status in advance.\n2. The Company shall not be liable for service interruptions or data loss caused by force majeure events, including natural disasters, war, power outages, communication failures, or third-party cloud service outages.\n3. The Company is not responsible for the content of postings (comments, etc.) submitted by Members; such responsibility lies with the author. However, clearly unlawful postings may be reviewed and removed upon report.",
      ],
    },
    {
      heading: "6. Infringement Reports and Content Removal Requests",
      body: [
        "If you discover content within this Service that infringes upon your copyright, trademark, right of publicity, or honor, please report it to the email below with the following information:\n\n- Name and contact information of the rights holder (or authorized representative)\n- Type of right infringed and the basis for the claim\n- Location of the infringing content (URL, etc.)\n- Reasoning for the alleged infringement\n\nReport to: its.winkadia@gmail.com",
      ],
    },
    {
      heading: "7. Governing Law and Dispute Resolution",
      body: [
        "Any disputes arising in connection with the legal matters described on this page shall be governed by the laws of the Republic of Korea, and the court having jurisdiction over the Company's principal place of business shall be the court of first instance.",
      ],
    },
    {
      heading: "8. Contact",
      body: [
        "For inquiries regarding legal matters or content, please contact:\nEmail: its.winkadia@gmail.com",
      ],
    },
  ],
  closing:
    "In the event of any conflict between the Korean and English versions of this Legal Notice, the Korean version shall prevail. This Notice was last updated on May 2, 2026.",
};

export default function NoticePage() {
  return <LegalDocument ko={ko} en={en} />;
}

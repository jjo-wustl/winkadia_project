// src/app/legal/terms/page.tsx

import LegalDocument, { type LegalContent } from "../_components/LegalDocument";

// 한국어 이용약관
const ko: LegalContent = {
  title: "이용약관",
  effectiveDate: "시행일: 2026년 5월 2일",
  intro:
    "본 약관은 Winkadia(이하 '회사' 또는 '서비스')가 운영하는 윙카디아 플랫폼(이하 '서비스')의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임 사항을 규정합니다.",
  sections: [
    {
      heading: "제1조 (목적)",
      body: [
        "본 약관은 회사가 제공하는 서비스의 이용 조건 및 절차, 회사와 회원 간의 권리, 의무, 책임 사항, 기타 필요한 사항을 규정함을 목적으로 합니다.",
      ],
    },
    {
      heading: "제2조 (정의)",
      body: [
        "1. '서비스'란 회사가 제공하는 영상 콘텐츠 시청, 갤러리 열람, 그 외 회사가 제공하는 모든 부가 기능을 의미합니다.\n2. '회원'이란 본 약관에 동의하고 회사와 이용계약을 체결하여 서비스를 이용하는 자를 말합니다.\n3. '콘텐츠'란 서비스를 통해 제공되는 영상, 이미지, 텍스트 등 모든 디지털 형태의 정보를 의미합니다.",
      ],
    },
    {
      heading: "제3조 (약관의 효력 및 변경)",
      body: [
        "1. 본 약관은 회원이 회원가입 시 동의함으로써 효력이 발생합니다.\n2. 회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있으며, 변경 시 그 사유와 적용일을 명시하여 적용일 7일 전부터 서비스 내에 공지합니다.\n3. 회원은 변경된 약관에 동의하지 않을 경우 회원 탈퇴를 요청할 수 있습니다.",
      ],
    },
    {
      heading: "제4조 (회원가입 및 계정 관리)",
      body: [
        "1. 이용자는 회사가 정한 절차에 따라 회원가입을 신청할 수 있으며, 회사는 다음 각 호에 해당하지 않는 한 가입을 승낙합니다.\n   - 타인의 명의를 도용하여 신청한 경우\n   - 허위 정보를 기재한 경우\n   - 만 14세 미만이 법정대리인의 동의 없이 신청한 경우\n2. 회원은 자신의 계정 정보를 안전하게 관리할 책임이 있으며, 이를 제3자에게 양도하거나 대여할 수 없습니다.\n3. 회원은 자신의 계정이 부정 사용된 사실을 인지한 즉시 회사에 통지해야 합니다.",
      ],
    },
    {
      heading: "제5조 (서비스의 제공 및 변경)",
      body: [
        "1. 회사는 회원에게 다음과 같은 서비스를 제공합니다.\n   - 영상 콘텐츠 시청 서비스\n   - 갤러리 이미지 열람 서비스\n   - 기타 회사가 추가로 개발 또는 제휴 계약을 통해 제공하는 서비스\n2. 회사는 운영상 또는 기술상의 필요에 따라 제공 중인 서비스의 일부 또는 전부를 변경하거나 중단할 수 있으며, 이 경우 사전에 합리적인 방법으로 회원에게 공지합니다.",
      ],
    },
    {
      heading: "제6조 (콘텐츠의 저작권)",
      body: [
        "1. 회사가 제공하는 모든 콘텐츠에 대한 저작권 및 지적재산권은 회사 또는 정당한 권리자에게 귀속됩니다.\n2. 회원은 서비스를 통해 제공받은 콘텐츠를 회사의 사전 서면 동의 없이 복제, 배포, 전송, 공중 송신, 출판, 방송, 캡처 후 외부 유포 등의 방법으로 이용할 수 없습니다.\n3. 회원이 서비스 내에 작성한 댓글 등 게시물의 저작권은 해당 회원에게 귀속됩니다. 다만 회원은 회사가 서비스 운영을 위해 필요한 범위에서 해당 게시물을 비독점적, 무상으로 이용할 수 있도록 허락합니다.",
      ],
    },
    {
      heading: "제7조 (회원의 의무)",
      body: [
        "회원은 다음 각 호의 행위를 하여서는 안 됩니다.\n1. 타인의 정보 도용\n2. 회사가 게시한 정보의 무단 변경\n3. 콘텐츠의 무단 복제, 캡처, 다운로드 후 외부 유포\n4. 서비스의 정상 운영을 방해하는 행위\n5. 회사 및 제3자의 명예를 훼손하거나 권리를 침해하는 행위\n6. 음란, 폭력, 차별 등 사회 통념에 반하는 내용 게시\n7. 기타 관계 법령에 위반되는 행위",
      ],
    },
    {
      heading: "제8조 (이용 제한 및 회원자격 정지)",
      body: [
        "1. 회사는 회원이 본 약관 또는 관계 법령을 위반한 경우 사전 통지 없이 서비스 이용을 제한하거나 회원자격을 정지·상실시킬 수 있습니다.\n2. 자격 정지·상실 시 회원이 서비스 내에서 가지고 있던 권리(게시물, 시청 기록 등)는 관련 법령 및 개인정보처리방침에 따라 처리됩니다.",
      ],
    },
    {
      heading: "제9조 (이용계약 해지)",
      body: [
        "1. 회원은 언제든지 회사가 정한 절차에 따라 회원 탈퇴를 신청할 수 있으며, 회사는 즉시 탈퇴를 처리합니다.\n2. 탈퇴 시 보존이 필요한 정보는 개인정보처리방침에 따라 처리됩니다.",
      ],
    },
    {
      heading: "제10조 (책임의 제한)",
      body: [
        "1. 회사는 천재지변, 전쟁, 정전, 통신 장애 등 불가항력적 사유로 서비스를 제공할 수 없는 경우 책임이 면제됩니다.\n2. 회사는 회원의 귀책사유로 인한 서비스 이용 장애에 대해 책임을 지지 않습니다.\n3. 회사는 회원이 서비스 이용을 통해 기대하는 수익을 얻지 못한 것에 대해 책임을 지지 않습니다.",
      ],
    },
    {
      heading: "제11조 (준거법 및 관할)",
      body: [
        "본 약관과 관련된 분쟁에 대하여는 대한민국 법령을 적용하며, 분쟁이 발생할 경우 회사 본점 소재지를 관할하는 법원을 제1심 관할법원으로 합니다.",
      ],
    },
    {
      heading: "제12조 (문의)",
      body: [
        "본 약관과 관련된 문의 사항은 다음 연락처로 보내주시기 바랍니다.\n이메일: its.winkadia@gmail.com",
      ],
    },
  ],
  closing: "본 약관은 2026년 5월 2일부터 시행됩니다.",
};

// 영문 이용약관 (Korean version is the controlling text — 한국어 원문이 우선함)
const en: LegalContent = {
  title: "Terms of Use",
  effectiveDate: "Effective Date: May 2, 2026",
  intro:
    "These Terms of Use govern the use of the Winkadia platform (hereinafter the \"Service\") operated by Winkadia (hereinafter the \"Company\") and define the rights, obligations, and responsibilities between the Company and its Members.",
  sections: [
    {
      heading: "Article 1 (Purpose)",
      body: [
        "These Terms set out the conditions and procedures for using the Service, the rights, obligations, and responsibilities between the Company and its Members, and other matters necessary for the operation of the Service.",
      ],
    },
    {
      heading: "Article 2 (Definitions)",
      body: [
        "1. \"Service\" refers to all video content viewing, gallery browsing, and other supplementary features provided by the Company.\n2. \"Member\" refers to a person who has agreed to these Terms and entered into a service agreement with the Company.\n3. \"Content\" refers to all digital materials including video, images, and text provided through the Service.",
      ],
    },
    {
      heading: "Article 3 (Effect and Modification of Terms)",
      body: [
        "1. These Terms take effect upon a Member's agreement at the time of registration.\n2. The Company may amend these Terms within the scope permitted by applicable law. In such case, the reason and effective date of the amendment will be announced within the Service at least seven (7) days before the effective date.\n3. A Member who does not agree to the amended Terms may request termination of membership.",
      ],
    },
    {
      heading: "Article 4 (Account Registration and Management)",
      body: [
        "1. Users may apply for registration in accordance with the procedures set by the Company. The Company will accept registration unless the application falls under the following:\n   - Use of another person's identity\n   - Submission of false information\n   - Applicants under 14 years of age without legal guardian consent\n2. Members are responsible for the secure management of their account credentials and may not transfer or lend them to any third party.\n3. Members must immediately notify the Company upon discovering any unauthorized use of their account.",
      ],
    },
    {
      heading: "Article 5 (Provision and Modification of the Service)",
      body: [
        "1. The Company provides the following services to Members:\n   - Video content viewing\n   - Gallery image browsing\n   - Other services developed or provided through partnerships by the Company\n2. The Company may modify or discontinue all or part of the Service for operational or technical reasons, in which case Members will be notified in advance through reasonable means.",
      ],
    },
    {
      heading: "Article 6 (Content Copyright)",
      body: [
        "1. All copyright and intellectual property rights in the Content provided by the Company belong to the Company or its rightful licensors.\n2. Members may not reproduce, distribute, transmit, publicly transmit, publish, broadcast, capture, or otherwise externally disseminate the Content without the prior written consent of the Company.\n3. The copyright in user-generated postings such as comments belongs to the respective Member. However, Members grant the Company a non-exclusive, royalty-free right to use such postings to the extent necessary for the operation of the Service.",
      ],
    },
    {
      heading: "Article 7 (Member Obligations)",
      body: [
        "Members must not engage in any of the following:\n1. Identity theft\n2. Unauthorized modification of information posted by the Company\n3. Unauthorized reproduction, capture, or external distribution of Content\n4. Acts that interfere with the normal operation of the Service\n5. Acts that defame the Company or third parties or infringe upon their rights\n6. Posting of obscene, violent, discriminatory, or otherwise offensive material\n7. Any other acts that violate applicable laws or regulations",
      ],
    },
    {
      heading: "Article 8 (Restriction of Use and Suspension of Membership)",
      body: [
        "1. If a Member violates these Terms or applicable laws, the Company may, without prior notice, restrict the Member's use of the Service or suspend or terminate the Membership.\n2. Upon suspension or termination, any rights the Member held within the Service (postings, viewing records, etc.) will be handled in accordance with applicable laws and the Privacy Policy.",
      ],
    },
    {
      heading: "Article 9 (Termination of Service Agreement)",
      body: [
        "1. Members may at any time request to withdraw their membership in accordance with the procedures set by the Company, and the Company will process such withdrawal without delay.\n2. Information that must be retained after withdrawal will be handled in accordance with the Privacy Policy.",
      ],
    },
    {
      heading: "Article 10 (Limitation of Liability)",
      body: [
        "1. The Company is exempt from liability for failure to provide the Service due to force majeure events including natural disasters, war, power outages, or communication disruptions.\n2. The Company is not liable for service disruptions caused by reasons attributable to the Member.\n3. The Company is not liable for any failure of the Member to obtain expected revenue through the Service.",
      ],
    },
    {
      heading: "Article 11 (Governing Law and Jurisdiction)",
      body: [
        "These Terms are governed by the laws of the Republic of Korea. Any dispute arising in connection with these Terms shall be brought before the court having jurisdiction over the Company's principal place of business.",
      ],
    },
    {
      heading: "Article 12 (Contact)",
      body: [
        "For inquiries regarding these Terms, please contact:\nEmail: its.winkadia@gmail.com",
      ],
    },
  ],
  closing:
    "In the event of any conflict between the Korean and English versions of these Terms, the Korean version shall prevail. These Terms become effective on May 2, 2026.",
};

export default function TermsPage() {
  return <LegalDocument ko={ko} en={en} />;
}

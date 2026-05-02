// src/app/legal/privacy/page.tsx

import LegalDocument, { type LegalContent } from "../_components/LegalDocument";

const ko: LegalContent = {
  title: "개인정보처리방침",
  effectiveDate: "시행일: 2026년 5월 2일",
  intro:
    "Winkadia(이하 '회사')는 「개인정보 보호법」 등 관련 법령을 준수하며, 회원의 개인정보를 보호하고 이와 관련된 고충을 신속하고 원활하게 처리하기 위해 본 개인정보처리방침을 수립·공개합니다.",
  sections: [
    {
      heading: "제1조 (수집하는 개인정보 항목)",
      body: [
        "회사는 다음과 같은 개인정보를 수집합니다.\n\n[회원가입 및 서비스 이용 시]\n- 필수 항목: 이메일 주소, 닉네임(표시 이름), 비밀번호 또는 소셜 로그인 식별자\n- 소셜 로그인(Google) 이용 시: Google 계정으로부터 제공받는 프로필 정보(이메일, 이름, 프로필 이미지)\n\n[서비스 이용 과정에서 자동으로 수집되는 정보]\n- 접속 IP 주소, 쿠키, 접속 일시, 서비스 이용 기록(시청 기록, 좋아요, 댓글), 기기 및 브라우저 정보",
      ],
    },
    {
      heading: "제2조 (개인정보의 수집 및 이용 목적)",
      body: [
        "회사는 수집한 개인정보를 다음 목적으로만 이용합니다.\n1. 회원 식별 및 본인 확인\n2. 서비스 제공 및 이용계약 이행\n3. 콘텐츠 추천 및 개인화된 서비스 제공\n4. 서비스 이용 통계 분석 및 서비스 개선\n5. 부정 이용 방지 및 분쟁 해결\n6. 고객 문의 응대",
      ],
    },
    {
      heading: "제3조 (개인정보의 보유 및 이용 기간)",
      body: [
        "1. 회원의 개인정보는 회원이 서비스를 이용하는 동안 보유하며, 회원 탈퇴 시 지체 없이 파기합니다.\n2. 다만, 다음의 경우에는 명시된 기간 동안 보관합니다.\n   - 부정 이용 기록: 1년 (재가입 및 부정 이용 방지 목적)\n   - 관련 법령에 의한 보관 의무가 있는 경우 해당 법령에서 정한 기간",
      ],
    },
    {
      heading: "제4조 (개인정보의 제3자 제공)",
      body: [
        "회사는 원칙적으로 회원의 개인정보를 제3자에게 제공하지 않습니다. 다만 다음의 경우에는 예외로 합니다.\n1. 회원이 사전에 동의한 경우\n2. 법령의 규정에 의하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우",
      ],
    },
    {
      heading: "제5조 (개인정보 처리의 위탁)",
      body: [
        "회사는 서비스 제공을 위해 다음과 같이 개인정보 처리 업무의 일부를 외부 사업자에게 위탁하고 있습니다.\n\n- 수탁업체: Google LLC\n\n- 수탁업체: Vercel Inc.\n\n회사는 위탁계약 체결 시 「개인정보 보호법」에 따라 위탁업무 수행 목적 외 개인정보 처리 금지, 기술적·관리적 보호조치, 재위탁 제한 등을 명시하고 있으며, 수탁업체가 개인정보를 안전하게 처리하도록 감독합니다.",
      ],
    },
    {
      heading: "제6조 (이용자의 권리 및 행사 방법)",
      body: [
        "회원은 언제든지 다음의 권리를 행사할 수 있습니다.\n1. 개인정보 열람 요청\n2. 개인정보 정정·삭제 요청\n3. 개인정보 처리 정지 요청\n4. 회원 탈퇴 (개인정보 삭제 포함)\n\n위 권리는 서비스 내 설정 메뉴 또는 본 방침에 명시된 연락처(its.winkadia@gmail.com)로 요청할 수 있으며, 회사는 관련 법령에 따라 지체 없이 처리합니다.",
      ],
    },
    {
      heading: "제7조 (쿠키의 사용)",
      body: [
        "1. 회사는 회원에게 개인화된 서비스를 제공하기 위해 쿠키를 사용합니다.\n2. 회원은 브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나, 거부 시 일부 서비스(자동 로그인, 언어 설정 유지 등) 이용에 제한이 발생할 수 있습니다.",
      ],
    },
    {
      heading: "제8조 (개인정보의 안전성 확보 조치)",
      body: [
        "회사는 회원의 개인정보 보호를 위해 다음과 같은 조치를 취하고 있습니다.\n1. 비밀번호의 단방향 암호화 저장\n2. 통신 구간 암호화 (HTTPS/TLS)\n3. 영상 콘텐츠 접근 시 단기 만료 서명 URL 사용\n4. 접근 권한의 최소화 및 정기 점검\n5. 개인정보 처리 위탁업체에 대한 정기 감독",
      ],
    },
    {
      heading: "제9조 (개인정보 보호 책임자)",
      body: [
        "회사는 회원의 개인정보 처리에 관한 업무를 총괄하고, 관련 문의 및 불만 처리, 피해 구제 등을 위해 개인정보 보호 책임자를 두고 있습니다.\n\n- 이메일: its.winkadia@gmail.com",
      ],
    },
    {
      heading: "제10조 (개인정보처리방침의 변경)",
      body: [
        "본 방침이 변경되는 경우 회사는 변경 사항을 시행 7일 전부터 서비스 내에 공지합니다. 다만, 회원의 권리에 중대한 변경이 있는 경우에는 30일 전부터 공지하며, 필요한 경우 별도의 동의를 받습니다.",
      ],
    },
  ],
  closing: "본 개인정보처리방침은 2026년 5월 2일부터 시행됩니다.",
};

const en: LegalContent = {
  title: "Privacy Policy",
  effectiveDate: "Effective Date: May 2, 2026",
  intro:
    "Winkadia (hereinafter the \"Company\") complies with applicable privacy laws including the Personal Information Protection Act of Korea, and establishes this Privacy Policy to protect the personal information of its Members and to handle related concerns promptly and effectively.",
  sections: [
    {
      heading: "Article 1 (Personal Information Collected)",
      body: [
        "The Company collects the following personal information.\n\n[At Registration and During Service Use]\n- Required: email address, display name, password or social login identifier\n- For social login (Google): profile information provided by Google (email, name, profile image)\n\n[Automatically Collected During Service Use]\n- IP address, cookies, access timestamps, service usage records (viewing history, likes, comments), device and browser information",
      ],
    },
    {
      heading: "Article 2 (Purpose of Collection and Use)",
      body: [
        "The Company uses the collected personal information solely for the following purposes:\n1. Member identification and authentication\n2. Provision of the Service and performance of the service agreement\n3. Content recommendations and personalization\n4. Statistical analysis and service improvement\n5. Prevention of misuse and dispute resolution\n6. Responding to inquiries",
      ],
    },
    {
      heading: "Article 3 (Retention and Use Period)",
      body: [
        "1. Personal information is retained while the Member uses the Service and is destroyed without delay upon withdrawal.\n2. Notwithstanding the above, the following are retained for the specified periods:\n   - Records of misuse: 1 year (to prevent re-registration abuse)\n   - When retention is required by law: the period prescribed by such law",
      ],
    },
    {
      heading: "Article 4 (Provision to Third Parties)",
      body: [
        "As a general rule, the Company does not provide Members' personal information to third parties. The following are exceptions:\n1. When the Member has given prior consent\n2. When required by law or by an investigative authority following the procedures and methods prescribed by law",
      ],
    },
    {
      heading: "Article 5 (Outsourcing of Processing)",
      body: [
        "The Company outsources part of the personal information processing to the following service providers:\n\n- Google LLC\n\n- Vercel Inc.\n\nWhen entering into such outsourcing agreements, the Company specifies the prohibition of using personal information beyond the purpose of the outsourced task, technical and managerial protective measures, and restrictions on re-outsourcing as required by the Personal Information Protection Act, and supervises the safe processing of personal information by the trustees.",
      ],
    },
    {
      heading: "Article 6 (User Rights and How to Exercise Them)",
      body: [
        "Members may exercise the following rights at any time:\n1. Request to view personal information\n2. Request to correct or delete personal information\n3. Request to suspend processing of personal information\n4. Withdrawal of membership (including deletion of personal information)\n\nThese rights may be exercised through the in-service settings or by contacting the Company at its.winkadia@gmail.com. The Company will respond without delay in accordance with applicable laws.",
      ],
    },
    {
      heading: "Article 7 (Use of Cookies)",
      body: [
        "1. The Company uses cookies to provide a personalized Service.\n2. Members may refuse cookie storage through their browser settings, but doing so may limit the use of certain features such as automatic login and language preference retention.",
      ],
    },
    {
      heading: "Article 8 (Security Measures)",
      body: [
        "The Company takes the following measures to protect Members' personal information:\n1. One-way encryption of passwords\n2. Encryption of communications (HTTPS/TLS)\n3. Use of short-lived signed URLs for video content access\n4. Minimization of access privileges and regular audits\n5. Regular supervision of outsourced data processors",
      ],
    },
    {
      heading: "Article 9 (Privacy Protection Officer)",
      body: [
        "The Company designates a Privacy Protection Officer to oversee personal information processing and to handle related inquiries, complaints, and remedies.\n\n- Email: its.winkadia@gmail.com",
      ],
    },
    {
      heading: "Article 10 (Changes to This Policy)",
      body: [
        "When this Policy is amended, the Company will announce the changes within the Service at least seven (7) days before the effective date. For changes that materially affect Members' rights, notice will be provided at least thirty (30) days in advance, and separate consent will be obtained if necessary.",
      ],
    },
  ],
  closing:
    "In the event of any conflict between the Korean and English versions of this Policy, the Korean version shall prevail. This Policy becomes effective on May 2, 2026.",
};

export default function PrivacyPage() {
  return <LegalDocument ko={ko} en={en} />;
}

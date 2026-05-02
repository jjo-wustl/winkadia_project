// src/i18n/ko.ts

const ko = { // 한국어 화면 문구를 모아둔 객체임
  common: { loading: "신전의 문이 열리고 있습니다...", error: "마법진이 흐트러졌습니다", back: "돌아가기", save: "기록하기", cancel: "취소", confirm: "확인", delete: "삭제", edit: "수정", search: "탐색하기...", seeMore: "더 보기", noResults: "기록을 찾을 수 없습니다" }, // 공통으로 쓰는 버튼, 상태, 안내 문구임
  auth: { // 로그인, 회원가입, 비밀번호 찾기 화면에서 쓰는 문구임
    gateTitle: "윙카디아 신전", // 로그인 화면 메인 제목임
    gateSubtitle: "그대는 결국, 이 곳에 닿았군요.", // 로그인 화면 부제목임
    gateDescription: "결계 안으로 들기 위해선 출입인장이 필요합니다.", // 로그인 화면 설명 문구임
    loginWithGoogle: "구글 인장으로 로그인", // 구글 로그인 버튼 문구임
    loginWithEmail: "로그인", // 이메일 로그인 버튼 문구임
    signUpWithEmail: "신전 가입하기", // 회원가입 버튼 문구임
    email: "이메일", // 이메일 입력 라벨임
    password: "비밀번호", // 비밀번호 입력 라벨임
    confirmPassword: "비밀번호 확인", // 비밀번호 확인 입력 라벨임
    displayName: "신전 닉네임", // 닉네임 입력 라벨임
    forgotPassword: "비밀번호 찾기", // 비밀번호 찾기 버튼 문구임
    resetPassword: "비밀번호 재설정", // 비밀번호 재설정 버튼 문구임
    resetSent: "재설정 서신이 발송되었습니다", // 비밀번호 재설정 메일 발송 완료 문구임
    noAccount: "아직 가입하지 않으셨나요?", // 계정이 없을 때 회원가입으로 유도하는 문구임
    hasAccount: "이미 가입하셨나요?", // 계정이 있을 때 로그인으로 유도하는 문구임
    hasAccountAction: "이메일로 입장", // 이메일 로그인 이동 문구임
    logout: "신전에서 물러나기", // 로그아웃 문구임
    loginError: "인장이 올바르지 않습니다", // 로그인 실패 기본 에러 문구임
    signUpError: "가입에 실패했습니다", // 회원가입 실패 기본 에러 문구임
    genderSelect: "호칭을 선택해주세요", // 성별 또는 호칭 선택 라벨임
    female: "영애 (여성)", // 여성 선택 문구임
    male: "영식 (남성)", // 남성 선택 문구임
    other: "침묵 (기타)", // 기타 선택 문구임
  },
  nav: { sanctuary: "신전 대전", theater: "환영극장", chronicles: "연대기", council: "신탁의 전당", profile: "나의 서재", home: "대전으로" }, // 네비게이션 메뉴 문구임
  sanctuary: { // sanctuary 메인 페이지에서 쓰는 문구임
    welcome: "다시 돌아오셨군요", // 사용자 환영 문구 앞부분임
    welcomeSuffix_male: "영식이여", // 남성 사용자 환영 호칭임
    welcomeSuffix_female: "영애여", // 여성 사용자 환영 호칭임
    welcomeSuffix_other: "축복받은 자여", // 기타 사용자 환영 호칭임
    heroTitle: "윙카디아 신전에 오신 것을 환영합니다", // 메인 히어로 제목임
    heroSubtitle: "이곳에서 펼쳐지는 운명의 이야기들을 목격하소서", // 메인 히어로 설명 문구임
    introTitle: "✦ 윙카디아란 무엇인가 ✦", // 소개 섹션 제목임
    introDesc: "윙카디아는 운명과 사랑을 주관하는 신이 다스리는 세계입니다. 이 신전에서는 수많은 평행 세계의 로맨스 판타지 이야기들이 펼쳐지며, 선택받은 영식과 영애들만이 그 운명의 실타래를 목격할 수 있습니다. 유튜브에서 공개되지 않는 미방분 에피소드와 특별한 이야기들이 이곳, 윙카디아 신전에서만 공개됩니다.", // 소개 섹션 설명 문구임
    featuredTitle: "✦ 이번 주의 신탁 ✦", latestTitle: "최신 환영", exclusiveTitle: "✦ 신전 한정 ✦", exclusiveBadge: "미방분", // 영상 섹션 제목과 독점 배지 문구임
    announcementsTitle: "신전 포고문", seriesTitle: "연재 중인 운명들", // 공지사항과 시리즈 섹션 제목임
    statsTitle: "신전 기록", totalViews: "총 목격 수", totalMembers: "축복받은 자들", totalEpisodes: "기록된 운명", totalSeries: "진행 중인 이야기", // 통계 섹션 문구임
  },
  oracle: { // 오라클 기능에서 쓰는 문구임
    title: "🌌 신탁 받기", subtitle: "윙카디아 신에게 오늘의 운명을 물어보세요", // 오라클 섹션 제목과 설명임
    button: "신탁 받기", loading: "윙카디아 신이 그대의 운명을 읽고 있습니다...", // 오라클 버튼과 로딩 문구임
    alreadyUsed: "오늘의 신탁은 이미 받으셨습니다. 내일 다시 찾아오소서.", // 오늘 이미 신탁을 받은 경우의 안내 문구임
    nextAvailable: "다음 신탁 가능 시간", share: "신탁의 전당에 공유하기", // 다음 가능 시간과 공유 버튼 문구임
    shared: "신탁이 전당에 기록되었습니다!", rare: "레어", epic: "에픽", legend: "레전드", myOracle: "오늘의 나의 신탁", // 공유 완료와 희귀도 표시 문구임
  },
  theater: { title: "환영극장", subtitle: "윙카디아 세계의 이야기들이 펼쳐지는 곳", allSeries: "전체 이야기", exclusive: "신전 한정", latest: "최신순", popular: "인기순", episode: "제", episodeSuffix: "화", views: "목격", likes: "축복", noVideos: "아직 기록된 환영이 없습니다" }, // 영상 극장 페이지에서 쓰는 문구임
  video: { comments: "영식·영애들의 기록", commentPlaceholder: "이 운명에 대한 기록을 남기소서...", submitComment: "기록 남기기", noComments: "아직 기록이 없습니다. 첫 기록을 남겨보세요!", loginToComment: "기록을 남기려면 신전에 입장하세요", deleteComment: "기록 삭제", likeComment: "축복", relatedVideos: "관련된 운명들", shareVideo: "이 운명 공유하기", copied: "복사됨!" }, // 영상 상세와 댓글 기능에서 쓰는 문구임
  chronicles: { title: "윙카디아 연대기", subtitle: "이 세계의 역사와 비밀들을 탐구하소서", worldLore: "세계관", characters: "운명의 인물들", timeline: "시간의 흐름", godDesc: "윙카디아 — 운명과 사랑을 주관하는 신. 그의 신전에서는 모든 이야기가 시작되고, 모든 운명이 교차한다.", templeDesc: "이 신전은 윙카디아의 뜻에 따라 선택받은 자들만이 출입할 수 있는 성소이다.", realmDesc: "윙카디아의 세계는 무한한 가능성의 영역이다. 각 이야기는 하나의 평행 세계에서 펼쳐지며, 사랑과 운명, 그리고 선택의 무게를 담고 있다." }, // 연대기 페이지에서 쓰는 세계관 문구임
  council: { title: "신탁의 전당", subtitle: "영식·영애들이 받은 신탁이 기록되는 곳", noOracles: "아직 기록된 신탁이 없습니다. 신전 대전에서 신탁을 받아보세요!", totalOracles: "기록된 신탁", goToSanctuary: "신전 대전으로 가서 신탁 받기" }, // 신탁의 전당 페이지에서 쓰는 문구임
  profile: { title: "나의 서재", subtitle: "그대의 기록과 축복의 흔적", editProfile: "인장 수정", memberSince: "축복받은 날", watchHistory: "관람 기록", myComments: "나의 기록들", favorites: "축복한 운명들", settings: "설정" }, // 프로필 페이지에서 쓰는 문구임
  footer: { // 푸터에서 쓰는 문구임
    copyright: "© 2026 Winkadia. All rights reserved.", // 저작권 표기 - 일반 OTT/엔터 플랫폼 표준 형식
    terms: "이용약관", // /legal/terms 페이지 링크 라벨임
    privacy: "개인정보처리방침", // /legal/privacy 페이지 링크 라벨임
    notice: "법적 고지", // /legal/notice 페이지 링크 라벨임
    contactLabel: "문의", // 문의 이메일 앞에 붙는 라벨임
    followUs: "윙카디아를 따르라", // (현재 미사용 - 추후 사용 가능성 위해 유지)
    madeWith: "운명의 실로 엮어진 신전", // (현재 미사용 - 추후 사용 가능성 위해 유지)
  },
  watch: { // Watch(영상 재생) 페이지에서 쓰는 문구임
    views: "조회수", // 조회수 라벨
    commentsTitle: "댓글", // 댓글 섹션 제목
    empty: "아직 댓글이 없습니다", // 댓글이 0개일 때 안내
    loadingComments: "댓글 불러오는 중...", // 댓글 첫 구독 시 로딩 안내
    placeholder: "댓글을 남겨주세요", // 댓글 입력창 placeholder
    submit: "등록", // 댓글 등록 버튼
    submitting: "등록 중...", // 등록 진행 중 버튼 라벨
    submitError: "댓글 등록에 실패했습니다. 잠시 후 다시 시도해주세요", // 댓글 등록 실패 안내
    loginRequired: "로그인 후 댓글을 작성할 수 있습니다", // 비로그인 안내
  },
  series: { // Series 페이지에서 쓰는 문구임
    pageTitle: "Series", // 페이지 메인 제목임
    badge: "Winkadia Exclusive", // 페이지 상단 독점 배지 문구임
    films: { // 가로(16:9) 영상 섹션임
      title: "필름",
      desc: "와이드 화면 영상",
    },
    shorts: { // 세로(9:16) 영상 섹션임
      title: "쇼츠",
      desc: "세로 화면 짧은 영상",
    },
    ipStatus: { // IP 섹션 상단에 노출하는 공개 상태 배지 문구임
      available: "공개 중",
      comingSoon: "공개 예정",
    },
    comingSoonMessage: "공개 예정작입니다. 트레일러와 본편이 곧 추가됩니다", // Coming Soon IP placeholder 문구임
    states: { // 데이터 로딩/오류 상태 메시지임
      videoLoading: "영상 불러오는 중...",
      videoError: "영상을 불러올 수 없음",
      thumbLoading: "썸네일 불러오는 중...",
      thumbError: "썸네일을 불러올 수 없음",
      notFound: "영상을 찾을 수 없음",
    },
    actions: { // 버튼 라벨임
      back: "Series로 돌아가기",
      play: "재생",
    },
  },
};
export default ko; // 한국어 번역 객체를 기본 export로 내보냄
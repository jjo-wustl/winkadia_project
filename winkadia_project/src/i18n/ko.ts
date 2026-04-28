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
  footer: { copyright: "© 2025 Winkadia. 모든 운명은 보호받고 있습니다.", terms: "신전 규율", privacy: "비밀 서약", contact: "신전에 서신 보내기", followUs: "윙카디아를 따르라", madeWith: "운명의 실로 엮어진 신전" }, // 푸터에서 쓰는 문구임
  series: { // Series(로판 시리즈) 페이지에서 쓰는 문구임
    brandLabel: "Winkadia Original", // 페이지 상단 브랜드 표기임
    pageTitle: "Romance Fantasy Series", // 페이지 메인 제목임
    pageDesc: "황궁의 긴장감, 정략으로 얽힌 관계, 비밀을 숨긴 인물들까지. 윙카디아의 로판 시리즈만 모아 보여주는 프리미엄 시리즈 공간입니다", // 페이지 메인 설명 문구임
    hallName: "Romance Fantasy Hall", // 로판 전용 상영관 이름임
    hallDesc: "황궁의 권력과 감정선이 함께 흐르는 로맨스 판타지 전용 상영관입니다. 화려한 세계관 속에서도 가장 오래 남는 건 결국 인물의 선택과 흔들리는 마음입니다", // 상영관 설명 문구임
    rofanOnly: "Rofan Only", // 로판 전용 칩 라벨임
    continueLabel: "궁정 드라마 이어보기", // 이어보기 섹션 제목임
    trendingLabel: "지금 가장 주목받는 궁정 드라마", // 트렌딩 섹션 제목임
    shelfA: "오늘의 황궁 드라마", // 큐레이션 섹션 A 제목임
    shelfB: "관계선이 강한 드라마", // 큐레이션 섹션 B 제목임
    editorLabel: "황궁 드라마 하이라이트", // 에디터 노트 섹션 라벨임
    ui: { // 카드 안쪽 작은 라벨 모음임
      hallIdentity: "Hall Identity",
      featuredCharacter: "Featured Character",
      storyNote: "Story Note",
      episode: "Episode",
      status: "Status",
      keyPoint: "Key Point",
      watchedSuffix: "시청", // 진행률 뒤에 붙는 안내 문구임
    },
    buttons: { // 버튼 라벨 모음임
      playNow: "지금 재생",
      freeFirstEp: "1화 무료 보기",
      trailer: "예고편 보기",
      seeAll: "전체 보기",
      seeRanking: "순위 보기",
      seeMore: "더 보기",
      watchNow: "지금 감상하기",
      seeDetails: "상세 정보 보기",
    },
    hero: { // 히어로 영역 텍스트임
      eyebrow: "Romance Fantasy Selection",
      note: "화려한 세계관 속에서 시작되는 가장 치명적인 관계",
    },
    protagonist: { // 주인공 카드 데이터임
      name: "세라핀 벨루아",
      role: "몰락 직전 공작가의 장녀",
      desc: "가문을 지키기 위해 감정보다 판단을 먼저 배운 인물. 누구보다 냉정해 보이지만, 끝내 자기 사람을 버리지 못하는 약점이 그녀를 더 위험하게 만듭니다",
      tags: ["궁정 서사", "정략 관계", "감정 절제"],
    },
    stats: [ // 통계 카드 목록임
      { label: "Weekly Uploads", value: "124", desc: "이번 주 새롭게 공개된 로판 작품" },
      { label: "Shortlisted", value: "18", desc: "특별 추천으로 선정된 작품" },
      { label: "Mood Boards", value: "39", desc: "세계관 무드와 감정선이 돋보이는 큐레이션" },
    ],
    project: { // 대표 작품 카드 데이터임
      eyebrow: "Featured Title",
      title: "The Contract of Winter Rose",
      desc: "서로를 믿을 수 없는 관계로 시작했지만, 가장 위태로운 순간마다 서로를 먼저 떠올리게 되는 이야기. 권력과 감정이 동시에 흔들리는 궁정 로맨스의 매력을 가장 잘 보여주는 대표 작품입니다",
      episode: "EP 06 · 가면무도회 직전",
      status: "지금 가장 많이 주목받는 회차",
      point: "계약으로 시작된 관계가 운명처럼 뒤틀리는 순간",
    },
    notes: [ // 에디터 노트 목록임
      { label: "Highlight", title: "차가운 계약이 진심으로 바뀌기 시작하는 순간", desc: "겉으로는 아무 일도 없지만, 단 한 번의 시선으로 관계의 공기가 달라지는 장면이 있습니다. 로판의 매력은 바로 그런 미묘한 변화에 있습니다" },
      { label: "Must See", title: "드레스보다 더 강하게 남는 건 결국 감정입니다", desc: "화려한 배경과 장식 속에서도 가장 오래 기억에 남는 건 인물의 표정과 선택입니다. 그래서 이 작품은 더 깊게 빠져들게 만듭니다" },
    ],
    panels: [ // 큐레이션 패널 목록임 (카드 태그/제목/설명에 사용함)
      { tag: "Tone Design", title: "궁정 텐션 보드", desc: "권력과 로맨스가 동시에 흐르는 장면들을 모은 큐레이션. 긴장감과 설렘이 한 화면 안에 공존합니다" },
      { tag: "Character Depth", title: "감정선 배치", desc: "설명보다 눈빛이 먼저 말해주는 관계들. 인물의 감정이 가장 섬세하게 드러나는 장면을 중심으로 소개합니다" },
      { tag: "Release Setup", title: "대표 컷 선별", desc: "첫 장면만으로도 로판 특유의 무드가 느껴지는 작품들을 모았습니다. 세계관과 감정을 동시에 보여주는 대표 비주얼 큐레이션입니다" },
    ],
    actions: ["신규 로판 작품 등록", "궁정 무드보드 열기", "대표 장면 큐레이션", "캐릭터 관계축 편집"], // 액션 라벨 목록임
  },
};
export default ko; // 한국어 번역 객체를 기본 export로 내보냄
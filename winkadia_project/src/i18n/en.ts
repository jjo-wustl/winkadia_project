// src/i18n/en.ts

const en = { // 영어 화면 문구를 모아둔 객체임
  common: { loading: "The gates of the Sanctuary are opening...", error: "The magic circle has been disrupted", back: "Return", save: "Inscribe", cancel: "Cancel", confirm: "Confirm", delete: "Erase", edit: "Revise", search: "Seek...", seeMore: "See More", noResults: "No records found" }, // 공통으로 쓰는 버튼, 상태, 안내 문구임
  auth: { // 로그인, 회원가입, 비밀번호 찾기 화면에서 쓰는 문구임
    gateTitle: "The Sanctuary of Winkadia", // 로그인 화면 메인 제목임
    gateSubtitle: "So you have finally arrived.", // 로그인 화면 부제목임
    gateDescription: "A sigil of entry is required to pass through the barrier.", // 로그인 화면 설명 문구임
    loginWithGoogle: "Sign in with Google Sigil", // 구글 로그인 버튼 문구임
    loginWithEmail: "Sign In", // 이메일 로그인 버튼 문구임
    signUpWithEmail: "Join the Sanctuary", // 회원가입 버튼 문구임
    email: "Email", // 이메일 입력 라벨임
    password: "Password", // 비밀번호 입력 라벨임
    confirmPassword: "Confirm Password", // 비밀번호 확인 입력 라벨임
    displayName: "Sanctuary Nickname", // 닉네임 입력 라벨임
    forgotPassword: "Forgot password?", // 비밀번호 찾기 버튼 문구임
    resetPassword: "Reset Password", // 비밀번호 재설정 버튼 문구임
    resetSent: "A restoration letter has been dispatched", // 비밀번호 재설정 메일 발송 완료 문구임
    noAccount: "Not a member yet?", // 계정이 없을 때 회원가입으로 유도하는 문구임
    hasAccount: "Already a member?", // 계정이 있을 때 로그인으로 유도하는 문구임
    hasAccountAction: "Sign in with email", // 이메일 로그인 이동 문구임
    logout: "Depart from the Sanctuary", // 로그아웃 문구임
    loginError: "The sigil is incorrect", // 로그인 실패 기본 에러 문구임
    signUpError: "Registration has failed", // 회원가입 실패 기본 에러 문구임
    genderSelect: "Choose your title", // 성별 또는 호칭 선택 라벨임
    female: "Youngae (Female)", // 여성 선택 문구임
    male: "Youngshik (Male)", // 남성 선택 문구임
    other: "Silent (Other)", // 기타 선택 문구임
  },
  nav: { sanctuary: "Grand Hall", theater: "Phantom Theater", chronicles: "Chronicles", council: "Hall of Oracles", profile: "My Study", home: "Grand Hall" }, // 네비게이션 메뉴 문구임
  sanctuary: { // sanctuary 메인 페이지에서 쓰는 문구임
    welcome: "Welcome back", welcomeSuffix_male: "dear Youngshik", welcomeSuffix_female: "dear Youngae", welcomeSuffix_other: "blessed one", // 사용자 환영 문구와 성별별 호칭임
    heroTitle: "Welcome to the Sanctuary of Winkadia", heroSubtitle: "Witness the tales of destiny that unfold within", // 메인 히어로 제목과 설명임
    introTitle: "✦ What is Winkadia? ✦", // 소개 섹션 제목임
    introDesc: "Winkadia is a world ruled by the god who governs destiny and love. Within this sanctuary, romance fantasy stories from countless parallel worlds unfold, and only the chosen Youngshiks and Youngaes may witness these threads of fate. Exclusive episodes and special stories not aired on YouTube are revealed only here, in the Sanctuary of Winkadia.", // 소개 섹션 설명 문구임
    featuredTitle: "✦ Oracle of the Week ✦", latestTitle: "Latest Visions", exclusiveTitle: "✦ Sanctuary Exclusive ✦", exclusiveBadge: "Exclusive", // 영상 섹션 제목과 독점 배지 문구임
    announcementsTitle: "Sanctuary Proclamations", seriesTitle: "Ongoing Destinies", // 공지사항과 시리즈 섹션 제목임
    statsTitle: "Sanctuary Records", totalViews: "Total Witnesses", totalMembers: "Blessed Ones", totalEpisodes: "Recorded Fates", totalSeries: "Ongoing Tales", // 통계 섹션 문구임
  },
  oracle: { // 오라클 기능에서 쓰는 문구임
    title: "🌌 Receive an Oracle", subtitle: "Ask the god Winkadia about thy fate today", // 오라클 섹션 제목과 설명임
    button: "Receive Oracle", loading: "The god Winkadia is reading thy destiny...", // 오라클 버튼과 로딩 문구임
    alreadyUsed: "Thou hast already received today's oracle. Return on the morrow.", // 오늘 이미 신탁을 받은 경우의 안내 문구임
    nextAvailable: "Next oracle available", share: "Share in the Hall of Oracles", // 다음 가능 시간과 공유 버튼 문구임
    shared: "Thy oracle has been inscribed in the Hall!", rare: "Rare", epic: "Epic", legend: "Legend", myOracle: "My Oracle Today", // 공유 완료와 희귀도 표시 문구임
  },
  theater: { title: "Phantom Theater", subtitle: "Where the stories of Winkadia's world unfold", allSeries: "All Stories", exclusive: "Sanctuary Exclusive", latest: "Latest", popular: "Popular", episode: "Ep.", episodeSuffix: "", views: "witnesses", likes: "blessings", noVideos: "No recorded visions yet" }, // 영상 극장 페이지에서 쓰는 문구임
  video: { comments: "Records of Youngshiks & Youngaes", commentPlaceholder: "Leave thy record upon this destiny...", submitComment: "Inscribe", noComments: "No records yet. Be the first to leave thy mark!", loginToComment: "Enter the Sanctuary to leave a record", deleteComment: "Erase Record", likeComment: "Bless", relatedVideos: "Related Destinies", shareVideo: "Share This Destiny", copied: "Copied!" }, // 영상 상세와 댓글 기능에서 쓰는 문구임
  chronicles: { title: "The Chronicles of Winkadia", subtitle: "Explore the history and secrets of this world", worldLore: "World Lore", characters: "Figures of Destiny", timeline: "Flow of Time", godDesc: "Winkadia — the god who governs destiny and love. In their sanctuary, all stories begin and all fates intertwine.", templeDesc: "This sanctuary is a sacred place accessible only to those chosen by Winkadia's will.", realmDesc: "The world of Winkadia is a realm of infinite possibilities. Each story unfolds in a parallel world, carrying the weight of love, destiny, and choice." }, // 연대기 페이지에서 쓰는 세계관 문구임
  council: { title: "Hall of Oracles", subtitle: "Where the oracles received by Youngshiks & Youngaes are inscribed", noOracles: "No oracles inscribed yet. Visit the Grand Hall to receive one!", totalOracles: "Inscribed Oracles", goToSanctuary: "Go to Grand Hall to receive an oracle" }, // 신탁의 전당 페이지에서 쓰는 문구임
  profile: { title: "My Study", subtitle: "Thy records and traces of blessings", editProfile: "Edit Sigil", memberSince: "Blessed Since", watchHistory: "Viewing Records", myComments: "My Records", favorites: "Blessed Destinies", settings: "Settings" }, // 프로필 페이지에서 쓰는 문구임
  footer: { copyright: "© 2025 Winkadia. All destinies are protected.", terms: "Sanctuary Laws", privacy: "Sacred Oath", contact: "Send a Letter to the Sanctuary", followUs: "Follow Winkadia", madeWith: "A Sanctuary woven with threads of destiny" }, // 푸터에서 쓰는 문구임
  series: { // Series(로판 시리즈) 페이지에서 쓰는 문구임
    brandLabel: "Winkadia Original", // 페이지 상단 브랜드 표기임
    pageTitle: "Romance Fantasy Series", // 페이지 메인 제목임
    pageDesc: "Tension within the imperial court, relationships entangled by political marriages, and figures hiding their secrets. A premium space curated solely for Winkadia's Romance Fantasy series", // 페이지 메인 설명 문구임
    hallName: "Romance Fantasy Hall", // 로판 전용 상영관 이름임
    hallDesc: "An exclusive theater where imperial power and emotional currents flow together. Even within these dazzling worlds, what lingers longest are the choices of the characters and their wavering hearts", // 상영관 설명 문구임
    rofanOnly: "Rofan Only", // 로판 전용 칩 라벨임
    continueLabel: "Continue Watching Court Dramas", // 이어보기 섹션 제목임
    trendingLabel: "Most Watched Court Dramas Right Now", // 트렌딩 섹션 제목임
    shelfA: "Today's Imperial Court Dramas", // 큐레이션 섹션 A 제목임
    shelfB: "Dramas with Strong Relationship Arcs", // 큐레이션 섹션 B 제목임
    editorLabel: "Court Drama Highlights", // 에디터 노트 섹션 라벨임
    ui: { // 카드 안쪽 작은 라벨 모음임
      hallIdentity: "Hall Identity",
      featuredCharacter: "Featured Character",
      storyNote: "Story Note",
      episode: "Episode",
      status: "Status",
      keyPoint: "Key Point",
      watchedSuffix: "watched", // 진행률 뒤에 붙는 안내 문구임
    },
    buttons: { // 버튼 라벨 모음임
      playNow: "Play Now",
      freeFirstEp: "Watch Ep.1 Free",
      trailer: "Watch Trailer",
      seeAll: "See All",
      seeRanking: "See Ranking",
      seeMore: "See More",
      watchNow: "Watch Now",
      seeDetails: "See Details",
    },
    hero: { // 히어로 영역 텍스트임
      eyebrow: "Romance Fantasy Selection",
      note: "The most fatal of relationships, beginning within the most dazzling of worlds",
    },
    protagonist: { // 주인공 카드 데이터임
      name: "Seraphine Beluoa",
      role: "Eldest Daughter of a Falling Ducal House",
      desc: "A woman who learned to choose judgment over feeling in order to protect her house. She appears colder than anyone, yet her one true weakness — being unable to abandon her own — makes her all the more dangerous",
      tags: ["Court Narrative", "Political Bonds", "Restrained Emotion"],
    },
    stats: [ // 통계 카드 목록임
      { label: "Weekly Uploads", value: "124", desc: "New Romance Fantasy releases this week" },
      { label: "Shortlisted", value: "18", desc: "Titles chosen for special recommendation" },
      { label: "Mood Boards", value: "39", desc: "Curations highlighting world atmosphere and emotion" },
    ],
    project: { // 대표 작품 카드 데이터임
      eyebrow: "Featured Title",
      title: "The Contract of Winter Rose",
      desc: "A story that begins as a relationship neither side can trust, yet at every most fragile moment, they find themselves thinking of each other first. The signature work that best captures the allure of court romance, where power and emotion sway in equal measure",
      episode: "EP 06 · Just Before the Masquerade",
      status: "The most talked-about episode right now",
      point: "The moment a contractual bond twists into something as inevitable as fate",
    },
    notes: [ // 에디터 노트 목록임
      { label: "Highlight", title: "The moment a cold contract begins turning into something real", desc: "Outwardly, nothing happens — yet a single glance is enough to change the air between them. The charm of Romance Fantasy lies precisely in such subtle shifts" },
      { label: "Must See", title: "What lingers longer than any gown is, in the end, emotion itself", desc: "Even amid lavish settings and ornaments, what stays with you is the look on a character's face and the choices they make. That is why this work pulls you in so deeply" },
    ],
    panels: [ // 큐레이션 패널 목록임 (카드 태그/제목/설명에 사용함)
      { tag: "Tone Design", title: "Court Tension Board", desc: "A curation of scenes where power and romance flow at once. Tension and longing share a single frame" },
      { tag: "Character Depth", title: "Emotional Layering", desc: "Relationships where a glance speaks louder than words. Curated around scenes where emotion is rendered most delicately" },
      { tag: "Release Setup", title: "Signature Cut Selection", desc: "Works whose very first scene already carries the unmistakable mood of Romance Fantasy. A signature visual curation of world and emotion combined" },
    ],
    actions: ["Submit a New Romance Fantasy Title", "Open Court Mood Board", "Curate Signature Scenes", "Edit Character Relationship Map"], // 액션 라벨 목록임
  },
};
export default en; // 영어 번역 객체를 기본 export로 내보냄
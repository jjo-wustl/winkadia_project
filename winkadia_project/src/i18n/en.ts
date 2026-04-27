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
};
export default en; // 영어 번역 객체를 기본 export로 내보냄
// src/app/page.tsx

// Next.js에서 페이지 이동을 강제로 처리하는 redirect 함수를 가져옴
// 사용자가 특정 주소로 들어왔을 때 다른 주소로 바로 보내기 위해 사용함
import { redirect } from "next/navigation";

// 루트 경로인 "/"에 접속했을 때 실행되는 페이지 컴포넌트임
// 현재 이 페이지는 화면을 직접 보여주는 역할이 아니라 로그인 페이지로 보내는 역할만 함
export default function RootPage() {
  // 사용자가 메인 주소 "/"로 들어오면 "/login" 페이지로 바로 이동시킴
  // 그래서 이 프로젝트의 첫 진입 화면은 홈이 아니라 로그인 페이지가 됨
  redirect("/login");
}
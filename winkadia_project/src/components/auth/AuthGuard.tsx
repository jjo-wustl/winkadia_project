// src/components/auth/AuthGuard.tsx

"use client"; // 이 파일이 브라우저에서 동작하는 클라이언트 컴포넌트임

import { useAuth } from "@/contexts/AuthContext"; // 현재 로그인 상태와 로딩 상태를 가져오기 위해 사용함
import LoadingScreen from "@/components/ui/LoadingScreen"; // 인증 상태 확인 중에 보여줄 로딩 화면을 가져옴
import { useRouter } from "next/navigation"; // 로그인하지 않은 사용자를 로그인 페이지로 이동시키기 위해 사용함
import { useEffect } from "react"; // 로그인 상태 변화에 따라 이동 처리를 하기 위해 useEffect를 가져옴

export default function AuthGuard({ children }: { children: React.ReactNode }) { // 로그인한 사용자만 children을 볼 수 있게 보호하는 컴포넌트임
  const { user, loading } = useAuth(); // 현재 사용자 정보와 인증 로딩 상태를 가져옴
  const router = useRouter(); // 페이지 이동을 처리하기 위한 라우터임

  useEffect(() => { // 인증 확인이 끝난 뒤 로그인하지 않은 사용자를 로그인 페이지로 보냄
    if (!loading && !user) { // 로딩이 끝났는데 사용자 정보가 없으면 비로그인 상태임
      router.replace("/login"); // 뒤로가기로 보호 페이지에 다시 오지 못하게 login으로 대체 이동함
    }
  }, [user, loading, router]);

  if (loading) return <LoadingScreen />; // 인증 상태 확인 중이면 로딩 화면을 보여줌
  if (!user) return <LoadingScreen />; // 사용자 정보가 없으면 이동 전까지 로딩 화면을 보여줌

  return <>{children}</>; // 로그인한 사용자가 있으면 실제 페이지 내용을 보여줌
}
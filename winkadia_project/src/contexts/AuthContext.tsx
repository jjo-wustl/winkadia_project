// src/contexts/AuthContext.tsx

"use client"; // 이 파일이 브라우저에서 동작하는 클라이언트 컴포넌트임

import React, { createContext, useContext, useState, useEffect } from "react"; // Context 생성, Context 사용, 상태 관리, 인증 상태 감지를 위해 React 기능들을 가져옴
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  type User as FirebaseUser,
} from "firebase/auth"; // Firebase Authentication에서 로그인, 회원가입, 구글 로그인, 로그아웃, 비밀번호 재설정 기능을 가져옴
import { doc, setDoc, getDoc } from "firebase/firestore"; // Firestore 문서 참조, 저장, 조회 기능을 가져옴
import { auth, db } from "@/lib/firebase"; // Firebase 인증 객체와 Firestore 데이터베이스 객체를 가져옴
import type { User } from "@/types"; // 프로젝트에서 사용하는 사용자 타입을 가져옴

interface AuthContextType { // AuthContext에서 제공할 값들의 타입을 정의함
  user: User | null; // 프로젝트에서 가공해서 사용하는 사용자 정보임
  firebaseUser: FirebaseUser | null; // Firebase가 직접 제공하는 원본 사용자 정보임
  loading: boolean; // 인증 상태를 확인 중인지 저장함
  loginWithEmail: (email: string, password: string) => Promise<void>; // 이메일 로그인 함수 타입임
  signUpWithEmail: (
    email: string,
    password: string,
    displayName: string,
    gender: string
  ) => Promise<void>; // 이메일 회원가입 함수 타입임
  loginWithGoogle: () => Promise<void>; // 구글 로그인 함수 타입임
  logout: () => Promise<void>; // 로그아웃 함수 타입임
  resetPassword: (email: string) => Promise<void>; // 비밀번호 재설정 함수 타입임
}

const AuthContext = createContext<AuthContextType>({ // 인증 정보를 전역으로 공유하기 위한 Context를 생성함
  user: null, // 기본 사용자 정보는 없음
  firebaseUser: null, // 기본 Firebase 사용자 정보는 없음
  loading: true, // 처음에는 인증 상태를 확인 중으로 둠
  loginWithEmail: async () => {}, // Provider 밖에서 호출되어도 에러가 나지 않게 기본 함수를 둠
  signUpWithEmail: async () => {}, // Provider 밖에서 호출되어도 에러가 나지 않게 기본 함수를 둠
  loginWithGoogle: async () => {}, // Provider 밖에서 호출되어도 에러가 나지 않게 기본 함수를 둠
  logout: async () => {}, // Provider 밖에서 호출되어도 에러가 나지 않게 기본 함수를 둠
  resetPassword: async () => {}, // Provider 밖에서 호출되어도 에러가 나지 않게 기본 함수를 둠
});

export function AuthProvider({ children }: { children: React.ReactNode }) { // 앱 전체에 인증 상태와 인증 함수를 제공하는 Provider 컴포넌트임
  const [user, setUser] = useState<User | null>(null); // 프로젝트에서 사용할 사용자 정보를 저장함
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null); // Firebase 원본 사용자 정보를 저장함
  const [loading, setLoading] = useState(true); // 인증 상태 확인 중인지 저장함

  useEffect(() => { // 컴포넌트가 처음 실행될 때 Firebase 로그인 상태 변화를 감지함
    const unsub = onAuthStateChanged(auth, async (fbUser) => { // Firebase 로그인 상태가 바뀔 때마다 실행되는 구독 함수를 등록함
      if (fbUser) { // Firebase 사용자가 있으면 로그인된 상태임
        setFirebaseUser(fbUser); // Firebase 원본 사용자 정보를 저장함
        const userDoc = await getDoc(doc(db, "users", fbUser.uid)); // Firestore users 컬렉션에서 현재 사용자 문서를 가져옴
        const userData = userDoc.data(); // Firestore 사용자 문서 데이터를 꺼냄
        setUser({
          uid: fbUser.uid, // Firebase 사용자 고유 id를 저장함
          email: fbUser.email, // Firebase 사용자 이메일을 저장함
          displayName: fbUser.displayName || userData?.displayName || null, // Firebase 이름이 있으면 우선 사용하고 없으면 Firestore 이름을 사용함
          photoURL: fbUser.photoURL, // Firebase 프로필 사진 주소를 저장함
          gender: userData?.gender || "other", // Firestore에 저장된 성별을 사용하고 없으면 other로 처리함
          joinedAt: userData?.joinedAt || new Date().toISOString(), // 가입일이 있으면 사용하고 없으면 현재 시간을 사용함
          nickname: userData?.nickname || fbUser.displayName || null, // Firestore 닉네임이 있으면 사용하고 없으면 Firebase 이름을 사용함
        });
      } else { // Firebase 사용자가 없으면 로그아웃된 상태임
        setFirebaseUser(null); // Firebase 사용자 정보를 비움
        setUser(null); // 프로젝트 사용자 정보를 비움
      }
      setLoading(false); // 인증 상태 확인이 끝났으므로 로딩을 해제함
    });
    return () => unsub(); // 컴포넌트가 사라질 때 인증 상태 감지를 해제함
  }, []);

  const loginWithEmail = async (email: string, password: string) => { // 이메일과 비밀번호로 로그인하는 함수임
    await signInWithEmailAndPassword(auth, email, password); // Firebase 이메일 로그인을 실행함
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    displayName: string,
    gender: string
  ) => { // 이메일, 비밀번호, 이름, 성별로 회원가입하는 함수임
    const cred = await createUserWithEmailAndPassword(auth, email, password); // Firebase에 이메일 계정을 생성함
    await updateProfile(cred.user, { displayName }); // Firebase 사용자 프로필에 표시 이름을 저장함
    await setDoc(doc(db, "users", cred.user.uid), { // Firestore users 컬렉션에 추가 사용자 정보를 저장함
      uid: cred.user.uid, // 사용자 고유 id를 저장함
      email: cred.user.email, // 사용자 이메일을 저장함
      displayName, // 가입 화면에서 입력한 표시 이름을 저장함
      photoURL: null, // 이메일 가입은 기본 프로필 사진이 없으므로 null로 저장함
      gender, // 가입 화면에서 선택한 성별을 저장함
      joinedAt: new Date().toISOString(), // 가입 시간을 ISO 문자열로 저장함
      nickname: displayName, // 처음 닉네임은 표시 이름과 같게 저장함
    });
  };

  const loginWithGoogle = async () => { // 구글 계정으로 로그인하는 함수임
    const provider = new GoogleAuthProvider(); // 구글 로그인 제공자를 생성함
    const cred = await signInWithPopup(auth, provider); // 팝업 방식으로 구글 로그인을 실행함
    const userDoc = await getDoc(doc(db, "users", cred.user.uid)); // Firestore에 현재 구글 사용자 문서가 있는지 확인함
    if (!userDoc.exists()) { // Firestore 사용자 문서가 없으면 처음 로그인한 구글 사용자임
      await setDoc(doc(db, "users", cred.user.uid), { // Firestore users 컬렉션에 구글 사용자 정보를 새로 저장함
        uid: cred.user.uid, // 사용자 고유 id를 저장함
        email: cred.user.email, // 구글 계정 이메일을 저장함
        displayName: cred.user.displayName, // 구글 계정 표시 이름을 저장함
        photoURL: cred.user.photoURL, // 구글 계정 프로필 사진을 저장함
        gender: "other", // 구글 로그인에서는 성별을 받지 않으므로 기본값으로 저장함
        joinedAt: new Date().toISOString(), // 처음 로그인한 시간을 가입일처럼 저장함
        nickname: cred.user.displayName, // 처음 닉네임은 구글 표시 이름으로 저장함
      });
    }
  };

  const logout = async () => { // 로그아웃하는 함수임
    await signOut(auth); // Firebase 로그아웃을 실행함
  };

  const resetPassword = async (email: string) => { // 비밀번호 재설정 메일을 보내는 함수임
    await sendPasswordResetEmail(auth, email); // 입력한 이메일로 Firebase 비밀번호 재설정 메일을 보냄
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        loading,
        loginWithEmail,
        signUpWithEmail,
        loginWithGoogle,
        logout,
        resetPassword,
      }}
    > {/* 인증 상태와 인증 함수들을 하위 컴포넌트 전체에 전달함 */}
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); // 다른 컴포넌트에서 인증 Context를 쉽게 사용할 수 있게 만든 커스텀 훅임
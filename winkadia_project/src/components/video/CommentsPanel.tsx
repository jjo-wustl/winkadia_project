// src/components/video/CommentsPanel.tsx
//
// Watch 페이지 우측에 표시되는 댓글 + 조회수 패널.
//
// [기능]
// - 영상별 조회수 실시간 표시 (다른 사용자가 시청해도 즉시 반영)
// - 댓글 실시간 목록 (최신 우선)
// - 익명 댓글 작성 — 작성 순서대로 v1, v2, v3 ... 자동 부여
// - 비로그인 시 입력창 잠금 + 안내 문구
// - 1000자 제한, 빈 댓글 차단, 등록 중 중복 제출 방지
//
// [모더레이션]
// 클라이언트는 댓글 편집/삭제 불가. Firebase Console (Admin) 에서만 처리됨.

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Eye, MessageCircle, Send, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  addAnonymousComment,
  subscribeToComments,
  subscribeToVideoStats,
  type VideoComment,
  type VideoStats,
} from "@/lib/firestore-video";
import { formatRelativeTime } from "@/lib/format-time";

const MAX_LENGTH = 1000; // Firestore 측에서도 검증되지만 UI 에서도 한 번 더 막음

export default function CommentsPanel({ videoId }: { videoId: string }) {
  const { user } = useAuth(); // 로그인 상태에 따라 입력창을 잠금/해제
  const { t, lang } = useLanguage();
  const copy = t.watch;

  const [stats, setStats] = useState<VideoStats>({ viewCount: 0 });
  const [comments, setComments] = useState<VideoComment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [draft, setDraft] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // === 실시간 구독: 조회수 + 댓글 ===
  useEffect(() => {
    const unsubStats = subscribeToVideoStats(videoId, (next) => {
      setStats(next);
    });

    let receivedFirstSnapshot = false;
    const unsubComments = subscribeToComments(videoId, (next) => {
      setComments(next);
      if (!receivedFirstSnapshot) {
        receivedFirstSnapshot = true;
        setIsLoadingComments(false); // 첫 스냅샷 도착 시 로딩 해제
      }
    });

    return () => {
      unsubStats();
      unsubComments();
    };
  }, [videoId]);

  // 한국어 천 단위 구분자 적용한 조회수 포맷 (예: 1234 -> 1,234)
  const formattedViewCount = useMemo(
    () => stats.viewCount.toLocaleString(lang === "ko" ? "ko-KR" : "en-US"),
    [stats.viewCount, lang],
  );

  // 댓글 카운트 표기 (한국어: "12개", 영어: "12 Comments" / "1 Comment")
  const formattedCommentCount = useMemo(() => {
    const n = comments.length;
    if (lang === "ko") return `${n}개`;
    return n === 1 ? `${n} Comment` : `${n} Comments`;
  }, [comments.length, lang]);

  // 댓글 등록 핸들러 — 빈 입력/너무 긴 입력/중복 제출 모두 방어
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user) return;
    const trimmed = draft.trim();
    if (trimmed.length === 0 || trimmed.length > MAX_LENGTH) return;
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await addAnonymousComment({
        videoId,
        userId: user.uid,
        content: trimmed,
      });
      setDraft(""); // 등록 성공 시 입력창 비우기
      // textarea 높이 초기화
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    } catch (err) {
      console.error("[CommentsPanel] addAnonymousComment failed:", err);
      setSubmitError(copy.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  // textarea 높이를 입력 길이에 따라 자동으로 늘려줌 (최대 200px)
  const handleDraftChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraft(event.target.value);
    const el = event.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  };

  const charCountColor =
    draft.length > MAX_LENGTH
      ? "text-red-500"
      : draft.length > MAX_LENGTH * 0.9
        ? "text-amber-600"
        : "text-[#9a7c92]";

  return (
    <aside className="flex w-full flex-col gap-4">
      {/* 조회수 카드 — 좌측 패딩을 더 키워 텍스트가 박스 가장자리에 붙지 않도록 함 */}
      <div className="flex items-center gap-3 rounded-[12px] border border-[#f1d6de] bg-white/72 px-10 py-5 shadow-[0_14px_36px_rgba(192,116,142,0.10)]">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff0f7] text-[#d17fa2]">
          <Eye size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#9a7c92]">
            {copy.views}
          </p>
          <p className="text-2xl font-black leading-tight text-[#6f4b67]">
            {formattedViewCount}
          </p>
        </div>
      </div>

      {/* 댓글 영역 — 좌우 패딩을 더 키워 헤더 아이콘 / v 칩 / 댓글 텍스트가 박스 가장자리에서 충분히 떨어지도록 함 */}
      <div className="flex flex-col gap-4 rounded-[12px] border border-[#f1d6de] bg-white/72 px-10 py-6 shadow-[0_14px_36px_rgba(192,116,142,0.10)]">
        <div className="flex items-center gap-3">
          <MessageCircle size={18} className="text-[#d17fa2]" />
          <h2 className="text-base font-black text-[#6f4b67]">
            {copy.commentsTitle}
          </h2>
          <span className="ml-auto text-xs font-bold text-[#9a7c92]">
            {formattedCommentCount}
          </span>
        </div>

        {/* 댓글 입력 폼 */}
        {user ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <textarea
              ref={textareaRef}
              value={draft}
              onChange={handleDraftChange}
              placeholder={copy.placeholder}
              disabled={isSubmitting}
              maxLength={MAX_LENGTH + 50 /* 살짝 여유 두고 UI 에서도 막음 */}
              rows={2}
              className="w-full resize-none rounded-2xl border border-[#f1d6de] bg-white/90 px-4 py-3 text-sm leading-relaxed text-[#3a3047] outline-none transition focus:border-[#d17fa2] focus:ring-2 focus:ring-[#ffd6e8]/60 disabled:opacity-60"
            />

            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold ${charCountColor}`}>
                {draft.length} / {MAX_LENGTH}
              </span>

              <button
                type="submit"
                disabled={
                  isSubmitting || draft.trim().length === 0 || draft.length > MAX_LENGTH
                }
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff9cc3] to-[#ffc7df] px-9 py-3.5 text-base font-black text-[#3a2040] shadow-[0_12px_28px_rgba(255,160,200,0.38)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={18} />
                {isSubmitting ? copy.submitting : copy.submit}
              </button>
            </div>

            {submitError && (
              <p className="text-xs font-bold text-red-500">{submitError}</p>
            )}
          </form>
        ) : (
          <div className="flex items-center gap-2 rounded-2xl border border-dashed border-[#e5d6f0] bg-white/40 px-4 py-3 text-xs font-bold text-[#9b78c2]">
            <Sparkles size={14} />
            {copy.loginRequired}
          </div>
        )}

        {/* 댓글 목록 - 일정 길이를 넘어가면 내부 스크롤로 전환되어 페이지 높이가 무한정 늘어나지 않게 함 */}
        <div className="flex flex-col">
          {isLoadingComments ? (
            <p className="py-6 text-center text-sm font-bold text-[#9a7c92]">
              {copy.loadingComments}
            </p>
          ) : comments.length === 0 ? (
            <p className="py-6 text-center text-sm font-bold text-[#9a7c92]">
              {copy.empty}
            </p>
          ) : (
            // max-h 로 높이 상한을 두고 overflow-y-auto 로 스크롤 활성화.
            // pr-1 로 스크롤바와 텍스트 사이에 살짝 여유를 둠 (스크롤바 두께 8px 는 globals.css 에서 정의됨).
            <ul className="flex max-h-[480px] flex-col divide-y divide-[#f1d6de]/70 overflow-y-auto pr-1">
              {comments.map((comment) => (
                <CommentRow key={comment.id} comment={comment} lang={lang} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
}

// 개별 댓글 한 줄을 렌더링하는 작은 컴포넌트
function CommentRow({
  comment,
  lang,
}: {
  comment: VideoComment;
  lang: "ko" | "en";
}) {
  // serverTimestamp 가 반영되기 전(작성 직후 짧은 순간)에는 "방금 전" 으로 표기
  const date = comment.createdAt?.toDate?.() ?? null;
  const relative = date
    ? formatRelativeTime(date, lang)
    : lang === "ko"
      ? "방금 전"
      : "just now";

  return (
    <li className="flex flex-col gap-1.5 py-3 first:pt-1 last:pb-1">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center rounded-full bg-[#f3e8ff] px-2.5 py-0.5 text-[11px] font-black text-[#7f5bcc]">
          {comment.authorLabel}
        </span>
        <span className="text-[11px] font-semibold text-[#9a7c92]">{relative}</span>
      </div>

      <p className="break-words whitespace-pre-line text-sm leading-relaxed text-[#3a3047]">
        {comment.content}
      </p>
    </li>
  );
}

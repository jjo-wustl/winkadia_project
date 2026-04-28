// src/app/sanctuary/series/[id]/page.tsx

"use client"; // 이 파일이 브라우저에서 동작하는 클라이언트 컴포넌트임

import { useEffect, useState, useCallback } from "react"; // 상세 데이터 로딩, 댓글 상태, 좋아요 상태를 관리하기 위해 React 훅을 가져옴
import { useParams } from "next/navigation"; // URL 경로에서 영상 id 값을 가져오기 위해 사용함
import { useAuth } from "@/contexts/AuthContext"; // 현재 로그인한 사용자 정보를 가져오기 위해 사용함
import { useLanguage } from "@/contexts/LanguageContext"; // 현재 언어에 맞는 문구와 다국어 필드를 가져오기 위해 사용함
import {
  getVideoById,
  getComments,
  addComment,
  deleteComment,
  toggleLikeVideo,
  toggleLikeComment,
  incrementViews,
  getVideos,
} from "@/lib/firestore"; // 영상 상세, 댓글, 좋아요, 조회수, 관련 영상 데이터를 Firestore에서 처리하는 함수들을 가져옴
import VideoCard from "@/components/video/VideoCard"; // 관련 영상을 카드 형태로 보여주기 위해 가져옴
import type { Video, Comment } from "@/types"; // 영상과 댓글 데이터 타입을 가져옴
import {
  Heart,
  Eye,
  MessageCircle,
  Share2,
  Trash2,
  ArrowLeft,
  Sparkles,
  Check,
} from "lucide-react"; // 상세 페이지에서 사용할 아이콘들을 가져옴
import Link from "next/link"; // 뒤로가기 링크를 만들기 위해 가져옴

export default function VideoDetailPage() { // 시리즈 상세 화면을 담당하는 페이지 컴포넌트임
  const params = useParams(); // 현재 URL 파라미터를 가져옴
  const videoId = params.id as string; // URL의 id 값을 영상 id로 사용함
  const { user } = useAuth(); // 현재 로그인한 사용자 정보를 가져옴
  const { t, lang, localized } = useLanguage(); // 번역 문구, 현재 언어, 다국어 필드 선택 함수를 가져옴

  const [video, setVideo] = useState<Video | null>(null); // 현재 상세 페이지에서 보여줄 영상 정보를 저장함
  const [comments, setComments] = useState<Comment[]>([]); // 현재 영상에 달린 댓글 목록을 저장함
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]); // 오른쪽 사이드바에 보여줄 관련 영상 목록을 저장함
  const [commentText, setCommentText] = useState(""); // 댓글 입력창의 현재 값을 저장함
  const [liked, setLiked] = useState(false); // 현재 사용자가 영상에 좋아요를 눌렀는지 저장함
  const [copied, setCopied] = useState(false); // 공유 링크 복사 완료 상태를 저장함
  const [submitting, setSubmitting] = useState(false); // 댓글 등록 중인지 저장해 중복 제출을 막음

  const loadData = useCallback(async () => { // 영상 상세, 댓글, 관련 영상을 한 번에 불러오는 함수임
    try {
      const [vid, cmts, related] = await Promise.all([
        getVideoById(videoId),
        getComments(videoId),
        getVideos({ limitCount: 4 }),
      ]); // 상세 영상, 댓글 목록, 관련 영상 후보를 병렬로 요청함

      setVideo(vid); // 불러온 영상 정보를 상태에 저장함
      setComments(cmts); // 불러온 댓글 목록을 상태에 저장함
      setRelatedVideos(related.filter((v) => v.id !== videoId).slice(0, 3)); // 현재 영상은 제외하고 최대 3개 관련 영상을 저장함

      if (vid) {
        incrementViews(videoId); // 영상이 존재하면 조회수를 증가시킴
      }
    } catch (err) {
      console.error("Failed to load video:", err); // 데이터 로딩 실패 시 콘솔에 오류를 출력함
    }
  }, [videoId]); // videoId가 바뀌면 새 영상 기준으로 함수를 다시 만듦

  useEffect(() => { // 페이지가 열리거나 videoId가 바뀔 때 상세 데이터를 불러옴
    loadData();
  }, [loadData]);

  const handleLike = async () => { // 영상 좋아요 버튼 클릭을 처리함
    if (!user || !video) return; // 로그인하지 않았거나 영상 정보가 없으면 실행하지 않음

    const result = await toggleLikeVideo(videoId, user.uid); // Firestore에서 영상 좋아요 상태를 토글함
    setLiked(!!result); // 토글 결과에 따라 현재 좋아요 상태를 저장함
    setVideo((prev) =>
      prev
        ? { ...prev, likes: prev.likes + (result ? 1 : -1) }
        : prev
    ); // 화면의 좋아요 수를 즉시 반영함
  };

  const handleSubmitComment = async (e: React.FormEvent) => { // 댓글 등록 폼 제출을 처리함
    e.preventDefault(); // 기본 form 제출로 새로고침되는 것을 막음
    if (!user || !commentText.trim() || submitting) return; // 로그인하지 않았거나 댓글이 비어 있거나 제출 중이면 실행하지 않음

    setSubmitting(true); // 댓글 등록 중 상태로 바꿈

    try {
      await addComment({
        videoId,
        userId: user.uid,
        userName: user.displayName || user.email?.split("@")[0] || "Anonymous",
        userPhoto: user.photoURL,
        userGender: user.gender,
        content: commentText.trim(),
      }); // 현재 영상에 새 댓글을 추가함

      setCommentText(""); // 댓글 입력창을 비움
      const updated = await getComments(videoId); // 등록 후 최신 댓글 목록을 다시 가져옴
      setComments(updated); // 최신 댓글 목록을 화면에 반영함
    } catch (err) {
      console.error("Failed to add comment:", err); // 댓글 등록 실패 시 콘솔에 오류를 출력함
    } finally {
      setSubmitting(false); // 댓글 등록 처리가 끝나면 제출 중 상태를 해제함
    }
  };

  const handleDeleteComment = async (commentId: string) => { // 댓글 삭제 버튼 클릭을 처리함
    try {
      await deleteComment(commentId); // Firestore에서 해당 댓글을 삭제함
      setComments((prev) => prev.filter((c) => c.id !== commentId)); // 화면에서도 삭제된 댓글을 제거함
    } catch (err) {
      console.error("Failed to delete comment:", err); // 댓글 삭제 실패 시 콘솔에 오류를 출력함
    }
  };

  const handleLikeComment = async (commentId: string) => { // 댓글 좋아요 버튼 클릭을 처리함
    if (!user) return; // 로그인하지 않았으면 실행하지 않음

    await toggleLikeComment(commentId, user.uid); // Firestore에서 댓글 좋아요 상태를 토글함
    const updated = await getComments(videoId); // 최신 댓글 목록을 다시 가져옴
    setComments(updated); // 댓글 좋아요 수와 상태를 화면에 반영함
  };

  const handleShare = () => { // 공유 버튼 클릭을 처리함
    navigator.clipboard.writeText(window.location.href); // 현재 페이지 주소를 클립보드에 복사함
    setCopied(true); // 복사 완료 상태로 바꿈
    setTimeout(() => setCopied(false), 2000); // 2초 뒤 복사 완료 표시를 다시 해제함
  };

  if (!video) { // 영상 정보를 아직 불러오지 못했을 때 로딩 아이콘을 보여줌
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Sparkles
          size={40}
          className="animate-float"
          style={{ color: "var(--pink-400)" }}
        />
      </div>
    );
  }

  return (
    <div
      className="page-container"
      style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
    > {/* 시리즈 상세 페이지 전체 컨테이너임 */}
      <Link
        href="/sanctuary/series"
        className="inline-flex items-center gap-2 mb-6 text-sm transition-colors duration-300"
        style={{
          color: "var(--text-muted)",
          textDecoration: "none",
          fontFamily: "var(--font-heading)",
          letterSpacing: "1px",
        }}
      > {/* 시리즈 목록 페이지로 돌아가는 뒤로가기 링크임 */}
        <ArrowLeft size={16} />
        {t.common.back}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"> {/* 왼쪽 상세 콘텐츠와 오른쪽 관련 영상 영역을 나누는 그리드임 */}
        <div className="lg:col-span-2"> {/* 영상 플레이어, 정보, 댓글을 담는 메인 콘텐츠 영역임 */}
          <div
            className="relative rounded-lg overflow-hidden mb-6"
            style={{
              aspectRatio: "16/9",
              background:
                "linear-gradient(135deg, var(--bg-surface), #1a1035, var(--bg-surface))",
              border: "1px solid var(--border)",
            }}
          > {/* 실제 영상이 들어갈 16:9 플레이어 영역임 */}
            <div className="absolute inset-0 flex items-center justify-center"> {/* 플레이어 중앙 안내 영역임 */}
              <div className="text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: "rgba(201, 168, 76, 0.15)",
                    border: "2px solid var(--pink-500)",
                  }}
                > {/* 중앙 재생 아이콘을 감싸는 원형 버튼 모양임 */}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="var(--pink-400)"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                <p
                  className="text-sm tracking-[2px]"
                  style={{
                    color: "var(--text-muted)",
                    opacity: 0.4,
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {lang === "ko"
                    ? "영상이 곧 재생됩니다"
                    : "Video will play soon"}
                </p>
              </div>
            </div>

            <div
              className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2"
              style={{ borderColor: "var(--pink-500)", opacity: 0.4 }}
            /> {/* 플레이어 왼쪽 위 장식 모서리임 */}
            <div
              className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2"
              style={{ borderColor: "var(--pink-500)", opacity: 0.4 }}
            /> {/* 플레이어 오른쪽 위 장식 모서리임 */}
            <div
              className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2"
              style={{ borderColor: "var(--pink-500)", opacity: 0.4 }}
            /> {/* 플레이어 왼쪽 아래 장식 모서리임 */}
            <div
              className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2"
              style={{ borderColor: "var(--pink-500)", opacity: 0.4 }}
            /> {/* 플레이어 오른쪽 아래 장식 모서리임 */}
          </div>

          <div className="mb-6"> {/* 영상 제목, 설명, 조회수, 좋아요, 공유 버튼을 담는 정보 영역임 */}
            {video.isExclusive && (
              <span className="badge-exclusive mb-3 inline-block">
                {t.sanctuary.exclusiveBadge}
              </span>
            )}

            {video.seriesTitle && (
              <p
                className="text-xs tracking-[2px] uppercase mb-2"
                style={{
                  color: "var(--purple-400)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {localized(video.seriesTitle)} — {t.theater.episode}
                {video.episode}
                {t.theater.episodeSuffix}
              </p>
            )}

            <h1
              className="text-heading text-2xl sm:text-3xl mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              {localized(video.title)}
            </h1>

            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: "var(--text-muted)", opacity: 0.7 }}
            >
              {localized(video.description)}
            </p>

            <div className="flex flex-wrap items-center gap-4"> {/* 조회수, 좋아요, 공유 버튼을 가로로 배치함 */}
              <div
                className="flex items-center gap-4 text-sm"
                style={{ color: "var(--text-muted)", opacity: 0.5 }}
              >
                <span className="flex items-center gap-1">
                  <Eye size={16} />
                  {video.views.toLocaleString()}
                </span>
              </div>

              <button
                onClick={handleLike}
                className="flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300"
                style={{
                  borderColor: liked
                    ? "var(--pink-500)"
                    : "var(--border)",
                  color: liked ? "var(--pink-400)" : "var(--text-muted)",
                  background: liked
                    ? "rgba(232, 67, 112, 0.1)"
                    : "transparent",
                  fontFamily: "var(--font-heading)",
                  fontSize: "13px",
                  letterSpacing: "1px",
                }}
              > {/* 영상 좋아요를 토글하는 버튼임 */}
                <Heart
                  size={16}
                  fill={liked ? "var(--pink-400)" : "none"}
                />
                {video.likes.toLocaleString()} {t.theater.likes}
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300"
                style={{
                  borderColor: "var(--border)",
                  color: copied
                    ? "var(--pink-400)"
                    : "var(--text-muted)",
                  fontFamily: "var(--font-heading)",
                  fontSize: "13px",
                  letterSpacing: "1px",
                }}
              > {/* 현재 상세 페이지 주소를 복사하는 공유 버튼임 */}
                {copied ? <Check size={16} /> : <Share2 size={16} />}
                {copied ? t.video.copied : t.video.shareVideo}
              </button>
            </div>
          </div>

          <div className="ornate-divider">✦</div> {/* 영상 정보와 댓글 영역을 나누는 장식 구분선임 */}

          <section> {/* 댓글 목록과 댓글 작성 폼을 담는 영역임 */}
            <h2
              className="text-heading text-lg tracking-[2px] mb-6 flex items-center gap-2"
              style={{ color: "var(--pink-400)" }}
            >
              <MessageCircle size={20} />
              {t.video.comments} ({comments.length})
            </h2>

            {user ? (
              <form
                onSubmit={handleSubmitComment}
                className="mb-8"
              > {/* 로그인한 사용자에게 댓글 작성 폼을 보여줌 */}
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder={t.video.commentPlaceholder}
                  rows={3}
                  className="input-sanctuary mb-3 resize-none"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!commentText.trim() || submitting}
                    className="btn-pink text-sm"
                    style={{
                      opacity:
                        !commentText.trim() || submitting ? 0.5 : 1,
                    }}
                  >
                    <span>{t.video.submitComment}</span>
                  </button>
                </div>
              </form>
            ) : (
              <p
                className="text-sm mb-8 text-center py-4 rounded-md"
                style={{
                  background: "var(--bg-surface)",
                  color: "var(--text-muted)",
                  opacity: 0.6,
                  border: "1px solid var(--border)",
                }}
              >
                {t.video.loginToComment}
              </p>
            )}

            {comments.length === 0 ? (
              <p
                className="text-center py-10 text-sm"
                style={{ color: "var(--text-muted)", opacity: 0.4 }}
              >
                {t.video.noComments}
              </p>
            ) : (
              <div className="space-y-4"> {/* 댓글이 있을 때 댓글 카드 목록을 보여줌 */}
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="card-sanctuary p-5"
                    style={{ background: "var(--bg-surface)" }}
                  > {/* 댓글 하나를 보여주는 카드임 */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{
                            background:
                              "linear-gradient(135deg, var(--pink-600), var(--pink-400))",
                            color: "var(--bg)",
                            fontFamily: "var(--font-heading)",
                          }}
                        >
                          {(comment.userName || "?")[0].toUpperCase()}
                        </div>

                        <div>
                          <p
                            className="text-sm font-medium"
                            style={{
                              color: "var(--purple-500)",
                              fontFamily: "var(--font-heading)",
                            }}
                          >
                            {comment.userName}
                            <span
                              className="ml-2 text-xs"
                              style={{
                                color: "var(--purple-400)",
                                opacity: 0.7,
                              }}
                            >
                              {comment.userGender === "male"
                                ? lang === "ko"
                                  ? "영식"
                                  : "Youngshik"
                                : comment.userGender === "female"
                                  ? lang === "ko"
                                    ? "영애"
                                    : "Youngae"
                                  : ""}
                            </span>
                          </p>

                          <p
                            className="text-xs"
                            style={{
                              color: "var(--text-muted)",
                              opacity: 0.3,
                            }}
                          >
                            {comment.createdAt
                              ? new Date(comment.createdAt).toLocaleDateString(
                                  lang === "ko" ? "ko-KR" : "en-US"
                                )
                              : ""}
                          </p>
                        </div>
                      </div>

                      {user?.uid === comment.userId && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="p-1 transition-colors duration-300"
                          style={{ color: "var(--text-muted)", opacity: 0.3 }}
                          title={t.video.deleteComment}
                        > {/* 본인이 작성한 댓글일 때만 삭제 버튼을 보여줌 */}
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>

                    <p
                      className="text-sm leading-relaxed ml-11"
                      style={{ color: "var(--text-primary)", opacity: 0.85 }}
                    >
                      {comment.content}
                    </p>

                    <div className="ml-11 mt-3">
                      <button
                        onClick={() => handleLikeComment(comment.id)}
                        className="flex items-center gap-1 text-xs transition-colors duration-300"
                        style={{
                          color: comment.likedBy?.includes(user?.uid || "")
                            ? "var(--pink-400)"
                            : "var(--text-muted)",
                          opacity: comment.likedBy?.includes(user?.uid || "")
                            ? 1
                            : 0.4,
                        }}
                      > {/* 댓글 좋아요를 토글하는 버튼임 */}
                        <Heart
                          size={12}
                          fill={
                            comment.likedBy?.includes(user?.uid || "")
                              ? "var(--pink-400)"
                              : "none"
                          }
                        />
                        {comment.likes > 0 && comment.likes}{" "}
                        {t.video.likeComment}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="lg:col-span-1"> {/* 오른쪽 관련 영상 사이드바 영역임 */}
          <h3
            className="text-heading text-base tracking-[2px] mb-4"
            style={{ color: "var(--pink-400)" }}
          >
            {t.video.relatedVideos}
          </h3>

          <div className="space-y-4">
            {relatedVideos.map((rv) => (
              <VideoCard key={rv.id} video={rv} /> // 관련 영상 하나를 카드로 표시함
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
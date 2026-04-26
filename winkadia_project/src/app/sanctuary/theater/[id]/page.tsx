"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  getVideoById,
  getComments,
  addComment,
  deleteComment,
  toggleLikeVideo,
  toggleLikeComment,
  incrementViews,
  getVideos,
} from "@/lib/firestore";
import VideoCard from "@/components/video/VideoCard";
import type { Video, Comment } from "@/types";
import {
  Heart,
  Eye,
  MessageCircle,
  Share2,
  Trash2,
  ArrowLeft,
  Sparkles,
  Check,
} from "lucide-react";
import Link from "next/link";

export default function VideoDetailPage() {
  const params = useParams();
  const videoId = params.id as string;
  const { user } = useAuth();
  const { t, lang, localized } = useLanguage();

  const [video, setVideo] = useState<Video | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [vid, cmts, related] = await Promise.all([
        getVideoById(videoId),
        getComments(videoId),
        getVideos({ limitCount: 4 }),
      ]);
      setVideo(vid);
      setComments(cmts);
      setRelatedVideos(related.filter((v) => v.id !== videoId).slice(0, 3));
      if (vid) {
        incrementViews(videoId);
      }
    } catch (err) {
      console.error("Failed to load video:", err);
    }
  }, [videoId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleLike = async () => {
    if (!user || !video) return;
    const result = await toggleLikeVideo(videoId, user.uid);
    setLiked(!!result);
    setVideo((prev) =>
      prev
        ? { ...prev, likes: prev.likes + (result ? 1 : -1) }
        : prev
    );
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !commentText.trim() || submitting) return;
    setSubmitting(true);
    try {
      await addComment({
        videoId,
        userId: user.uid,
        userName: user.displayName || user.email?.split("@")[0] || "Anonymous",
        userPhoto: user.photoURL,
        userGender: user.gender,
        content: commentText.trim(),
      });
      setCommentText("");
      const updated = await getComments(videoId);
      setComments(updated);
    } catch (err) {
      console.error("Failed to add comment:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    if (!user) return;
    await toggleLikeComment(commentId, user.uid);
    const updated = await getComments(videoId);
    setComments(updated);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!video) {
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
    <div className="page-container" style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
      {/* Back button */}
      <Link
        href="/sanctuary/theater"
        className="inline-flex items-center gap-2 mb-6 text-sm transition-colors duration-300"
        style={{
          color: "var(--text-muted)",
          textDecoration: "none",
          fontFamily: "var(--font-heading)",
          letterSpacing: "1px",
        }}
      >
        <ArrowLeft size={16} />
        {t.common.back}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Video Player Area */}
          <div
            className="relative rounded-lg overflow-hidden mb-6"
            style={{
              aspectRatio: "16/9",
              background:
                "linear-gradient(135deg, var(--bg-surface), #1a1035, var(--bg-surface))",
              border: "1px solid var(--border)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: "rgba(201, 168, 76, 0.15)",
                    border: "2px solid var(--pink-500)",
                  }}
                >
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
            {/* Ornamental corners */}
            <div
              className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2"
              style={{ borderColor: "var(--pink-500)", opacity: 0.4 }}
            />
            <div
              className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2"
              style={{ borderColor: "var(--pink-500)", opacity: 0.4 }}
            />
            <div
              className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2"
              style={{ borderColor: "var(--pink-500)", opacity: 0.4 }}
            />
            <div
              className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2"
              style={{ borderColor: "var(--pink-500)", opacity: 0.4 }}
            />
          </div>

          {/* Video Info */}
          <div className="mb-6">
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

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
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
              >
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
              >
                {copied ? <Check size={16} /> : <Share2 size={16} />}
                {copied ? t.video.copied : t.video.shareVideo}
              </button>
            </div>
          </div>

          <div className="ornate-divider">✦</div>

          {/* Comments Section */}
          <section>
            <h2
              className="text-heading text-lg tracking-[2px] mb-6 flex items-center gap-2"
              style={{ color: "var(--pink-400)" }}
            >
              <MessageCircle size={20} />
              {t.video.comments} ({comments.length})
            </h2>

            {/* Comment form */}
            {user ? (
              <form
                onSubmit={handleSubmitComment}
                className="mb-8"
              >
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

            {/* Comments list */}
            {comments.length === 0 ? (
              <p
                className="text-center py-10 text-sm"
                style={{ color: "var(--text-muted)", opacity: 0.4 }}
              >
                {t.video.noComments}
              </p>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="card-sanctuary p-5"
                    style={{ background: "var(--bg-surface)" }}
                  >
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
                        >
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
                      >
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

        {/* Sidebar — Related Videos */}
        <div className="lg:col-span-1">
          <h3
            className="text-heading text-base tracking-[2px] mb-4"
            style={{ color: "var(--pink-400)" }}
          >
            {t.video.relatedVideos}
          </h3>
          <div className="space-y-4">
            {relatedVideos.map((rv) => (
              <VideoCard key={rv.id} video={rv} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

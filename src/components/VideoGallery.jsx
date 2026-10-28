import React, { useState, useRef, useEffect } from 'react';
import { VIDEOS } from '../data/siteData';
import './VideoGallery.css';

export default function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState(null);
  const modalRef = useRef(null);
  const videoRef = useRef(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Pause video when modal closes
  useEffect(() => {
    if (!activeVideo && videoRef.current) {
      videoRef.current.pause();
    }
  }, [activeVideo]);

  const openModal = (video) => {
    setActiveVideo(video);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveVideo(null);
    document.body.style.overflow = '';
  };

  const handleOverlayClick = (e) => {
    if (e.target === modalRef.current) closeModal();
  };

  return (
    <section id="gallery" className="section section-dark video-gallery">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="video-gallery__badge">Media</span>
          <h2 className="section-title">Video Gallery</h2>
          <div className="section-header-bar" />
          <p className="section-subtitle">
            Watch Delta Agrimech machines in action — field demonstrations, operations,
            and company showcases.
          </p>
        </div>

        {/* Grid */}
        <div className="video-gallery__grid">
          {VIDEOS.map((video, index) => (
            <VideoTile
              key={video.id}
              video={video}
              index={index}
              onPlay={() => openModal(video)}
            />
          ))}
        </div>
      </div>

      {/* Modal / Lightbox */}
      {activeVideo && (
        <div
          className="video-modal"
          ref={modalRef}
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-label={`Playing: ${activeVideo.title}`}
        >
          <div className="video-modal__inner">
            <button
              className="video-modal__close"
              onClick={closeModal}
              aria-label="Close video"
            >
              ✕
            </button>

            <p className="video-modal__title">{activeVideo.title}</p>

            {activeVideo.youtubeId ? (
              /* YouTube embed */
              <div className="video-modal__player video-modal__player--iframe">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              /* Local / hosted MP4 */
              <div className="video-modal__player">
                <video
                  ref={videoRef}
                  src={activeVideo.src}
                  controls
                  autoPlay
                  muted={false}
                  playsInline
                  className="video-modal__video"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback when video file not found */}
                <div className="video-modal__error" style={{ display: 'none' }}>
                  <p>📽️ Video file not uploaded yet.</p>
                  <code>{activeVideo.src}</code>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

/* ── Video Tile ──────────────────────────────────────────── */
function VideoTile({ video, index, onPlay }) {
  const [thumbError, setThumbError] = useState(false);

  return (
    <button
      className="video-tile"
      style={{ animationDelay: `${index * 0.08}s` }}
      onClick={onPlay}
      aria-label={`Play video: ${video.title}`}
    >
      {/* Thumbnail */}
      <div className="video-tile__thumb">
        {!thumbError && (video.thumbnail || video.youtubeId) ? (
          <img
            src={
              video.youtubeId
                ? `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`
                : video.thumbnail
            }
            alt={video.title}
            loading="lazy"
            onError={() => setThumbError(true)}
          />
        ) : (
          <div className="video-tile__placeholder">
            {/* PLACEHOLDER — replace thumbnail path in siteData.js */}
            <span className="video-tile__placeholder-icon">▶</span>
            <span className="video-tile__placeholder-num">{index + 1}</span>
          </div>
        )}

        {/* Play button */}
        <div className="video-tile__play">
          <span>▶</span>
        </div>
      </div>

      {/* Title */}
      <p className="video-tile__title">{video.title}</p>
    </button>
  );
}

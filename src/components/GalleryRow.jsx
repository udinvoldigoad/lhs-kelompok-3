import { useEffect, useRef } from "react";

export default function GalleryRow({ row, direction = "left" }) {
  const rowRef = useRef(null);
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const rowEl = rowRef.current;
      const track = trackRef.current;
      const wrapper = wrapperRef.current;
      if (!rowEl || !track || !wrapper) return;

      const NAVBAR_HEIGHT = 80;
      const viewportHeight = window.innerHeight;

      const rowRect = rowEl.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();

      // 🚫 BELUM TERLIHAT → DIAM
      if (
        trackRect.top > viewportHeight ||
        trackRect.bottom < NAVBAR_HEIGHT
      ) return;

      /* =========================
         HITUNG JARAK GESER ASLI
      ========================= */
      const maxTranslate =
        track.scrollWidth - wrapper.clientWidth;

      if (maxTranslate <= 0) return;

      /* =========================
         KAPAN MULAI & BERHENTI
      ========================= */
      const start = viewportHeight * 0.9;
      const end = -rowRect.height * 0.6;

      let progress = (start - rowRect.top) / (start - end);
      progress = Math.min(Math.max(progress, 0), 1);

      // easing supaya smooth & tidak kebut
      progress = progress ** 1.4;

      /* =========================
         ARAH SELANG-SELING BENAR
      ========================= */
      let translateX;

      if (direction === "left") {
        // kiri: 0 → -max
        translateX = -maxTranslate * progress;
      } else {
        // kanan: max → 0
        translateX = maxTranslate * (1 - progress);
      }

      track.style.transform = `translateX(${translateX}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [direction]);

  return (
    <section className="gallery-row" ref={rowRef}>
      <h3 className="gallery-title">
        {row.title.split(" ").map((w, i) => (
          <span key={i} className="hover-word">{w}&nbsp;</span>
        ))}
      </h3>

      <p className="gallery-desc">
        {row.description.split(" ").map((w, i) => (
          <span key={i} className="hover-word">{w}&nbsp;</span>
        ))}
      </p>

      <div 
        className={`gallery-track-wrapper ${direction}`}
        ref={wrapperRef}
    >
        <div className="gallery-track" ref={trackRef}>
          {row.images.map((img, i) => (
            <div key={i} className="gallery-image">
              <img src={img} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

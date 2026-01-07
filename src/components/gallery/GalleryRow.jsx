import { useEffect, useRef } from "react";
import "./gallery.css";

export default function GalleryRow({ row, direction = "left" }) {
  const rowRef = useRef(null);
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);

useEffect(() => {
  const handleScroll = () => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!track || !wrapper) return;

    const NAVBAR_HEIGHT = 80;
    const viewportHeight = window.innerHeight;

    const wrapperRect = wrapper.getBoundingClientRect();

    /* =========================
       FOTO BELUM MASUK LAYAR
       → JANGAN GERAK
    ========================= */
    if (
      wrapperRect.top > viewportHeight ||
      wrapperRect.bottom < NAVBAR_HEIGHT
    ) {
      return;
    }

    /* =========================
       HITUNG PROGRESS SCROLL
       BASED ON FOTO
    ========================= */
    const start = viewportHeight * 0.85;
    const end = NAVBAR_HEIGHT + wrapperRect.height * 0.2;

    let progress = (start - wrapperRect.top) / (start - end);
    progress = Math.min(Math.max(progress, 0), 1);

    /* 🔥 PERLAMBAT AWAL GERAK */
    progress = progress ** 1.8;

    /* =========================
       JARAK GESER REAL
    ========================= */
    const EXTRA_END_SPACE = 180; // kompensasi visual

    const maxTranslate =
      track.scrollWidth - wrapper.clientWidth + EXTRA_END_SPACE;


    if (maxTranslate <= 0) return;

    /* =========================
       SELANG-SELING ARAH
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

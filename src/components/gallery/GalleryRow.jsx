import { useEffect, useRef } from "react";
import "./gallery.css";

export default function GalleryRow({ row, direction }) {
  const rowRef = useRef(null);
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);

useEffect(() => {
  const handleScroll = () => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!track || !wrapper) return;

    const NAVBAR_HEIGHT = 80;
    const vh = window.innerHeight;

    const wrapperRect = wrapper.getBoundingClientRect();

    // ✅ hitung visible width tanpa padding wrapper
    const style = window.getComputedStyle(wrapper);
    const padL = parseFloat(style.paddingLeft) || 0;
    const padR = parseFloat(style.paddingRight) || 0;
    const visibleWidth = wrapper.clientWidth - padL - padR;

    const rawMax = track.scrollWidth - visibleWidth;

    if (rawMax <= 0) {
      track.style.transform = "translateX(0px)";
      return;
    }

    const EXTRA_END_SPACE = 200; // baris 1 biar ujung tidak kepotong
    const effectiveMax =
      direction === "left" ? rawMax + EXTRA_END_SPACE : rawMax;

    // kalau belum terlihat, kunci posisi awal
    const out = wrapperRect.top > vh || wrapperRect.bottom < NAVBAR_HEIGHT;
    if (out) {
      const startX = direction === "left" ? 0 : -effectiveMax; // ✅ start kanan tidak “terlalu masuk”
      track.style.transform = `translateX(${startX}px)`;
      return;
    }

    // progress saat wrapper terlihat
    const start = vh * 0.75;
    const end = NAVBAR_HEIGHT - wrapperRect.height * 0.15;

    let progress = (start - wrapperRect.top) / (start - end);
    progress = Math.min(Math.max(progress, 0), 1);

    // pelankan awal
    progress = progress ** 2.5;

    const translateX =
      direction === "left"
        ? -effectiveMax * progress
        : -effectiveMax * (1 - progress);

    track.style.transform = `translateX(${translateX}px)`;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
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

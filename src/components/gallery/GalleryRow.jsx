import { useEffect, useMemo, useRef, useState } from "react";
import "./gallery.css";

export default function GalleryRow({ row, direction }) {
  const rowRef = useRef(null);
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);

  // untuk efek masuk/keluar judul & foto
  const [active, setActive] = useState(false);
  const [leaving, setLeaving] = useState(false);

  // inertia scroll
  const targetXRef = useRef(0);
  const currentXRef = useRef(0);
  const rafRef = useRef(null);

  // split kata untuk animasi per kata
  const titleWords = useMemo(() => row.title.split(" "), [row.title]);
  const descWords = useMemo(() => row.description.split(" "), [row.description]);

  const exitTimerRef = useRef(null);

  useEffect(() => { //useEffect untuk intersection observer
    const rowEl = rowRef.current;
    if (!rowEl) return;

    // IntersectionObserver untuk masuk/keluar section judul
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // jika sedang proses keluar, batalkan
          if (exitTimerRef.current) clearTimeout(exitTimerRef.current);

          setLeaving(false);
          setActive(true);
        } else {
          setLeaving(true);

          // delay sedikit supaya animasi keluar selesai,
          // tapi bisa dibatalkan saat masuk lagi
          exitTimerRef.current = setTimeout(() => {
            setActive(false);
          }, 450);
        }
      },
      {
        // mulai aktif ketika area judul mendekati tengah
        root: null,
        threshold: 0.25,
      }
    );

    obs.observe(rowEl);
    return () => obs.disconnect();
  }, []);

  useEffect(() => { //useEffect untuk scroll inertia
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!track || !wrapper) return;

    const NAVBAR_HEIGHT = 80;
    const vh = window.innerHeight;

    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

    const handleScroll = () => {
      const wrapperRect = wrapper.getBoundingClientRect();

      // ✅ hitung visible width tanpa padding wrapper
      const style = window.getComputedStyle(wrapper);
      const padL = parseFloat(style.paddingLeft) || 0;
      const padR = parseFloat(style.paddingRight) || 0;
      const visibleWidth = wrapper.clientWidth - padL - padR;

      const rawMax = track.scrollWidth - visibleWidth;

      if (rawMax <= 0) {
        targetXRef.current = 0;
        return;
      }

      const EXTRA_END_SPACE = 120;
      const effectiveMax = direction === "left" ? rawMax + EXTRA_END_SPACE : rawMax;

      // kalau belum terlihat, kunci posisi awal
      const out = wrapperRect.top > vh || wrapperRect.bottom < NAVBAR_HEIGHT;
      if (out) {
        const startX = direction === "left" ? 0 : -effectiveMax;
        targetXRef.current = startX;
        return;
      }

      // progress saat wrapper terlihat
      const start = vh * 0.75;
      const end = NAVBAR_HEIGHT - wrapperRect.height * 0.15;

      let progress = (start - wrapperRect.top) / (start - end);
      progress = clamp(progress, 0, 1);

      // pelankan awal
      progress = progress ** 2.5;

      const translateX =
        direction === "left"
          ? -effectiveMax * progress
          : -effectiveMax * (1 - progress);

      // set target (bukan langsung set transform)
      targetXRef.current = translateX;
    };

    const animate = () => {
      const SMOOTH = 0.08; // makin kecil makin lembut + ada inertia
      currentXRef.current =
        currentXRef.current + (targetXRef.current - currentXRef.current) * SMOOTH;

      track.style.transform = `translateX(${currentXRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    handleScroll();
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [direction]);

  return (
    <section className="gallery-row" ref={rowRef}>
      {/* JUDUL */}
      <h3 className={`gallery-title ${active ? "is-in" : ""} ${leaving ? "is-out" : ""}`}>
        {titleWords.map((w, i) => (
          <span
            key={i}
            className="word"
            style={{ transitionDelay: `${i * 55}ms` }}
          >
            {w}&nbsp;
          </span>
        ))}
      </h3>

      {/* DESKRIPSI */}
      <p className={`gallery-desc ${active ? "is-in" : ""} ${leaving ? "is-out" : ""}`}>
        {descWords.map((w, i) => (
          <span
            key={i}
            className="word"
            style={{ transitionDelay: `${140 + i * 18}ms` }}
          >
            {w}&nbsp;
          </span>
        ))}
      </p>

      {/* TRACK */}
      <div className={`gallery-track-wrapper ${direction}`} ref={wrapperRef}>
        {/* vignette */}
        <span className="gallery-vignette left" aria-hidden="true" />
        <span className="gallery-vignette right" aria-hidden="true" />

        <div className={`gallery-track ${active ? "track-in" : ""}`} ref={trackRef}>
          {row.images.map((img, i) => (
            <div
              key={i}
              className={`gallery-image ${active ? "img-in" : ""} ${leaving ? "img-out" : ""}`}
              style={{ transitionDelay: `${120 + i * 60}ms` }}
            >
              <img src={img} alt="" />
              <span className="img-dim" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

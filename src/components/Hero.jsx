import "../styles/hero.css";
import img1 from "../assets/gallery/1.jpg";
import img2 from "../assets/gallery/2.jpg";
import img3 from "../assets/gallery/3.jpg";
import img4 from "../assets/gallery/4.jpg";
import img5 from "../assets/gallery/5.jpg";
import img6 from "../assets/gallery/6.jpg";

const posters = [
  img1, img2, img3, img6, img5, img4,
  img1, img2, img3, img6, img5, img4,
  img1, img2, img3, img6, img5, img4,
  img1, img2, img3, img6, img5, img4,
  img1, img2, img3, img6, img5, img4,
  img1, img2, img3, img6, img5, img4,
  img1, img2, img3, img6, img5, img4,
];

export default function Hero() {
  return (
    <section className="hero-netflix" id="hero">
      {/* POSTER WALL */}
    <div className="poster-track">
    <div className="poster-wall">
        {Array.from({ length: 6 }).map((_, rowIndex) => {
        return (
            <div
            key={`a-${rowIndex}`}
            className={`poster-row ${rowIndex % 2 === 1 ? "offset" : ""}`}
            >
            {Array.from({ length: 6 }).map((_, imgIndex) => {
                const imgSrc =
                posters[(rowIndex * 6 + imgIndex) % posters.length];
                return (
                  <img
                    key={`a-${rowIndex}-${imgIndex}`}
                    src={imgSrc}
                    alt=""
                  />
                );
            })}
            </div>
        );
        })}
    </div>

    {/* DUPLIKAT */}
    <div className="poster-wall">
        {Array.from({ length: 5 }).map((_, rowIndex) => {
        return (
            <div
            key={`b-${rowIndex}`}
            className={`poster-row ${rowIndex % 2 === 1 ? "offset" : ""}`}
            >
            {Array.from({ length: 6 }).map((_, imgIndex) => {
                const imgSrc =
                posters[(rowIndex * 6 + imgIndex) % posters.length];
                return (
                  <img
                    key={`b-${rowIndex}-${imgIndex}`}
                    src={imgSrc}
                    alt=""
                  />
                );

            })}
            </div>
        );
        })}
    </div>
    </div>



      {/* OVERLAY */}
      <div className="hero-overlay" />

      {/* CONTENT */}
      <div className="hero-content-netflix">
        <span className="hero-eyebrow">
          Selamat Datang Di
          <span className="hero-line" />
        </span>

        <h1 className="hero-title-main">
          LHS <span>Kelompok 3</span>
        </h1>

        <p className="hero-tagline">
          Kelompok tugas yang keterusan jadi cerita hidup
        </p>

        <a href="#about">
          <button>Tentang Kelompok Ini →</button>
        </a>
      </div>
    </section>
  );
}

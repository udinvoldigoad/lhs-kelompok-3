import "./about.css";
import aboutImg from "../../assets/gallery/1.jpg"; // ganti sesuai foto utama

export default function About() {
  return (
    <section className="about-section" id="about">
      {/* SECTION TITLE */}
      <div className="about-header">
        <h2>Tentang</h2>
        <span className="about-line" />
      </div>

      {/* CONTENT BOX */}
      <div className="about-card">
        {/* LEFT IMAGE */}
        <div className="about-image">
          <img src={aboutImg} alt="LHS Kelompok 3" />
        </div>

        {/* RIGHT CONTENT */}
        <div className="about-content">
          <h3>Kelompok Tugas Yang Keterusan Jadi Cerita Hidup</h3>

          <div className="about-subtitle">
            <span>Welcome To LHS Kelompok 3</span>
            <span className="subtitle-line" />
          </div>

          <p className="about-text">
            LHS Kelompok 3 berawal dari sekadar kelompok tugas kuliah yang
            terbentuk secara tidak sengaja. Seiring berjalannya waktu,
            kebersamaan, diskusi larut malam, dan perjuangan menghadapi deadline
            membuat kelompok ini berkembang menjadi ruang cerita, tawa,
            dan kenangan yang terus hidup hingga sekarang.
          </p>

          <a href="#member">
            <button className="about-button">Lihat Member →</button>
          </a>
        </div>
      </div>
    </section>
  );
}

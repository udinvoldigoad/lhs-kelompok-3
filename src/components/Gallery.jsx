import { useState } from "react";
import { gallery } from "../data/gallery";
import "../styles/gallery.css";

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <section className="gallery" id="gallery">
      <h2 className="gallery-title">Galeri Kenangan</h2>

      <div className="gallery-grid">
        {gallery.map((item, i) => (
          <img
            key={i}
            src={item.image}
            alt={item.caption}
            className="gallery-item"
            onClick={() => setActive(item)}
          />
        ))}
      </div>

      {/* MODAL */}
      {active && (
        <div
          className="gallery-modal-overlay"
          onClick={() => setActive(null)}
        >
          <div
            className="gallery-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={active.image} alt={active.caption} />
            <p>{active.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}

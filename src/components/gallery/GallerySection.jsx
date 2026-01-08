import GalleryRow from "./GalleryRow";
import { galleryData } from "../../data/galleryData";
import "./gallery.css";

export default function GallerySection() {
  return (
    <section className="gallery-section" id="gallery">
      {galleryData.map((row) => (
        <GalleryRow
          key={row.id}
          row={row}
          direction={row.direction}   // <-- ambil dari data
        />
      ))}
    </section>
  );
}

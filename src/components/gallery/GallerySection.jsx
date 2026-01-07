import "./gallery.css";
import { galleryData } from "../../data/galleryData";
import GalleryRow from "./GalleryRow";

export default function GallerySection() {
  return (
    <section className="gallery-section" id="gallery">
      {galleryData.map((row) => (
        <GalleryRow key={row.id} row={row} />
      ))}
    </section>
  );
}

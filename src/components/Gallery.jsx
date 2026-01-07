import GalleryRow from "./GalleryRow";
import { galleryRows } from "../data/galleryData";

export default function Gallery() {
  return (
    <section className="gallery-section">
    {galleryRows.map((row, i) => (
    <GalleryRow
        key={i}
        row={row}
        direction={i % 2 === 0 ? "left" : "right"}
    />
    ))}
    </section>
  );
}

import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ images, isLoading }) {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (images.length === 0) {
    return <p>No images found.</p>;
  }

  return (
    <ul className={css.gallery}>
      {images.map((image) => (
        <li key={image.id} className={css.galleryItem}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
}

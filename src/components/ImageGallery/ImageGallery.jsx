import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";
import Loader from "../Loader/Loader";

export default function ImageGallery({ images, isLoading, onImageClick }) {
  if (isLoading) {
    return <Loader />;
  }

  // if (images.length === 0) {
  //   return <p>No images found.</p>;
  // }

  return (
    <ul className={css.gallery}>
      {images.map((image) => (
        <li key={image.id} className={css.galleryItem}>
          <ImageCard image={image} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
}

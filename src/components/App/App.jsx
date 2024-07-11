import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "../App/GlobalStyle.css";

import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [showBtn, setShowBtn] = useState(false);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: { query: query, page: page },
            headers: {
              Authorization: `Client-ID VL40HsYKV5bl89KXzYeIpRZOxqIWEDtvbAQygxQPQKg`,
            },
          }
        );
        if (page === 1) {
          setImages(response.data.results);
        } else {
          setImages((prevImages) => [...prevImages, ...response.data.results]);
        }
        setShowBtn(
          response.data.total_pages && response.data.total_pages !== page
        );
      } catch (error) {
        setError("Failed to fetch images. Please try again.");
        toast.error("Failed to fetch images. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearchSubmit = (searchQuery) => {
    if (searchQuery.trim() === "") {
      toast.error("Please enter a search query!");
      return;
    }

    setQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (largeImageURL) => {
    setLargeImageURL(largeImageURL);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setLargeImageURL("");
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearchSubmit} />
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery
            images={images}
            isLoading={isLoading}
            onImageClick={openModal}
          />
          {images.length > 0 && !isLoading && showBtn && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </>
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        imageURL={largeImageURL}
      />
    </div>
  );
}

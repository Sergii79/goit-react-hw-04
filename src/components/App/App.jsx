import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchSubmit = async (searchQuery) => {
    if (searchQuery.trim() === "") {
      toast.error("Please enter a search query!");
      return;
    }

    setQuery(searchQuery);
    setIsLoading(true);

    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: { query: searchQuery },
          headers: {
            Authorization: `Client-ID VL40HsYKV5bl89KXzYeIpRZOxqIWEDtvbAQygxQPQKg`,
          },
        }
      );

      setImages(response.data.results);
    } catch (error) {
      toast.error("Failed to fetch images. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} isLoading={isLoading} />
    </div>
  );
}

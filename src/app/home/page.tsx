"use client";

import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ImageGrid from "../components/ImageGrid";

export default function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async (query: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/image?query=${query}`);
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-4xl">
        <Header />
        <SearchBar onSearch={fetchImages} />
        
        {loading ? (
          <div className="flex justify-center items-center py-10 min-h-screen">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-[#CDA274] rounded-full animate-spin"></div>
          </div>
        ) : (
          <ImageGrid images={images} />
        )}
      </div>
    </div>
  );
}

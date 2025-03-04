import React, { useState } from "react";
import ListItem from "./ListItem";
import { TStatListItem } from "../../../../../constants/Interfaces/stats";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CarouselProps {
  list: TStatListItem[];
}

const Carousel: React.FC<CarouselProps> = ({ list }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === list.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? list.length - 1 : prevIndex - 1
    );
  };

  const visibleItems: TStatListItem[] = list.slice(
    currentIndex,
    currentIndex + 4
  );

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="flex overflow-hidden">
        {visibleItems.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-1/4 p-2 transition-transform duration-300 ease-in-out"
          >
            <ListItem {...{ ...item }} />
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-anilist-mirage/80 hover:bg-anilist-mirage/100 text-anilist-gray-bermuda text-3xl p-4 rounded-full focus:outline-none"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-anilist-mirage/80 hover:bg-anilist-mirage/100 text-anilist-gray-bermuda text-3xl p-4 rounded-full focus:outline-none"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Carousel;

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Button } from '../Button/Button';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CarouselProps {
  slides: {
    id: string;
    content: React.ReactNode;
  }[];
  autoplay?: boolean;
  interval?: number;
  navigation?: boolean;
  pagination?: boolean;
  loop?: boolean;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  autoplay = false,
  interval = 3000,
  navigation = true,
  pagination = true,
  loop = true,
  className = ''
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  return (
    <div className={`relative ${className}`}>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={navigation}
        pagination={pagination ? { clickable: true } : false}
        loop={loop}
        autoplay={autoplay ? { delay: interval, disableOnInteraction: false } : false}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {slide.content}
          </SwiperSlide>
        ))}
      </Swiper>

      {navigation && (
        <>
          <Button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
            variant="ghost"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            ‹
          </Button>
          <Button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
            variant="ghost"
            onClick={() => swiperRef.current?.slideNext()}
          >
            ›
          </Button>
        </>
      )}
    </div>
  );
};

export default Carousel;
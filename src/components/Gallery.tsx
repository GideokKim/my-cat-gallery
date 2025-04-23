'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSwipeable } from 'react-swipeable';
import { useState } from 'react';
import { CatMedia } from '@/types';

interface GalleryProps {
  images: CatMedia[];
}

export default function Gallery({ images }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    },
    onSwipedRight: () => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    },
    trackMouse: true
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 모바일 뷰 */}
      <div className="md:hidden">
        <div {...handlers} className="relative h-[70vh] bg-gray-100 rounded-lg shadow-lg overflow-hidden">
          {images[currentIndex].type === 'video' ? (
            <video
              src={images[currentIndex].mediaUrl}
              className="w-full h-full object-contain"
              controls
              playsInline
            />
          ) : (
            <Image
              src={images[currentIndex].mediaUrl}
              alt={images[currentIndex].title}
              fill
              className="object-contain p-4"
              sizes="100vw"
              priority
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
            <h2 className="text-lg font-semibold">{images[currentIndex].title}</h2>
            <p className="text-sm">{images[currentIndex].date}</p>
          </div>
          <div className="absolute top-1/2 left-4 right-4 flex justify-between transform -translate-y-1/2">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
              className="bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
              className="bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
            >
              →
            </button>
          </div>
        </div>
        <div className="mt-4 flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 데스크톱 뷰 */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((media) => (
          <Link href={`/${media.id}`} key={media.id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 bg-gray-100">
                {media.type === 'video' ? (
                  <video
                    src={media.mediaUrl}
                    className="w-full h-full object-contain"
                    controls
                    playsInline
                  />
                ) : (
                  <Image
                    src={media.mediaUrl}
                    alt={media.title}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900">{media.title}</h2>
                <p className="mt-1 text-sm text-gray-500">{media.date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 
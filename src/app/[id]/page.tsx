'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSwipeable } from 'react-swipeable';
import { useState } from 'react';
import { use } from 'react';
import { images } from '@/data/images';

export default function CatDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const initialIndex = images.findIndex(img => img.id === resolvedParams.id);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    },
    onSwipedRight: () => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    },
    trackMouse: true
  });

  const image = images[currentIndex];

  if (!image) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Image not found</h1>
          <Link href="/" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
            Back to gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/" className="inline-block mb-8 text-blue-600 hover:text-blue-800">
        ← Back to gallery
      </Link>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div {...handlers} className="relative h-[70vh] bg-gray-100">
          {image.type === 'video' ? (
            <video
              src={image.mediaUrl}
              className="w-full h-full object-contain"
              controls
              playsInline
            />
          ) : (
            <Image
              src={image.mediaUrl}
              alt={image.title}
              fill
              className="object-contain p-4"
              sizes="100vw"
              priority
            />
          )}
          {/* 모바일에서만 표시되는 네비게이션 버튼 */}
          <div className="md:hidden absolute top-1/2 left-4 right-4 flex justify-between transform -translate-y-1/2">
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
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{image.title}</h1>
          <p className="text-gray-600 mb-4">{image.description}</p>
          <p className="text-sm text-gray-500">Taken on: {image.date}</p>
        </div>
        {/* 이미지 인디케이터 */}
        <div className="md:hidden flex justify-center space-x-2 pb-4">
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
    </div>
  );
} 
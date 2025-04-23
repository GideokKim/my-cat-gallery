import Gallery from '@/components/Gallery';
import { images } from '@/data/images';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">다미의 이야기 🐾</h1>
          <p className="text-gray-600 mb-4">
            <Link href="https://www.animals.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">동물자유연대</Link>에서는 &apos;나린&apos;이로 불리던 5개월된 아이가 지금은 다미가 되었습니다. 
            우리 집에 와서 행복한 생활을 보내고 있는 다미의 일상을 소개합니다. 🐾
          </p>
        </div>
        <Gallery images={images} />
      </div>
    </div>
  );
}

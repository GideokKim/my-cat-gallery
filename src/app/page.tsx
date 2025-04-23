import Gallery from '@/components/Gallery';
import { images } from '@/data/images';

export default function Home() {
  return (
    <div>
      <Gallery images={images} />
    </div>
  );
}

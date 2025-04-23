export interface CatImage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

export interface CatMedia {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  date: string;
  type: 'image' | 'video';
} 
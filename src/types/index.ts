import type { RecaptchaVerifier } from "firebase/auth";

export type Listing = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
  };
  images: string[];
  beds: number;
  baths: number;
  amenities: string[];
  verified: boolean;
  type: 'House' | 'Flat' | 'Room';
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  date: string;
  readTime: string;
  tags: string[];
};

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

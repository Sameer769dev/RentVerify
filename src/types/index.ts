export type Listing = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    country: string;
  };
  images: string[];
  beds: number;
  baths: number;
  amenities: string[];
  verified: boolean;
  type: 'House' | 'Flat' | 'Room';
};

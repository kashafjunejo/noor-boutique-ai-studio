export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'kurti' | 'suits' | 'festive' | 'services';
  price: number; // In PKR
  image: string;
  badge?: string;
  fabricDetails: string;
  availableSizes?: string[];
  inStock: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
  iconName: string;
  startingPrice?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  feedback: string;
  rating: number;
  outfit: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  experience: string;
}

export interface OpeningHourItem {
  day: string;
  hours: string;
  isOpenToday: (currentDay: number, currentHour: number, currentMin: number) => boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'ordering' | 'stitching' | 'payment' | 'delivery';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  customNotes?: string;
}

export interface StitchingMeasurements {
  fullName: string;
  phone: string;
  dressType: string;
  kameezLength: string;
  chest: string;
  waist: string;
  hip: string;
  shoulder: string;
  sleeves: string;
  trouserLength: string;
  specialInstructions: string;
}

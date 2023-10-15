export interface Trip {
  id: number;
  photoUrl: string;
  title: string;
  subtitle: string;
  countries: string[];
  days: number;
  co2kilograms: number;
  rating: number;
  description: string;
  advantages: Advantage[];
}

export interface Advantage {
  title: string;
  description: string;
}

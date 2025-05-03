export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  features: string[];
  createdAt: string;
  agent: Agent;
}

export type PropertyType =
  | "house"
  | "condo"
  | "apartment"
  | "townhouse"
  | "land"
  | "commercial"
  | "house-and-lot";

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface PropertyFilter {
  type?: PropertyType | "all";
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
}

export interface PropertySort {
  field: "price" | "bedrooms" | "bathrooms" | "createdAt";
  direction: "asc" | "desc";
}

export const PROPERTY_TYPES: {value: PropertyType | "all"; label: string}[] = [
  {value: "all", label: "All Properties"},
  {value: "house", label: "House"},
  {value: "house-and-lot", label: "House and Lot"},
  {value: "condo", label: "Condominium"},
  {value: "apartment", label: "Apartment"},
  {value: "townhouse", label: "Townhouse"},
  {value: "land", label: "Land/Lot"},
  {value: "commercial", label: "Commercial"},
];

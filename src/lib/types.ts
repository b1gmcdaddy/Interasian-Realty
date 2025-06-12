export interface Property {
  listingId: number;
  title: string;
  location: string;
  landArea?: string;
  floorArea?: string;
  bedRooms?: number;
  bathRooms?: number;
  price: number;
  description?: string;
  status: boolean;
  propertyType: PropertyType | string;
  owner: string;
  images?: PropertyImage[];
  creator: string;
}

export type CreateProperty = Omit<Property, "listingId" | "images"> & {
  images?: PropertyImage[];
};
export type PropertyImage = {
  imageId: number;
  listingId: number;
  fileName: string;
  uploadDate: Date;
};

export type PropertyType =
  | "house"
  | "condo"
  | "apartment"
  | "townhouse"
  | "land"
  | "commercial"
  | "house-and-lot";

export interface PropertyFilter {
  type?: PropertyType | "all";
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
}

export interface PropertySort {
  field: "price" | "bedRooms" | "bathRooms";
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

export type ApiResponse<T = undefined> = {
  success: boolean;
  message: string[] | string;
  data?: T;
  pagination?: Pagination;
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious?: boolean;
  hasNext?: boolean;
};

export interface Property {
  id: string;
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

export type CreateProperty = Omit<Property, "id" | "images"> & {
  images?: PropertyImage[];
};
export type PropertyImage = {
  id: string;
  listingId: string;
  fileName: string;
  uploadDate: Date;
};

export type PropertyType =
  | "House"
  | "Condo"
  | "Apartment"
  | "Townhouse"
  | "Land"
  | "Commercial"
  | "House with Lot";

export interface PropertyFilter {
  type?: PropertyType | "all";
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  city?: string;
}

export interface PropertySort {
  field: "price" | "bedRooms" | "bathRooms";
  direction: "asc" | "desc";
}

export const PROPERTY_TYPES: {value: PropertyType | "all"; label: string}[] = [
  {value: "all", label: "All Properties"},
  {value: "House", label: "House"},
  {value: "House with Lot", label: "House and Lot"},
  {value: "Condo", label: "Condominium"},
  {value: "Apartment", label: "Apartment"},
  {value: "Townhouse", label: "Townhouse"},
  {value: "Land", label: "Land"},
  {value: "Commercial", label: "Commercial"},
];

export interface Email {
  name: string;
  email: string;
  subject: string;
  message: string;
}

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

import {PropertyType} from "./types";

export const SITE_API = process.env.NEXT_PUBLIC_SERVER_URL || "";
export const SITE_TITLE = "Interasian Realty Services Inc.";
export const SITE_DESCRIPTION =
  "Find your dream property with Interasian Realty";

export const PRICE_RANGE = {
  min: 0,
  max: 80000000,
  step: 100000,
};

export const BEDROOM_OPTIONS = [1, 2, 3, 4, 5, "6+"];
export const BATHROOM_OPTIONS = [1, 2, 3, 4, "5+"];

export const FEATURED_CITIES = [
  "New York",
  "Los Angeles",
  "Miami",
  "Chicago",
  "San Francisco",
  "Seattle",
];

export const TYPE_ICONS: Record<PropertyType | "all", string> = {
  all: "home",
  house: "home",
  condo: "building-2",
  apartment: "building",
  townhouse: "home",
  land: "map",
  commercial: "store",
  "house-and-lot": "trees",
};

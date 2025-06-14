import {PropertyType} from "./types";

export const SITE_API = process.env.NEXT_PUBLIC_SERVER_URL || "";
export const SITE_TITLE = "Inter Asian Realty Services Inc.";
export const SITE_DESCRIPTION =
  "Find your dream property with Inter Asian Realty";

export const PRICE_RANGE = {
  min: 0,
  max: 80000000,
  step: 100000,
};

export const BEDROOM_OPTIONS = [1, 2, 3, 4, 5, "6+"];
export const BATHROOM_OPTIONS = [1, 2, 3, 4, "5+"];

export const TYPE_ICONS: Record<PropertyType | "all", string> = {
  all: "home",
  House: "home",
  Condo: "building-2",
  Apartment: "building",
  Townhouse: "home",
  Land: "map",
  Commercial: "store",
  "House with Lot": "trees",
};

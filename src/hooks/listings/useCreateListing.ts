import {SITE_API} from "@/lib/constants";
import {ApiResponse} from "@/lib/types";
import {CreateProperty, Property} from "@/lib/types";
import {useMutation} from "@tanstack/react-query";

export const createListingAsync = async (listing: CreateProperty) => {
  const response = await fetch(`${SITE_API}/Listing`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listing),
  }).then((res) => res.json());
  return response as ApiResponse<Property>;
};

const useCreateListing = () => {
  return useMutation({
    mutationFn: createListingAsync,
    onError: (err) => {
      console.error(err);
    },
  });
};

export default useCreateListing;

import {SITE_API} from "@/lib/constants";
import {ApiResponse} from "@/lib/types";
import {Property} from "@/lib/types";
import {useMutation} from "@tanstack/react-query";

export const deleteListingAsync = async (listingId: string) => {
  const response = await fetch(`${SITE_API}/Listing/${listingId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return response as ApiResponse<Property>;
};

const useDeleteListing = () => {
  return useMutation({
    mutationFn: deleteListingAsync,
    onError: (err) => {
      console.error(err);
    },
  });
};

export default useDeleteListing;

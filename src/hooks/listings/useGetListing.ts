import {SITE_API} from "@/lib/constants";
import {ApiResponse} from "@/lib/types";
import {Property} from "@/lib/types";
import {type QueryKey, useQuery} from "@tanstack/react-query";

export const getListingById = async (listingId: string) => {
  const response = await fetch(`${SITE_API}/Listing/${listingId}`).then((res) =>
    res.json()
  );
  return response as ApiResponse<Property>;
};

const useGetListing = (
  listingId: string,
  options?: {deps?: QueryKey; enabled?: boolean}
) => {
  return useQuery({
    queryKey: ["getListing", listingId, options?.deps],
    queryFn: () => getListingById(listingId),
    select: (data) => {
      return data.data;
    },
    enabled: options?.enabled,
  });
};

export default useGetListing;

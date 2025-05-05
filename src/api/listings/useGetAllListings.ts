import {SITE_API} from "@/lib/constants";
import {ApiResponse} from "@/lib/types";
import {Property} from "@/lib/types";
import {type QueryKey, useQuery} from "@tanstack/react-query";

export const getAllListings = async () => {
  const response = await fetch(`${SITE_API}/Listing`).then((res) => res.json());
  return response as ApiResponse<Property[]>;
};

const useGetAllListings = (options?: {deps?: QueryKey; enabled?: boolean}) => {
  return useQuery({
    queryKey: ["getAllListings", options?.deps],
    queryFn: () => getAllListings(),
    select: (data) => {
      return data.data;
    },
    enabled: options?.enabled,
  });
};

export default useGetAllListings;

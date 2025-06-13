import {SITE_API} from "@/lib/constants";
import {ApiResponse, Property} from "@/lib/types";
import {type QueryKey, useQuery} from "@tanstack/react-query";

interface GetAllListingsParams {
  pageNumber?: number;
  pageSize?: number;
  searchQuery?: string;
  propertyType?: string;
  sortOption?: string;
}

export const getAllListings = async (params?: GetAllListingsParams) => {
  const queryParams = new URLSearchParams();

  if (params?.pageNumber)
    queryParams.append("pageNumber", params.pageNumber.toString());
  if (params?.pageSize)
    queryParams.append("pageSize", params.pageSize.toString());
  if (params?.searchQuery)
    queryParams.append("searchQuery", params.searchQuery);
  if (params?.propertyType)
    queryParams.append("propertyType", params.propertyType);
  if (params?.sortOption) queryParams.append("sortOption", params.sortOption);

  const queryString = queryParams.toString();
  const url = `${SITE_API}/Listing${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url).then((res) => res.json());
  return response as ApiResponse<Property[]>;
};

const useGetAllListings = (
  params?: GetAllListingsParams,
  options?: {deps?: QueryKey; enabled?: boolean}
) => {
  return useQuery({
    queryKey: ["getAllListings", params, options?.deps],
    queryFn: () => getAllListings(params),
    select: (data) => {
      return data.data;
    },
    enabled: options?.enabled,
  });
};

export default useGetAllListings;

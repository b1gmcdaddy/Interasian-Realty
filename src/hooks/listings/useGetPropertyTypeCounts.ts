import {SITE_API} from "@/lib/constants";
import {ApiResponse} from "@/lib/types";
import {useQuery} from "@tanstack/react-query";

interface PropertyTypeCount {
  propertyType: string;
  count: number;
}

export const getPropertyTypeCounts = async () => {
  const response = await fetch(`${SITE_API}/Listing/count`).then((res) =>
    res.json()
  );
  return response as ApiResponse<PropertyTypeCount[]>;
};

const useGetPropertyTypeCounts = () => {
  return useQuery({
    queryKey: ["getPropertyTypeCounts"],
    queryFn: getPropertyTypeCounts,
    select: (data) => data.data,
  });
};

export default useGetPropertyTypeCounts;

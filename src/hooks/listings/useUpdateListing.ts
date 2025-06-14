import {useMutation} from "@tanstack/react-query";
import {SITE_API} from "@/lib/constants";
import {ApiResponse, Property} from "@/lib/types";

interface UpdateListingPayload {
  id: string;
  data: {
    title: string;
    location: string;
    landArea?: string;
    floorArea?: string;
    bedRooms?: number;
    bathRooms?: number;
    description?: string;
    price: number;
    status: boolean;
    propertyType: string;
    owner: string;
    images?: string[];
  };
}

const updateListing = async ({id, data}: UpdateListingPayload) => {
  const response = await fetch(`${SITE_API}/Listing/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
  return response as ApiResponse<Property>;
};

const useUpdateListing = () => {
  return useMutation({
    mutationFn: updateListing,
    onError: (err) => {
      console.error(err);
    },
  });
};

export default useUpdateListing;

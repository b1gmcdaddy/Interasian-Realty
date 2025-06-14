import {SITE_API} from "@/lib/constants";
import {ApiResponse} from "@/lib/types";
import {useMutation} from "@tanstack/react-query";

type DeleteImageParams = {
  listingId: string;
  imageId: string;
};

export const deleteListingImageAsync = async ({
  listingId,
  imageId,
}: DeleteImageParams) => {
  const response = await fetch(
    `${SITE_API}/Listing/${listingId}/images/${imageId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
  return response as ApiResponse<null>;
};

const useDeleteListingImage = () => {
  return useMutation({
    mutationFn: deleteListingImageAsync,
    onError: (err) => {
      console.error(err);
    },
  });
};

export default useDeleteListingImage;

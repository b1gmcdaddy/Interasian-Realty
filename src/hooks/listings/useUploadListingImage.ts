import {SITE_API} from "@/lib/constants";
import {ApiResponse} from "@/lib/types";
import {PropertyImage} from "@/lib/types";
import {useMutation} from "@tanstack/react-query";

type UploadImagesParams = {
  listingId: number;
  files: File[];
};

export const uploadListingImagesAsync = async ({
  listingId,
  files,
}: UploadImagesParams) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await fetch(`${SITE_API}/Listing/${listingId}/images`, {
    method: "POST",
    body: formData,
  }).then((res) => res.json());
  return response as ApiResponse<PropertyImage[]>;
};

const useUploadListingImage = () => {
  return useMutation({
    mutationFn: uploadListingImagesAsync,
    onError: (err) => {
      console.error(err);
    },
  });
};

export default useUploadListingImage;

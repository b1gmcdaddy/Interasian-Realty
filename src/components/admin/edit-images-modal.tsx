"use client";

import {useState, useRef, useEffect} from "react";
import {ImagePlus, X} from "lucide-react";
import {toast} from "sonner";
import {useQueryClient} from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import useUploadListingImage from "@/hooks/listings/useUploadListingImage";
import useDeleteListingImage from "@/hooks/listings/useDeleteListingImage";
import {PropertyImage} from "@/lib/types";
import Image from "next/image";
import Loader from "../layout/loader";
import {useConfirmDialog} from "@/hooks/layouting/useConfirmationDialog";

interface EditImagesModalProps {
  listing: {
    listingId: number;
    images?: PropertyImage[];
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function EditImagesModal({
  listing,
  isOpen,
  onClose,
}: EditImagesModalProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [localImages, setLocalImages] = useState<PropertyImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const {confirm, dialog} = useConfirmDialog();

  useEffect(() => {
    if (listing.images) {
      setLocalImages(listing.images);
    }
  }, [listing.images]);

  const {mutate: uploadImages, isPending: isUploading} =
    useUploadListingImage();
  const {mutate: deleteImage, isPending: isDeleting} = useDeleteListingImage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...urls]);

    uploadImages(
      {listingId: listing.listingId, files},
      {
        onSuccess: (response) => {
          const newImages = response.data || [];
          setLocalImages((prev) => [...prev, ...newImages]);
          queryClient.invalidateQueries({queryKey: ["getAllListings"]});
          toast.success("Images uploaded successfully");
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        },
        onError: (error) => {
          console.error(error);
          toast.error("Failed to upload images");
        },
      }
    );
  };

  const handleDeleteImage = async (imageId: number) => {
    const confirmed = await confirm({
      title: "Delete Image?",
      description:
        "Are you sure you want to delete this image? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
    });
    if (confirmed) {
      deleteImage(
        {listingId: listing.listingId, imageId},
        {
          onSuccess: () => {
            setLocalImages((prev) =>
              prev.filter((img) => img.imageId !== imageId)
            );
            queryClient.invalidateQueries({queryKey: ["getAllListings"]});
            toast.success("Image deleted successfully");
          },
          onError: (error) => {
            console.error(error);
            toast.error("Failed to delete image");
          },
        }
      );
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        {isUploading || isDeleting ? <Loader /> : null}
        {dialog}
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto [&>button]:cursor-pointer">
          <DialogHeader>
            <DialogTitle className="text-center">
              Edit Listing Images
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Image Upload Section */}
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="images"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImagePlus className="w-8 h-8 mb-2 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG or JPEG</p>
                </div>
                <input
                  ref={fileInputRef}
                  id="images"
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-3 gap-4">
              {localImages.map((image) => (
                <div key={image.imageId} className="relative group">
                  <Image
                    src={image.fileName}
                    alt="Property"
                    width={200}
                    height={200}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={() => handleDeleteImage(image.imageId)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={onClose}
              variant="outline"
              className="cursor-pointer">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

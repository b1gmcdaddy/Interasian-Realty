"use client";

import React, {useState} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Button} from "../ui/button";
import {Edit, Trash2, Image} from "lucide-react";
import useGetAllListings from "@/hooks/listings/useGetAllListings";
import useDeleteListing from "@/hooks/listings/useDeleteListing";
import {useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {motion, AnimatePresence} from "framer-motion";
import {useConfirmDialog} from "@/hooks/layouting/useConfirmationDialog";
import Loader from "../layout/loader";
import EditListingForm from "./edit-listing-form";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import EditImagesModal from "./edit-images-modal";

export default function ManageListingsTable() {
  const {data: listings, isLoading, isError} = useGetAllListings();
  const {mutate: deleteListing} = useDeleteListing();
  const queryClient = useQueryClient();
  const {confirm, dialog} = useConfirmDialog();
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isImagesModalOpen, setIsImagesModalOpen] = useState(false);

  const handleDeleteListing = async (listingId: number) => {
    const confirmed = await confirm({
      title: "Delete Listing?",
      description:
        "Are you sure you want to delete this listing? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
    });
    if (confirmed) {
      deleteListing(listingId, {
        onSuccess: () => {
          toast.success("Listing deleted successfully");
          queryClient.invalidateQueries({queryKey: ["getAllListings"]});
        },
      });
    }
  };

  const handleEditListing = (listing: any) => {
    setSelectedListing(listing);
    setIsEditDialogOpen(true);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {dialog}
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-gray-800">
            <TableHead className="text-gray-700 dark:text-gray-200">
              Title
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-200">
              Price
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-200">
              Location
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-200">
              Status
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-200">
              Action Buttons
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listings && listings.length > 0 ? (
            <AnimatePresence>
              {listings.map((listing, idx) => (
                <motion.tr
                  key={listing.listingId}
                  initial={{opacity: 0, y: 10}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: -10}}
                  transition={{duration: 0.2, delay: idx * 0.03}}
                  className={`${
                    idx % 2 === 0
                      ? "bg-white dark:bg-gray-900"
                      : "bg-gray-50 dark:bg-gray-800"
                  } group transition-colors hover:bg-blue-50 dark:hover:bg-blue-900`}>
                  <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                    {listing.title}
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100">
                    ₱{listing.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100">
                    {listing.location}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                        listing.status == true
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}>
                      {listing.status == true ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="transition-transform hover:scale-110 cursor-pointer"
                            onClick={() => handleEditListing(listing)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit Listing</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="transition-transform hover:scale-110 cursor-pointer"
                            onClick={() => {
                              setSelectedListing(listing);
                              setIsImagesModalOpen(true);
                            }}>
                            <Image className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit Images</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="transition-transform hover:scale-110 cursor-pointer"
                            onClick={() =>
                              handleDeleteListing(listing.listingId)
                            }>
                            <Trash2 className="h-4 w-4 text-red-800" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete Listing</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-12 text-center text-gray-500 dark:text-gray-400">
                No listings available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selectedListing && (
        <EditListingForm
          listing={selectedListing}
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedListing(null);
          }}
        />
      )}

      {selectedListing && (
        <EditImagesModal
          listing={selectedListing}
          isOpen={isImagesModalOpen}
          onClose={() => {
            setIsImagesModalOpen(false);
            setSelectedListing(null);
          }}
        />
      )}
    </div>
  );
}

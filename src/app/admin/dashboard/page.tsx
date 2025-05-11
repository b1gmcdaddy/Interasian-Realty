import React from "react";
import {Button} from "@/components/ui/button";
import ManageListingsTable from "@/components/admin/manage-listings-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";

const ListingForm = dynamic(
  () => import("@/components/admin/create-listing-form"),
  {
    loading: () => <div>Loading...</div>,
  }
);

export default function ManageListingsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Listings</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">Add New Listing</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col [&>button]:cursor-pointer">
            <DialogHeader>
              <DialogTitle>Add New Listing</DialogTitle>
            </DialogHeader>
            <div className="overflow-y-auto flex-1 pr-2">
              <ListingForm />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <ManageListingsTable />
      </div>
    </div>
  );
}

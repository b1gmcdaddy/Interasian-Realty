import React from "react";
import {Button} from "@/components/ui/button";
import ManageListingsTable from "@/components/admin/manage-listings-table";

export default function ManageListingsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Listings</h1>
        <Button>Add New Listing</Button>
      </div>

      <div className="rounded-md border">
        <ManageListingsTable />
      </div>
    </div>
  );
}

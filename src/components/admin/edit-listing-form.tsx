"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Button} from "../ui/button";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch";
import useUpdateListing from "@/hooks/listings/useUpdateListing";
import {useAuth} from "@/context/auth-context";
import {useQueryClient} from "@tanstack/react-query";
import {useRef, useState, useEffect} from "react";
import {toast} from "sonner";
import Loader from "../layout/loader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const listingFormSchema = z.object({
  title: z.string().min(4, "Title is required"),
  location: z.string().min(4, "Location is required"),
  landArea: z.string().optional(),
  floorArea: z.string().optional(),
  bedRooms: z.number().int().optional(),
  bathRooms: z.number().int().optional(),
  description: z.string().optional(),
  price: z
    .number()
    .min(0, "Price is required")
    .refine((val) => val !== undefined, {
      message: "Price is required",
    }),
  status: z.boolean(),
  propertyType: z.string().min(1, "Property type is required"),
  owner: z.string().min(1, "Owner is required"),
});

type ListingFormValues = z.infer<typeof listingFormSchema>;

interface EditListingFormProps {
  listing: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditListingForm({
  listing,
  isOpen,
  onClose,
}: EditListingFormProps) {
  const {user} = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      title: "",
      location: "",
      landArea: "",
      floorArea: "",
      bedRooms: undefined,
      bathRooms: undefined,
      description: "",
      price: undefined,
      status: true,
      propertyType: "",
      owner: "",
    },
  });

  useEffect(() => {
    if (listing) {
      form.reset({
        title: listing.title,
        location: listing.location,
        landArea: listing.landArea || "",
        floorArea: listing.floorArea || "",
        bedRooms: listing.bedRooms,
        bathRooms: listing.bathRooms,
        description: listing.description || "",
        price: listing.price,
        status: listing.status,
        propertyType: listing.propertyType,
        owner: listing.owner,
      });
    }
  }, [listing, form]);

  const {mutate: updateListing, isPending} = useUpdateListing();
  const queryClient = useQueryClient();

  async function onSubmit(data: ListingFormValues) {
    function addSqm(val?: string) {
      if (!val) return undefined;
      return val.trim().endsWith("sqm") ? val.trim() : val.trim() + " sqm";
    }
    const payload = {
      ...data,
      landArea: addSqm(data.landArea),
      floorArea: addSqm(data.floorArea),
      bedRooms: data.bedRooms ? Number(data.bedRooms) : undefined,
      bathRooms: data.bathRooms ? Number(data.bathRooms) : undefined,
      price: Number(data.price),
      creator: user?.email,
    };

    updateListing(
      {id: listing.id, data: payload},
      {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ["getAllListings"]});
          onClose();
          toast.success("Listing updated successfully");
        },
        onError: (error) => {
          console.error(error);
          toast.error("Failed to update listing");
        },
      }
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto [&>button]:cursor-pointer">
        <DialogHeader>
          <DialogTitle className="text-center">Edit Listing</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <FormField
                control={form.control}
                name="title"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter listing title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="propertyType"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Property Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="House" className="cursor-pointer">
                          House
                        </SelectItem>
                        <SelectItem
                          value="House with Lot"
                          className="cursor-pointer">
                          House with Lot
                        </SelectItem>
                        <SelectItem
                          value="Apartment"
                          className="cursor-pointer">
                          Apartment
                        </SelectItem>
                        <SelectItem value="Condo" className="cursor-pointer">
                          Condominium
                        </SelectItem>
                        <SelectItem value="Land" className="cursor-pointer">
                          Land
                        </SelectItem>
                        <SelectItem
                          value="Townhouse"
                          className="cursor-pointer">
                          Townhouse
                        </SelectItem>
                        <SelectItem
                          value="Commercial"
                          className="cursor-pointer">
                          Commercial
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter detailed description of the property"
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Location and Price Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Location & Price</h3>
              <FormField
                control={form.control}
                name="location"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter property location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>
                      Price
                      <span className="text-xs text-gray-500">
                        (No need to include commas or periods)
                      </span>
                    </FormLabel>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ₱
                      </span>
                      <input
                        type="number"
                        inputMode="numeric"
                        placeholder="0"
                        className="pl-8 pr-12 w-full border rounded h-10"
                        value={field.value === undefined ? "" : field.value}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value) || value === "") {
                            field.onChange(
                              value === "" ? undefined : Number(value)
                            );
                          }
                        }}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none select-none">
                        .00
                      </span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Property Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Property Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="landArea"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Land Area (sqm)</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="floorArea"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Floor Area (sqm)</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bedRooms"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Bedrooms</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bathRooms"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Bathrooms</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Additional Information</h3>
              <FormField
                control={form.control}
                name="owner"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Owner</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter owner's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({field}) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Active Status</FormLabel>
                      <div className="text-sm text-muted-foreground">
                        Set whether this listing is active or not
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        className="cursor-pointer"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                className="flex-1 cursor-pointer"
                disabled={isPending}>
                {isPending ? "Updating..." : "Update Listing"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 cursor-pointer">
                Cancel
              </Button>
            </div>
            {isPending && <Loader />}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

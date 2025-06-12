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
import useCreateListing from "@/hooks/listings/useCreateListing";
import useUploadListingImage from "@/hooks/listings/useUploadListingImage";
import {useAuth} from "@/context/auth-context";
import {useQueryClient} from "@tanstack/react-query";
import {useRef, useState} from "react";
import {ImagePlus, X} from "lucide-react";
import {toast} from "sonner";
import Loader from "../layout/loader";

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

export default function CreateListingForm() {
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
  const {mutate: createListing, isPending} = useCreateListing();
  const {mutate: uploadImages, isPending: isUploading} =
    useUploadListingImage();
  const queryClient = useQueryClient();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const maxFiles = 10;
    const maxFileSize = 8 * 1024 * 1024;

    const validFiles = files.slice(0, maxFiles).filter((file) => {
      if (file.size > maxFileSize) {
        toast.error(`File ${file.name} is too large: ${file.size} bytes`);
        return false;
      }
      return true;
    });

    const newPreviewUrls: string[] = [];
    for (const file of validFiles) {
      try {
        const url = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        newPreviewUrls.push(url);
      } catch (error) {
        console.error(`Error reading ${file.name} for preview:`, error);
      }
    }

    setPreviewUrls(newPreviewUrls);
  };

  const removeFile = (index: number) => {
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  async function onSubmit(data: ListingFormValues) {
    const files = fileInputRef.current?.files;
    const payload = {
      ...data,
      landArea: data.landArea ? String(data.landArea) : undefined,
      floorArea: data.floorArea ? String(data.floorArea) : undefined,
      bedRooms: data.bedRooms ? Number(data.bedRooms) : undefined,
      bathRooms: data.bathRooms ? Number(data.bathRooms) : undefined,
      price: Number(data.price),
      images: [],
      creator: user?.email,
    };

    createListing(payload, {
      onSuccess: (response) => {
        if (files && files.length > 0 && response.data?.listingId) {
          uploadImages(
            {
              listingId: response.data.listingId,
              files: Array.from(files),
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ["getAllListings"]});
                form.reset();
                setPreviewUrls([]);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
                toast.success("Listing created successfully");
              },
            }
          );
        } else {
          queryClient.invalidateQueries({queryKey: ["getAllListings"]});
          form.reset();
          toast.success("Listing created successfully");
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error("Failed to create listing");
      },
    });
  }

  return (
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
                    <SelectItem value="house" className="cursor-pointer">
                      House
                    </SelectItem>
                    <SelectItem value="apartment" className="cursor-pointer">
                      Apartment
                    </SelectItem>
                    <SelectItem value="condo" className="cursor-pointer">
                      Condominium
                    </SelectItem>
                    <SelectItem value="land" className="cursor-pointer">
                      Land
                    </SelectItem>
                    <SelectItem value="commercial" className="cursor-pointer">
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
                    <Input type="number" placeholder="0" {...field} />
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
                    <Input type="number" placeholder="0" {...field} />
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
                      onChange={(e) => field.onChange(Number(e.target.value))}
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
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* img upload */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Property Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ImagePlus className="w-8 h-8 mb-2 text-gray-500" />
                <p className="text-sm text-gray-500">Click to upload</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
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
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Creating..." : "Create Listing"}
        </Button>
        {(isPending || isUploading) && (
          <>
            <Loader />
          </>
        )}
      </form>
    </Form>
  );
}

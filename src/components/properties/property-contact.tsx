"use client";

import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {motion} from "framer-motion";
import {Mail, Phone, Send} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
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
import {fadeIn} from "@/lib/motion";
import useSendEmail from "@/hooks/smtp/useSendEmail";
import {toast} from "sonner";
import Loader from "@/components/layout/loader";

const contactFormSchema = z.object({
  name: z.string().min(2, {message: "Name must be at least 2 characters"}),
  email: z.string().email({message: "Please enter a valid email address"}),
  phone: z.string().optional(),
  subject: z
    .string()
    .min(5, {message: "Subject must be at least 5 characters"}),
  message: z
    .string()
    .min(10, {message: "Message must be at least 10 characters"}),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface PropertyContactProps {
  owner: string;
  propertyTitle: string;
}

export default function PropertyContact({
  owner,
  propertyTitle,
}: PropertyContactProps) {
  const {mutate: sendEmail, isPending} = useSendEmail();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: `Interested in ${propertyTitle}`,
      message: `I'm interested in ${propertyTitle}. Please contact me with more information.`,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    await sendEmail(data, {
      onSuccess: () => {
        toast.success("Email sent successfully");
      },
      onError: () => {
        toast.error("Failed to send email");
      },
    });
    form.reset({
      name: "",
      email: "",
      phone: "",
      message: `I'm interested in ${propertyTitle}. Please contact me with more information.`,
    });
  };

  return (
    <motion.div {...fadeIn("left")} viewport={{once: true}}>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Contact Agent</CardTitle>
        </CardHeader>

        <CardContent className="pb-4">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={"/femaleAvatar.png"}
                alt={"Interasian Realty Services Inc."}
              />
              {/* <AvatarFallback>{initials}</AvatarFallback> */}
            </Avatar>

            <div>
              <h3 className="font-medium text-lg">Connie Tangpuz</h3>
              <div className="text-sm text-muted-foreground space-y-1 mt-1">
                <div className="flex items-center gap-3">
                  <Mail className="h-3.5 w-3.5" />
                  <span>connietangpuziars@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-3.5 w-3.5" />
                  <span>+639176777190</span>
                </div>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Phone (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="09xxxxxxxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your message"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isPending}>
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

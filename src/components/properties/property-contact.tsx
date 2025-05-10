"use client";

import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {motion} from "framer-motion";
import {Mail, Phone, Send} from "lucide-react";
import {Agent} from "@/lib/types";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
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
// import {useToast} from "@/hooks/use-toast";
import {fadeIn} from "@/lib/motion";

const contactFormSchema = z.object({
  name: z.string().min(2, {message: "Name must be at least 2 characters"}),
  email: z.string().email({message: "Please enter a valid email address"}),
  phone: z.string().optional(),
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
  // const {toast} = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: `I'm interested in ${propertyTitle}. Please contact me with more information.`,
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    setIsSubmitting(true);

    // In a real app, this would send data to your API
    setTimeout(() => {
      console.log("Contact form data:", data);

      // toast({
      //   title: "Message Sent",
      //   description: `Your message has been sent to ${agent.name}. They will contact you shortly.`,
      // });

      form.reset({
        name: "",
        email: "",
        phone: "",
        message: `I'm interested in ${propertyTitle}. Please contact me with more information.`,
      });

      setIsSubmitting(false);
    }, 1000);
  };

  // const initials = owner.name
  //   .split(" ")
  //   .map((name) => name[0])
  //   .join("")
  //   .toUpperCase();

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
                src={"/avatar.png"}
                alt={"Interasian Realty Services Inc."}
              />
              {/* <AvatarFallback>{initials}</AvatarFallback> */}
            </Avatar>

            <div>
              <h3 className="font-medium text-lg">{owner}</h3>
              <div className="text-sm text-muted-foreground space-y-1 mt-1">
                <div className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" />
                  {/* <span>{agent.email}</span> */}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" />
                  {/* <span>{agent.phone}</span> */}
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
                      <Input placeholder="(xxx) xxx-xxxx" {...field} />
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

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
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

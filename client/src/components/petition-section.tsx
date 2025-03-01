import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const petitionFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City/Town is required"),
  zip: z.string().min(5, "Valid zip code is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  message: z.string().optional(),
});

type PetitionFormData = z.infer<typeof petitionFormSchema>;

export default function PetitionSection() {
  const { toast } = useToast();

  const form = useForm<PetitionFormData>({
    resolver: zodResolver(petitionFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      streetAddress: "",
      city: "",
      zip: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: PetitionFormData) => {
    console.log(data);
    toast({
      title: "Success",
      description: "Thank you for signing the petition!",
    });
    form.reset();
  };

  return (
    <div className="section-content">
      <h2 className="heading-2">Recall Karen Bass</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="form-fields">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">First Name</FormLabel>
                <FormControl>
                  <Input className="form-input" {...field} />
                </FormControl>
                <FormMessage className="form-message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Last Name</FormLabel>
                <FormControl>
                  <Input className="form-input" {...field} />
                </FormControl>
                <FormMessage className="form-message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="streetAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Address - Street</FormLabel>
                <FormControl>
                  <Input className="form-input" {...field} />
                </FormControl>
                <FormMessage className="form-message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">City/Town</FormLabel>
                <FormControl>
                  <Input className="form-input" {...field} />
                </FormControl>
                <FormMessage className="form-message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">ZIP</FormLabel>
                <FormControl>
                  <Input className="form-input" {...field} />
                </FormControl>
                <FormMessage className="form-message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Email</FormLabel>
                <FormControl>
                  <Input className="form-input" type="email" {...field} />
                </FormControl>
                <FormMessage className="form-message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Phone</FormLabel>
                <FormControl>
                  <Input className="form-input" type="tel" {...field} />
                </FormControl>
                <FormMessage className="form-message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Your Message Here</FormLabel>
                <FormControl>
                  <Textarea className="form-input" {...field} rows={4} />
                </FormControl>
                <FormMessage className="form-message" />
              </FormItem>
            )}
          />

          <Button type="submit" className="form-submit">
            Sign Petition
          </Button>
        </form>
      </Form>
    </div>
  );
}
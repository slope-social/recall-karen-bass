import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsertPetition, insertPetitionSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function PetitionSection() {
  const { toast } = useToast();

  const form = useForm<InsertPetition>({
    resolver: zodResolver(insertPetitionSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      street: "",
      city: "",
      zip: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: InsertPetition) =>
      apiRequest("POST", "/api/petitions", data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Thank you for signing the petition!",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="section-content">
      <h2 className="heading-2">Petition to Recall Karen Bass</h2>
      <p className="text-body text-center">
        Complete the petition here to indicate your disgust and willingness to support a recall of the current Los Angeles Mayor Karen Bass.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="form-fields">
          {/* First name and last name on the same line */}
          <div data-component-name="div" className="grid grid-cols-2 gap-4 mb-4">
            <FormItem>
              <FormLabel className="form-label">First Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter first name" 
                  {...form.register("firstName")}
                  className="form-input"
                />
              </FormControl>
              <FormMessage className="form-message" />
            </FormItem>
            <FormItem>
              <FormLabel className="form-label">Last Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter last name" 
                  {...form.register("lastName")}
                  className="form-input"
                />
              </FormControl>
              <FormMessage className="form-message" />
            </FormItem>
          </div>

          {/* Street address as full width */}
          <FormItem className="mb-4">
            <FormLabel className="form-label">Address - Street</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter street address" 
                {...form.register("street")}
                className="form-input"
              />
            </FormControl>
            <FormMessage className="form-message" />
          </FormItem>

          {/* City and Zip on the same line */}
          <div data-component-name="div" className="grid grid-cols-2 gap-4 mb-4">
            <FormItem>
              <FormLabel className="form-label">City/Town</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter city" 
                  {...form.register("city")}
                  className="form-input"
                />
              </FormControl>
              <FormMessage className="form-message" />
            </FormItem>
            <FormItem>
              <FormLabel className="form-label">ZIP Code</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter ZIP code" 
                  {...form.register("zip")}
                  className="form-input"
                />
              </FormControl>
              <FormMessage className="form-message" />
            </FormItem>
          </div>

          {/* Email field on its own line */}
          <FormItem className="mb-4">
            <FormLabel className="form-label">Email</FormLabel>
            <FormControl>
              <Input 
                type="email" 
                placeholder="Enter email" 
                {...form.register("email")}
                className="form-input"
              />
            </FormControl>
            <FormMessage className="form-message" />
          </FormItem>

          {/* Phone field */}
          <FormItem className="mb-4">
            <FormLabel className="form-label">Phone (Optional)</FormLabel>
            <FormControl>
              <Input 
                type="tel" 
                placeholder="Enter phone number" 
                {...form.register("phone")}
                className="form-input"
              />
            </FormControl>
            <FormMessage className="form-message" />
          </FormItem>

          {/* Message field */}
          <FormItem className="mb-4">
            <FormLabel className="form-label">Your Message (Optional)</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Your message here"
                {...form.register("message")}
                className="form-input"
                rows={4}
              />
            </FormControl>
            <FormMessage className="form-message" />
          </FormItem>

          <Button type="submit" className="form-submit">
            Sign Petition
          </Button>
        </form>
      </Form>
    </div>
  );
}
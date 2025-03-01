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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">First Name</FormLabel>
                  <FormControl>
                    <Input className="form-input" placeholder="Enter first name" {...field} />
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
                    <Input className="form-input" placeholder="Enter last name" {...field} />
                  </FormControl>
                  <FormMessage className="form-message" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Address - Street</FormLabel>
                <FormControl>
                  <Input className="form-input" placeholder="Enter street address" {...field} />
                </FormControl>
                <FormMessage className="form-message" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">City/Town</FormLabel>
                  <FormControl>
                    <Input className="form-input" placeholder="Enter city" {...field} />
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
                  <FormLabel className="form-label">ZIP Code</FormLabel>
                  <FormControl>
                    <Input className="form-input" placeholder="Enter ZIP code" {...field} />
                  </FormControl>
                  <FormMessage className="form-message" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Email</FormLabel>
                  <FormControl>
                    <Input className="form-input" type="email" placeholder="Enter email" {...field} />
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
                  <FormLabel className="form-label">Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input className="form-input" type="tel" placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage className="form-message" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Your Message (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    className="form-input" 
                    placeholder="Your message here"
                    {...field}
                    rows={4}
                  />
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
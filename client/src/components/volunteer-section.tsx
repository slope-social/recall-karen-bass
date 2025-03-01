import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsertVolunteer, insertVolunteerSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function VolunteerSection() {
  const { toast } = useToast();

  const form = useForm<InsertVolunteer>({
    resolver: zodResolver(insertVolunteerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      zip: "",
      email: "",
      phone: "",
      phoneBank: false,
      gatherSignatures: false,
      attendEvents: false,
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: InsertVolunteer) =>
      apiRequest("POST", "/api/volunteers", data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Thank you for volunteering!",
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
      <h2 className="heading-2">Join Our Movement</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="form-fields">
          {/* First name and last name on the same line */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">First Name*</FormLabel>
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
                  <FormLabel className="form-label">Last Name*</FormLabel>
                  <FormControl>
                    <Input className="form-input" placeholder="Enter last name" {...field} />
                  </FormControl>
                  <FormMessage className="form-message" />
                </FormItem>
              )}
            />
          </div>

          {/* ZIP and Email on the same line */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">ZIP Code*</FormLabel>
                  <FormControl>
                    <Input className="form-input" placeholder="Your ZIP code" {...field} />
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
                  <FormLabel className="form-label">Email*</FormLabel>
                  <FormControl>
                    <Input className="form-input" type="email" placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage className="form-message" />
                </FormItem>
              )}
            />
          </div>

          {/* Phone field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="form-label">Phone</FormLabel>
                <FormControl>
                  <Input className="form-input" type="tel" placeholder="Enter phone number" {...field} />
                </FormControl>
                <FormMessage className="form-message" />
              </FormItem>
            )}
          />

          {/* Checkboxes in a row */}
          <div className="mb-4">
            <h3 className="form-label mb-4">I am available to:</h3>
            <div className="flex flex-row items-center gap-4">
              <FormField
                control={form.control}
                name="phoneBank"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal text-sm">Phone Bank</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gatherSignatures"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal text-sm">Gather Signatures</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="attendEvents"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal text-sm">Attend Events</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Message field */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="form-label">Message</FormLabel>
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
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
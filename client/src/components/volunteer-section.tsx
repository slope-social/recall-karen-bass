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
          <div data-component-name="div" className="grid grid-cols-2 gap-4 mb-4">
            <FormItem>
              <FormLabel className="form-label">First Name*</FormLabel>
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
              <FormLabel className="form-label">Last Name*</FormLabel>
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

          {/* ZIP code and Email on the same line */}
          <div data-component-name="div" className="grid grid-cols-2 gap-4 mb-4">
            <FormItem>
              <FormLabel className="form-label">ZIP Code*</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your ZIP code" 
                  {...form.register("zip")}
                  className="form-input"
                />
              </FormControl>
              <FormMessage className="form-message" />
            </FormItem>
            <FormItem>
              <FormLabel className="form-label">Email*</FormLabel>
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
          </div>

          {/* Phone field */}
          <FormItem className="mb-4">
            <FormLabel className="form-label">Phone</FormLabel>
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

          {/* Checkboxes in a row */}
          <div className="mb-4">
            <h3 className="form-label">I am available to:</h3>
            <div className="flex flex-row items-center gap-8 mt-2">
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={form.watch("phoneBank")}
                    onCheckedChange={(checked) => form.setValue("phoneBank", checked)}
                  />
                </FormControl>
                <FormLabel className="font-normal text-sm">Phone Bank</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={form.watch("gatherSignatures")}
                    onCheckedChange={(checked) => form.setValue("gatherSignatures", checked)}
                  />
                </FormControl>
                <FormLabel className="font-normal text-sm">Gather Signatures</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={form.watch("attendEvents")}
                    onCheckedChange={(checked) => form.setValue("attendEvents", checked)}
                  />
                </FormControl>
                <FormLabel className="font-normal text-sm">Attend Events</FormLabel>
              </FormItem>
            </div>
          </div>

          {/* Message field */}
          <FormItem className="mb-4">
            <FormLabel className="form-label">Message</FormLabel>
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
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
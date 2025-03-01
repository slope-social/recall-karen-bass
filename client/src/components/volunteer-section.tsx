import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const volunteerFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  zipCode: z.string().min(5, "Valid zip code is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  availability: z.array(z.string()).min(1, "Please select at least one option"),
  message: z.string().optional(),
});

type VolunteerFormData = z.infer<typeof volunteerFormSchema>;

const availabilityOptions = [
  { id: "phoneBank", label: "Phone Bank" },
  { id: "signatures", label: "Gather Signatures" },
  { id: "events", label: "Attend Events" },
];

export default function VolunteerSection() {
  const { toast } = useToast();
  const form = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      zipCode: "",
      email: "",
      phone: "",
      availability: [],
      message: "",
    },
  });

  const onSubmit = (data: VolunteerFormData) => {
    console.log(data);
    toast({
      title: "Success",
      description: "Thank you for volunteering! We will contact you soon.",
    });
    form.reset();
  };

  return (
    <div className="section-content">
      <h2 className="heading-2">Join Our Community</h2>
      <div className="card-grid">
        <Card>
          <CardContent className="form-content">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="form-fields">
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="form-label">First Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter first name" className="form-input" {...field} />
                        </FormControl>
                        <FormMessage className="form-message" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="form-label">Last Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter last name" className="form-input" {...field} />
                        </FormControl>
                        <FormMessage className="form-message" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label">Email*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email" type="email" className="form-input" {...field} />
                      </FormControl>
                      <FormMessage className="form-message" />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="form-label">Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone" type="tel" className="form-input" {...field} />
                        </FormControl>
                        <FormMessage className="form-message" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="form-label">Zip Code*</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Zip Code" className="form-input" {...field} />
                        </FormControl>
                        <FormMessage className="form-message" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormItem>
                  <FormLabel className="form-label">I am available to:</FormLabel>
                  <div className="flex items-center gap-6">
                    {availabilityOptions.map((option) => (
                      <FormField
                        key={option.id}
                        control={form.control}
                        name="availability"
                        render={({ field }) => (
                          <FormItem key={option.id} className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option.id)}
                                onCheckedChange={(checked) => {
                                  const updatedValue = checked
                                    ? [...(field.value || []), option.id]
                                    : field.value?.filter((value) => value !== option.id) || [];
                                  field.onChange(updatedValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{option.label}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage className="form-message" />
                </FormItem>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label">Message</FormLabel>
                      <FormControl>
                        <Textarea className="form-input" {...field} />
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
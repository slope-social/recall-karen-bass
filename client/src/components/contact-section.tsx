import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsertContact, insertContactSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const { toast } = useToast();
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: InsertContact) => apiRequest("POST", "/api/contacts", data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Thank you for your message. We'll get back to you soon.",
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
      <h2 className="heading-2">Contact Us</h2>
      <Card>
        <CardContent className="form-content">
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="form-fields">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="form-label">Name</FormLabel>
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
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="form-label">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        className="form-input"
                        {...field}
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage className="form-message" />
                  </FormItem>
                )}
              />
              <Button type="submit" className="form-submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
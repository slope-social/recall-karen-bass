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
    <div className="container mx-auto py-[8vmin] px-[4vmin] bg-muted/30">
      <div className="max-w-[80vmin] mx-auto">
        <h2 className="text-[4vmin] font-bold mb-[4vmin]">Contact Us</h2>
        <Card>
          <CardContent className="p-[3vmin]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-[2vmin]">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[1.8vmin]">Name</FormLabel>
                      <FormControl>
                        <Input className="text-[1.8vmin]" {...field} />
                      </FormControl>
                      <FormMessage className="text-[1.6vmin]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[1.8vmin]">Email</FormLabel>
                      <FormControl>
                        <Input className="text-[1.8vmin]" type="email" {...field} />
                      </FormControl>
                      <FormMessage className="text-[1.6vmin]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[1.8vmin]">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          className="text-[1.8vmin]" 
                          {...field}
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage className="text-[1.6vmin]" />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full text-[1.8vmin]" disabled={mutation.isPending}>
                  {mutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsertPetition, insertPetitionSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PetitionForm({ open, onOpenChange }: Props) {
  const { toast } = useToast();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
    } else {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const form = useForm<InsertPetition>({
    resolver: zodResolver(insertPetitionSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      location: "",
      zip: "",
      phone: "",
      comment: "",
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
      onOpenChange(false);
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
    <>
      <div
        className={`petition-background ${open ? "active" : ""} ${isTransitioning ? "" : "hidden"}`}
        style={{ backgroundImage: 'url("/assets/RKB-FB-Cover.png")' }}
      />
      <div
        className={`petition-overlay ${open ? "active" : ""} ${isTransitioning ? "" : "hidden"}`}
      />

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="form-dialog">
          <DialogHeader>
            <DialogTitle className="form-title">Sign the Petition</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
              className="form-fields"
            >
              {/* First name and last name on the same line */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label">First Name</FormLabel>
                      <FormControl>
                        <Input
                          className="form-input"
                          placeholder="Enter first name"
                          {...field}
                        />
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
                        <Input
                          className="form-input"
                          placeholder="Enter last name"
                          {...field}
                        />
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
                  <FormItem className="mb-4">
                    <FormLabel className="form-label">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="form-input"
                        type="email"
                        placeholder="Enter email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="form-message" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="form-label">Location</FormLabel>
                    <FormControl>
                      <Input
                        className="form-input"
                        placeholder="Enter location"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="form-message" />
                  </FormItem>
                )}
              />

              {/* Zip code and phone on the same line */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="zip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label">ZIP Code</FormLabel>
                      <FormControl>
                        <Input
                          className="form-input"
                          placeholder="Enter ZIP code"
                          {...field}
                        />
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
                      <FormLabel className="form-label">
                        Phone (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="form-input"
                          type="tel"
                          placeholder="Enter phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="form-message" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="form-label">
                      Comment (Optional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="form-input"
                        placeholder="Your comment here"
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
        </DialogContent>
      </Dialog>
    </>
  );
}

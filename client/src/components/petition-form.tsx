import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
      name: "",
      email: "",
      location: "",
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
        className={`petition-background ${open ? 'active' : ''} ${isTransitioning ? '' : 'hidden'}`}
        style={{ backgroundImage: 'url("/assets/RKB-FB-Cover.png")' }}
      />
      <div 
        className={`petition-overlay ${open ? 'active' : ''} ${isTransitioning ? '' : 'hidden'}`}
      />

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="form-dialog">
          <DialogHeader>
            <DialogTitle className="form-title">Sign the Petition</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="form-fields">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="form-label">Full Name</FormLabel>
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
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="form-label">Location</FormLabel>
                    <FormControl>
                      <Input className="form-input" {...field} />
                    </FormControl>
                    <FormMessage className="form-message" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="form-label">Comment (Optional)</FormLabel>
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
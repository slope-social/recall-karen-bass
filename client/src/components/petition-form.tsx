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
      // Delay the transition start slightly to avoid the flash
      requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
    } else {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 700); // Match this with CSS transition duration
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
        <DialogContent className="sm:max-w-[90vmin] z-50">
          <DialogHeader>
            <DialogTitle className="text-[3vmin] font-bold">Sign the Petition</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-[2vmin]">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[1.8vmin]">Full Name</FormLabel>
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
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[1.8vmin]">Location</FormLabel>
                    <FormControl>
                      <Input className="text-[1.8vmin]" {...field} />
                    </FormControl>
                    <FormMessage className="text-[1.6vmin]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[1.8vmin]">Comment (Optional)</FormLabel>
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
              <Button type="submit" className="w-full text-[1.8vmin]">
                Sign Petition
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
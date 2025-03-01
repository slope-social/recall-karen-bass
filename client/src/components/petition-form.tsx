import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const petitionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  location: z.string().min(1, "Location is required"),
  comment: z.string().optional(),
});

type PetitionFormData = z.infer<typeof petitionSchema>;

export default function PetitionForm({ open, onOpenChange }: Props) {
  const form = useForm<PetitionFormData>({
    resolver: zodResolver(petitionSchema),
    defaultValues: {
      name: "",
      email: "",
      location: "",
      comment: "",
    },
  });

  const onSubmit = (data: PetitionFormData) => {
    console.log(data);
    // TODO: Handle petition submission
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[90vmin]">
        <DialogHeader>
          <DialogTitle className="text-[3vmin] font-bold">Sign the Petition</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[2vmin]">
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
  );
}

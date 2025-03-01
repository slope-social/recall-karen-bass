import { Button } from "@/components/ui/button";

interface Props {
  onContactClick: () => void;
}

export default function HeroSection({ onContactClick }: Props) {
  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 py-20 lg:px-20">
      <div className="flex flex-col justify-center space-y-8">
        <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Create Amazing Digital Experiences
        </h1>
        <p className="text-xl text-muted-foreground">
          We help businesses transform their digital presence with cutting-edge web solutions and innovative design strategies.
        </p>
        <Button
          size="lg"
          className="w-fit text-lg"
          onClick={onContactClick}
        >
          Get Started
        </Button>
      </div>
      <div className="hidden lg:flex items-center justify-center">
        <div className="w-full max-w-md aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-purple-600/20 backdrop-blur-3xl" />
      </div>
    </section>
  );
}

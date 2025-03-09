
import { ArrowRight, Heart, Calendar, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className }: HeroSectionProps) => {
  return (
    <div className={cn("relative min-h-screen flex flex-col justify-center overflow-hidden", className)}>
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-blood-light opacity-50 z-0" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-24 h-24 rounded-full bg-blood/10 drop-animation"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6 pt-20 md:pt-0">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-6 animate-fade-up lg:pb-10">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-blood/10 px-3 py-1 text-sm text-blood mb-4 animate-fade-in">
                Give the gift of life
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                Every donation is a step towards
                <span className="text-blood"> saving lives</span>
              </h1>
              <p className="text-base md:text-xl text-muted-foreground max-w-[600px] text-balance mt-4">
                Join our community of heroes who make a difference. Your donation can help save up to three lives.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button size="lg" className="group transition-all" asChild>
                <Link to="/donation-form">
                  Donate Blood
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/register">Join Community</Link>
              </Button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative w-full aspect-square md:aspect-auto md:h-[500px] bg-blood-light/40 rounded-full blur-3xl absolute z-0 animate-pulse-subtle" />
            <div className="relative z-10 grid grid-cols-2 gap-6 md:gap-8">
              <div className="glass-card flex flex-col justify-center items-center text-center animate-fade-up" style={{ animationDelay: "0.1s" }}>
                <Heart className="w-12 h-12 text-blood mb-4" />
                <h3 className="text-xl font-medium">Save Lives</h3>
                <p className="text-sm text-muted-foreground mt-2">One donation can save up to three lives</p>
              </div>
              <div className="glass-card flex flex-col justify-center items-center text-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <Calendar className="w-12 h-12 text-blood mb-4" />
                <h3 className="text-xl font-medium">Easy Scheduling</h3>
                <p className="text-sm text-muted-foreground mt-2">Book your appointment at your convenience</p>
              </div>
              <div className="glass-card flex flex-col justify-center items-center text-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
                <Clock className="w-12 h-12 text-blood mb-4" />
                <h3 className="text-xl font-medium">Just 30 Minutes</h3>
                <p className="text-sm text-muted-foreground mt-2">The donation process is quick and simple</p>
              </div>
              <div className="glass-card flex flex-col justify-center items-center text-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
                <Award className="w-12 h-12 text-blood mb-4" />
                <h3 className="text-xl font-medium">Join Heroes</h3>
                <p className="text-sm text-muted-foreground mt-2">Be part of our lifesaving community</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

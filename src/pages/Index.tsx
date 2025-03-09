
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Droplet, Calendar, Clock, HeartPulse, Users, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/ui/HeroSection";
import InfoCard from "@/components/ui/InfoCard";
import NavBar from "@/components/NavBar";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />

      {/* Hero Section */}
      <HeroSection />

      {/* Eligibility Section */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Donating Blood Matters</h2>
            <p className="text-muted-foreground">
              Your donation can make a significant impact in someone's life. Blood is needed for surgeries, 
              cancer treatments, chronic illnesses, and traumatic injuries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <InfoCard 
              title="Who Can Donate?" 
              description="Generally, donors must be at least 17 years old, weigh at least 110 pounds, and be in good health."
              icon={Users}
            />
            <InfoCard 
              title="The Process" 
              description="The donation takes about 10-15 minutes, while the entire process including registration takes about an hour."
              icon={Clock}
            />
            <InfoCard 
              title="Donation Frequency" 
              description="You can donate whole blood every 8 weeks, platelets every 7 days, and plasma every 28 days."
              icon={Calendar}
            />
            <InfoCard 
              title="Blood Types" 
              description="There are eight blood types: A+, A-, B+, B-, AB+, AB-, O+, and O-. Type O negative is the universal donor."
              icon={Droplet}
            />
            <InfoCard 
              title="Health Benefits" 
              description="Donating blood can reveal potential health problems, reduce iron levels, and may lower risk of heart disease."
              icon={HeartPulse}
            />
            <InfoCard 
              title="Impact" 
              description="Every 2 seconds someone needs blood. A single car accident victim can require up to 100 units of blood."
              icon={Activity}
            />
          </div>

          <div className="mt-16 text-center">
            <Button size="lg" className="group" asChild>
              <Link to="/donation-form">
                Schedule a Donation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 px-6 bg-blood-light/30">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">
              Donating blood is a simple and straightforward process that takes less than an hour of your time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Register",
                description: "Create an account and complete a brief health questionnaire."
              },
              {
                step: "2",
                title: "Schedule",
                description: "Choose a convenient time and location for your donation."
              },
              {
                step: "3",
                title: "Donate",
                description: "The actual donation process only takes about 10 minutes."
              },
              {
                step: "4",
                title: "Save Lives",
                description: "Your donation can help save up to three lives."
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="glass-card h-full">
                  <div className="absolute -top-5 -left-5 w-12 h-12 bg-blood text-white rounded-full flex items-center justify-center font-bold text-xl">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 mt-6">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-blood text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Join our community of blood donors and help save lives. It only takes a few minutes to schedule your donation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blood hover:bg-white/90" asChild>
              <Link to="/donation-form">Schedule Donation</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/register">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Droplet className="h-6 w-6 text-blood mr-2" />
              <span className="text-xl font-semibold">RedConnect</span>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <Link to="/" className="text-muted-foreground hover:text-blood transition-colors">Home</Link>
              <Link to="/login" className="text-muted-foreground hover:text-blood transition-colors">Login</Link>
              <Link to="/register" className="text-muted-foreground hover:text-blood transition-colors">Register</Link>
              <Link to="/donation-form" className="text-muted-foreground hover:text-blood transition-colors">Donate</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} RedConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

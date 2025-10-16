import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Shield, Clock, CreditCard } from "lucide-react";
import heroImage from "@/assets/railway-hero.jpg";

const Index = () => {
  const features = [
    {
      icon: Train,
      title: "Wide Network",
      description: "Access to trains across India with real-time availability"
    },
    {
      icon: Shield,
      title: "Secure Booking",
      description: "Your transactions are safe with our encrypted payment system"
    },
    {
      icon: Clock,
      title: "Quick & Easy",
      description: "Book your tickets in minutes with our streamlined process"
    },
    {
      icon: CreditCard,
      title: "Multiple Payment Options",
      description: "Pay using various methods including cards, UPI, and wallets"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>
        
        <div className="relative container py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in">
              Book Your Railway Journey
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
              Fast, secure, and convenient train ticket booking across India
            </p>
          </div>
          
          <SearchForm />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose RailBook?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience hassle-free railway booking with our modern platform
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Popular Routes
            </h2>
            <p className="text-muted-foreground text-lg">
              Book tickets for the most traveled routes
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { from: "New Delhi", to: "Mumbai" },
              { from: "New Delhi", to: "Kolkata" },
              { from: "Mumbai", to: "Bengaluru" },
              { from: "Chennai", to: "Hyderabad" },
              { from: "Delhi", to: "Jaipur" },
              { from: "Pune", to: "Goa" }
            ].map((route, index) => (
              <Card key={index} className="hover:shadow-[var(--shadow-card)] transition-shadow cursor-pointer">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{route.from}</span>
                    <Train className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{route.to}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

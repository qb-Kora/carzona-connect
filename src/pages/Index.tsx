import Header from "@/components/carzona/Header";
import Hero from "@/components/carzona/Hero";
import Services from "@/components/carzona/Services";
import Stats from "@/components/carzona/Stats";
import WhyUs from "@/components/carzona/WhyUs";
import Reviews from "@/components/carzona/Reviews";
import Contact from "@/components/carzona/Contact";
import Footer from "@/components/carzona/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <Stats />
      <WhyUs />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;

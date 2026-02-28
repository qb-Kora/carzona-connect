import Header from "@/components/carzona/Header";
import Hero from "@/components/carzona/Hero";
import TrustBar from "@/components/carzona/TrustBar";
import WhyUs from "@/components/carzona/WhyUs";
import Services from "@/components/carzona/Services";
import Reviews from "@/components/carzona/Reviews";
import Gallery from "@/components/carzona/Gallery";
import ServiceArea from "@/components/carzona/ServiceArea";
import FAQ from "@/components/carzona/FAQ";
import Contact from "@/components/carzona/Contact";
import Footer from "@/components/carzona/Footer";
import MobileCTA from "@/components/carzona/MobileCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TrustBar />
      <WhyUs />
      <Services />
      <Reviews />
      <Gallery />
      <ServiceArea />
      <FAQ />
      <Contact />
      <Footer />
      <MobileCTA />
    </div>
  );
};

export default Index;

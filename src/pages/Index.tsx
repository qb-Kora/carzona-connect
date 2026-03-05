import Header from "@/components/carzona/Header";
import Hero from "@/components/carzona/Hero";
import TrustBar from "@/components/carzona/TrustBar";
import WhyUs from "@/components/carzona/WhyUs";
import Services from "@/components/carzona/Services";
import Reviews from "@/components/carzona/Reviews";
import Realizations from "@/components/carzona/Realizations";
import Gallery from "@/components/carzona/Gallery";
import ServiceArea from "@/components/carzona/ServiceArea";
import FAQ from "@/components/carzona/FAQ";
import CarCrashCTA from "@/components/carzona/CarCrashCTA";
import Contact from "@/components/carzona/Contact";
import LocalSEO from "@/components/carzona/LocalSEO";
import Footer from "@/components/carzona/Footer";
import MobileCTA from "@/components/carzona/MobileCTA";
import NeonDivider from "@/components/carzona/NeonDivider";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <Hero />
      <NeonDivider direction="top" />
      <TrustBar />
      <NeonDivider />
      <WhyUs />
      <NeonDivider />
      <Services />
      <NeonDivider />
      <Reviews />
      <NeonDivider />
      <Realizations />
      <NeonDivider />
      <Gallery />
      <NeonDivider />
      <ServiceArea />
      <NeonDivider />
      <FAQ />
      <NeonDivider />
      <Contact />
      <NeonDivider />
      <LocalSEO />
      <Footer />
      <MobileCTA />
      <CarCrashCTA />
    </div>
  );
};

export default Index;

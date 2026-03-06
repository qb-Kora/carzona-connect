import { lazy, Suspense } from "react";
import Header from "@/components/carzona/Header";
import Hero from "@/components/carzona/Hero";
import NeonDivider from "@/components/carzona/NeonDivider";

// Lazy load below-the-fold sections
const TrustBar = lazy(() => import("@/components/carzona/TrustBar"));
const WhyUs = lazy(() => import("@/components/carzona/WhyUs"));
const Services = lazy(() => import("@/components/carzona/Services"));
const Reviews = lazy(() => import("@/components/carzona/Reviews"));
const Realizations = lazy(() => import("@/components/carzona/Realizations"));
const Gallery = lazy(() => import("@/components/carzona/Gallery"));
const ServiceArea = lazy(() => import("@/components/carzona/ServiceArea"));
const FAQ = lazy(() => import("@/components/carzona/FAQ"));
const Contact = lazy(() => import("@/components/carzona/Contact"));
const LocalSEO = lazy(() => import("@/components/carzona/LocalSEO"));
const Footer = lazy(() => import("@/components/carzona/Footer"));
const MobileCTA = lazy(() => import("@/components/carzona/MobileCTA"));
const CarCrashCTA = lazy(() => import("@/components/carzona/CarCrashCTA"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <Hero />
      <Suspense fallback={null}>
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
        <NeonDivider />
        <Footer />
        <MobileCTA />
        <CarCrashCTA />
      </Suspense>
    </div>
  );
};

export default Index;
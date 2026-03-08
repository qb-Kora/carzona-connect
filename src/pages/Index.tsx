import { lazy, Suspense, useState, useCallback } from "react";
import Header from "@/components/carzona/Header";
import Hero from "@/components/carzona/Hero";
import NeonDivider from "@/components/carzona/NeonDivider";
import GarageDoorLoader from "@/components/carzona/GarageDoorLoader";

const SectionPlaceholder = ({ height = "h-96" }: { height?: string }) => (
  <div className={`${height} w-full bg-background`} />
);

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
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <GarageDoorLoader onComplete={handleLoaded} />}
      <div className="min-h-screen bg-background overflow-x-hidden grain">
      <Header />
      <Hero />
      <NeonDivider direction="top" />
      <Suspense fallback={<SectionPlaceholder />}>
        <TrustBar />
      </Suspense>
      <NeonDivider />
      <Suspense fallback={<SectionPlaceholder />}>
        <WhyUs />
      </Suspense>
      <NeonDivider />
      <Suspense fallback={<SectionPlaceholder />}>
        <Services />
      </Suspense>
      <NeonDivider />
      <Suspense fallback={<SectionPlaceholder />}>
        <Reviews />
      </Suspense>
      <NeonDivider />
      <Suspense fallback={<SectionPlaceholder />}>
        <Realizations />
      </Suspense>
      <NeonDivider />
      <Suspense fallback={<SectionPlaceholder />}>
        <Gallery />
      </Suspense>
      <NeonDivider />
      <Suspense fallback={<SectionPlaceholder />}>
        <ServiceArea />
      </Suspense>
      <NeonDivider />
      <Suspense fallback={<SectionPlaceholder />}>
        <FAQ />
      </Suspense>
      <NeonDivider />
      <Suspense fallback={<SectionPlaceholder />}>
        <Contact />
      </Suspense>
      <NeonDivider />
      <Suspense fallback={<SectionPlaceholder height="h-40" />}>
        <LocalSEO />
      </Suspense>
      <NeonDivider color="primary" />
      <Suspense fallback={null}>
        <Footer />
        <MobileCTA />
        <CarCrashCTA />
      </Suspense>
      </div>
    </>
  );
};

export default Index;
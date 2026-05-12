import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Diagnosis } from "@/components/Diagnosis";
import { About } from "@/components/About";
import { HowItWorks } from "@/components/HowItWorks";
import { Cases } from "@/components/Cases";
import { Process } from "@/components/Process";
import { WhyUs } from "@/components/WhyUs";
import { Industries } from "@/components/Industries";
import { Pricing } from "@/components/Pricing";
import { CtaForm } from "@/components/CtaForm";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { PageEffects } from "@/components/PageEffects";
import { MobileStickyCta } from "@/components/MobileStickyCta";

export default function Home() {
  return (
    <>
      <PageEffects />
      <Nav />
      <main>
        <Hero />
        <Diagnosis />
        <About />
        <HowItWorks />
        <Cases />
        <Process />
        <WhyUs />
        <Industries />
        <Pricing />
        <CtaForm />
        <FAQ />
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}

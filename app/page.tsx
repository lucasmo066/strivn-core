import { pageMetadata, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/metadata";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SocialProofSection } from "@/components/sections/social-proof-section";
import { WorkSection } from "@/components/sections/work-section";

export const metadata = pageMetadata(SITE_TITLE, SITE_DESCRIPTION, "/");

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SocialProofSection />
      <ServicesSection />
      <WorkSection />
      <PricingSection />
      <ContactSection />
    </main>
  );
}

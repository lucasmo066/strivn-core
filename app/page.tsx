import { ContactSection } from "@/components/sections/contact-section";
import { HomeExperience } from "@/components/sections/home-experience";
import { PricingSection } from "@/components/sections/pricing-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SocialProofSection } from "@/components/sections/social-proof-section";
import { WorkSection } from "@/components/sections/work-section";

export default function Home() {
  return (
    <main>
      <HomeExperience>
        <SocialProofSection />
        <ServicesSection />
        <WorkSection />
        <PricingSection />
        <ContactSection />
      </HomeExperience>
    </main>
  );
}

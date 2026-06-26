import { ContactSection } from "@/components/sections/contact-section";
import { DesignSystemSection } from "@/components/sections/design-system-section";
import { HeroSection } from "@/components/sections/hero-section";
import { WorkSection } from "@/components/sections/work-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WorkSection />
      <DesignSystemSection />
      <ContactSection />
    </main>
  );
}

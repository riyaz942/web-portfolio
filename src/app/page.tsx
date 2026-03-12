import HeroSection from "@/components/HeroSection";
import CreativeSection from "@/components/CreativeSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <CreativeSection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}

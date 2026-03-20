import HeroSection from "@/components/HeroSection";
import CreativeSection from "@/components/CreativeSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import ScrollRestore from "@/components/ScrollRestore";
import HomePageLoader from "@/components/HomePageLoader";

export default function Home() {
  return (
    <div className="w-full">
      <HomePageLoader>
        <ScrollRestore />
        <HeroSection />
        <CreativeSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </HomePageLoader>
    </div>
  );
}

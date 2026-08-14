import styles from './page.module.css';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { HeroSection } from '@/components/hero/HeroSection/HeroSection';
import { JourneySection } from '@/components/sections/JourneySection/JourneySection';
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection/CapabilitiesSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection/SkillsSection';
import { ContactSection } from '@/components/sections/ContactSection/ContactSection';

export default function HomePage() {
  return (
    <div className={styles.root}>
      <Navbar />
      <main>
        <HeroSection />
        <JourneySection />
        <CapabilitiesSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </div>
  );
}

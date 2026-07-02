import styles from './page.module.css';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { HeroSection } from '@/components/hero/HeroSection/HeroSection';
import { JourneySection } from '@/components/sections/JourneySection/JourneySection';
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection/CapabilitiesSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection/SkillsSection';
import { ContactSection } from '@/components/sections/ContactSection/ContactSection';

/*
 * Phase 1: assembles the section shells only. Each renders a labelled
 * placeholder. Real layout, motion and content arrive in Phases 2–8.
 * (Process / Proof / Behind / Footer shells are added in their phases.)
 */
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

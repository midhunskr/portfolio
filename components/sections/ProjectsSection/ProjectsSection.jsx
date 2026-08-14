'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './ProjectsSection.module.css';
import { projects } from '@/data/projects';
import { ShowcaseFrame } from '@/components/ui/ShowcaseFrame/ShowcaseFrame';
import { ShowcaseModal } from '@/components/ui/ShowcaseModal/ShowcaseModal';

const NARRATIVE_STEPS = [
  { key: 'challenge', label: 'Challenge' },
  { key: 'process', label: 'Process' },
  { key: 'solution', label: 'Solution' },
  { key: 'outcome', label: 'Outcome' },
];

export function ProjectsSection() {
  const [expandedSlug, setExpandedSlug] = useState(null);
  const [modalProject, setModalProject] = useState(null);

  const toggle = useCallback(
    (slug) => setExpandedSlug((prev) => (prev === slug ? null : slug)),
    []
  );

  return (
    <section id="work" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <div className={styles.eyebrowRow}>
              <span className={styles.eyebrowNum}>03</span>
              <span className={styles.eyebrowLabel}>Selected Work</span>
            </div>
            <h2 className={styles.h2}>
              Three problems, solved{' '}
              <span className="accent-green">end-to-end.</span>
            </h2>
          </div>
          <p className={styles.hint}>
            Expand a project to explore the story behind it →
          </p>
        </div>

        <div>
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              isOpen={expandedSlug === project.slug}
              onToggle={toggle}
              onShowcase={setModalProject}
            />
          ))}
        </div>
      </div>

      {modalProject && (
        <ShowcaseModal
          project={modalProject}
          onClose={() => setModalProject(null)}
        />
      )}
    </section>
  );
}

function ProjectCard({ project, isOpen, onToggle, onShowcase }) {
  const bodyRef = useRef(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (isOpen) {
      el.style.maxHeight = el.scrollHeight + 40 + 'px';
    } else {
      el.style.maxHeight = '0px';
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onResize = () => {
      const el = bodyRef.current;
      if (el) el.style.maxHeight = el.scrollHeight + 40 + 'px';
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, [isOpen]);

  const { narrative } = project;

  return (
    <div className={styles.card}>
      <div
        className={styles.toggle}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onClick={() => onToggle(project.slug)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle(project.slug);
          }
        }}
      >
        <span className={styles.projNum}>{project.order}</span>
        <div className={styles.projInfo}>
          <div className={styles.projCat}>{project.category}</div>
          <h3 className={styles.projName}>{project.name}</h3>
          <p className={styles.projTagline}>{project.tagline}</p>
        </div>
        <ShowcaseFrame
          image={project.thumbnail}
          sizes="(max-width: 640px) 0px, 230px"
          className={styles.rowThumb}
        />
        <span className={isOpen ? styles.plusBtnOpen : styles.plusBtn}>+</span>
      </div>

      <div ref={bodyRef} className={isOpen ? styles.bodyOpen : styles.body}>
        <div className={styles.bodyGrid}>
          <div className={styles.previewCol}>
            <div className={styles.previewLabel}>Product preview</div>
            <div className={styles.previewImgWrap}>
              <ShowcaseFrame
                image={project.thumbnail}
                sizes="(max-width: 760px) 100vw, 500px"
                className={styles.previewFrame}
              />
              {project.showcase && (
                <button
                  className={
                    isOpen ? styles.showcaseBtnVisible : styles.showcaseBtn
                  }
                  aria-label={`Open ${project.name} showcase`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onShowcase(project);
                  }}
                >
                  ↗
                </button>
              )}
            </div>
            <div className={styles.tagsRow}>
              {project.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.stepsCol}>
            <div className={styles.stepsLine} />
            {NARRATIVE_STEPS.map((s, i) => {
              const isLast = i === NARRATIVE_STEPS.length - 1;
              return (
                <div
                  key={s.key}
                  className={isLast ? styles.stepLast : styles.step}
                >
                  <span className={isLast ? styles.stepNumLast : styles.stepNum}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className={isLast ? styles.stepKeyLast : styles.stepKey}>
                    {s.label}
                  </div>
                  <p className={styles.stepVal}>{narrative[s.key]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

import styles from './not-found.module.css';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';

export const metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className={styles.root}>
      <Navbar />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <p className={styles.code}>404</p>
            <h1 className={styles.title}>This page doesn&apos;t exist.</h1>
            <p className={styles.body}>
              The link might be broken, or the page may have moved. Let&apos;s
              get you back to something real.
            </p>
            <a href="/" className={styles.cta}>
              Return Home
              <span className={styles.ctaArrow}>→</span>
            </a>
          </div>

          <Footer />
        </section>
      </main>
    </div>
  );
}

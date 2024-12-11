import React from 'react';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

export default function Home() {
  return (
    <main className={styles.heroBanner}>
      <section className={styles.content}>
        <h1>Welcome to Fynix Prompt Library</h1>
        <p>
          Explore our curated collection of use-case-specific prompts designed to unlock the full potential of the Fynix AI Coding Assistant.
        </p>
        <div className={styles.buttons}>
        <Link to="/docs/intro" className={styles.linkButton} aria-label="Get Started with the Prompt Library">
          Get Started
        </Link>
        </div>
      </section>
    </main>
  );
}
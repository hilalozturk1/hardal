'use client';
import { useHardal } from 'hardal/react';
import { useEffect } from 'react';

export function ContactForm() {
  const { track, distinct } = useHardal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get('email') as string;

    // Track the submission
    await track('form_submitted', {
      formType: 'contact',
      source: 'landing_page',
    });

    // Identify the user
    await distinct({
      email,
      source: 'contact_form',
    });
  };

  return <form onSubmit={handleSubmit}>{/* form fields */}</form>;
}

export function HardalBootstrap() {
  const hardal = useHardal();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ((window as any).hardal) return;

    let attempts = 0;
    const maxAttempts = 20;
    const interval = setInterval(() => {
      attempts++;
      if (hardal && (hardal as any).track) {
        (window as any).hardal = {
          track: (hardal as any).track.bind(hardal),
          distinct: (hardal as any).distinct?.bind(hardal),
        };
        console.log('✅ window.hardal bootstrapped from HardalProvider');
        clearInterval(interval);
      } else if (attempts >= maxAttempts) {
        console.warn('⚠ Hardal bootstrap failed (no methods available)');
        clearInterval(interval);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [hardal]);

  return null;
}
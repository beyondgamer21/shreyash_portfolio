import { useEffect, useRef } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  onChange?: (isIntersecting: boolean) => void;
}

export function useScrollReveal<T extends HTMLElement>({
  threshold = 0.1,
  root = null,
  rootMargin = '0px',
  onChange,
}: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          } else {
            entry.target.classList.remove('active');
          }
          
          if (onChange) {
            onChange(entry.isIntersecting);
          }
        });
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, root, rootMargin, onChange]);

  return ref;
}

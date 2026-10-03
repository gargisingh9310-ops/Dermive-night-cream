import { useState, useEffect, useRef } from 'react';

/**
 * Hook to track overall scroll position, direction, and threshold crossings
 */
export function useWindowScroll() {
  const [scrollData, setScrollData] = useState({
    scrollY: 0,
    scrollProgress: 0,
    isScrolled: false,
    showStickyBar: false,
    direction: 'down',
  });

  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalHeight > 0 ? Math.min(Math.max(currentScrollY / totalHeight, 0), 1) : 0;
          const direction = currentScrollY > lastScrollY.current ? 'down' : 'up';

          setScrollData({
            scrollY: currentScrollY,
            scrollProgress: progress,
            isScrolled: currentScrollY > 40,
            showStickyBar: currentScrollY > 600,
            direction,
          });

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollData;
}

/**
 * Hook to track element intersection and normalized scroll progress
 */
export function useElementScroll(options = {}) {
  const { threshold = 0.2, rootMargin = '0px 0px -40px 0px' } = options;
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const totalDist = vh + rect.height;
      const currentDist = vh - rect.top;
      const p = Math.min(Math.max(currentDist / totalDist, 0), 1);
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.unobserve(el);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, rootMargin]);

  return [elementRef, isVisible, progress];
}

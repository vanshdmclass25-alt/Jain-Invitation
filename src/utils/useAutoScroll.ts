import { useEffect, useRef, useState, useCallback, RefObject } from 'react';

interface UseAutoScrollOptions {
  delayMs?: number;
  pixelsPerSecond?: number;
  scrollSpeed?: number;
  scrollIntervalMs?: number;
  containerRef?: RefObject<HTMLElement | null>;
  enabled?: boolean;
}

export function useAutoScroll({
  delayMs = 5000,
  pixelsPerSecond,
  scrollSpeed,
  containerRef,
  enabled = true,
}: UseAutoScrollOptions = {}) {
  const effectivePixelsPerSecond = pixelsPerSecond ?? (scrollSpeed ? scrollSpeed * 32 : 48);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const speedRef = useRef<number>(speedMultiplier);

  speedRef.current = speedMultiplier;

  // Calculate current scroll percentage
  const updateProgress = useCallback(() => {
    if (containerRef?.current) {
      const el = containerRef.current;
      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll > 0) {
        const pct = Math.min(100, Math.max(0, Math.round((el.scrollTop / maxScroll) * 100)));
        setScrollProgress(pct);
      }
    } else if (typeof window !== 'undefined') {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const pct = Math.min(100, Math.max(0, Math.round((window.scrollY / maxScroll) * 100)));
        setScrollProgress(pct);
      }
    }
  }, [containerRef]);

  // Stop auto-scroll loop
  const stopAutoScroll = useCallback(() => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    lastTimeRef.current = null;
    setIsAutoScrolling(false);
  }, []);

  // Pause triggered by user interaction (scroll or touch)
  const pauseAutoScroll = useCallback(() => {
    setIsPausedByUser(true);
    stopAutoScroll();
  }, [stopAutoScroll]);

  // Step function run via requestAnimationFrame for butter-smooth animation
  const step = useCallback((timestamp: number) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp;
    }
    const deltaTime = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;

    const deltaY = effectivePixelsPerSecond * speedRef.current * deltaTime;

    if (containerRef?.current) {
      const el = containerRef.current;
      const maxScroll = el.scrollHeight - el.clientHeight;

      if (el.scrollTop >= maxScroll - 3) {
        // Reached end
        stopAutoScroll();
        updateProgress();
        return;
      }
      el.scrollTop += deltaY;
    } else {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= maxScroll - 5) {
        // Reached end
        stopAutoScroll();
        updateProgress();
        return;
      }
      window.scrollBy(0, deltaY);
    }

    updateProgress();
    animFrameRef.current = requestAnimationFrame(step);
  }, [containerRef, effectivePixelsPerSecond, stopAutoScroll, updateProgress]);

  // Start the smooth animation loop
  const startAutoScroll = useCallback(() => {
    if (!enabled) return;
    stopAutoScroll();
    setIsPausedByUser(false);
    setIsAutoScrolling(true);
    lastTimeRef.current = null;
    animFrameRef.current = requestAnimationFrame(step);
  }, [enabled, step, stopAutoScroll]);

  // Toggle play / pause
  const toggleAutoScroll = useCallback(() => {
    if (isAutoScrolling) {
      pauseAutoScroll();
    } else {
      startAutoScroll();
    }
  }, [isAutoScrolling, pauseAutoScroll, startAutoScroll]);

  // Smooth scroll to top
  const scrollToTop = useCallback(() => {
    pauseAutoScroll();
    if (containerRef?.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [containerRef, pauseAutoScroll]);

  // Initial 5s delayed start
  useEffect(() => {
    if (!enabled || isPausedByUser) return;

    timerRef.current = setTimeout(() => {
      startAutoScroll();
    }, delayMs);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [enabled, delayMs, isPausedByUser, startAutoScroll]);

  // Attach touch/wheel listeners to pause when user deliberately scrolls
  useEffect(() => {
    const targetElement = containerRef?.current || (typeof window !== 'undefined' ? window : null);
    if (!targetElement) return;

    const handleUserScrollAction = () => {
      if (isAutoScrolling) {
        pauseAutoScroll();
      }
      updateProgress();
    };

    const events = ['wheel', 'touchstart'];
    events.forEach((ev) => {
      targetElement.addEventListener(ev, handleUserScrollAction, { passive: true });
    });

    const handleScrollPassive = () => {
      updateProgress();
    };
    targetElement.addEventListener('scroll', handleScrollPassive, { passive: true });

    return () => {
      events.forEach((ev) => {
        targetElement.removeEventListener(ev, handleUserScrollAction);
      });
      targetElement.removeEventListener('scroll', handleScrollPassive);
    };
  }, [containerRef, isAutoScrolling, pauseAutoScroll, updateProgress]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAutoScroll();
    };
  }, [stopAutoScroll]);

  return {
    isAutoScrolling,
    isPausedByUser,
    scrollProgress,
    speedMultiplier,
    setSpeedMultiplier,
    startAutoScroll,
    pauseAutoScroll,
    toggleAutoScroll,
    scrollToTop,
    stopAutoScroll,
  };
}


import type { PlayerRef } from "@remotion/player";
import { useEffect, useRef } from "react";

export const useAutoplayOnScroll = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<PlayerRef | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
          playerRef.current?.play();
        } else {
          playerRef.current?.pause();
        }
      },
      { threshold: [0, 0.2, 1] },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { containerRef, playerRef };
};

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initTimelineScroll(
  container: HTMLElement,
  track: HTMLElement,
  onProgressUpdate?: (progress: number) => void
) {
  const getScrollDistance = () => track.scrollWidth - window.innerWidth;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: () => `+=${getScrollDistance() * 1.2}`,
      pin: true,
      scrub: 1.0,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (onProgressUpdate) onProgressUpdate(self.progress);
      },
    },
  });

  tl.to(track, {
    x: () => -getScrollDistance(),
    ease: 'none',
  });

  return tl;
}

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initHeroScroll(
  container: HTMLElement,
  onScrollUpdate: (progress: number) => void
) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: 1.0,
      onUpdate: (self) => {
        onScrollUpdate(self.progress);
      },
    },
  });

  return tl;
}

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initCharacterScroll(
  container: HTMLElement,
  slides: HTMLElement[],
  onActiveChange: (index: number) => void
) {
  const totalSlides = slides.length;

  slides.forEach((slide, idx) => {
    if (idx === 0) {
      gsap.set(slide, {
        opacity: 1,
        scale: 1,
        yPercent: 0,
        filter: 'blur(0px)',
        visibility: 'visible',
      });
    } else {
      gsap.set(slide, {
        opacity: 0,
        scale: 0.92,
        yPercent: 40,
        filter: 'blur(16px)',
        visibility: 'hidden',
      });
    }
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: `+=${(totalSlides - 1) * 150}%`,
      pin: true,
      scrub: 1.0,
      onUpdate: (self) => {
        const cur = Math.min(
          totalSlides - 1,
          Math.floor(self.progress * totalSlides + 0.05)
        );
        onActiveChange(cur);
      },
    },
  });

  for (let i = 0; i < totalSlides - 1; i++) {
    const cur = slides[i];
    const nxt = slides[i + 1];
    if (!cur || !nxt) continue;

    const offset = i * 1.5;

    // Current hero exits (Pushes upward and dissolves)
    tl.to(
      cur,
      {
        opacity: 0,
        scale: 0.85,
        yPercent: -40,
        filter: 'blur(16px)',
        ease: 'power2.inOut',
        duration: 1.0,
        onComplete: () => {
          gsap.set(cur, { visibility: 'hidden' });
        },
        onReverseComplete: () => {
          gsap.set(cur, { visibility: 'visible' });
        },
      },
      offset
    );

    // Next hero enters (Rises from bottom and focuses)
    tl.fromTo(
      nxt,
      {
        opacity: 0,
        scale: 0.92,
        yPercent: 40,
        filter: 'blur(16px)',
        visibility: 'visible',
      },
      {
        opacity: 1,
        scale: 1,
        yPercent: 0,
        filter: 'blur(0px)',
        ease: 'power2.inOut',
        duration: 1.0,
      },
      offset + 0.25
    );
  }

  return tl;
}

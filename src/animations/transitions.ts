import gsap from 'gsap';

export function splitTextReveal(element: HTMLElement, delay = 0) {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 40,
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      filter: 'blur(10px)',
    },
    {
      opacity: 1,
      y: 0,
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power3.out',
      delay,
    }
  );
}

export function letterSpacingReveal(element: HTMLElement, targetSpacing = '0.14em', delay = 0) {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      letterSpacing: '0.45em',
      filter: 'blur(8px)',
    },
    {
      opacity: 1,
      letterSpacing: targetSpacing,
      filter: 'blur(0px)',
      duration: 1.4,
      ease: 'power2.out',
      delay,
    }
  );
}

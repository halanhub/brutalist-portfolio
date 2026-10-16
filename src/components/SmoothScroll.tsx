import { gsap, ScrollSmoother, ScrollTrigger, useGSAP, mq } from "@/lib/gsap";

/**
 * Creates ScrollSmoother on desktop with a fine pointer and motion allowed.
 * Rendered as the first leaf inside #smooth-content so its layout effect runs
 * before any section creates a ScrollTrigger. Touch devices keep native scroll.
 */
const SmoothScroll = () => {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(`${mq.motion} and ${mq.finePointer} and ${mq.desktop}`, () => {
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.1,
        effects: true,
        normalizeScroll: false,
      });
      return () => smoother.kill();
    });
    // Fonts change line lengths; re-measure every trigger once they're in.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => mm.revert();
  });
  return null;
};

export default SmoothScroll;

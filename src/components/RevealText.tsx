import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, ease, mq } from "@/lib/gsap";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Split granularity. Lines read as editorial; words feel more kinetic. */
  by?: "lines" | "words";
  delay?: number;
  /** Viewport position where the reveal fires. */
  start?: string;
  id?: string;
};

/**
 * Text that rises out of a mask the first time it scrolls into view.
 * The text is fully readable without JS and with reduced motion. SplitText
 * keeps an aria-label on the original element so screen readers get one string.
 */
const RevealText = ({ as: Tag = "p", children, className, by = "lines", delay = 0, start = "top 85%", id }: Props) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.motion, () => {
        const split = SplitText.create(ref.current, {
          type: by === "lines" ? "lines" : "words,lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(by === "lines" ? self.lines : self.words, {
              yPercent: 110,
              duration: 1.1,
              ease: ease.out,
              stagger: by === "lines" ? 0.09 : 0.035,
              delay,
              scrollTrigger: { trigger: ref.current, start, once: true },
            });
          },
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
};

export default RevealText;

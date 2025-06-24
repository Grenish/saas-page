import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, useRef, useEffect } from "react";
import { gsap } from "gsap";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string;
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode;
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean;
  /**
   * Number of times to repeat the content
   * @default 2
   */
  repeat?: number;
  /**
   * Animation duration in seconds
   * @default 20
   */
  duration?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 2,
  duration = 20,
  ...props
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const content = contentRef.current;

    // Kill any existing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Get the width of the content
    const contentWidth = content.scrollWidth;
    
    // Set initial position
    gsap.set(content, { x: reverse ? -contentWidth / 2 : 0 });

    // Create the animation
    const animation = gsap.to(content, {
      x: reverse ? 0 : -contentWidth / 2,
      duration: duration,
      ease: "none",
      repeat: -1,
    });

    animationRef.current = animation;

    // Handle pause on hover
    if (pauseOnHover) {
      const handleMouseEnter = () => animation.pause();
      const handleMouseLeave = () => animation.play();
      
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
        animation.kill();
      };
    }

    return () => {
      animation.kill();
    };
  }, [reverse, pauseOnHover, duration, children]);

  return (
    <div
      {...props}
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      <div
        ref={contentRef}
        className={cn("flex whitespace-nowrap", {
          "flex-row": !vertical,
          "flex-col": vertical,
        })}
      >
        {Array(repeat)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={cn("flex shrink-0", {
                "flex-row": !vertical,
                "flex-col": vertical,
              })}
            >
              {children}
            </div>
          ))}
      </div>
    </div>
  );
}

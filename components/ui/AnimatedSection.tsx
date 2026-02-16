'use client';

import { useInView } from 'react-intersection-observer';
import { Children, cloneElement, isValidElement } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Intersection Observer threshold (0-1). Default 0.1 = 10% visibility triggers fade. */
  threshold?: number;
  /** When true, children fade in sequentially with stagger delay. */
  stagger?: boolean;
  /** HTML element to render. Default 'section'. */
  as?: 'section' | 'div';
}

export function AnimatedSection({
  children,
  className,
  threshold = 0.1,
  stagger = false,
  as: Element = 'section',
}: AnimatedSectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold,
  });

  // Simple fade (no stagger) — entire section fades as one unit
  if (!stagger) {
    return (
      <Element
        ref={ref}
        className={cn(
          'transition-opacity ease-out',
          inView ? 'opacity-100' : 'opacity-0',
          className,
        )}
        style={{ transitionDuration: 'var(--animate-duration-fade)' }}
      >
        {children}
      </Element>
    );
  }

  // Staggered fade — each direct child fades in with increasing delay
  const childArray = Children.toArray(children);

  return (
    <Element ref={ref} className={className}>
      {childArray.map((child, index) => {
        if (!isValidElement(child)) return child;

        const element = child as React.ReactElement<any>;

        return cloneElement(element, {
          style: {
            ...(typeof element.props.style === 'object' ? element.props.style : {}),
            opacity: inView ? 1 : 0,
            transition: `opacity var(--animate-duration-fade) var(--animate-ease-out)`,
            transitionDelay: `${index * 150}ms`,
          } as React.CSSProperties,
          className: element.props.className,
        });
      })}
    </Element>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { tools } from '@/lib/data/tools';

const ITEM_HEIGHT = 64; // h-8 (32) + my-4 top+bottom (32)
const COLUMN_WIDTH = 64; // w-16

export function ToolsColumn() {
  const [visible, setVisible] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const pausedRef = useRef(false);
  const mouseYRef = useRef<number | null>(null);
  const rafProximityRef = useRef<number>(0);
  const nudgeRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mq.matches) setVisible(true);
  }, []);

  // Scroll animation
  useEffect(() => {
    if (!visible) return;
    const el = trackRef.current;
    if (!el) return;

    let offset = 0;
    const speed = 0.3;
    let raf: number;

    function tick() {
      if (!pausedRef.current) {
        offset += speed;
      } else {
        // Breathing effect: apply nudge from horizontal mouse movement
        const nudge = nudgeRef.current;
        if (Math.abs(nudge) > 0.01) {
          offset += nudge;
          nudgeRef.current *= 0.92; // decay
        } else {
          nudgeRef.current = 0;
        }
      }

      const oneSet = el!.scrollHeight / 3;
      if (offset >= oneSet) offset -= oneSet;
      if (offset < 0) offset += oneSet;
      el!.style.transform = `translateY(-${offset}px)`;
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  // Proximity effect — direct DOM, no React re-renders
  useEffect(() => {
    if (!visible) return;
    const track = trackRef.current;
    const tooltip = tooltipRef.current;
    const label = labelRef.current;
    if (!track || !tooltip || !label) return;

    const totalPerSet = tools.length;

    function applyProximity() {
      const my = mouseYRef.current;
      const children = track!.children;

      if (my === null) {
        // Reset all items
        for (let i = 0; i < children.length; i++) {
          const el = children[i] as HTMLElement;
          el.style.opacity = '0.35';
          el.style.transform = 'scale(1) translateX(0px)';
        }
        tooltip!.style.opacity = '0';
        tooltip!.textContent = '';
        label!.style.opacity = '0';
        rafProximityRef.current = requestAnimationFrame(applyProximity);
        return;
      }

      // Pass 1: find the single closest item
      let closestDist = Infinity;
      let closestIdx = -1;
      let closestCenterY = 0;

      for (let i = 0; i < children.length; i++) {
        const rect = (children[i] as HTMLElement).getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const dist = Math.abs(my - centerY);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
          closestCenterY = centerY;
        }
      }

      // Only activate if cursor is directly over an icon (within half item height)
      const hoverActive = closestDist < ITEM_HEIGHT / 2;

      // Pass 2: apply styles
      for (let i = 0; i < children.length; i++) {
        const el = children[i] as HTMLElement;

        if (hoverActive && i === closestIdx) {
          el.style.opacity = '1';
          el.style.transform = 'scale(1.5) translateX(6px)';
        } else if (hoverActive && (i === closestIdx - 1 || i === closestIdx + 1)) {
          el.style.opacity = '0.55';
          el.style.transform = 'scale(1.15) translateX(3px)';
        } else {
          el.style.opacity = '0.35';
          el.style.transform = 'scale(1) translateX(0px)';
        }
      }

      // Tooltip + label
      if (hoverActive) {
        const toolName = tools[closestIdx % totalPerSet].name;
        tooltip!.textContent = toolName;
        tooltip!.style.opacity = '1';
        tooltip!.style.top = `${closestCenterY}px`;
        label!.style.opacity = '1';
      } else {
        tooltip!.style.opacity = '0';
        label!.style.opacity = '0';
      }

      rafProximityRef.current = requestAnimationFrame(applyProximity);
    }

    rafProximityRef.current = requestAnimationFrame(applyProximity);
    return () => cancelAnimationFrame(rafProximityRef.current);
  }, [visible]);

  if (!visible) return null;

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const totalPerSet = tools.length;
  const logoSets = [tools, tools, tools];

  return (
    <div
      className="fixed top-0 left-0 h-screen z-10 hidden lg:block"
      aria-hidden="true"
    >
      <div
        className="w-28 h-full"
        onMouseMove={(e) => {
          pausedRef.current = true;
          mouseYRef.current = e.clientY;

          // Breathing: vertical mouse movement nudges scroll (opposite direction)
          nudgeRef.current += e.movementY * 0.015;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
          mouseYRef.current = null;
          nudgeRef.current = 0;
        }}
      >
        <div className="w-16 h-full overflow-hidden relative">
          <div ref={trackRef} className="flex flex-col items-center will-change-transform">
            {logoSets.map((set, setIndex) =>
              set.map((tool) => (
                <div
                  key={`${setIndex}-${tool.logo}`}
                  className="shrink-0 flex items-center justify-center w-8 h-8 my-4"
                  style={{
                    opacity: 0.35,
                    transform: 'scale(1) translateX(0px)',
                    transition: 'opacity 0.4s cubic-bezier(0.22,1,0.36,1), transform 0.4s cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
                  <Image
                    src={`${basePath}/images/logos/${tool.logo}.svg`}
                    alt=""
                    width={24}
                    height={24}
                    className="w-6 h-6"
                    unoptimized
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* "Tools I use" label — appears on hover */}
      <span
        ref={labelRef}
        className="fixed pointer-events-none z-20 text-[10px] font-medium uppercase tracking-[0.15em] text-text-tertiary"
        style={{
          left: 8,
          bottom: 24,
          writingMode: 'vertical-rl',
          opacity: 0,
          transition: 'opacity 0.4s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        Tools I use
      </span>

      {/* Tooltip — fixed anchor, positioned via JS */}
      <span
        ref={tooltipRef}
        className="fixed whitespace-nowrap text-xs font-medium text-white bg-white/10 backdrop-blur-sm rounded px-2 py-1 pointer-events-none z-20"
        style={{
          left: COLUMN_WIDTH + 12,
          transform: 'translateY(-50%)',
          opacity: 0,
          transition: 'top 0.2s cubic-bezier(0.22,1,0.36,1), opacity 0.2s cubic-bezier(0.22,1,0.36,1)',
        }}
      />
    </div>
  );
}

import React, { useEffect, useRef, useState, useId } from 'react';
import gsap from 'gsap';
import './StrokeText.css';

/**
 * StrokeText Component
 * 
 * Props:
 * - text: string to render
 * - fillMode: 'wipe' | 'fade' | 'none' (default: 'wipe')
 * - trigger: 'mount' | 'in-view' (default: 'mount')
 * - strokeColor: color string (default: '#31483A')
 * - fillColor: color string (default: '#31483A')
 * - strokeWidth: number (default: 1.5)
 * - duration: drawing animation duration in seconds (default: 2.2)
 * - delay: initial delay before starting animation (default: 0.1)
 * - onComplete: callback fired when stroke and fill animation finish
 * - className: custom class names
 * - style: custom inline styles
 */
export default function StrokeText({
  text = 'DERMIVA',
  fillMode = 'wipe',
  trigger = 'mount',
  strokeColor = '#31483A',
  fillColor = '#31483A',
  strokeWidth = 1.5,
  duration = 1.55,
  delay = 0.08,
  onComplete,
  className = '',
  style = {},
}) {
  const containerRef = useRef(null);
  const strokeTextRef = useRef(null);
  const clipRectRef = useRef(null);
  const fillTextRef = useRef(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const rawId = useId();
  const clipId = `stroke-text-clip-${rawId.replace(/:/g, '')}`;

  useEffect(() => {
    if (trigger !== 'mount') return;

    const strokeEl = strokeTextRef.current;
    const clipRectEl = clipRectRef.current;
    const fillEl = fillTextRef.current;
    if (!strokeEl) return;

    // Total stroke path dash length
    const strokeLength = 1400;

    // Set initial stroke state
    gsap.set(strokeEl, {
      strokeDasharray: strokeLength,
      strokeDashoffset: strokeLength,
      opacity: 1,
    });

    if (clipRectEl && fillMode === 'wipe') {
      gsap.set(clipRectEl, { attr: { width: 0 } });
    } else if (fillEl && fillMode === 'fade') {
      gsap.set(fillEl, { opacity: 0 });
    }

    const tl = gsap.timeline({
      delay: delay,
      onComplete: () => {
        setIsCompleted(true);
        if (onComplete) onComplete();
      },
    });

    // 1. Draw the stroke line smoothly
    tl.to(strokeEl, {
      strokeDashoffset: 0,
      duration: duration,
      ease: 'power2.inOut',
    });

    // 2. Wipe / fade the fill smoothly
    if (fillMode === 'wipe' && clipRectEl) {
      tl.to(
        clipRectEl,
        {
          attr: { width: 1100 },
          duration: duration * 0.65,
          ease: 'power1.inOut',
        },
        duration * 0.4
      );
    } else if (fillMode === 'fade' && fillEl) {
      tl.to(
        fillEl,
        {
          opacity: 1,
          duration: duration * 0.5,
          ease: 'power1.inOut',
        },
        duration * 0.5
      );
    }

    return () => {
      tl.kill();
    };
  }, [trigger, fillMode, duration, delay, onComplete]);

  return (
    <div
      ref={containerRef}
      className={`stroke-text-container select-none ${className}`}
      style={style}
    >
      <svg
        viewBox="0 0 1100 240"
        className="w-full h-auto overflow-visible select-none pointer-events-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {fillMode === 'wipe' && (
            <clipPath id={clipId}>
              <rect
                ref={clipRectRef}
                x="0"
                y="0"
                width={isCompleted ? '1100' : '0'}
                height="240"
              />
            </clipPath>
          )}
        </defs>

        {/* Fill Layer (revealed via clip-path wipe or fade) */}
        {fillMode !== 'none' && (
          <text
            ref={fillTextRef}
            x="50%"
            y="58%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill={fillColor}
            clipPath={fillMode === 'wipe' ? `url(#${clipId})` : undefined}
            className="stroke-text-fill font-serif font-semibold"
            style={{
              fontFamily: '"Playfair Display", "Cormorant Garamond", Georgia, serif',
              fontSize: '180px',
              fontWeight: 600,
              letterSpacing: '0.08em',
            }}
          >
            {text}
          </text>
        )}

        {/* Stroke Outline Layer (animated drawing) */}
        <text
          ref={strokeTextRef}
          x="50%"
          y="58%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-text-outline font-serif font-semibold"
          style={{
            fontFamily: '"Playfair Display", "Cormorant Garamond", Georgia, serif',
            fontSize: '180px',
            fontWeight: 600,
            letterSpacing: '0.08em',
          }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
}

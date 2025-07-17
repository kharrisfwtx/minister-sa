// src/components/InteractivePlateHand.jsx

import React, { useRef, useState, useEffect } from 'react';
import baseUrl from '../assets/WayfinderBase.svg';
import handUrl from '../assets/WayfinderHand.svg';

export default function InteractivePlateHand({
  svgSize = 300,
  handSize = 30,
  orbitInset = 8,
  pointerOffset = 90,
  smoothing = 0.01,     // 0–1; lower = more inertia
}) {
  const svgRef = useRef(null);
  const [targetRad, setTargetRad] = useState(0);
  const [smoothRad, setSmoothRad] = useState(0);

  // 1) Update raw angle on mousemove
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const handler = e => {
      const { left, top, width, height } = svg.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      setTargetRad(Math.atan2(dy, dx));
    };

    svg.addEventListener('mousemove', handler);
    return () => svg.removeEventListener('mousemove', handler);
  }, []);

  // 2) Animate smoothing loop
  useEffect(() => {
    let raf;
    const step = () => {
      setSmoothRad(prev => {
        const diff = targetRad - prev;
        // wrap-around fix for continuity
        const delta = ((diff + Math.PI) % (2 * Math.PI)) - Math.PI;
        return prev + delta * smoothing;
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [targetRad, smoothing]);

  // 3) Compute orbit & rotation
  const radius   = svgSize / 2;
  const orbitR   = radius - handSize / 2 - orbitInset;
  const x        = radius + orbitR * Math.cos(smoothRad) - handSize / 2;
  const y        = radius + orbitR * Math.sin(smoothRad) - handSize / 2;
  const deg      = (smoothRad * 180) / Math.PI + pointerOffset;

  return (
    <svg
      ref={svgRef}
      width={svgSize}
      height={svgSize}
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      style={{ cursor: 'none', display: 'block', margin: '0 auto' }}
    >
      {/* Base compass */}
      <image
        href={baseUrl}
        x="0" y="0"
        width={svgSize}
        height={svgSize}
      />

      {/* Smoothed orbit + pointing */}
      <g transform={`translate(${x} ${y}) rotate(${deg} ${handSize/2} ${handSize/2})`}>
        <image
          href={handUrl}
          x="0" y="0"
          width={handSize}
          height={handSize}
        />
      </g>
    </svg>
  );
}

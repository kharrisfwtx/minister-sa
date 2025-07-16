// src/components/InteractivePlateHand.jsx
import React, { useRef, useState, useEffect } from 'react';
import baseUrl from '../assets/WayfinderBase.svg';
import handUrl from '../assets/WayfinderHand.svg';

export default function InteractivePlateHand() {
  const svgRef = useRef(null);
  const [angle, setAngle] = useState(0);

  // Compute angle from mouse → SVG center
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const onMouseMove = (e) => {
      const { left, top, width, height } = svg.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const rad = Math.atan2(dy, dx);
      setAngle((rad * 180) / Math.PI);
    };

    svg.addEventListener('mousemove', onMouseMove);
    return () => svg.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 400"
      width={400}
      height={400}
      style={{ cursor: 'none', display: 'block', margin: '0 auto' }}
    >
      {/* static compass base */}
      <image href={baseUrl} x="0" y="0" width="400" height="400" />

      {/* pivot & rotate the hand */}
      <g
        transform={`
          translate(200,200)
          rotate(${angle})
          translate(-200,-200)
        `}
        style={{
          transition: 'transform 0.3s cubic-bezier(0.22,1.61,0.36,1)',
        }}
      >
        <image href={handUrl} x="0" y="0" width="400" height="400" />
      </g>
    </svg>
  );
}

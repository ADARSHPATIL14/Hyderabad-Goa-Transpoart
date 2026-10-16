import React from 'react';

interface TruckAssetProps {
  className?: string;
  frontWheelRef?: React.RefObject<SVGGElement | null>;
  rearWheelRef?: React.RefObject<SVGGElement | null>;
}

export const TruckAsset: React.FC<TruckAssetProps> = ({
  className = '',
  frontWheelRef,
  rearWheelRef,
}) => {
  return (
    <svg
      viewBox="0 0 160 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Hyderabad Goa Transport Cargo Vehicle"
      role="img"
      style={{ overflow: 'visible', display: 'block' }}
    >
      {/* 1. Chassis & Undercarriage Frame */}
      <rect x="48" y="34" width="106" height="5" rx="1.5" fill="#263645" />
      {/* Undercarriage Fuel Tank & Battery Box between axles (x=52 to 110) */}
      <rect x="52" y="37" width="58" height="5" rx="1.5" fill="#1A242E" />

      {/* 2. Main Cargo Body (Facing left) */}
      <rect x="52" y="4" width="102" height="30" rx="2" fill="#263645" />
      {/* Body Ribs / Structural Panels */}
      <line x1="72" y1="6" x2="72" y2="32" stroke="#1E293B" strokeWidth="1.5" strokeOpacity="0.6" />
      <line x1="92" y1="6" x2="92" y2="32" stroke="#1E293B" strokeWidth="1.5" strokeOpacity="0.6" />
      <line x1="112" y1="6" x2="112" y2="32" stroke="#1E293B" strokeWidth="1.5" strokeOpacity="0.6" />
      <line x1="132" y1="6" x2="132" y2="32" stroke="#1E293B" strokeWidth="1.5" strokeOpacity="0.6" />

      {/* Minimal Brand Monogram on Cargo Box */}
      <text
        x="103"
        y="22"
        fill="#94A3B8"
        fontSize="7.5"
        fontFamily="'Bodoni Moda', serif"
        fontWeight="600"
        letterSpacing="2"
        textAnchor="middle"
        opacity="0.8"
      >
        HGT
      </text>

      {/* 3. Cab Body (Red/Vermilion #E03E2D, facing left) */}
      <path
        d="M52 38H8V26L18 8H46C49.3137 8 52 10.6863 52 14V38Z"
        fill="#E03E2D"
      />

      {/* Windshield & Side Window Glass */}
      <path
        d="M20 11H42V23H13L20 11Z"
        fill="#1E293B"
      />
      {/* Window Reflection Glare Line */}
      <line x1="24" y1="12" x2="17" y2="22" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.35" />

      {/* Front Amber Headlight Indicator (Facing left) */}
      <path
        d="M8 28C8 26.8954 8.89543 26 10 26H11V32H10C8.89543 32 8 31.1046 8 30V28Z"
        fill="#FBBF24"
      />

      {/* Front Bumper */}
      <path d="M6 36H16V40H8C6.89543 40 6 39.1046 6 38V36Z" fill="#1A242E" />

      {/* Front Wheel Arch / Mudguard (Concentric center at x=34, y=41, radius=10) */}
      <path
        d="M24 41C24 35.4772 28.4772 31 34 31C39.5228 31 44 35.4772 44 41H47C47 33.8203 41.1797 28 34 28C26.8203 28 21 33.8203 21 41H24Z"
        fill="#1A242E"
      />

      {/* Rear Wheel Arch / Mudguard (Concentric center at x=125, y=41, radius=10) */}
      <path
        d="M115 41C115 35.4772 119.477 31 125 31C130.523 31 135 35.4772 135 41H138C138 33.8203 132.18 28 125 28C117.82 28 112 33.8203 112 41H115Z"
        fill="#1A242E"
      />

      {/* 
        WHEEL 1: FRONT AXLE ASSEMBLY
        Axle mount locked at (34, 41) - concentric with front mudguard arch.
        Tire radius 9 -> bottom touches y=50 (road line).
      */}
      <g className="wheel-mount wheel-mount--front" transform="translate(34, 41)">
        <g ref={frontWheelRef} className="wheel-spin" transform="rotate(0)">
          {/* Tire */}
          <circle cx="0" cy="0" r="9" fill="#333C48" />
          {/* Metallic Rim */}
          <circle cx="0" cy="0" r="5.5" fill="#94A3B8" />
          {/* Center Hubcap */}
          <circle cx="0" cy="0" r="2.2" fill="#1E293B" />
          {/* Radial Spokes */}
          <line x1="0" y1="-5.5" x2="0" y2="5.5" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="-5.5" y1="0" x2="5.5" y2="0" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="-3.8" y1="-3.8" x2="3.8" y2="3.8" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="-3.8" y1="3.8" x2="3.8" y2="-3.8" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" />
        </g>
      </g>

      {/* 
        WHEEL 2: REAR AXLE ASSEMBLY
        Axle mount locked at (125, 41) - concentric with rear mudguard arch.
        Tire radius 9 -> bottom touches y=50 (road line).
      */}
      <g className="wheel-mount wheel-mount--rear" transform="translate(125, 41)">
        <g ref={rearWheelRef} className="wheel-spin" transform="rotate(0)">
          {/* Tire */}
          <circle cx="0" cy="0" r="9" fill="#333C48" />
          {/* Metallic Rim */}
          <circle cx="0" cy="0" r="5.5" fill="#94A3B8" />
          {/* Center Hubcap */}
          <circle cx="0" cy="0" r="2.2" fill="#1E293B" />
          {/* Radial Spokes */}
          <line x1="0" y1="-5.5" x2="0" y2="5.5" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="-5.5" y1="0" x2="5.5" y2="0" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="-3.8" y1="-3.8" x2="3.8" y2="3.8" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="-3.8" y1="3.8" x2="3.8" y2="-3.8" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
};

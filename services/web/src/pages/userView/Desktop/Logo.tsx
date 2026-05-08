export default function PulseGuardLogo({ className = "", width = 200 }: { className?: string; width?: number }) {
  return (
    <svg
      width={width}
      height={width * 0.25}
      viewBox="0 0 800 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>
      
      {/* Pulse icon */}
      <path
        d="M 40 100 L 60 100 L 75 60 L 90 140 L 105 80 L 120 100 L 140 100"
        stroke="url(#redGradient)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* PulseGuard Text */}
      <g transform="translate(160, 0)">
        {/* P */}
        <path
          d="M 0 50 L 0 150 M 0 50 L 40 50 Q 65 50 65 75 Q 65 100 40 100 L 0 100"
          stroke="#DC2626"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* u */}
        <path
          d="M 85 85 L 85 120 Q 85 140 105 140 Q 125 140 125 120 L 125 85 M 125 140 L 125 150"
          stroke="#DC2626"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* l */}
        <path
          d="M 145 50 L 145 150"
          stroke="#DC2626"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* s */}
        <path
          d="M 185 90 Q 165 85 165 100 Q 165 112 180 112 Q 195 112 195 125 Q 195 140 175 145"
          stroke="#DC2626"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* e */}
        <path
          d="M 215 112 L 255 112 Q 255 85 235 85 Q 215 85 215 110 Q 215 140 240 140 Q 255 140 255 130"
          stroke="#DC2626"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* G */}
        <path
          d="M 315 60 Q 280 60 280 100 Q 280 140 315 140 Q 350 140 350 110 L 350 100 L 315 100"
          stroke="#DC2626"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* u */}
        <path
          d="M 370 85 L 370 120 Q 370 140 390 140 Q 410 140 410 120 L 410 85 M 410 140 L 410 150"
          stroke="#DC2626"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* a */}
        <path
          d="M 450 112 Q 430 85 430 110 Q 430 140 455 140 Q 470 140 470 120 L 470 85 L 470 140"
          stroke="#DC2626"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* r */}
        <path
          d="M 490 150 L 490 85 M 490 95 Q 490 85 510 85"
          stroke="#DC2626"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* d */}
        <path
          d="M 550 50 L 550 150 M 550 112 Q 530 85 530 112 Q 530 140 550 140"
          stroke="#DC2626"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

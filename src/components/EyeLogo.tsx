interface EyeLogoProps {
  size?: number;
  color?: string;
  showAnimation?: boolean;
}

export default function EyeLogo({ size = 120, color = 'white', showAnimation = false }: EyeLogoProps) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 160 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      <defs>
        <path
          id="eyePath"
          d="M 20 50 Q 80 20 140 50 Q 80 80 20 50 Z"
          fill="none"
        />
      </defs>

      <path
        d="M 20 50 Q 80 20 140 50 Q 80 80 20 50 Z"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="80" cy="50" r="16" fill={color} />
      <circle cx="80" cy="50" r="10" fill="#4A7BA7" />
      <circle cx="84" cy="46" r="3" fill={color} opacity="0.8" />

      {showAnimation && (
        <g>
          <circle cx="40" cy="50" r="3" fill={color} opacity="0.6">
            <animateMotion dur="3s" repeatCount="indefinite">
              <mpath href="#eyePath" />
            </animateMotion>
          </circle>
        </g>
      )}
    </svg>
  );
}

// interface EyeLogoProps {
//   size?: number;
//   color?: string;
//   showAnimation?: boolean;
// }

// export default function EyeLogo({ size = 120, color = 'white', showAnimation = false }: EyeLogoProps) {
//   return (
//     <svg
//       width={size}
//       height={size * 0.6}
//       viewBox="0 0 160 100"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className="drop-shadow-lg"
//     >
//       <defs>
//         <path
//           id="eyePath"
//           d="M 20 50 Q 80 20 140 50 Q 80 80 20 50 Z"
//           fill="none"
//         />
//       </defs>

//       <path
//         d="M 20 50 Q 80 20 140 50 Q 80 80 20 50 Z"
//         stroke={color}
//         strokeWidth="2.5"
//         fill="none"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />

//       <circle cx="80" cy="50" r="16" fill={color} />
//       <circle cx="80" cy="50" r="10" fill="#4A7BA7" />
//       <circle cx="84" cy="46" r="3" fill={color} opacity="0.8" />

//       {showAnimation && (
//         <g>
//           <circle cx="40" cy="50" r="3" fill={color} opacity="0.6">
//             <animateMotion dur="3s" repeatCount="indefinite">
//               <mpath href="#eyePath" />
//             </animateMotion>
//           </circle>
//         </g>
//       )}
//     </svg>
//   );
// }
interface EyeLogoProps {
  size?: number;
  color?: string;
  showAnimation?: boolean;
}

export default function EyeLogo({
  size = 120,
  color = '#2F6FA3', // SAMVID blue
  showAnimation = false,
}: EyeLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      {/* Outer rounded-square frame */}
      <rect
        x="10"
        y="10"
        width="100"
        height="100"
        rx="22"
        ry="22"
        stroke={color}
        strokeWidth="6"
        fill="none"
      />

      {/* Inner hollow area (eye boundary suggestion) */}
      <rect
        x="28"
        y="42"
        width="64"
        height="36"
        rx="18"
        ry="18"
        stroke={color}
        strokeWidth="3"
        fill="none"
        opacity="0.9"
      />

      {/* Eyeball */}
      <circle cx="60" cy="60" r="14" fill={color} />

      {/* Iris */}
      <circle cx="60" cy="60" r="8" fill="#4A7BA7" />

      {/* Highlight */}
      <circle cx="64" cy="56" r="3" fill="white" opacity="0.85" />

      {/* Optional subtle animation */}
      {showAnimation && (
        <circle cx="60" cy="60" r="18" fill="none" stroke={color} strokeWidth="1" opacity="0.3">
          <animate
            attributeName="r"
            from="16"
            to="22"
            dur="2.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            from="0.4"
            to="0"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>
      )}
    </svg>
  );
}

import { useId } from 'react';

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  let id = useId();

  return (
    <svg viewBox="-2 -2 220 36" fill="blue" aria-hidden="true" {...props}>
      <path
        d="M31.75 18h-8.13a8 8 0 01-15.5 0H0a16 16 0 0031.75 0zm0-4h-8.13a8 8 0 00-15.5 0H0a16 16 0 0131.75 0z"
        fill={`url(#${id}-g)`}
      />
      <path
        d="M31.75 18l1 .12.13-1.12h-1.13v1zm-8.13 0v-1h-.77l-.2.75.97.25zm-15.5 0l.98-.25-.2-.75h-.77v1zM0 18v-1h-1.13l.14 1.12L0 18zm23.62-4l-.96.25.19.75h.77v-1zm8.13 0v1h1.13l-.14-1.12-.99.12zM8.13 14v1h.77l.2-.75-.97-.25zM0 14l-1-.12-.13 1.12H0v-1zm31.75 3h-8.13v2h8.13v-2zm-9.1.75A7 7 0 0115.89 23v2a9 9 0 008.71-6.75l-1.93-.5zM15.89 23a7 7 0 01-6.78-5.25l-1.94.5A9 9 0 0015.88 25v-2zm-7.75-6H0v2h8.13v-2zm7.75 14A15 15 0 01.99 17.88l-1.98.24A17 17 0 0015.88 33v-2zm14.88-13.12A15 15 0 0115.88 31v2a17 17 0 0016.86-14.88l-1.98-.24zM23.62 15h8.13v-2h-8.13v2zm-7.74-6a7 7 0 016.78 5.25l1.93-.5A9 9 0 0015.88 7v2zM9.1 14.25A7 7 0 0115.88 9V7a9 9 0 00-8.72 6.75l1.94.5zM0 15h8.13v-2H0v2zm1-.88A15 15 0 0115.87 1v-2A17 17 0 00-1 13.88l1.98.24zM15.87 1a15 15 0 0114.88 13.12l1.98-.24A17 17 0 0015.88-1v2z"
        fill="#B295B6"
        fillOpacity={0.5}
        mask={`url(#${id}-m)`}
      />
      <text fill="#959AB6" fontFamily="'Signika Negative'" fontSize="32" id="svg_1" stroke="#323231" strokeWidth="0.4" textAnchor="middle" x="115" y="24">OneContext</text>
      <defs>
        <linearGradient
          id={`${id}-g`}
          x1={15.88}
          y1={0}
          x2={18.88}
          y2={32}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#707489" />
          <stop offset={1} stopColor="#959AB6" />
        </linearGradient>
        <mask id={`${id}-m`} fill="#25262D">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M31.75 18h-8.13a8 8 0 01-15.5 0H0a16 16 0 0031.75 0zm0-4h-8.13a8 8 0 00-15.5 0H0a16 16 0 0131.75 0z"
          />
        </mask>
      </defs>
      {/* Extra path for the border effect */}
      <path 
        d="M31.75 18h-8.13a8 8 0 01-15.5 0H0a16 16 0 0031.75 0zm0-4h-8.13a8 8 0 00-15.5 0H0a16 16 0 0131.75 0z" 
        fill="#959AB6"
        stroke="#323231"
        opacity={1}
        strokeWidth="0.45"
      />
    </svg>
  );
}


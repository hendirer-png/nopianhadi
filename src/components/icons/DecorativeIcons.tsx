
import React from 'react';

export const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="currentColor">
    <path fillRule="evenodd" d="M23 27h-8a2 2 0 110-4h8v-8a2 2 0 114 0v8h8a2 2 0 110 4h-8v8a2 2 0 11-4 0v-8z" clipRule="evenodd" transform="rotate(45 25 25)"/>
  </svg>
);

export const MapPinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="currentColor">
    <path fillRule="evenodd" d="M25 3.5c-8.284 0-15 6.716-15 15 0 10.5 15 27.5 15 27.5s15-17 15-27.5c0-8.284-6.716-15-15-15zm0 21.5a6.5 6.5 0 110-13 6.5 6.5 0 010 13z" clipRule="evenodd"/>
  </svg>
);

export const ThumbsUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.262 3.693l.02.022c.45.422.68.99.68 1.564v4.223h4.035c.573 0 1.095.223 1.488.592.392.37.597.875.597 1.408 0 .2-.026.393-.078.578l-1.35 4.868c-.104.373-.307.7-.585.945-.278.244-.61.38-1.02.38H9.5V9.453L13.262 3.693zM8 21V9H4v12h4z" />
  </svg>
);

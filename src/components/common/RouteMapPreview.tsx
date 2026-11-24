import React from 'react';

interface RouteMapPreviewProps {
  pickup: string;
  destination: string;
  className?: string;
}

const RouteMapPreview: React.FC<RouteMapPreviewProps> = ({ pickup, destination, className = '' }) => (
  <div
    role="img"
    aria-label={`Illustrative route from ${pickup} to ${destination}`}
    className={`route-map-preview relative overflow-hidden ${className}`}
  >
    <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <path d="M-20 42 345 132M-18 146 336 28M42-20 108 202M232-22 176 204M294-18 250 205" className="route-map-road" />
      <path d="M-18 97C35 97 38 56 93 56s57 75 113 75 50-47 132-47" className="route-map-road route-map-road-wide" />
      <path d="M34 157C76 130 84 78 129 77s44 48 82 48 43-34 75-44" className="route-map-line" />
      <circle cx="34" cy="157" r="7" className="route-map-origin" />
      <circle cx="286" cy="81" r="7" className="route-map-destination" />
    </svg>
    <div className="absolute left-3 top-3 max-w-[46%] rounded-xl bg-surface px-3 py-2 shadow-md">
      <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">Pickup</p>
      <p className="truncate text-xs font-bold text-on-surface">{pickup || 'Set pickup point'}</p>
    </div>
    <div className="absolute bottom-3 right-3 max-w-[46%] rounded-xl bg-surface px-3 py-2 text-right shadow-md">
      <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">Destination</p>
      <p className="truncate text-xs font-bold text-on-surface">{destination || 'Choose destination'}</p>
    </div>
  </div>
);

export default RouteMapPreview;

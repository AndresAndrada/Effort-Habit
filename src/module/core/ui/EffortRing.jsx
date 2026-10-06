/* eslint-disable react/prop-types */
export const EffortRing = ({
  progress = 0,
  size = 120,
  strokeWidth = 8,
  showValue = true,
  valueLabel = "",
  className = "",
  animate = true,
  variant = "primary",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const strokeColor = variant === "track" ? "url(#track-gradient)" : "url(#effort-gradient)";
  const trackColor = variant === "track" ? "rgba(26, 166, 142, 0.15)" : "rgba(196, 90, 42, 0.15)";

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        <defs>
          <linearGradient id="effort-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7A4D" />
            <stop offset="50%" stopColor="#C45A2A" />
            <stop offset="100%" stopColor="#9D4522" />
          </linearGradient>
          <linearGradient id="track-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5CD6C5" />
            <stop offset="50%" stopColor="#1AA68E" />
            <stop offset="100%" stopColor="#116E5E" />
          </linearGradient>
        </defs>
        <circle
          className="transition-opacity duration-500"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animate ? circumference : offset}
          style={{
            strokeDashoffset: animate ? undefined : offset,
            transition: animate ? 'stroke-dashoffset 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
          }}
          className={animate ? "animate-ring-draw" : ""}
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-data-lg font-extrabold tracking-tight text-base-content">
            {Math.round(progress)}
          </span>
          {valueLabel && (
            <span className="text-caption text-base-500 uppercase tracking-wider mt-1">
              {valueLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export const EffortRingMini = ({
  progress = 0,
  size = 48,
  strokeWidth = 4,
  className = "",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          opacity="0.15"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          className="text-effort-500 dark:text-effort-400"
        />
      </svg>
    </div>
  );
};

export const EffortRingSpinner = ({
  size = 40,
  strokeWidth = 3,
  className = "",
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="animate-ring-rotate">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray="80 40"
          opacity="0.25"
          className="text-base-400"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray="80 40"
          className="text-effort-500 dark:text-effort-400"
        />
      </svg>
    </div>
  );
};
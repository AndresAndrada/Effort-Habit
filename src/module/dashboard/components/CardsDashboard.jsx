/* eslint-disable react/prop-types */
import { EffortRingMini } from "../../core/ui/EffortRing";
import { Title } from "../../core/ui/title/Title";

export const CardsDashboard = ({
  children,
  onClick,
  className = "",
  variant = "default",
}) => {
  const baseClasses = "relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer focus-ring";
  const variantClasses = {
    default: "bg-surface dark:bg-surface-dark border border-base-200 dark:border-base-700 hover:shadow-card-hover hover:border-effort-300 dark:hover:border-effort-700 hover:-translate-y-1",
    elevated: "bg-surface-elevated dark:bg-surface-elevated-dark shadow-card-elevated border border-base-200 dark:border-base-700 hover:shadow-card-elevated hover:-translate-y-2",
    outline: "bg-transparent border-2 border-base-300 dark:border-base-600 hover:border-effort-400 dark:hover:border-effort-600 hover:bg-effort-50 dark:hover:bg-effort-950/20",
  };

  return (
    <article
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.default} ${className}`}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); }} : undefined}
      role={onClick ? "button" : undefined}
      aria-pressed={false}
    >
      {children}
    </article>
  );
};

export const DashboardCard = ({
  title,
  description,
  image,
  icon,
  iconColor = "effort",
  progress,
  actionLabel,
  onClick,
  className = "",
}) => {
  const iconColors = {
    effort: "text-effort-500 dark:text-effort-400 bg-effort-50 dark:bg-effort-950/30",
    track: "text-track-500 dark:text-track-400 bg-track-50 dark:bg-track-950/30",
    info: "text-info dark:text-info bg-info/10 dark:bg-info/20",
  };

  return (
    <CardsDashboard onClick={onClick} className={`${className} flex flex-col h-full min-h-[280px]`}>
      {(image || icon) && (
        <div className="relative w-full h-40 sm:h-48 overflow-hidden">
          {image && (
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          )}
          {icon && !image && (
            <div className="w-full h-full flex items-center justify-center bg-base-100 dark:bg-base-800">
              <div className={`p-4 rounded-2xl ${iconColors[iconColor] || iconColors.effort}`}>
                {icon}
              </div>
            </div>
          )}
          {progress !== undefined && (
            <div className="absolute bottom-3 right-3">
              <EffortRingMini progress={progress} size={40} strokeWidth={3} />
            </div>
          )}
        </div>
      )}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
        <div>
          <Title size="heading-md" weight="bold" align="left" className="mb-2">
            {title}
          </Title>
          {description && (
            <p className="text-body-sm text-base-500 leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {actionLabel && (
          <div className="mt-4 pt-4 border-t border-base-200 dark:border-base-700">
            <span className="inline-flex items-center gap-1.5 text-body-sm font-medium text-effort-600 dark:text-effort-400 hover:gap-2 transition-gap duration-200">
              {actionLabel}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        )}
      </div>
    </CardsDashboard>
  );
};

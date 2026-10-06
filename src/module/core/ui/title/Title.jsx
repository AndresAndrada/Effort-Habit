/* eslint-disable react/prop-types */
export const Title = ({
  children,
  className = "",
  size = "display-sm",
  weight = "bold",
  align = "center",
  gradient = false,
  as = "h1",
}) => {
  const Tag = as;
  const sizeClasses = {
    "display-xl": "text-display-xl",
    "display-lg": "text-display-lg",
    "display-md": "text-display-md",
    "display-sm": "text-display-sm",
    "heading-xl": "text-heading-xl",
    "heading-lg": "text-heading-lg",
    "heading-md": "text-heading-md",
    "heading-sm": "text-heading-sm",
  };

  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <Tag
      className={`${sizeClasses[size] || sizeClasses["display-sm"]} ${weightClasses[weight] || weightClasses.bold} ${alignClasses[align] || alignClasses.center} font-display tracking-tight text-base-content ${gradient ? "gradient-text dark:gradient-text-dark" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
};

export const SectionTitle = ({ children, className = "", eyebrow, eyebrowClassName = "" }) => {
  return (
    <header className="mb-8">
      {eyebrow && (
        <span className={`inline-block text-caption font-semibold uppercase tracking-wider text-effort-600 dark:text-effort-400 mb-3 ${eyebrowClassName}`}>
          {eyebrow}
        </span>
      )}
      <Title size="heading-lg" weight="bold" align="left" className={className}>
        {children}
      </Title>
    </header>
  );
};

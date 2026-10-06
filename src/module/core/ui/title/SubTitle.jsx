/* eslint-disable react/prop-types */
export const SubTitle = ({
  children,
  className = "",
  size = "heading-md",
  weight = "semibold",
  align = "left",
  muted = false,
}) => {
  const sizeClasses = {
    "heading-xl": "text-heading-xl",
    "heading-lg": "text-heading-lg",
    "heading-md": "text-heading-md",
    "heading-sm": "text-heading-sm",
    "body-lg": "text-body-lg",
    "body": "text-body",
  };

  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <h2
      className={`${sizeClasses[size] || sizeClasses["heading-md"]} ${weightClasses[weight] || weightClasses.semibold} ${alignClasses[align] || alignClasses.left} font-display ${muted ? "text-base-500" : "text-base-content"} ${className}`}
    >
      {children}
    </h2>
  );
};

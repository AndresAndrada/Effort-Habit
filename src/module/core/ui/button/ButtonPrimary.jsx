/* eslint-disable react/prop-types */
export function ButtonPrimary({ href, onClick, children, variant = "solid", size = "md" }) {
  const baseClasses = "btn rounded-xl font-semibold transition-all duration-200 active:scale-[0.98] focus-ring border-0";

  const variantClasses = {
    solid: "bg-effort-600 text-white hover:bg-effort-700 shadow-lg shadow-effort-600/25",
    outline: "border-2 border-effort-600 text-effort-600 hover:bg-effort-50 dark:hover:bg-effort-950/30 bg-transparent",
    ghost: "bg-transparent text-effort-600 hover:bg-effort-50 dark:hover:bg-effort-950/30",
  };

  const sizeClasses = {
    sm: "btn-sm px-4",
    md: "btn-md px-6",
    lg: "btn-lg px-8",
  };

  return (
    <a
      href={href || undefined}
      onClick={onClick || undefined}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.solid} ${sizeClasses[size] || sizeClasses.md}`}
    >
      {children}
    </a>
  );
}

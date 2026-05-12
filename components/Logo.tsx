type LogoSize = "sm" | "md" | "lg";

export function Logo({
  size = "md",
  className = "",
}: {
  size?: LogoSize;
  className?: string;
}) {
  return (
    <span
      className={`logo logo--${size} ${className}`.trim()}
      aria-label="지오픽"
    >
      <span className="logo__wordmark">
        지오픽
        <span className="logo__dot" aria-hidden="true" />
      </span>
    </span>
  );
}

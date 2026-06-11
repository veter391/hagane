export function Kanji({
  char,
  className = "",
  style,
}: {
  char: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className={`kanji-anchor pointer-events-none select-none ${className}`}
      style={style}
    >
      {char}
    </span>
  );
}

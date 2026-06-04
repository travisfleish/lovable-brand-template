import { colors as colorTokens } from "~/tokens/tokens";

type LineBlockProps = {
  steps?: number;      // number of lines (14 | 20 | 30 recommended)
  color?: string;      // brand token name e.g. "blue", "brightGreen"
  rotation?: number;   // degrees — 45 is the canonical brand angle
  clip?: boolean;      // clip to bounding box — false (default) lets lines bleed freely
  className?: string;
  minStroke?: number;  // thinnest line (px in viewBox units)
  maxStroke?: number;  // thickest line
};

export default function LineBlock({
  steps = 20,
  color = "blue",
  rotation = 0,
  clip = false,
  className = "",
  minStroke = 0.8,
  maxStroke = 5,
}: LineBlockProps) {
  const hex = (colorTokens as Record<string, string>)[color] ?? color;

  // Scale up when rotated so lines fill the container corners cleanly
  const scale = Math.abs(rotation) === 45 ? 1.85 : Math.abs(rotation) === 90 ? 1 : 1;

  return (
    <div className={`${clip ? "overflow-hidden" : ""} ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 150"
        className="block h-full w-full"
        style={{
          transform:
            rotation !== 0
              ? `rotate(${rotation}deg) scale(${scale})`
              : undefined,
          transformOrigin: "center",
        }}
      >
        {Array.from({ length: steps }).map((_, i) => {
          const t = steps > 1 ? i / (steps - 1) : 0;
          const x = 3 + t * 194;
          const sw = minStroke + t * (maxStroke - minStroke);
          return (
            <line
              key={i}
              x1={x}
              y1={0}
              x2={x}
              y2={150}
              stroke={hex}
              strokeWidth={sw}
            />
          );
        })}
      </svg>
    </div>
  );
}

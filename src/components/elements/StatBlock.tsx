import { colors as colorTokens } from "~/tokens/tokens";

type StatBlockProps = {
  value: string;       // e.g. "47%", "125+", "3B+"
  label: string;       // descriptor below the number
  background?: string; // brand token name — omit for borderless light style
  className?: string;
};

export default function StatBlock({
  value,
  label,
  background,
  className = "",
}: StatBlockProps) {
  const isDark =
    !!background &&
    ["navy", "blue", "green", "purple", "red", "black"].includes(background);

  const bgStyle = background
    ? { backgroundColor: (colorTokens as Record<string, string>)[background] }
    : {};

  const valueColor = isDark ? "text-white" : "text-navy";
  const labelColor = isDark ? "text-white/60" : "text-navy/50";
  const lineColor = isDark ? "bg-brightGreen" : "bg-blue";

  return (
    <div
      className={`rounded-2xl px-6 py-8 ${background ? "" : "border border-lavenderGrey"} ${className}`}
      style={bgStyle}
    >
      <p
        className={`font-heading text-[52px] font-light leading-none tracking-tight ${valueColor}`}
      >
        {value}
      </p>
      <div className={`my-3 h-[2px] w-8 ${lineColor}`} />
      <p className={`font-body text-[14px] leading-snug ${labelColor}`}>
        {label}
      </p>
    </div>
  );
}

type LogoVariant = "horizontal" | "vertical" | "wordmark" | "marque";
type LogoColor = "blue" | "white";
type LogoSize = "standard" | "small";

interface LogoProps {
  variant?: LogoVariant;
  color?: LogoColor;
  size?: LogoSize;
  className?: string;
  alt?: string;
}

const logoMap: Record<LogoVariant, Record<LogoColor, Record<LogoSize, string>>> = {
  horizontal: {
    blue:  { standard: "/logos/GENIUS_SPORTS_HORIZONTAL_BLUE_RGB.svg",  small: "/logos/GENIUS_SPORTS_HORIZONTAL_BLUE_RGB.svg" },
    white: { standard: "/logos/GENIUS_SPORTS_HORIZONTAL_WHITE_RGB.svg", small: "/logos/GENIUS_SPORTS_HORIZONTAL_WHITE_RGB.svg" },
  },
  vertical: {
    blue:  { standard: "/logos/GENIUS_SPORTS_VERTICAL_BLUE_RGB.svg",  small: "/logos/GENIUS_SPORTS_VERTICAL_BLUE_RGB.svg" },
    white: { standard: "/logos/GENIUS_SPORTS_VERTICAL_WHITE_RGB.svg", small: "/logos/GENIUS_SPORTS_VERTICAL_WHITE_RGB.svg" },
  },
  wordmark: {
    blue:  { standard: "/logos/GENIUS_SPORTS_WORDMARK_BLUE_RGB.svg",  small: "/logos/GENIUS_SPORTS_WORDMARK_BLUE_RGB.svg" },
    white: { standard: "/logos/GENIUS_SPORTS_WORDMARK_WHITE_RGB.svg", small: "/logos/GENIUS_SPORTS_WORDMARK_WHITE_RGB.svg" },
  },
  marque: {
    blue:  { standard: "/logos/GENIUS_SPORTS_MARQUE_BLUE_RGB.svg",  small: "/logos/GENIUS_SPORTS_MARQUE_BLUE_RGB.svg" },
    white: { standard: "/logos/GENIUS_SPORTS_MARQUE_WHITE_RGB.svg", small: "/logos/GENIUS_SPORTS_MARQUE_WHITE_RGB.svg" },
  },
};

// Brand minimum widths (px) — vertical 110, horizontal/wordmark 70, marque 40
const minWidths: Record<LogoVariant, number> = {
  vertical: 110,
  horizontal: 70,
  wordmark: 70,
  marque: 40,
};

function Logo({
  variant = "horizontal",
  color = "blue",
  size = "standard",
  className = "",
  alt = "Genius Sports",
}: LogoProps) {
  const src = logoMap[variant][color][size];
  return <img src={src} alt={alt} className={className} style={{ minWidth: minWidths[variant] }} />;
}

export default Logo;

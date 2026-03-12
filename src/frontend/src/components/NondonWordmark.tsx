interface NondonWordmarkProps {
  /** "light" = white text with teal accent (for dark backgrounds) */
  /** "dark" = navy text with teal accent (for light backgrounds) */
  variant?: "light" | "dark";
  className?: string;
}

export default function NondonWordmark({
  variant = "light",
  className = "",
}: NondonWordmarkProps) {
  const baseLetters = variant === "light" ? "text-white" : "text-foreground";

  return (
    <span
      className={`inline-flex items-baseline select-none tracking-tight ${className}`}
      aria-label="Nondon"
    >
      {/* N-o-n */}
      <span
        className={`font-display font-black ${baseLetters}`}
        style={{ letterSpacing: "-0.03em" }}
      >
        Non
      </span>
      {/* d-o-n highlighted with accent gradient */}
      <span
        className="font-display font-black"
        style={{
          letterSpacing: "-0.03em",
          background:
            "linear-gradient(135deg, oklch(0.72 0.18 195) 0%, oklch(0.58 0.22 210) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        don
      </span>
    </span>
  );
}

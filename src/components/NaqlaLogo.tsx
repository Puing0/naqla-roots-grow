import logoSrc from "../assets/FROM_STRESS_TO_SUCCESS-removebg-preview.png";

export function NaqlaLogo({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const widths = {
    sm: 80,
    md: 120,
    lg: 160,
  }[size];

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src={logoSrc}
        alt="Naqla logo"
        width={widths}
        style={{ height: "auto" }}
        className="block"
      />
    </div>
  );
}

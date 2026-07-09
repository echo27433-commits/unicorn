import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-[#ff5f28] bg-[#ff5f28] text-white shadow-[0_0_32px_rgba(255,95,40,0.35)] hover:brightness-110 active:scale-[0.98]",
  secondary:
    "border border-white/30 bg-transparent text-white hover:border-white/60 hover:bg-white/5 active:scale-[0.98]",
  outline:
    "border border-white/30 bg-transparent text-white hover:border-white/60 hover:bg-white/5 active:scale-[0.98]",
};

function getButtonClass(variant: ButtonVariant = "primary") {
  return `${buttonBase} ${variantClasses[variant]}`;
}

const buttonClass = getButtonClass("primary");

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${getButtonClass(variant)} ${className}`}>
      {children}
    </Link>
  );
}

export { buttonClass, getButtonClass };
export type { ButtonVariant };

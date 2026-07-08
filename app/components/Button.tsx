import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline";

const buttonBase =
  "inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "rounded-xl border border-[#FFAA00]/50 bg-[#FFAA00] text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] hover:border-[#FFAA00] hover:bg-[#FFC033] hover:shadow-[0_4px_28px_rgba(255,170,0,0.35)] active:scale-[0.98]",
  secondary:
    "rounded-xl border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:border-[#FFAA00]/50 hover:bg-[#FFAA00]/10 hover:text-[#FFAA00] active:scale-[0.98]",
  outline:
    "rounded-full border border-[#FFAA00] bg-transparent text-[#FFAA00] hover:bg-[#FFAA00]/10 active:scale-[0.98]",
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

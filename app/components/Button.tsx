import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline";

const buttonBase = "btn";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "btn--primary",
  secondary: "btn--secondary",
  outline: "btn--outline",
};

function ArrowUpRightIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H9M17 7V15" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function getButtonClass(variant: ButtonVariant = "primary") {
  return `${buttonBase} ${variantClasses[variant]}`;
}

const buttonClass = getButtonClass("primary");

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  showIcon = true,
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  showIcon?: boolean;
}) {
  return (
    <Link href={href} className={`${getButtonClass(variant)} ${className}`}>
      {children}
      {showIcon ? (variant === "primary" ? <ArrowUpRightIcon /> : <ArrowRightIcon />) : null}
    </Link>
  );
}

export { buttonClass, getButtonClass, ArrowUpRightIcon, ArrowRightIcon };
export type { ButtonVariant };

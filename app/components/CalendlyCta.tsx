"use client";

import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";

import { openCalendlyPopup } from "../lib/calendly";

type CalendlyCtaProps = {
  children: ReactNode;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

/** Button that opens the Calendly schedule popup. */
export default function CalendlyCta({
  children,
  className = "",
  onClick,
  ...props
}: CalendlyCtaProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      openCalendlyPopup();
    }
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

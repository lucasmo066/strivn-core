import type { ComponentProps, ReactNode } from "react";

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main";
}

export interface LogoProps {
  className?: string;
  variant?: "lockup" | "wordmark";
  tone?: "black" | "white";
  priority?: boolean;
}

export interface BrandArrowProps {
  className?: string;
  variant?: "black" | "white" | "orange";
  filled?: boolean;
}

export interface StrivnButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  arrow?: boolean;
  asChild?: boolean;
}

export interface MonoLabelProps {
  children: ReactNode;
  className?: string;
}

export interface StatusChipProps {
  children: ReactNode;
  className?: string;
  status?: "active" | "idle" | "ok" | "warn" | "danger";
}

export interface SegmentedProgressProps {
  total: number;
  value: number;
  className?: string;
}

export interface CornerBracketsProps {
  className?: string;
  accent?: boolean;
  size?: number;
}

export interface SoftCardProps extends ComponentProps<"div"> {
  accent?: boolean;
  lift?: boolean;
}

export interface HairlineCardProps extends SoftCardProps {
  brackets?: boolean;
  accentBrackets?: boolean;
}

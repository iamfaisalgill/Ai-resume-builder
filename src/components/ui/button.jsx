import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
  variants: {
    variant: {
      default:
        "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
      destructive:
        "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
      outline:
        "border border-border text-primary bg-transparent hover:bg-primary/10 dark:text-white dark:hover:bg-white/10",
      secondary:
        "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
      ghost:
        "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      link: "text-primary underline-offset-4 hover:underline",

      // ✨ New Variants Below
      subtle:
        "bg-muted text-muted-foreground hover:bg-muted/80 dark:hover:bg-muted/60",
      elevated:
        "bg-primary text-white shadow-md hover:shadow-lg transition-shadow hover:bg-primary/80",
      glass:
        "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20",
      gradient:
        "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:brightness-105",
      gradientOutline:
        "bg-gradient-to-r from-transparent via-primary to-transparent text-primary border border-primary/50 hover:bg-primary/10",
      neumorphic:
        "bg-background text-foreground shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2),_inset_-4px_-4px_8px_rgba(255,255,255,0.1)] hover:shadow-inner",
      strongShadow:
        "bg-primary text-white shadow-xl hover:shadow-2xl transition-all duration-200",
      iconOnly:
        "bg-accent text-accent-foreground p-2 rounded-full hover:bg-accent/70",
      ghostOutline:
        "text-primary border border-border hover:bg-primary/5",

      // ✅ Semantic Variants
      success:
        "bg-[var(--success)] text-[var(--success-foreground)] hover:bg-[var(--success)]/90",
      warning:
        "bg-[--warning] text-[--warning-foreground] hover:bg-[--warning]/90",
      info:
        "bg-[--info] text-[--info-foreground] hover:bg-[--info]/90",
    },

  size: {
    default: "h-9 px-4 py-2 has-[>svg]:px-3",
    sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
    lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
    xl: "h-12 px-8 rounded-lg text-lg has-[>svg]:px-6",
    icon: "size-9",
    iconSm: "size-8",
    iconLg: "size-10",
  },
}
,

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

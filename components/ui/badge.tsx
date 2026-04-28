import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-brand-teal text-white",
        secondary: "border-transparent bg-brand-mint text-brand-stone",
        destructive: "border-transparent bg-red-500 text-white",
        outline: "border-brand-teal/20 bg-white/70 text-brand-ink"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

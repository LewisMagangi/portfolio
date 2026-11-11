import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Gambit Button mapped onto shadcn: primary -> default, secondary -> outline, ghost -> ghost.
// One filled (primary) button per view. 44px tall under 820px.
const buttonVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md border",
    "font-sans text-base font-semibold leading-6 no-underline",
    "transition-[background-color,border-color,color,transform] duration-fast ease-out",
    "active:scale-[.98] motion-reduce:active:scale-100",
    "disabled:cursor-not-allowed disabled:opacity-[.45] aria-disabled:cursor-not-allowed aria-disabled:opacity-[.45]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-primary bg-primary text-primary-foreground hover:border-primary-hover hover:bg-primary-hover",
        outline: "border-line-strong bg-transparent text-ink hover:border-ink-subtle hover:bg-surface-raised",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-surface-raised",
        ghost: "border-transparent bg-transparent text-ink-muted hover:text-ink",
        destructive: "border-danger bg-danger text-bg hover:brightness-110",
        link: "border-transparent text-ink underline decoration-line-strong underline-offset-[3px] hover:decoration-ink",
      },
      size: {
        default: "min-h-10 px-3 py-2 max-md:min-h-11",
        // Small buttons keep their 32px look; under 820px an invisible hit area takes the target to 44px.
        sm: "min-h-8 px-3 py-1.5 text-sm leading-5 max-md:after:absolute max-md:after:-inset-1.5 max-md:after:content-['']",
        lg: "min-h-12 px-5 py-3",
        icon: "size-10 p-0 max-md:size-11",
        "icon-sm": "size-8 p-0",
        "icon-lg": "size-12 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

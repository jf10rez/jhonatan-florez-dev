import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border text-sm font-medium whitespace-nowrap transition-all outline-none select-none uppercase tracking-wider focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#ff3b30] to-[#ff6a5c] text-white border-[#ff3b30] hover:shadow-[0_0_20px_rgba(255,59,48,0.4)] hover:from-[#ff6a5c] hover:to-[#ff3b30]",
        outline:
          "border-[rgba(255,59,48,0.3)] bg-transparent text-[#ff3b30] hover:border-[#ff3b30] hover:bg-[rgba(255,59,48,0.1)] hover:shadow-[0_0_15px_rgba(255,59,48,0.2)] aria-expanded:border-[#ff3b30] aria-expanded:bg-[rgba(255,59,48,0.1)]",
        secondary:
          "bg-[#111111] text-[#a1a1aa] border-[rgba(255,59,48,0.2)] hover:bg-[#1a1a1a] hover:text-white hover:border-[rgba(255,59,48,0.3)]",
        ghost:
          "text-[#a1a1aa] hover:bg-[rgba(255,59,48,0.1)] hover:text-[#ff3b30]",
        destructive:
          "bg-[rgba(255,59,48,0.1)] text-[#ff3b30] border-[rgba(255,59,48,0.3)] hover:bg-[rgba(255,59,48,0.2)]",
        link: "text-[#ff3b30] underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-1.5 px-4 text-sm has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

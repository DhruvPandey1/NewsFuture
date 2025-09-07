import React from "react"
import * as SeparatorPrimitive from "../lib/@radix-ui/react-separator" // relative import
import { cn } from "../../lib/utils" // relative import

const Separator = ({ className, orientation = "horizontal", decorative = true, ...props }) => (
  <SeparatorPrimitive.Root
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )}
    {...props}
  />
)

export { Separator }

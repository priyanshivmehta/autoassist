import React from "react";
import { cn } from "../../lib/utils";

export const Button = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

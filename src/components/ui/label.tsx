import { cn } from "@/lib/utils";
import * as React from "react";

interface InputProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, InputProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
          className
        )}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = "Label";

export { Label };

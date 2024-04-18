import * as React from "react";

interface InputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, InputProps>(
  ({ children, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={4}
        {...props}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {children}
      </textarea>
    );
  }
);

Textarea.displayName = "textarea";

export { Textarea };

import React from "react";
import { cn } from "@/lib/utils";

const PlusSign = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn("me-1 -ms-1 w-5 h-5", className)}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default PlusSign;

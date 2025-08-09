'use client'
import React from "react";
import { Roboto } from "next/font/google";
import { cn } from "@/lib/utils";

const roboto = Roboto(
  { subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '700', '900']
  }
);

// Variantes de estilo para el botón
const buttonVariants = {
  default: "bg-slate-900 text-white hover:bg-slate-800",
  ghost: "hover:bg-slate-100 text-slate-700",
  outline: "border border-slate-300 hover:bg-slate-100"
};

// Tamaños para el botón
const buttonSizes = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg"
};

const Button = ({ 
  onClick, 
  text, 
  children, 
  className, 
  variant = "default", 
  size = "md",
  disabled = false,
  ...props 
}) => {
    const variantClass = buttonVariants[variant] || buttonVariants.default;
    const sizeClass = buttonSizes[size] || buttonSizes.md;
    
    return (
        <button 
          onClick={onClick}
          disabled={disabled}
          className={cn(
            roboto.className,
            "rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
            variantClass,
            sizeClass,
            className
          )}
          {...props}
        >
            {children || text}
        </button>
    )
};

// Exportar como named export también para compatibilidad
export { Button };
export default Button;
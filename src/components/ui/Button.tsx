import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variantClasses = {
      default: "bg-primary-600 text-white hover:bg-primary-700",
      outline: "border-2 border-primary-200 text-primary-600 hover:border-primary-600 hover:bg-primary-50"
    }

  return (
    <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-full px-4 py-2 font-medium transition-colors ${variantClasses[variant]} ${className}`}
      {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button } 
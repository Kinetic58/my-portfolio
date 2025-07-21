import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
    {
        variants: {
            variant: {
                default: "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90 shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] hover:scale-105 font-semibold tracking-wide",
                destructive:
                    "bg-gradient-to-r from-destructive to-red-600 text-destructive-foreground hover:from-destructive/90 hover:to-red-600/90 shadow-[0_0_20px_hsl(var(--destructive)/0.3)] hover:shadow-[0_0_30px_hsl(var(--destructive)/0.5)] hover:scale-105",
                outline:
                    "border-2 border-primary bg-background/50 backdrop-blur-sm text-primary hover:bg-primary hover:text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.2)] hover:shadow-[0_0_25px_hsl(var(--primary)/0.4)] hover:scale-105 transition-all duration-300",
                secondary:
                    "bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground hover:from-secondary/90 hover:to-secondary/70 shadow-[0_0_15px_hsl(var(--secondary)/0.3)] hover:shadow-[0_0_25px_hsl(var(--secondary)/0.5)] hover:scale-105",
                ghost: "hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:shadow-[0_0_15px_hsl(var(--primary)/0.2)] hover:backdrop-blur-sm",
                link: "text-primary underline-offset-4 hover:underline hover:text-accent transition-colors duration-300",
                cyber: "bg-background border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.6)] hover:scale-110 font-bold tracking-wider uppercase before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-primary/20 before:to-transparent before:transform before:-skew-x-12 before:-translate-x-full before:transition-transform before:duration-700 hover:before:translate-x-full",
                neon: "bg-gradient-to-r from-cyber-blue to-cyber-purple text-white shadow-[0_0_25px_hsl(var(--cyber-blue)/0.4)] hover:shadow-[0_0_40px_hsl(var(--cyber-purple)/0.6)] hover:scale-105 font-semibold animate-pulse hover:animate-none",
                glow: "bg-gradient-to-r from-accent to-cyber-green text-primary-foreground shadow-[0_0_20px_hsl(var(--accent)/0.4)] hover:shadow-[0_0_35px_hsl(var(--cyber-green)/0.6)] hover:scale-105 transition-all duration-300"
            },
            size: {
                default: "h-10 px-6 py-2",
                sm: "h-8 rounded-md px-4 text-xs",
                lg: "h-12 rounded-lg px-10 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
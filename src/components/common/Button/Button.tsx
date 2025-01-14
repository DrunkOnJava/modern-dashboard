import React from "react";
import { ButtonProps } from "../../../types/button";

export const Button: React.FC<ButtonProps> = ({
	children,
	variant = "primary",
	size = "medium",
	disabled = false,
	fullWidth = false,
	onClick,
	className = "",
	type = "button",
	icon,
	loading = false,
	...props
}) => {
	const baseStyles =
		"inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

	const variantStyles = {
		primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
		secondary:
			"bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100",
		danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
		ghost:
			"bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300",
	};

	const sizeStyles = {
		small: "px-3 py-1.5 text-sm",
		medium: "px-4 py-2 text-base",
		large: "px-6 py-3 text-lg",
	};

	const classes = [
		baseStyles,
		variantStyles[variant],
		sizeStyles[size],
		fullWidth ? "w-full" : "",
		disabled ? "opacity-50 cursor-not-allowed" : "",
		className,
	].join(" ");

	return (
		<button
			type={type}
			className={classes}
			disabled={disabled || loading}
			onClick={onClick}
			{...props}
		>
			{loading && (
				<svg
					className="animate-spin -ml-1 mr-2 h-4 w-4"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					/>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
			)}
			{icon && <span className={`${children ? "mr-2" : ""}`}>{icon}</span>}
			{children}
		</button>
	);
};

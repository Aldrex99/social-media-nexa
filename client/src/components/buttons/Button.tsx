import { MouseEventHandler } from "react";
import { classNames } from "@utils/style";

type TButtonProps = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "primaryFlat" | "none";
  defaultPadding?: boolean;
  title?: string;
};

const variants = {
  primary:
    "rounded-md border border-transparent bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
  secondary: "rounded-md bg-gray-500 hover:bg-gray-600",
  primaryFlat:
    "rounded-md border border-blue-500 text-blue-500 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
  none: "",
};

export default function Button({
  children,
  type,
  onClick,
  disabled,
  title,
  className = "",
  defaultPadding = true,
  variant = "primary",
}: TButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        "flex h-fit w-fit items-center justify-center font-medium",
        defaultPadding ? "px-4 py-2" : "",
        `${variants[variant]}`,
        className,
      )}
      title={title}
    >
      {children}
    </button>
  );
}

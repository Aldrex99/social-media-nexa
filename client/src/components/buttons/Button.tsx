import { MouseEventHandler } from "react";
import { classNames } from "@utils/style";

type TButtonProps = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "primaryFlat" | "none";
  title?: string;
};

const variants = {
  primary:
    "border border-transparent bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
  secondary: "bg-gray-500 hover:bg-gray-600",
  primaryFlat:
    "border border-blue-500 text-blue-500 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
  none: "",
};

export default function Button({
  children,
  type,
  onClick,
  disabled,
  className,
  title,
  variant = "primary",
}: TButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        "flex h-fit w-fit items-center justify-center rounded-md px-4 py-2 font-medium",
        `${variants[variant]}`,
        className ?? "",
      )}
      title={title}
    >
      {children}
    </button>
  );
}

import React from "react";

interface ButtonProps {
  type?: "submit" | "reset" | "button";
  title: string;
  disabled?: boolean;
  onClick?: () => void;
  endElement?: React.ReactNode;
  classes?: string;
  divClasses?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const Button = ({
  title,
  type = "button",
  disabled,
  onClick,
  endElement,
  classes,
  divClasses,
  onMouseEnter,
  onMouseLeave,
}: ButtonProps) => {
  return (
    <div
      {...{
        className: `bg-actionPrimary rounded text-white w-full flex ${
          divClasses && divClasses
        }`,
        onMouseEnter,
        onMouseLeave,
      }}
    >
      <button
        className={`p-2 text-2xl font-medium ${
          endElement ? "w-9/12" : "w-full"
        } ${classes && classes}`}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {title}
      </button>
      {endElement && <div className="w-3/12">{endElement} </div>}
    </div>
  );
};

export default Button;

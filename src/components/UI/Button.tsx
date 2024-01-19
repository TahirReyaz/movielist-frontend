import React from "react";

interface ButtonProps {
  type?: "submit" | "reset" | "button";
  title: string;
  disabled?: boolean;
  onClick?: () => void;
  endElement?: React.ReactNode;
  classes?: string;
  divClasses?: string;
}

const Button = ({
  title,
  type = "button",
  disabled,
  onClick,
  endElement,
  classes,
  divClasses,
}: ButtonProps) => {
  return (
    <div
      className={`bg-actionPrimary rounded text-white w-full flex ${
        divClasses && divClasses
      }`}
    >
      <button
        className={`p-2 ${endElement ? "w-9/12" : "w-full"} ${
          classes && classes
        }`}
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

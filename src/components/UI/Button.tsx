import React from "react";

interface ButtonProps {
  type: "submit" | "reset" | "button" | undefined;
  title: string;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className="bg-actionPrimary rounded p-2 text-white"
      type={props.type}
      disabled={props.disabled}
    >
      {props.title}
    </button>
  );
};

export default Button;

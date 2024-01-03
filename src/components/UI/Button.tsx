import React from "react";

interface ButtonProps {
  type: "submit" | "reset" | "button" | undefined;
  title: string;
  disabled?: boolean;
  onClick?: () => void;
  endElement?: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  return (
    <div className="bg-actionPrimary rounded text-white w-full flex">
      <button
        className={" p-2 " + props.endElement ? "w-9/12" : ""}
        type={props.type}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.title}
      </button>
      {props.endElement && <div className="w-3/12">{props.endElement} </div>}
    </div>
  );
};

export default Button;

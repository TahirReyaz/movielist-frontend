import React from "react";
import { IconType } from "react-icons";
import { formatDateForInput } from "../../lib/helpers";

interface TextInputProps {
  name: string;
  type: string;
  label?: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  classes?: string;
  divClasses?: string;
  min?: number;
  max?: number;
  Icon?: IconType;
  bg?: string;
}

const TextInput = ({
  value,
  onChange,
  onClick,
  label,
  type,
  name,
  classes,
  divClasses,
  min,
  max,
  Icon,
  bg = "bg-bgPrimary",
}: TextInputProps) => {
  let respectiveValue = value;
  if (type === "date") {
    respectiveValue = formatDateForInput(value.toString());
  }
  return (
    <div
      className={`relative my-2 rounded-md ${Icon && "grid grid-cols-12"} ${
        divClasses && divClasses
      } ${bg}`}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
    >
      {Icon && (
        <div className="col-span-1 text-2xl text-textPrimary flex self-center justify-center">
          <Icon />
        </div>
      )}
      <input
        value={respectiveValue}
        onChange={onChange}
        type={type}
        name={name}
        id={name}
        className={`block focus:outline-none w-full text-[1.4rem] rounded-md border-0 py-4 pl-6 pr-20 text-gray-900 placeholder:text-gray-400 ${
          Icon && "col-span-11"
        } ${classes && classes} ${bg}`}
        placeholder={label}
        min={min}
        max={max}
      />
    </div>
  );
};

export default TextInput;

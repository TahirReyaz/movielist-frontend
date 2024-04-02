import React from "react";

interface TextInputProps {
  name: string;
  type: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  classes?: string;
  divClasses?: string;
}

const TextInput = ({
  value,
  onChange,
  label,
  type,
  name,
  classes,
  divClasses,
}: TextInputProps) => {
  return (
    <div className={`relative my-2 rounded-md ${divClasses && divClasses}`}>
      <input
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        id={name}
        className={`block bg-bgPrimary w-full text-[1.4rem] rounded-md border-0 py-4 pl-6 pr-20 text-gray-900 placeholder:text-gray-400 ${
          classes && classes
        }`}
        placeholder={label}
      />
    </div>
  );
};

export default TextInput;

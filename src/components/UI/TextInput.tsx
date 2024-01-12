import React from "react";

interface TextInputProps {
  name: string;
  type: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = (props: TextInputProps) => {
  return (
    <div className="relative my-2 rounded-md">
      <input
        value={props.value}
        onChange={props.onChange}
        type={props.type}
        name={props.name}
        id={props.name}
        className="block bg-bgPrimary w-full rounded-md border-0 py-2 pl-3 pr-20 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        placeholder={props.label}
      />
    </div>
  );
};

export default TextInput;

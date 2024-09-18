import React, {
  Dispatch,
  HTMLInputTypeAttribute,
  SetStateAction,
  useState,
} from "react";
import { RxCross1 } from "react-icons/rx";

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
}

const TextInputWithClearButton = ({
  value,
  setValue,
  type,
  placeholder,
}: Props) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="grid grid-cols-12 items-center bg-anilist-white_firefly/80 rounded-md text-anilist-aqua_haze/80 w-full text-2xl px-4 mb-4"
    >
      <input
        {...{
          className:
            "col-span-11 bg-anilist-white_firefly/80 py-4 focus:outline-none",
          type,
          value,
          onChange: (e) => setValue(e.target.value),
          required: true,
          placeholder,
        }}
      />
      <div className="flex justify-end">
        {value.length > 0 && hover && (
          <div
            className="bg-anilist-aqua_haze/80 rounded-full text-anilist-ebony_clay p-1 w-fit h-fit cursor-pointer"
            onClick={() => setValue("")}
          >
            <RxCross1 className="text-sm" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TextInputWithClearButton;

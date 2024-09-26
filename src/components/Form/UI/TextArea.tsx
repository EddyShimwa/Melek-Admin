import { InputProps } from "@/@types/props";
import React, { FC } from "react";

const TextArea: FC<InputProps> = ({
  name,
  placeholder,
  error,
  register,
}) => {
  return (
    <div className="flex flex-col w-full mb-3">
      <p className="text-xs text-red-600 mb-1 min-h-4">{error && error.message}</p>
      <textarea
        placeholder={placeholder}
        {...register(name)}
        className={`w-full py-2 text-xs border-b ${error ? "border-red-600" : "border-gray-400"} outline-none bg-transparent h-[100px] resize-none overflow-scroll`}
      />
    </div>
  );
};

export default TextArea;



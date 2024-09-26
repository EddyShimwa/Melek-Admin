import { InputProps } from "../../../../@types/props";
import React, { FC } from "react";

const Input: FC<InputProps> = ({
  name,
  type,
  placeholder,
  error,
  register,
}) => {
  return (
    <div className="flex flex-col w-full mb-3">
      <p className="text-xs text-red-600 mb-1 min-h-4">{error && error.message}</p>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full py-2 text-xs border-b ${error ? "border-red-600" : "border-gray-400"} outline-none bg-transparent`}
      />
    </div>
  );
};

export default Input;



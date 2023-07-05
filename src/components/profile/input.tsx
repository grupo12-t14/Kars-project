import { InputHTMLAttributes, forwardRef } from "react";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

interface iInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register?: any;
}

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, iInputProps>(
  ({ label, placeholder, register, ...rest }) => {
    return (
      <>
        <div className="flex flex-col">
          <label htmlFor={label}>{label}</label>
          <input
            {...rest}
            className="border-gray-700 w-full pl-2 border-[2px] rounded-md h-8"
            placeholder={placeholder}
            {...register}
          />
        </div>
      </>
    );
  }
);

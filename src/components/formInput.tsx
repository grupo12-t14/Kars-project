import { iInputForm } from "@/types/types";

export const InputContainer = ({
  label,
  placeholder,
  type,
  value,
  maxlength,
  register,
  onBlur,
  onInput,
}: iInputForm) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor="" className="font-semibold">
        {label}
      </label>
      <input
        autoComplete="off"
        type={type}
        placeholder={placeholder}
        className="h-[44px]
        bg-white
        border-[1px]
        border-gray-500
        rounded-sm
        p-2
        w-full
        [appearance:textfield]
        [&::-webkit-outer-spin-button]:appearance-none
        [&::-webkit-inner-spin-button]:appearance-none
        focus:outline-none
        hover:border-brand-100
        focus:border-brand-100"
        onInput={onInput}
        value={value}
        maxLength={maxlength}
        {...register}
        onBlur={onBlur}
      />
    </div>
  );
};

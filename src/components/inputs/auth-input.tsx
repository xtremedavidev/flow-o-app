import { forwardRef } from "react";

interface AuthInputProps {
  type: string;
  placeholder: string;
  label: string;
  error?: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ type, placeholder, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-base font-semibold capitalize">{label}</label>
        <input
          {...props}
          type={type}
          ref={ref}
          placeholder={placeholder}
          className="h-[48px] w-full rounded-[34px] bg-[#464646] pl-4 text-sm font-normal text-white placeholder:text-white"
        />
        {error && (
          <p className="mt-1 text-sm font-normal capitalize text-[#FF5555]">
            {error}
          </p>
        )}
      </div>
    );
  },
);

AuthInput.displayName = "AuthInput";

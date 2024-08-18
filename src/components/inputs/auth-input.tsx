"use client";

import { forwardRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

interface AuthInputProps {
  type: string;
  placeholder: string;
  label: string;
  error?: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ type, placeholder, label, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="flex flex-col gap-2">
        <label className="text-base font-semibold capitalize">{label}</label>
        {type !== "password" && (
          <input
            {...props}
            type={type}
            ref={ref}
            placeholder={placeholder}
            className="h-[48px] w-full rounded-[34px] bg-[#464646] pl-4 text-sm font-normal text-white placeholder:text-white"
          />
        )}
        {type === "password" && (
          <div className="relative rounded-[34px] bg-[#464646]">
            <input
              {...props}
              type={showPassword ? "text" : "password"}
              ref={ref}
              placeholder={placeholder}
              className="h-[48px] w-full rounded-[34px] bg-[#464646] pl-4 pr-[52px] text-sm font-normal text-white placeholder:text-white"
            />

            {showPassword ? (
              <FaEyeSlash
                size={20}
                color="#9CA3AF"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer text-white"
              />
            ) : (
              <FaEye
                size={20}
                color="#9CA3AF"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer text-white"
              />
            )}
          </div>
        )}
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

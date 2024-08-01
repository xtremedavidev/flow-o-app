"use client";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import PinInput from "react-pin-input";

// export const metadata: Metadata = {
//   title: "FlowOptix | Login",
//   description: "Authentication for FlowOptix",
// };

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const UserData = {
      email: data.email,
      password: data.password,
    };
  };

  return (
    <main className="custom-login-gradient relative flex min-h-screen items-center justify-center">
      <Image
        src="/images/flowoptix-logo-big.png"
        alt="FlowOptix"
        width={200}
        height={200}
        className="absolute left-0 top-1/2 z-0 h-[75%] w-auto -translate-y-1/2"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-[1] flex w-full max-w-[890px] flex-col gap-10 rounded-[36px] border-[1.5px] border-solid border-[#297FB8] bg-[#272727] p-12 2xl:p-20"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">Welcome Back,</h1>
          <p className="text-base font-normal">Please Log in to continue</p>
        </div>

        <div className="flex flex-col gap-[44px]">
          {loginArr.map(({ name, label, type }) => (
            <LoginInput
              key={name}
              type={type as "email" | "password"}
              placeholder={`Enter your ${label}`}
              label={label}
              error={errors[name]?.message as string}
              {...register(name, {
                required: `${label} is required`,
              })}
            />
          ))}
        </div>

        {/* <div className="flex flex-col items-center gap-[44px]">
        

          <PinInput
            length={5}
            initialValue=""
            secret
            secretDelay={100}
            onChange={(value, index) => {}}
            type="numeric"
            inputMode="number"
            style={{ padding: "10px", gap: "20px" }}
            inputStyle={{
              borderRadius: "13px",
              backgroundColor: "#464646",
            }}
            inputFocusStyle={{
              borderColor: "blue",
              borderRadius: "13px",
              backgroundColor: "#464646",
            }}
            onComplete={(value, index) => {}}
            autoSelect={true}
            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
          />
        </div> */}

        <div className="flex items-center justify-between text-sm font-normal">
          <div className="flex gap-2">
            <input type="checkbox" />
            <p>Remember me</p>
          </div>

          <p>
            Forgot your Password?{" "}
            <Link href="" className="font-bold">
              Reset
            </Link>
          </p>
        </div>

        <button
          type="submit"
          className="h-[48px] w-full items-center justify-center rounded-[17px] bg-[#297FB8] text-base font-semibold"
        >
          Log In
        </button>
      </form>
    </main>
  );
};
export default Login;

interface LoginInputProps {
  type: "email" | "password";
  placeholder: string;
  label: string;
  error?: string;
}

const LoginInput = forwardRef<HTMLInputElement, LoginInputProps>(
  ({ type, placeholder, label, error }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-base font-semibold capitalize">{label}</label>
        <input
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

LoginInput.displayName = "LoginInput";

export interface LoginInputs {
  email: string;
  password: string;
}

export interface LoginFormField {
  name: keyof LoginInputs;
  label: string;
  type: string;
}

const loginArr: LoginFormField[] = [
  {
    label: "email",
    name: "email",
    type: "email",
  },

  {
    label: "password",
    name: "password",
    type: "password",
  },
];

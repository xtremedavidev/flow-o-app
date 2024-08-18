"use client";

import { AuthInput } from "@/components";
import { DefaultResponse } from "@/types";
import { encryptToken, fetcher } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface LoginResponse extends DefaultResponse {
  token: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const [rememberMe, setRememberMe] = useState(true);

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: { identifier: string; password: string }) => {
      return fetcher<LoginResponse>(
        `${process.env.NEXT_PUBLIC_BASEURL}/user-gateway/login`,
        {
          method: "POST",
          data,
        },
      );
    },
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const UserData = {
      identifier: data.email,
      password: data.password,
    };

    try {
      const res = await mutation.mutateAsync(UserData);

      if (res?.message === "success") {
        const token = res?.token;
        const encryptedToken = encryptToken(token);

        localStorage.setItem("token", encryptedToken);
        toast.success("Login Successful");
        router.push("/dashboard/home");
      } else {
        if (res?.message) {
          toast.error(res?.message);
          console.log("else block res----", res);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-10"
    >
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Welcome Back,</h1>
        <p className="text-base font-normal">Please Log in to continue</p>
      </div>

      <div className="flex flex-col gap-[44px]">
        {loginArr.map(({ name, label, type }) => (
          <AuthInput
            key={name}
            type={type}
            placeholder={`Enter your ${label}`}
            label={label}
            error={errors[name]?.message as string}
            {...register(name, {
              required: `${label} is required`,
            })}
          />
        ))}
      </div>

      <div className="flex flex-col justify-between gap-4 text-sm font-normal lg:flex-row lg:items-center">
        <div className="flex gap-2">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <p>Remember me</p>
        </div>

        <p>
          Forgot your Password?{" "}
          <Link href="/login/forgot-password" className="font-bold">
            Reset
          </Link>
        </p>
      </div>

      <button
        type="submit"
        className={`h-[48px] w-full items-center justify-center rounded-[17px] bg-[#297FB8] text-base font-semibold ${mutation.isPending && "animate-pulse"}`}
      >
        {mutation.isPending ? "Loading..." : "Log In"}
      </button>
    </form>
  );
};
export default Login;

interface LoginInputs {
  email: string;
  password: string;
}

interface LoginFormField {
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

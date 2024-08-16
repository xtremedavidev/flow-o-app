"use client";

import { AuthInput } from "@/components";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInputs>();

  const mutation = useMutation({
    mutationFn: (data: { identifier: string }) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/user-gateway/retrieve-password-email`,
        data,
      );
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordInputs> = async (data) => {
    const UserData = {
      identifier: data.identifier,
    };

    console.log("hee", UserData);

    try {
      const res = await mutation.mutateAsync(UserData);

      console.log("res", res);

      if (res?.data?.message === "success") {
        toast.success("Success, please check your email for the reset link");
      } else {
        if (res?.data?.message) {
          toast.error(res?.data?.message);
          console.log("hello 22", res);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Reset Failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-10"
    >
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Forgot Password</h1>
        <p className="text-base font-normal">
          Please provide your email so we can send your password reset link
        </p>
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

      <button
        type="submit"
        className="h-[48px] w-full items-center justify-center rounded-[17px] bg-[#297FB8] text-base font-semibold"
      >
        Send OTP
      </button>
    </form>
  );
}

interface ForgotPasswordInputs {
  identifier: string;
}

interface ForgetPassFormField {
  name: keyof ForgotPasswordInputs;
  label: string;
  type: string;
}

const loginArr: ForgetPassFormField[] = [
  {
    name: "identifier",
    label: "email",
    type: "email",
  },
];

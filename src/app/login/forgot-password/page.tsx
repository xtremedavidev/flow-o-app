"use client";

import { AuthInput } from "@/components";
import { DefaultResponse } from "@/types";
import { encryptToken, fetcher } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInputs>();

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: { identifier: string }) => {
      return fetcher<DefaultResponse>(
        `${process.env.NEXT_PUBLIC_BASEURL}/user-gateway/retrieve-password-email`,
        {
          method: "POST",
          data,
        },
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

      if (res?.message === "success") {
        toast.success("Success, please check your email for an OTP");
        router.push(
          "/login/verify?identifier=" +
            encodeURIComponent(encryptToken(data.identifier)),
        );
      } else {
        if (res?.message) {
          toast.error(res?.message);
          console.log("hello 22", res);
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
        className={`h-[48px] w-full items-center justify-center rounded-[17px] bg-[#297FB8] ${mutation.isPending && "animate-pulse"} text-base font-semibold`}
      >
        {mutation.isPending ? "Loading..." : "Send OTP"}
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

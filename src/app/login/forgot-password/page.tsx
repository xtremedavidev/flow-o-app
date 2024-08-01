"use client";

import { AuthBgWrapper, AuthInput } from "@/components";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<ForgotPasswordInputs> = async (data) => {
    const UserData = {
      email: data.email,
    };

    console.log("hee", UserData);
    router.push("/login/verify");
  };

  return (
    <AuthBgWrapper>
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
    </AuthBgWrapper>
  );
}

 interface ForgotPasswordInputs {
  email: string;
}

 interface ForgetPassFormField {
  name: keyof ForgotPasswordInputs;
  label: string;
  type: string;
}

const loginArr: ForgetPassFormField[] = [
  {
    label: "email",
    name: "email",
    type: "email",
  },
];

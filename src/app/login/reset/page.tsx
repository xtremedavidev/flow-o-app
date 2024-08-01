"use client";

import { AuthBgWrapper, AuthInput } from "@/components";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaSquareXTwitter } from "react-icons/fa6";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<ResetPasswordInputs> = async (data) => {
    const UserData = {
      password: data.password,
      confirmpass: data.confirm_pass,
    };

    console.log("hee", UserData);

    router.push("/login");
  };

  return (
    <AuthBgWrapper>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-8"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-[32px] font-semibold">Reset Password</h1>
        </div>

        <div className="flex flex-col gap-[30px]">
          {loginArr.map(({ name, label, type }) => (
            <AuthInput
              key={name}
              type={type}
              placeholder={
                name === "confirm_pass" ? `${label}` : `Enter your ${label}`
              }
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
          Reset Password
        </button>
      </form>

      <p className="text-center text-xl font-semibold">or</p>

      <div className="flex items-center justify-between">
        {LoginWithOptions.map((item, idx) => (
          <LoginWithBtn key={item.label} icon={item.icon} label={item.label} />
        ))}
      </div>
    </AuthBgWrapper>
  );
};
export default ResetPassword;

interface ResetPasswordInputs {
  password: string;
  confirm_pass: string;
}

interface LoginFormField {
  name: keyof ResetPasswordInputs;
  label: string;
  type: string;
}

const loginArr: LoginFormField[] = [
  {
    label: "new password",
    name: "password",
    type: "password",
  },
  {
    label: "Confirm new password",
    name: "confirm_pass",
    type: "password",
  },
];

const LoginWithOptions = [
  {
    icon: <FcGoogle size={31} />,
    label: "Google",
  },
  {
    icon: <FaSquareXTwitter color="#000" size={31} />,
    label: "Twitter",
  },
];

const LoginWithBtn = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => {
  return (
    <div className="flex w-full max-w-[280px] items-center justify-center gap-3 rounded-[87px] border-[1.5px] border-solid border-[#297FB8] py-4 text-xl font-medium text-white">
      {icon}
      <span>{label}</span>
    </div>
  );
};

"use client";

import { AuthInput } from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaSquareXTwitter } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const encryptedIdentifierFromURL = searchParams.get("identifier");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof ResetPassowrdSchema>>({
    resolver: zodResolver(ResetPassowrdSchema),
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: { identifier: string; password: string }) => {
      return fetcher<DefaultResponse>(
        `${process.env.NEXT_PUBLIC_BASEURL}/user-gateway/forget-password`,
        {
          method: "POST",
          data,
        },
      );
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof ResetPassowrdSchema>> = async (
    data,
  ) => {
    if (!encryptedIdentifierFromURL) {
      toast.error("Invalid Identifier");
      router.push("/login/forgot-password");
    } else {
      const identifier = decodeURIComponent(
        decryptToken(decodeURIComponent(encryptedIdentifierFromURL)),
      );
      const UserData = {
        identifier: identifier,
        password: data.password,
      };

      console.log("user data-------", UserData);

      try {
        const res = await mutation.mutateAsync(UserData);

        console.log("res", res);

        if (res?.message === "success") {
          toast.success("Password Reset Successfully");
          router.push("/login");
        } else {
          if (res?.message) {
            toast.error(res?.message);
            console.log("hello 22", res);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    // <>
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
        className={`h-[48px] w-full items-center justify-center rounded-[17px] ${mutation.isPending && "animate-pulse"} bg-[#297FB8] text-base font-semibold`}
      >
        {mutation.isPending ? "Loading..." : "Reset Password"}
      </button>
    </form>

    //   <p className="text-center text-xl font-semibold">or</p>

    //   <div className="flex items-center justify-between">
    //     {LoginWithOptions.map((item, idx) => (
    //       <LoginWithBtn key={item.label} icon={item.icon} label={item.label} />
    //     ))}
    //   </div>
    // </>
  );
};
export default ResetPassword;

import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { decryptToken, fetcher } from "@/utils";
import { DefaultResponse, ErrorResponse } from "@/types";

const ResetPassowrdSchema = z
  .object({
    identifier: z.string().email().optional(),
    password: z.string().min(4).max(20),
    confirm_pass: z.string().min(4).max(20),
  })
  .refine((data) => data.password === data.confirm_pass, {
    message: "Passwords don't match",
    path: ["confirm_pass"],
  });

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

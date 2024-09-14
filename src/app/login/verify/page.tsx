"use client";

import { DefaultResponse } from "@/types";
import { decryptToken, encryptToken, fetcher } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PinInput from "react-pin-input";
import { toast } from "react-toastify";

const VerifyLogin = () => {
  const searchParams = useSearchParams();
  const encryptedIdentifierFromURL = searchParams.get("identifier");

  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    // Check if window is defined
    if (typeof window !== "undefined") {
      const handleResize = () => setIsMobile(window.innerWidth < 600);
      setIsMobile(window.innerWidth < 600); // Initialize state based on current window size
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (timerActive && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setTimerActive(false);
      if (timer) clearInterval(timer);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [secondsLeft, timerActive]);

  const mutation = useMutation({
    mutationFn: (data: { identifier: string; authToken: string }) => {
      return fetcher<DefaultResponse>(
        `${process.env.NEXT_PUBLIC_BASEURL}/user-gateway/confirm-code-forgot-password`,
        {
          method: "POST",
          data,
        }
      );
    },
  });

  const onSubmit = async (otp: string) => {
    if (!encryptedIdentifierFromURL) {
      toast.error("Invalid Identifier");
      router.push("/login/forgot-password");
    } else {
      const identifier = decodeURIComponent(
        decryptToken(decodeURIComponent(encryptedIdentifierFromURL))
      );

      const UserData = {
        identifier: identifier,
        authToken: otp,
      };

      console.log("user data-------", UserData);

      try {
        const res = await mutation.mutateAsync(UserData);

        console.log("res", res);

        if (res?.data?.message === "success") {
          toast.success("OTP Verified Successfully");
          console.log("to check something", encryptedIdentifierFromURL);

          router.push(
            "/login/reset?identifier=" +
              encodeURIComponent(encryptToken(identifier))
          );
        } else {
          if (res?.data?.message) {
            toast.error(res?.data?.message);
            console.log("hello 22", res);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleResend = async () => {
    if (!encryptedIdentifierFromURL) {
      toast.error("Invalid Identifier");
      return;
    }

    setTimerActive(true);
    setSecondsLeft(60);

    await fetcher<DefaultResponse>(
      `${process.env.NEXT_PUBLIC_BASEURL}/user-gateway/retrieve-password-email`,
      {
        method: "POST",
        data: {
          identifier: decodeURIComponent(
            decryptToken(encryptedIdentifierFromURL)
          ),
        },
      }
    )
      .then((res) => {
        if (res?.data?.message === "success") {
          toast.success("An OTP has been sent to your email");
        } else {
          if (res?.data?.message) {
            toast.error(res?.data?.message);
            console.log("hello 22", res);
          }
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to resend OTP");
      });
  };

  return (
    <>
      <div className="flex flex-col items-center gap-[30px]">
        <div className="space-y-5 text-center">
          <h1 className="text-[32px] font-semibold">Email Verification</h1>
          <p className="text-lg font-normal">
            We sent an OTP to your email, please enter it here
          </p>
        </div>

        <PinInput
          length={4}
          initialValue=""
          secret
          secretDelay={100}
          type="numeric"
          inputMode="number"
          style={{
            padding: "10px",
            display: "flex",
            gap: isMobile ? "10px" : "20px",
          }}
          inputStyle={{
            borderRadius: "13px",
            borderWidth: "0px",
            backgroundColor: "#464646",
            width: "60px",
            height: "60px",
          }}
          inputFocusStyle={{
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "blue",
            borderRadius: "13px",
            backgroundColor: "#464646",
          }}
          onComplete={(value, index) => {
            onSubmit(value);
          }}
          autoSelect={true}
          regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
        />

        <div className="flex w-full items-center justify-between text-lg font-normal">
          <div className="flex gap-2">
            <p>
              Resend in {Math.floor(secondsLeft / 60)}:
              {String(secondsLeft % 60).padStart(2, "0")}
            </p>
          </div>

          <button
            className={`${timerActive ? "text-[#6A6A6A]" : "text-[#297FB8]"}`}
            onClick={handleResend}
            disabled={timerActive}
          >
            Resend OTP
          </button>
        </div>

        <button
          onClick={() => router.push("/home")}
          type="submit"
          className={`h-[48px] w-full items-center justify-center rounded-[17px] bg-[#297FB8] ${mutation.isPending && "animate-pulse"} text-base font-semibold`}
        >
          {mutation.isPending ? "Loading..." : "Submit"}
        </button>
      </div>
    </>
  );
};

export default VerifyLogin;

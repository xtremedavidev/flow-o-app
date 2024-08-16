"use client";

import { AuthBgWrapper } from "@/components";
import { useRouter } from "next/navigation";
import PinInput from "react-pin-input";

const VerifyLogin = () => {
  const router = useRouter();
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
          length={5}
          initialValue=""
          secret
          secretDelay={100}
          onChange={(value, index) => {}}
          type="numeric"
          inputMode="number"
          style={{ padding: "10px", display: "flex", gap: "20px" }}
          inputStyle={{
            borderRadius: "13px",
            borderWidth: "0px",
            backgroundColor: "#464646",
            width: "80px",
            height: "60px",
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

        <div className="flex w-full items-center justify-between text-lg font-normal">
          <div className="flex gap-2">
            <p>Resend in 0:59</p>
          </div>

          <button className="text-[#6A6A6A]">Resend OTP</button>
        </div>

        <button
          onClick={() => router.push("/dashboard/home")}
          type="submit"
          className="h-[48px] w-full items-center justify-center rounded-[17px] bg-[#297FB8] text-base font-semibold"
        >
          Submit
        </button>
      </div>
    </>
  );
};
export default VerifyLogin;

import Image from "next/image";
import { FC, PropsWithChildren } from "react";

export const AuthBgWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="custom-login-gradient relative flex min-h-[100dvh] items-center justify-center px-[5%]">
      <Image
        src="/images/flowoptix-logo-big.svg"
        alt="FlowOptix"
        width={200}
        height={200}
        className="absolute left-0 top-1/2 z-0 h-[75%] w-auto -translate-y-1/2"
      />
      <div className="relative z-[1] flex w-full max-w-[890px] flex-col gap-10 rounded-[36px] border-[1.5px] border-solid border-[#297FB8] bg-[#272727] p-6 lg:p-12 2xl:p-20">
        {children}
      </div>
    </main>
  );
};

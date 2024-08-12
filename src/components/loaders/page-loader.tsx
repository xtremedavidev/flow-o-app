import Image from "next/image";

export const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[99] flex h-screen w-full items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="relative flex animate-pulse flex-col items-center gap-4">
        <Image
          alt="loader"
          src="/images/flowoptix-logo-big.png"
          height={200}
          width={200}
        />
        <p className="text-2xl font-bold uppercase">Loading</p>
      </div>
    </div>
  );
};

import Image from "next/image";

export const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[99] flex h-screen w-full items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="relative flex animate-pulse flex-col items-center gap-4">
        <Image
          alt="loader"
          src="/images/flowoptix-loading-gif.gif"
          height={200}
          width={400}
          className="h-[200px] w-[280px] object-center"
        />
        <p className="text-2xl font-semibold">Loading...</p>
        <p className="mt-[10px] text-sm font-medium">
          Hang on, we are optimizing your operational flow
        </p>
      </div>
    </div>
  );
};

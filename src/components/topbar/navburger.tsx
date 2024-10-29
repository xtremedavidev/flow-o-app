import { FC } from "react";

export interface NavBurgerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavBurger: FC<NavBurgerProps> = ({ open, setOpen }) => {
  return (
    <button
      onClick={() => setOpen((prev) => !prev)}
      className="relative flex h-full max-h-[32px] w-full max-w-[32px] shrink-0 flex-col items-center justify-center gap-y-2 lg:hidden"
    >
      <div
        className={`h-[2.5px] w-8 bg-white transition-all duration-300 ${
          open &&
          "absolute left-0 top-[50%] translate-y-[-50%] -rotate-45 transform"
        }`}
      />
      <div
        className={`h-[2.5px] w-8 bg-white transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`}
      />
      <div
        className={`h-[2.5px] w-8 bg-white transition-all duration-300 ${
          open &&
          "absolute left-0 top-[50%] translate-y-[-50%] rotate-45 transform"
        }`}
      />
    </button>
  );
};

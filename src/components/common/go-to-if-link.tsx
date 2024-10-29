import Link from "next/link";
import { FC, PropsWithChildren } from "react";

interface GotoerProps extends PropsWithChildren {
  url?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

export const GotoerIfLink: FC<GotoerProps> = ({
  url,
  target = "_self",
  children,
}) => {
  return url ? (
    <Link href={url} target={target}>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
};

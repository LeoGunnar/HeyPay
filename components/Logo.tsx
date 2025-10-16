import clsx from "clsx";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/heyiceland-logo.svg"
      alt="Hey Iceland logo"
      width={160}
      height={40}
      className={clsx("h-10 w-auto", className)}
      priority
    />
  );
}

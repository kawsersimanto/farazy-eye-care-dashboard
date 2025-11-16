import { cn } from "@/lib/utils";
import Image from "next/image";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div>
      <Image
        src="/logo.webp"
        width={180}
        height={40}
        className={cn(
          "xl:w-[180px] xs:w-[140px] w-[120px] h-auto lg:h-[40px] object-contain",
          className
        )}
        alt={`${process.env.NEXT_PUBLIC_APP_NAME || "Farazy Eye Care"}`}
      />
    </div>
  );
};

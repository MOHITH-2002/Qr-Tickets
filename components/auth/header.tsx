import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { QrCode } from "lucide-react";


const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
};

export const Header = ({
  label,
}: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-2 items-center justify-center">
      <div className="flex gap-2 items-center">
		<div className="flex ">

            <QrCode strokeWidth={2.25} size={40} className="text-primary" />

		</div>
      <h1 className={cn(
        "text-2xl font-semibold",
        font.className,
      )}>
        Qr-Tickets
      </h1>
        </div>
      <p className="text-muted-foreground text-sm">
        {label}
      </p>
    </div>
  );
};
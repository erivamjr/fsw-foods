import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

export const Header = () => {
  return (
    <div className="flex justify-between px-5 pt-6">
      <Image src="/logo.svg" alt="FSW Foods" width={100} height={30} />
      <Button
        size={"icon"}
        variant={"outline"}
        className="border-none bg-transparent"
      >
        <MenuIcon size={24} />
      </Button>
    </div>
  );
};

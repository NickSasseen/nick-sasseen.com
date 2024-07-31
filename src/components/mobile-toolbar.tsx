"use client";

import { menuItems } from "@/app/layout";
import { PanelLeft, Heart } from "lucide-react";
import { SheetTrigger, SheetContent, Sheet } from "./ui/sheet";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Link from "next/link";

const MobileToolbar = () => {
  const [open, setOpen] = useState(false);
  const closeSheet = () => setOpen(false);
  return (
    <div className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden" onClick={() => setOpen(true)}>
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="max-w-xs flex flex-col">
          <nav className="flex flex-col space-y-4 text-lg font-medium">
            <Link
              href="/"
              onClick={closeSheet}
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:text-base"
            >
              <img src="/favicon.ico" className="h-6" alt="site logo" />
            </Link>

            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={closeSheet}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                {item.icon}
                {item.text}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col mt-auto">
            <HeartDialogButton />
          </nav>
        </SheetContent>
      </Sheet>

      <Link href="/" className="text-xl">
        <img src="/favicon.ico" className="h-6 sm:h-9" alt="site logo" />
      </Link>
    </div>
  );
};

const HeartDialogButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Heart className="text-destructive mr-2" />
          Lindsy
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2"></div>
        </div>
        <DialogFooter className="justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MobileToolbar;

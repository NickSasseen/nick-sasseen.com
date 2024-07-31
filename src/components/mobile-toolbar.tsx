"use client";

import { menuItems } from "@/app/layout";
import { PanelLeft, Heart } from "lucide-react";
import { SheetTrigger, SheetContent, Sheet } from "./ui/sheet";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
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
  const vacationDate = new Date("2024-09-19");
  const [timeRemaining, setTimeRemaining] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const totalSeconds = Math.max((vacationDate.getTime() - now.getTime()) / 1000, 0);

      const months = Math.floor(totalSeconds / (60 * 60 * 24 * 30));
      const days = Math.floor((totalSeconds % (60 * 60 * 24 * 30)) / (60 * 60 * 24));
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = Math.floor(totalSeconds % 60);

      setTimeRemaining({
        months,
        days,
        hours,
        minutes,
        seconds,
      });
    };

    const timer = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, [vacationDate]);

  const getValueStyle = (val) => {
    const customStyle: React.CSSProperties & { [key: `--${string}`]: string | number } = {
      "--value": val, // Custom property
    };
    return customStyle;
  };

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
          <DialogTitle>Countdown to Vacation</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-5 grid-flow-col gap-1 text-center">
          {[
            { label: "months", val: timeRemaining.months },
            { label: "days", val: timeRemaining.days },
            { label: "hours", val: timeRemaining.hours },
            { label: "mins", val: timeRemaining.minutes },
            { label: "sec", val: timeRemaining.seconds },
          ].map((item) => (
            <div
              key={item.val}
              className="flex flex-col items-center text-sm p-2 bg-neutral rounded-box text-neutral-content"
            >
              <span className="countdown font-mono text-4xl">
                <span style={getValueStyle(item.val)}></span>
              </span>
              {item.label}
            </div>
          ))}
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

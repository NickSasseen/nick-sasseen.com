import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { Heart, Home, LandPlotIcon, Tv } from "lucide-react";
import MobileToolbar from "@/components/mobile-toolbar";
import { Toaster } from "@/components/ui/toaster";
import { Viewport } from "next";

const inter = Inter({ subsets: ["latin"] });

export interface MenuItem {
  text: string;
  href: string;
  active?: boolean;
  icon?: any;
  mobileOnly?: boolean;
}

export const menuItems: MenuItem[] = [
  { text: "Home", href: "/", icon: <Home /> },
  { text: "TMDB", href: "/tmdb", icon: <Tv /> },
  {
    text: "Putt Putt",
    href: "/putt-putt",
    icon: <LandPlotIcon />,
    mobileOnly: true,
  },
];

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen w-full flex-col bg-slate-950">
            {/* Small and above */}
            <Sidenav />

            <div className="flex flex-col sm:gap-4 sm:pt-4 sm:pl-14">
              <MobileToolbar />
              {children}
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

const Sidenav = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <img src="/favicon.ico" className="h-6 sm:h-9" alt="site logo" />
          </Link>

          {menuItems
            .filter((mi) => !mi.mobileOnly)
            .map((item, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    {item.icon}
                    <span className="sr-only">{item.text}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.text}</TooltipContent>
              </Tooltip>
            ))}
        </nav>

        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Heart className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Lindsy</TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  );
};

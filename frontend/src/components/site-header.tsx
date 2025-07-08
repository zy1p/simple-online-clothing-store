"use client";
import { usePathname } from "next/navigation";
import { Cart } from "./cart";
import { ModeToggle } from "./mode-toggle";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 min-h-16 border-b backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between p-4">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <span>{pathname}</span>
          </div>

          <div className="flex items-center space-x-4">
            <Cart />
            <Separator orientation="vertical" className="min-h-4" />
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

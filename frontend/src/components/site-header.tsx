import Link from "next/link";
import React from "react";
import { ModeToggle } from "./mode-toggle";
import { Separator } from "./ui/separator";
import { Cart } from "./cart";

export default function SiteHeader() {
  return (
    <div className="min-h-16 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between p-4">
        <nav>
          <ul className="hidden flex-row gap-4 md:flex">
            <li>
              <Link href="/catalogue">Catalogue</Link>
            </li>

            <li>
              <Link href="/purchase-history">Purchase History</Link>
            </li>

            <li>
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center space-x-4 md:flex-1 md:justify-end">
          <Cart />
          <Separator orientation="vertical" className="min-h-4" />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import React from "react";
import { ModeToggle } from "./mode-toggle";

export default function SiteHeader() {
  return (
    <div className="flex h-16 items-center justify-between border-b p-4">
      <nav>
        <ul className="hidden flex-row gap-4 md:flex">
          <li>
            <Link href="/product">Product</Link>
          </li>

          <li>
            <Link href="/catalogue">Catalogue</Link>
          </li>

          <li>
            <Link href="/cart">Cart</Link>
          </li>

          <li>
            <Link href="/purchase-history">Purchase History</Link>
          </li>

          <li>
            <Link href="/profile">Profile</Link>
          </li>
        </ul>
      </nav>

      <ModeToggle />
    </div>
  );
}

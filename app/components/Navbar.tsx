import Link from "next/link";
import React from "react";
import ThemeSwitch from "./ThemeSwitch";

const Navbar = () => {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="flex justify-between items-center h-16 w-full">
        <Link href="/">
          <div>Dev Block</div>
        </Link>
        <ThemeSwitch></ThemeSwitch>
      </div>
    </div>
  );
};

export default Navbar;

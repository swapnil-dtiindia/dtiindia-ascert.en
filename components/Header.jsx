"use client";

import { useState } from "react";
import "../app/globals.css";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/assets/logo.svg";
import Button from "./Button";
const menuItems = [
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Partnerships", href: "#audience" },
  { label: "Careers", href: "#evidence" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__bar">
        <nav className="site-nav" aria-label="Primary">
          {menuItems.map((item, index) => (
            <Link
            className="menu-items"
              href={item.href}
              key={index}
              style={{ textDecoration: "none" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-logo" aria-label="DTII home">
          <Image alt="dtiindia logo" src={Logo} width={140} height={37} />
        </div>

        <div className="site-header_action">
          <Button>Join Waitlist</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

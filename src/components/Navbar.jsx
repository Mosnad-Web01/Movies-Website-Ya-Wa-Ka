"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import Login from "./Login";
import Signup from "./Signup";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Movies", href: "/movies" },
    { label: "Actors", href: "/actors" },
  ];

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">Movies</Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link href='/' className="font-bold text-inherit">Movies</Link>
        </NavbarBrand>
        {menuItems.slice(0, 3).map((item) => (
          <NavbarItem key={item.label}>
            <Link href={item.href} className="nav-link">
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button color="warning" variant="flat" onPress={() => setIsLoginOpen(true)}>
            Log In
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button color="warning" variant="flat" onPress={() => setIsSignupOpen(true)}>
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link className="w-full text-red-500" href={item.href} size="lg">
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      {/* Modal Components */}
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <Signup isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </Navbar>
  );
}

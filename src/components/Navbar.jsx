'use client'
import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem, 
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import Link from 'next/link.js';
import { AcmeLogo } from '../../public/AcmeLogo.jsx';
import Login from './Login.jsx';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false); 

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",   
  ];

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      {/* Mobile menu toggle */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      {/* Mobile brand */}
      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop content */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>

        <NavbarItem>
          <Link href="#" passHref>
            <Button as="a">Home</Button>
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button>Genres</Button>
            </DropdownTrigger>
            <DropdownMenu>
              {/* Add genre options here */}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>

        <NavbarItem isActive>
          <Dropdown>
            <DropdownTrigger>
              <Button>Movies</Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>
                <Link href="/movies/top-rated">Top Rated</Link>
              </DropdownItem>
              <DropdownItem>
                <Link href="/movies/popular">Popular</Link>
              </DropdownItem>
              <DropdownItem>
                <Link href="/movies/latest">Latest</Link>
              </DropdownItem>
              <DropdownItem>
                <Link href="/movies/now-playing">Now Playing</Link>
              </DropdownItem>
              <DropdownItem>
                <Link href="/movies/upcoming">Upcoming</Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>

        <NavbarItem>
          <Link href="/actors" passHref>
            <Button as="a">Actors</Button>
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Right side login/signup buttons */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          {showLoginForm ? (
            <Login onClose={() => setShowLoginForm(false)} />
          ) : (
            <Button onClick={handleLoginClick}>Login</Button>
          )}
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href="#" color="warning" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link href="#" passHref>
              <a
                className="w-full"
                style={{
                  color:
                    index === 2
                      ? 'var(--nextui-colors-warning)'
                      : index === menuItems.length - 1
                      ? 'var(--nextui-colors-danger)'
                      : 'var(--nextui-colors-foreground)',
                }}
              >
                {item}
              </a>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

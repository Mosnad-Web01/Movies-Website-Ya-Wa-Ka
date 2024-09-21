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

  ]
  return (
    
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarItem>
        <Dropdown>
           <DropdownTrigger>
             <Button ><Link href="#">Home</Link></Button>
           </DropdownTrigger>

         </Dropdown>
        </NavbarItem>
        <NavbarItem>
        <Dropdown>
           <DropdownTrigger>
             <Button >Geners</Button>
           </DropdownTrigger>
           <DropdownMenu>

           </DropdownMenu>
         </Dropdown>
        </NavbarItem>

        <NavbarItem isActive>
        <Dropdown>
           <DropdownTrigger>
             <Button >Movies</Button>
           </DropdownTrigger>
           <DropdownMenu>
             <DropdownItem onClick={() => router('Top Rate')}>
               Top Rated
             </DropdownItem>
             <DropdownItem onClick={() => router('Popular')}>
               Popular
             </DropdownItem>
             <DropdownItem onClick={() => router('Latest')}>
               Latest
             </DropdownItem>
             <DropdownItem onClick={() => router('Now playing')}>
               Now Playing
            </DropdownItem>
            <DropdownItem onClick={() => router('Upcoming')}>
               Upcoming
          </DropdownItem>
           </DropdownMenu>
         </Dropdown>
        </NavbarItem>

        <NavbarItem>
        <Dropdown>
           <DropdownTrigger>
             <Button >Actors</Button>
           </DropdownTrigger>
           <DropdownMenu>

           </DropdownMenu>
         </Dropdown>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
      <NavbarItem className="hidden lg:flex ">
      {showLoginForm ? (
            <Login onClose={() => setShowLoginForm(false)} />
          ) : (
            <Button onClick={handleLoginClick}>Login</Button>
          )}
    </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="warning" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};



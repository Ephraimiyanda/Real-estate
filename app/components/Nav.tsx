// app/tabs/page.tsx
"use client";

import {
  Button,
  Card,
  CardBody,
  Tab,
  Tabs,
  Navbar,
  NavbarMenuToggle,
  NavbarContent,
  NavbarBrand,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiHomeModern } from "react-icons/hi2";
import { RxAvatar } from "react-icons/rx";
import { TbHomePlus } from "react-icons/tb";
export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      className="top-[0] fixed w-full "
    >
      <NavbarContent>
        <NavbarBrand className="flex gap-3 ">
          <Link href="/" className="flex justify-center items-center gap-2">
            <div className="rounded-[50%] bg-[#0070f0] p-1">
              <HiHomeModern size={30} color="white" />
            </div>
            <p className="font-bold text-inherit">RealSwitch</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="text-black hidden lg:flex">
        <Tabs
          aria-label="Options"
          selectedKey={pathname}
          variant="light"
          color="primary"
          radius="full"
          className="text-black"
        >
          <Tab key="/" title="Home" href="/"></Tab>
          <Tab key="/About" title="About" href="/About"></Tab>
          <Tab key="/Listings" title="Listings" href="/Listings"></Tab>
          <Tab key="/Services" title="Services" href="/Services"></Tab>
          <Tab key="/Blogs" title="Blogs" href="/Blogs"></Tab>
        </Tabs>
      </NavbarContent>
      <NavbarContent justify="end" className="hidden sm:flex">
        <Button className="bg-transparent shadow-none" radius="full">
          <RxAvatar size={20} />
          <p>Login/Register</p>
        </Button>
        <Button radius="full" className="bg-[#0070f0] text-white">
          <TbHomePlus size={24} color="white" />
          <p>Add Listing</p>
        </Button>
      </NavbarContent>
           <NavbarMenu>
        <NavbarMenuItem>
          <Link href={"/"}>Home</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href={"/About"}>About</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href={"/About"}>Listings</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href={"/Services"}>Services</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href={"/Blogs"}>Blogs</Link>
        </NavbarMenuItem>
      </NavbarMenu>

      <NavbarContent className="lg:hidden flex-[0] flex-grow-[0.3]" style={{
        flexGrow:"0.1"
      }}
        justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>
    </Navbar>
  );
}

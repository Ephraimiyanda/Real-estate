import Link from "next/link";
import { HiHomeModern } from "react-icons/hi2";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { Button, Input } from "@nextui-org/react";
import { GoArrowRight } from "react-icons/go";
export default function Footer() {
  return (
    <footer className="bg-[#4361EE] bg-opacity-10 bottom-0 pt-10 ">
      <div className="flex justify-between flex-wrap max-w-[1280px] gap-6 sm:px-6 px-3 mx-auto pb-10">
        <div className="flex flex-col gap-3">
          <div>
            <Link href="/" className="flex justify-start items-center gap-2">
              <div className="rounded-[50%] bg-[#0070f0] p-1">
                <HiHomeModern size={30} color="white" />
              </div>
              <p className="font-bold text-inherit">RealSwitch</p>
            </Link>
          </div>
          <p>2728 Hickory StreetSalt Lake City, UT 84104</p>
          <div className="flex justify-start gap-2">
            <BsTelephone />
            <p>+1 206-214-2298</p>
          </div>
          <div>
            <MdOutlineEmail />
            <Link href={"myemail@gmail.com"}>myemail@gmail.com</Link>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-lg text-black">Quick Links</p>
          <ul className="text-[#2B2B2B]">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/About-us"}>About</Link>
            </li>
            <li>
              <Link href={"Listings"}>Listings</Link>
            </li>
            <li>
              <Link href={"/Services"}>Services</Link>
            </li>
            <li>
              <Link href={"/Blogs"}>Bolgs</Link>
            </li>
            <li>
              <Link href={"#Blogs"}>Become a Agent</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-lg text-black">Discovery</p>
          <ul className="text-[#2B2B2B]">
            <li>
              <Link href={""}>Canada</Link>
            </li>
            <li>
              <Link href={""}>United States</Link>
            </li>
            <li>
              <Link href={""}>Germany</Link>
            </li>
            <li>
              <Link href={""}>Africa</Link>
            </li>
            <li>
              <Link href={""}>India</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-lg text-black">
            Suscribe to our Newsletter!
          </p>
          <form
            action=""
            className="flex justify-center items-center bg-white gap-1 rounded-xl px-2"
          >
            <Input
              aria-label="newsletter"
              placeholder="Email Address"
                          className="bg-white hover:bg-white"
                          
              classNames={{
                mainWrapper: "bg-white hover:bg-white",
                inputWrapper: "bg-white hover:!bg-white focus-within:!bg-white shadow-none",
                  input: "bg-white hover:bg-white",
                innerWrapper:""
              }}
            ></Input>
            <Button
              type="submit"
              isIconOnly
              className="p-2 rounded-[50%] bg-[#4361EE] ml-auto"
            >
              <GoArrowRight color="white" size={32} />
            </Button>
          </form>
        </div>
      </div>
      <div className="py-3 bg-black">
        <div className="flex justify-between text-white max-w-[1280px] flex-wrap sm:px-6 px-3 mx-auto">
          <p>@RealSwitch - All rights reserved</p>

          <div className="flex flex-wrap gap-2 max-w-[500px] justify-between">
            <p>Terms and condition</p>
            <p>Privacy policy</p>
            <p>Disclaimer</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

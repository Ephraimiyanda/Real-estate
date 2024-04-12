"use client";

// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import {
  Button,
  Checkbox,
  Input,
  RadioGroup,
  Spacer,
  Textarea,
  Image,
  Card,
  CardFooter,
  CardHeader,
  Link,
  Skeleton,
} from "@nextui-org/react";
import { MouseEventHandler } from "react";
import { BsBuildings } from "react-icons/bs";
import { FaMapLocationDot } from "react-icons/fa6";
import { SiBlueprint } from "react-icons/si";
import { CustomRadio } from "@/app/components/customRadio";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
export default function PropertyLoading() {
  return (
    <div className="py-28">
      <div className=" max-w-[1280px] mx-auto flex lg:flex-row flex-col gap-5 md:px-6 px-3 justify-between py-5">
        <div className="max-w-[800px] w-full">
          <div className="">
            <Skeleton className="max-w-[800px] h-[350px]"></Skeleton>
          </div>
          <Spacer y={6}></Spacer>
          <div>
            <div className="flex flex-col gap-3">
              <Skeleton className="w-full h-4"></Skeleton>
              <Skeleton className="w-[80%] h-4"></Skeleton>
              <Skeleton className="w-[60%] h-4"></Skeleton>
            </div>
          </div>
          <div className="py-8">
            <ul className="list-disc px-7 flex flex-col gap-3">
              <Skeleton className="w-[250px] h-4"></Skeleton>
              <Skeleton className="w-[250px] h-4"></Skeleton>
              <Skeleton className="w-[250px] h-4"></Skeleton>
            </ul>
          </div>
        </div>
        <div className="lg:max-w-[400px] hidden lg:flex gap-5 lg:flex-col w-full justify-between h-fit">
          <div className="flex flex-col gap-4 bg-primary bg-opacity-10 rounded-lg sm:px-6 px-3 py-4 h-fit w-full sm:w-1/2 lg:w-full">
            <Skeleton className="w-full h-4"></Skeleton>
            <Skeleton className="w-full h-4"></Skeleton>
            <Skeleton className="w-full h-4"></Skeleton>
            <Skeleton className="w-full h-4"></Skeleton>
            <Skeleton className="w-full h-4"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
}

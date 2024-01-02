import { Chip } from "@nextui-org/react";
import Image from "next/image"
export function PopularChip() {
    return (
      <Chip
        className="p-2 absolute bottom-2 left-2 bg-[#FFE1E1] text-red-500"
        color="danger"
        startContent={
          <Image
            src="/fire icon.svg"
            width={100}
            height={100}
            alt="fire icon"
            className="w-4"
          />
        }
      >
        <p>Popular</p>
      </Chip>
    );
}
export function NewListingChip() {
  return (
    <Chip
      className="p-2 absolute bottom-2 left-2 bg-[#D7EEFF] text-[#119BFF]"
      color="danger"
      startContent={
        <Image
          src="home icon/.svg"
          width={100}
          height={100}
          alt="fire icon"
          className="w-4"
        />
      }
    >
      <p>New Listing</p>
    </Chip>
  );
}
export function InvestChip() {
  return (
    <Chip
      className="p-2 absolute bottom-2 left-2 bg-[#F1FFF1] text-[#00CE3A]"
      color="danger"
      startContent={
        <Image
          src="/invest.svg"
          width={100}
          height={100}
          alt="fire icon"
          className="w-4"
        />
      }
    >
      <p>Invest</p>
    </Chip>
  );
}

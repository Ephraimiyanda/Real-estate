import { Card, CardBody, CardFooter,Image } from "@nextui-org/react";
import { PopularChip } from "./Chips";

export function CardTrash() {
  return (
    <div className="py-3">
      <Card className=" w-[320px] bg-none h-full shadow-none snap-center">
        <CardBody className="p-0 ">
          <Image
            src="/Rectangle18.png"
            width={300}
            height={300}
            alt="home"
            className="w-[270px] h-[260px]"
          />
          <PopularChip />
        </CardBody>
        <CardFooter className="flex flex-col gap-2 px-0 py-2">
          <p className="font-bold text-left w-full">$ 5,970</p>
          <p className="font-semibold  w-full">Tranquil Haven in the Woods</p>
          <p className="text-[#808080]  w-full text-sm">
            103 Wright CourtBurien, WA 98168
          </p>
          <div className="flex gap-5 justify-start w-full">
            <div className="flex gap-1">
              <Image
                width={100}
                height={100}
                alt="bed icon"
                src="/bed icon.svg"
                className="w-5"
              />
              <span>4 beds</span>
            </div>
            <div className="flex gap-1">
              <Image
                width={100}
                height={100}
                alt="bath icon"
                src="/bath icon.svg"
                className="w-5"
              />
              <span>4 bath(s)</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

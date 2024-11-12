import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
interface searchblock {
  title: string;
  location: string;
  src: string;
  id: number;
  num_bathrooms: number;
  num_bedrooms: number;
}
export default function SearchBlock({
  title,
  location,
  src,
  id,
  num_bathrooms,
  num_bedrooms,
}: searchblock) {
  return (
    <Card
      shadow="md"
      className="rounded-md  p-0 bg-white w-[90%] max-w-[350px] max-h-[360px] min-h-[327px] sm:max-w-[280px] sm:w-full"
      style={{
        padding: "0px",
      }}
      radius="none"
    >
      <CardBody
        className="p-0 max-w-[unset] w-full"
        style={{
          maxWidth: "unset",
        }}
      >
        <Image
          radius="none"
          removeWrapper
          src={src}
          className=" max-h-[200px] h-full w-full  object-cover"
          alt="img"
        />
        <CardFooter className="text-small justify-start flex flex-col px-3 gap-5 w-full p-0 pt-2">
          <div className="justify-start flex flex-col px-3 gap-4 py-3 w-full">
            <div className="text-lg">
              <Link href={`/Listings/Properties/${id}`}>
                <p className=" overflow-hidden text-ellipsis h-8">{title}</p>
              </Link>
            </div>
            <div className="flex gap-5 justify-start w-full">
              <div className="flex gap-1 justify-normal items-center">
                <Image
                  width={100}
                  height={100}
                  alt="bed icon"
                  src="/bed icon.svg"
                  className="w-5"
                />
                <span>{num_bedrooms} beds</span>
              </div>
              <div className="flex gap-1 justify-normal items-center">
                <Image
                  width={100}
                  height={100}
                  alt="bath icon"
                  src="/bath icon.svg"
                  className="w-5"
                />
                <span>{num_bathrooms} bath(s)</span>
              </div>
            </div>
            <div className="text-black/50 overflow-hidden text-ellipsis h-6  whitespace-nowrap">
              {location}
            </div>
          </div>
        </CardFooter>
      </CardBody>
    </Card>
  );
}

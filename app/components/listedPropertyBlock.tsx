import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
interface ListedPropertyblock {
  title: string;
  location: string;
  src: string;
  id: number;
  num_bathrooms: number;
  num_bedrooms: number;
  price: string | number;
}
export default function ListedPropertyBlock({
  title,
  location,
  src,
  id,
  num_bathrooms,
  num_bedrooms,
  price,
}: ListedPropertyblock) {
  return (
    <Card
      shadow="md"
      className="rounded-md shadow-none border-none snap-center p-0 w-[320px] bg-none h-full"
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
          radius="lg"
          removeWrapper
          src={src}
          className="w-[270px] h-[260px] object-cover "
          alt="img"
        />
        <CardFooter className="text-small justify-start flex flex-col  gap-5 w-full p-0 pt-2">
          <div className="justify-start flex flex-col  gap-4 py-3 w-full">
            <p className="font-bold text-left w-full">{price}</p>
            <div className="text-lg">
              <Link href={`/Listings/Properties/${id}`}>
                <p className="font-semibold  w-full">{title}</p>
              </Link>
            </div>
            <div className="text-black/50 overflow-hidden text-ellipsis h-6  whitespace-nowrap">
              {location}
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
          </div>
        </CardFooter>
      </CardBody>
    </Card>
  );
}

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
interface searchblock{
  title: string;
  location: string;
  src:string
}
export default function SearchBlock({title,location,src}:searchblock) {
  return (
    <Card
      shadow="md"
      className="rounded-md  p-0 bg-white  max-h-[360px] max-w-[270px]"
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
          className=" h-[240px] w-[270px] object-cover"
          alt="img"
        />
        <CardFooter className="text-small justify-start flex flex-col px-3 gap-5 w-full p-0 pt-2">
          <div className="justify-start flex flex-col px-3 gap-4 py-3 w-full">
            <div className="text-lg">
              <Link href={`/product/${title}`}>
                <p className=" overflow-hidden text-ellipsis h-10  whitespace-nowrap ">
                  {title}
                </p>
              </Link>
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

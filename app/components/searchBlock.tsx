import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
interface searchblock{
  title: string;
  location: string;
  src: string
  id:number
}
export default function SearchBlock({title,location,src,id}:searchblock) {
  return (
    <Card
      shadow="md"
      className="rounded-md  p-0 bg-white  max-h-[360px] w-[90%] max-w-[350px] sm:max-w-[270px] sm:w-[270px]"
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
          className=" h-[240px] w-full sm:w-[270px] object-cover"
          alt="img"
        />
        <CardFooter className="text-small justify-start flex flex-col px-3 gap-5 w-full p-0 pt-2">
          <div className="justify-start flex flex-col px-3 gap-4 py-3 w-full">
            <div className="text-lg">
              <Link href={`/Listings/Properties/${id}`} >
                <p className=" overflow-hidden text-ellipsis h-14 ">
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

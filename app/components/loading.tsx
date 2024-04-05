import { Card, CardBody, CardFooter, Image, Skeleton } from "@nextui-org/react";
import Link from "next/link";
interface searchblock {
  title: string;
  location: string;
  src: string;
}
function LoadingCard() {
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
        <Skeleton className=" h-[240px] w-[270px] object-cover" />
        <CardFooter className="text-small justify-start flex flex-col px-3 gap-5 w-full p-0 pt-2">
          <div className="justify-start flex flex-col px-3 gap-4 py-3 w-full">
            <div className="text-lg">
              <Skeleton>
                <p className=" overflow-hidden text-ellipsis h-10  whitespace-nowrap "></p>
              </Skeleton>
            </div>
            <Skeleton className="text-black/50 overflow-hidden text-ellipsis h-6  whitespace-nowrap"></Skeleton>
          </div>
        </CardFooter>
      </CardBody>
    </Card>
  );
}
export default function LoadingBlock() {
  function Load() {
    const skeletonCards = [];
    for (var i = 0; i < 25; i++) {
      skeletonCards.push(<LoadingCard key={i} />);
    }
    return skeletonCards;
  }
    return (
      <div className="flex justify-center sm:justify-between items-center sm:items-start  flex-wrap  gap-4 max-w-[1280px] mx-auto ">
        {Load()}
      </div>
    );
}

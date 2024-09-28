import { Card, CardBody, CardFooter, Image, Skeleton } from "@nextui-org/react";
import Link from "next/link";
interface searchblock {
  title: string;
  location: string;
  src: string;
}
function LoadingCard() {
  return (
    <div className=" w-[320px] px-2">
      <Card className=" w-[270px] bg-none h-full shadow-none snap-center">
        <CardBody className="p-0 ">
          <Skeleton className="w-[270px] h-[260px] rounded-lg" />
        </CardBody>
        <CardFooter className="flex flex-col gap-3 px-0 py-2 justify-normal">
          <Skeleton className=" h-6 w-[50px] rounded-md self-start"></Skeleton>
          <Skeleton className=" h-6 w-full rounded-md"></Skeleton>
          <Skeleton className=" h-6  w-full rounded-md"></Skeleton>
        </CardFooter>
      </Card>
    </div>
  );
}
export default function ListedPropertyLoadingBlock() {
  function Load() {
    const skeletonCards = [];
    for (var i = 0; i < 8; i++) {
      skeletonCards.push(<LoadingCard key={i} />);
    }
    return skeletonCards;
  }
  return Load();
}

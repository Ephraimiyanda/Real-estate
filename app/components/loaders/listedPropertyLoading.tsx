import { Card, CardBody, CardFooter, Skeleton } from "@nextui-org/react";

function LoadingCard() {
  return (
    <div className="w-[320px] px-2">
      <Card className="w-[270px] bg-transparent h-full shadow-none snap-center">
        <CardBody className="p-0">
          <Skeleton className="w-[270px] h-[260px] rounded-lg" />
        </CardBody>
        <CardFooter className="flex flex-col gap-3 px-0 py-2 justify-normal">
          <Skeleton className="h-6 w-full rounded-md" />
          <Skeleton className="h-6 w-full rounded-md" />
        </CardFooter>
      </Card>
    </div>
  );
}

export default function ListedPropertyLoadingBlock() {
  return (
    <>
      {Array.from({ length: 8 }, (_, index) => (
        <LoadingCard key={index} />
      ))}
    </>
  );
}

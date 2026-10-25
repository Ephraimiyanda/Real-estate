import { Card, CardBody, CardFooter, Skeleton } from "@nextui-org/react";

function LoadingCard() {
  return (
    <Card
      shadow="md"
      className="rounded-md p-0 bg-white w-[90%] max-w-[350px] max-h-[360px] sm:max-w-[280px] sm:w-full"
      radius="none"
    >
      <CardBody className="p-0 max-w-[unset] w-full">
        <Skeleton className="h-[240px] w-full object-cover" />
        <CardFooter className="text-small justify-start flex flex-col px-3 gap-5 w-full p-0 pt-2">
          <div className="justify-start flex flex-col px-3 gap-4 py-3 w-full">
            <div className="text-lg">
              <Skeleton>
                <p className="overflow-hidden text-ellipsis h-10 whitespace-nowrap" />
              </Skeleton>
            </div>
            <Skeleton className="text-black/50 overflow-hidden text-ellipsis h-6 whitespace-nowrap" />
          </div>
        </CardFooter>
      </CardBody>
    </Card>
  );
}

export default function LoadingBlock() {
  return (
    <div className="grid gap-4 grid-cols-1 place-content-center place-items-center items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto w-full max-w-[1280px]">
      {Array.from({ length: 15 }, (_, index) => (
        <LoadingCard key={index} />
      ))}
    </div>
  );
}

"use client";

import { Skeleton, Spacer } from "@nextui-org/react";

export default function PropertyLoading() {
  return (
    <div className="py-28">
      <div className="max-w-[1280px] mx-auto flex lg:flex-row flex-col gap-5 md:px-6 px-3 justify-between py-5">
        <div className="max-w-[800px] w-full">
          <Skeleton className="max-w-[800px] h-[350px]" />
          <Spacer y={6} />
          <div className="flex flex-col gap-3">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-[80%] h-4" />
            <Skeleton className="w-[60%] h-4" />
          </div>
          <div className="py-8">
            <ul className="list-disc px-7 flex flex-col gap-3">
              <Skeleton className="w-[250px] h-4" />
              <Skeleton className="w-[250px] h-4" />
              <Skeleton className="w-[250px] h-4" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

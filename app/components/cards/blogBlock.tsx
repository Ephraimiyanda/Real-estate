import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Link,
  Image,
} from "@nextui-org/react";
import { title } from "process";
import { GoArrowRight } from "react-icons/go";
interface blog {
  title: string;
  description: string;
  link: string;
  imgUrl: string;
  author: string | null;
}
export function BlogBlock({ link, title, description, imgUrl, author }: blog) {
  return (
    <div className="w-full">
      <Card className="bg-transparent bg-none shadow-none text-white  border-none snap-center p-0 sm:w-[320px] w-full  h-full">
        <CardBody className="p-0 flex flex-col gap-3">
          <Image
            src={imgUrl}
            alt="home"
            className=" h-[240px] w-full sm:w-[340px] rounded-lg "
            isZoomed
            classNames={{
              wrapper: "max-w-[unset] w-full",
            }}
            
          />
          <Link href={link}>
            <p className="text-white text-xl font-medium hover:underline h-8 truncate   sm:max-w-[310px]">
              {title}
            </p>
          </Link>
        </CardBody>
        <CardFooter className="flex flex-col gap-2 px-0 py-2">
          <p className="text-[#D4D4D4]  h-24 overflow-hidden text-ellipsis whitespace-normal w-full">
            {description}
          </p>
          <div className="w-full flex justify-between pr-2 items-center">
            <p className="font-semibold text-white  overflow-hidden w-[200px] text-ellipsis whitespace-nowrap">
              {author ? author : "Unavailable"}
            </p>
            <Button
              as={Link}
              href={link}
              isIconOnly
              className="p-2 rounded-[50%] bg-white"
            >
              <GoArrowRight color="#4361EE" size={32} />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

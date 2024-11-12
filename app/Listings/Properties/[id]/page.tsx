"use client";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  Button,
  Checkbox,
  Input,
  RadioGroup,
  Spacer,
  Textarea,
  Image,
  Card,
  CardFooter,
  CardHeader,
  Link,
} from "@nextui-org/react";
import { MouseEventHandler, useEffect, useState } from "react";
import { BsBuildings } from "react-icons/bs";
import { FaMapLocationDot } from "react-icons/fa6";
import { SiBlueprint } from "react-icons/si";
import { CustomRadio } from "@/app/components/customRadio";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import PropertyLoading from "@/app/components/propertyLoading";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function PropertyDetails({
  params,
}: {
  params: { id: string };
}) {
  const [propertyData, setPropertyData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const session = useSession();
  const API_URL = process.env.NEXT_PUBLIC_BASE_API;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const GOOGLE_MAP_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;

  async function getProperty() {
    const url = `${API_URL}/properties/v2/detail?listingId=${params.id}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": `${API_KEY}`,
        "X-RapidAPI-Host": "zoopla.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const listingDetails = result.data?.listingDetails;

      setPropertyData(listingDetails || {});
      const newArray = listingDetails?.propertyImage?.map(
        (image: { original: string; caption: string }) => ({
          original: image.original,
          thumbnail: image.caption,
        })
      );
      setImages(newArray || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getProperty();
  }, []);

  return (
    <div>
      {loading ? (
        <PropertyLoading />
      ) : (
        <div className="py-20 max-w-[1280px] mx-auto md:px-6 px-3">
          <h1 className="md:px-6 px-3 text-center font-semibold text-3xl pb-8">
            {propertyData?.title || "Title unavailable"}
          </h1>
          <div className="flex lg:flex-row flex-col gap-5 justify-between">
            <div className="max-w-[800px]">
              <div className="max-w-[800px]">
                <ImageGallery
                  showPlayButton={false}
                  items={images}
                  renderLeftNav={(
                    onClick: MouseEventHandler<HTMLButtonElement> | undefined,
                    disabled: boolean | undefined
                  ) => (
                    <Button
                      onClick={onClick}
                      disabled={disabled}
                      isIconOnly
                      className="p-0 rounded-full z-10 absolute border-2 border-[#4361EE] bg-white left-1 top-[45%]"
                    >
                      <IoIosArrowBack color="#4361EE" size={32} />
                    </Button>
                  )}
                  renderRightNav={(
                    onClick: MouseEventHandler<HTMLButtonElement> | undefined,
                    disabled: boolean | undefined
                  ) => (
                    <Button
                      onClick={onClick}
                      disabled={disabled}
                      isIconOnly
                      className="p-0 rounded-full bg-white z-20 border-2 border-[#4361EE] absolute right-1 top-[45%]"
                    >
                      <IoIosArrowForward color="#4361EE" size={32} />
                    </Button>
                  )}
                />
              </div>
              <Spacer y={6}></Spacer>
              <div className="flex justify-between items-center px-6 py-3 rounded-sm bg-[#4361EE] bg-opacity-20">
                <div className="flex flex-col">
                  <span className="font-light">Mortgage since:</span>
                  <span className="text-lg font-semibold">
                    {propertyData?.analyticsTaxonomy?.price
                      ? `${propertyData.analyticsTaxonomy.price} €/month`
                      : "Price unavailable"}
                  </span>
                </div>
                <Button
                  className="bg-[#4361EE] text-white"
                  radius="none"
                  size="lg"
                  variant="solid"
                >
                  Get a mortgage
                </Button>
              </div>
              <Spacer y={6}></Spacer>
              <div>
                <p className="pb-4 font-semibold text-lg flex justify-normal items-center gap-2">
                  <BsBuildings size={40} color="#4361EE" />
                  <span>Description</span>
                </p>
                <div>
                  {propertyData?.detailedDescription ||
                    "No description available"}
                </div>
              </div>
              <div className="py-8 ">
                <p className="pb-4 font-semibold text-lg flex justify-normal items-center gap-2">
                  <SiBlueprint size={40} color="#4361EE" />
                  <span>Basic characteristics</span>
                </p>
                <ul className="list-disc px-7">
                  {propertyData?.analyticsTaxonomy?.brandName && (
                    <li>
                      BrandName: {propertyData.analyticsTaxonomy.brandName}
                    </li>
                  )}
                  <li>
                    Property Type:{" "}
                    {propertyData?.analyticsTaxonomy?.propertyType ||
                      "Unavailable"}
                  </li>
                  <li>
                    Postal Code:{" "}
                    {propertyData?.location?.postalCode || "Unavailable"}
                  </li>
                  <li>
                    Listing condition:{" "}
                    {propertyData?.analyticsTaxonomy?.listingCondition ||
                      "Unavailable"}
                  </li>
                </ul>
                {propertyData?.features?.bullets && (
                  <ul className="list-disc px-7 py-3">
                    <span className="font-semibold text-lg">Features</span>
                    {propertyData.features.bullets.length > 0 ? (
                      propertyData.features.bullets.map((bullet: string) => (
                        <li key={bullet}>{bullet}</li>
                      ))
                    ) : (
                      <li>Unavailable</li>
                    )}
                  </ul>
                )}
              </div>
              <div className="py-4">
                <p className="pb-4 font-semibold text-lg flex justify-normal items-center gap-2">
                  <FaMapLocationDot size={40} color="#4361EE" />
                  <span>Location</span>
                </p>
                <p>
                  {propertyData?.analyticsTaxonomy?.displayAddress ||
                    "Address unavailable"}
                </p>
              </div>
              <div>
                {GOOGLE_MAP_KEY && propertyData?.location?.coordinates && (
                  <iframe
                    width="100%"
                    height="450"
                    src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAP_KEY}&q=${propertyData.location.coordinates.latitude},${propertyData.location.coordinates.longitude}`}
                  ></iframe>
                )}
              </div>
              {propertyData?.floorPlan && (
                <div className="py-4">
                  <p className="pb-4 font-semibold text-lg">Floor Plan</p>
                  <div className="flex flex-wrap gap-3">
                    <Card
                      isFooterBlurred
                      className="w-full min-w-[300px] h-[300px] col-span-12 sm:col-span-5"
                    >
                      <Image
                        removeWrapper
                        alt="Floor plan image"
                        className="z-0 w-full h-full object-contain"
                        src={
                          propertyData?.content?.floorPlan?.image[0]?.url
                            ? propertyData.content.floorPlan.image[0].url
                            : "/no-image.jpg"
                        }
                      />
                      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                        <div>
                          <p className="text-black text-tiny">
                            {propertyData?.content?.floorPlan?.image[0]?.url
                              ? "Available"
                              : "Unavailable"}
                          </p>
                          <p className="text-black text-tiny">
                            Ready for view.
                          </p>
                        </div>
                        <Button
                          className="text-tiny"
                          color="primary"
                          radius="full"
                          size="sm"
                          as={Link}
                          href={propertyData?.floorPlan?.link}
                          isDisabled={!propertyData?.floorPlan?.link}
                        >
                          View floor plan
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              )}
            </div>
            <div className="lg:max-w-[400px] flex gap-5 sm:flex-row-reverse flex-col-reverse lg:flex-col-reverse w-full justify-between h-fit">
              <form
                action=""
                className="flex flex-col gap-3 w-full bg-[#4361EE] bg-opacity-10 px-4 py-8 rounded-sm"
              >
                <h2 className="text-center text-lg font-semibold">
                  Contact Us
                </h2>
                <Input
                  radius="none"
                  size="lg"
                  placeholder="Enter your full name"
                  variant="bordered"
                  startContent={<FaUser />}
                  isRequired
                />
                <Input
                  radius="none"
                  type="tel"
                  size="lg"
                  placeholder="Enter your phone number"
                  variant="bordered"
                  startContent={<BsFillTelephoneFill />}
                  isRequired
                />
                <Input
                  radius="none"
                  type="email"
                  size="lg"
                  placeholder="Enter your email address"
                  variant="bordered"
                  startContent={<MdEmail />}
                  isRequired
                />
                <Textarea
                  radius="none"
                  size="lg"
                  placeholder="Enter a message"
                  variant="bordered"
                  minRows={5}
                />
                <Checkbox color="primary" isRequired>
                  I consent to having this website store my data.
                </Checkbox>
                <Button
                  className="bg-[#4361EE] text-white"
                  radius="none"
                  type="submit"
                >
                  Submit Request
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
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

export default function PropertyDetails({
  params,
}: {
  params: { id: string };
}) {
  const [propertyData, setPropertyData] = useState<string | number | any>([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  async function getProperty() {
    const url = `https://zoopla4.p.rapidapi.com/properties/${params.id}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "5ebd5f9a81msh1cd13fdc012bf64p19cb9bjsnd3764f7fd7a9",
        "X-RapidAPI-Host": "zoopla4.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setPropertyData(result.data);
      const newArray = result.data.images.map((image: string) => ({
        original: image,
        thumbnail: image,
      }));
      setImages(newArray);
      setLoading(false);
      console.log(result.data);
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
        <div className="py-20  max-w-[1280px] mx-auto md:px-6 px-3">
          <h1 className="md:px-6 px-3 text-center font-semibold text-3xl pb-8">
            {propertyData.name}
          </h1>
          <div className=" flex lg:flex-row flex-col gap-5 justify-between">
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
                      className="p-0 rounded-full bg-white z-20 border-2 border-[#4361EE] absolute right-1 top-[45%] "
                    >
                      <IoIosArrowForward color="#4361EE" size={32} />
                    </Button>
                  )}
                />
              </div>
              <Spacer y={6}></Spacer>
              <div className="flex justify-between  items-center px-6 py-3 rounded-sm bg-[#4361EE] bg-opacity-20">
                <div className="flex flex-col">
                  <span className="font-light">Mortgage since:</span>
                  <span className="text-lg font-semibold">
                    {propertyData.price} €/month
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
                <div>{propertyData.description}</div>
              </div>
              <div className="py-8 ">
                <p className="pb-4 font-semibold text-lg flex justify-normal items-center gap-2">
                  <SiBlueprint size={40} color="#4361EE" />
                  <span>Basic characteristics</span>
                </p>
                <ul className="list-disc px-7">
                  {propertyData.councilTaxBand && (
                    <li>councilTaxBand:{propertyData.councilTaxBand}</li>
                  )}
                  <li>propertyType: {propertyData.propertyType}</li>
                  <li>postalCode: {propertyData.postalCode}</li>
                  <li>Listing condition: {propertyData.listingCondition}</li>
                </ul>
                {propertyData.features.length > 0 && (
                  <ul className="list-disc px-7 py-3">
                    <span className="font-semibold text-lg">Features</span>

                    {propertyData.features?.map((feature: string) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="py-4">
                <p className="pb-4 font-semibold text-lg flex justify-normal items-center gap-2">
                  {" "}
                  <FaMapLocationDot size={40} color="#4361EE" />
                  <span>Location</span>
                </p>
                <p>{propertyData.address}</p>
              </div>
              <div>
                <iframe
                  width="100%"
                  height="450"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDjS321DIle77Wu969s4VQZMrdV2Qt_tzY&q=${propertyData.latitude},${propertyData.longitude}`}
                ></iframe>
              </div>
              {propertyData.floorPlan?.length > 0 && (
                <div className="py-4">
                  <p className="pb-4 font-semibold text-lg">Floor Plan</p>
                  <div className="flex flex-wrap gap-3">
                    {propertyData.floorPlan.map((floorplan: string) => (
                      <Card
                        key={floorplan}
                        isFooterBlurred
                        className="w-full min-w-[300px] h-[300px] col-span-12 sm:col-span-5"
                      >
                        <Image
                          removeWrapper
                          alt="Card example background"
                          className="z-0 w-full h-full  object-contain"
                          src={floorplan}
                        />
                        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                          <div>
                            <p className="text-black text-tiny">Available</p>
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
                            href={floorplan}
                          >
                            View floor plan
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="lg:max-w-[400px] flex gap-5 sm:flex-row-reverse flex-col-reverse lg:flex-col-reverse w-full justify-between h-fit">
              <form
                action=""
                className="flex flex-col gap-3 bg-[#4361EE] bg-opacity-20 py-4 rounded-lg sm:px-6 px-3 w-full sm:w-1/2 lg:w-full"
              >
                <p className="text-3xl font-semibold">Contact Us</p>
                <Spacer y={4}></Spacer>
                <Input
                  type="string"
                  label="Name"
                  labelPlacement="outside"
                  placeholder="Enter your full name"
                  classNames={{
                    label: "text-lg",
                    input: "py-2 text-base bg-white text-black",
                    inputWrapper: [
                      "bg-white",
                      "data-focus-[within=true]:bg-white",
                      "data-[hover=true]:bg-white",
                      "group-data-[focus=true]:bg-white",
                    ],
                  }}
                  radius="sm"
                  size="md"
                  startContent={<FaUser />}
                />
                <Input
                  type="email"
                  label="Email"
                  labelPlacement="outside"
                  placeholder="Enter your email"
                  className="py-2 text-xl"
                  size="md"
                  classNames={{
                    label: "text-lg",
                    input: "py-2 text-base",
                    inputWrapper: [
                      "bg-white",
                      "data-focus-[within=true]:bg-white",
                      "data-[hover=true]:bg-white",
                      "group-data-[focus=true]:bg-white",
                    ],
                  }}
                  radius="sm"
                  startContent={<MdEmail />}
                />
                <Input
                  label="Phone Number"
                  labelPlacement="outside"
                  placeholder="Enter your phone number"
                  classNames={{
                    label: "text-lg",
                    input: "py-2 text-base",
                    inputWrapper: [
                      "bg-white",
                      "data-focus-[within=true]:bg-white",
                      "data-[hover=true]:bg-white",
                      "group-data-[focus=true]:bg-white",
                    ],
                  }}
                  radius="sm"
                  startContent={<BsFillTelephoneFill />}
                />
                <div className="py-3">
                  <RadioGroup
                    label="Purpose of Email"
                    classNames={{
                      label: "text-lg text-black",
                    }}
                    orientation="horizontal"
                  >
                    {propertyData.listingStatus === "to_rent" && (
                      <CustomRadio description="Rent property" value="rent">
                        Rent
                      </CustomRadio>
                    )}
                    {propertyData.listingStatus === "to_sale" && (
                      <CustomRadio description="Buy property" value="sale">
                        Sale
                      </CustomRadio>
                    )}
                    <CustomRadio
                      description="Invest in property"
                      value="Invest"
                    >
                      Invest
                    </CustomRadio>
                  </RadioGroup>
                </div>
                <Textarea
                  type="string"
                  label="Message"
                  labelPlacement="outside"
                  placeholder="Enter the message your message to inquire about the property "
                  minRows={4}
                  maxRows={6}
                  classNames={{
                    label: "text-lg",
                    input: "py-2 text-base",
                    inputWrapper: [
                      "bg-white",
                      "data-focus-[within=true]:bg-white",
                      "data-[hover=true]:bg-white",
                      "group-data-[focus=true]:bg-white",
                    ],
                  }}
                  radius="sm"
                />
                <Spacer y={4}></Spacer>
                <Button
                  radius="sm"
                  className=" border-1 text-primary"
                  type="submit"
                  variant="bordered"
                  color="primary"
                >
                  Send Message
                </Button>
              </form>
              <div className="flex flex-col gap-4 bg-[#4361EE] bg-opacity-20 rounded-lg sm:px-6 px-3 py-4 h-fit w-full sm:w-1/2 lg:w-full">
                <span className="font-semibold text-lg">Brief Features</span>
                <p>
                  <strong>Listing status:</strong>{" "}
                  {propertyData.listingStatus === "to_rent"
                    ? "for rent"
                    : "for sale"}
                </p>
                <p>
                  <strong>Category:</strong> {propertyData.category}
                </p>
                <p>
                  <strong>Total floor area:</strong>{" "}
                  {propertyData.sqft === "" ? "unavailable" : propertyData.sqft}
                </p>
                <p>
                  <strong>Number of rooms :</strong>{" "}
                  {propertyData.livingRooms === null
                    ? "unavailable"
                    : propertyData.livingRooms}
                </p>
                <p>
                  <strong>Number of beds:</strong>{" "}
                  {propertyData.beds === null
                    ? "unavailable"
                    : propertyData.beds}
                </p>
                <p>
                  <strong>Number of baths:</strong>{" "}
                  {propertyData.baths === null
                    ? "unavailable"
                    : propertyData.baths}
                </p>
                <p>
                  <strong>Shared ownership:</strong>{" "}
                  {propertyData.isSharedOwnership ? "True" : "False"}
                </p>
                <p>
                  <strong>Student friendly:</strong>{" "}
                  {propertyData.studentFriendly ? "True" : "False"}
                </p>
                <p>
                  <strong>Retirement Home:</strong>{" "}
                  {propertyData.isRetirementHome ? "True" : "False"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  Button,
  Card,
  CardFooter,
  Image,
  Input,
  Link,
  RadioGroup,
  Spacer,
  Textarea,
} from "@nextui-org/react";
import { MouseEventHandler, useEffect, useState } from "react";
import { BsBuildings } from "react-icons/bs";
import { FaMapLocationDot } from "react-icons/fa6";
import { SiBlueprint } from "react-icons/si";
import { CustomRadio } from "@/app/components/radios/customRadio";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import PropertyLoading from "@/app/components/loaders/propertyLoading";
import { useSession } from "next-auth/react";
import type { ListingDetails } from "@/app/lib/types";
import { fetchPropertyDetails } from "@/app/lib/zoopla";

const fieldClassNames = {
  label: "text-lg",
  input: "py-2 text-base text-black",
  inputWrapper: [
    "bg-white",
    "data-focus-[within=true]:bg-white",
    "data-[hover=true]:bg-white",
    "group-data-[focus=true]:bg-white",
  ],
};

type GalleryImage = {
  original: string;
  thumbnail: string;
};

function renderGalleryNav(
  direction: "left" | "right",
  onClick: MouseEventHandler<HTMLButtonElement> | undefined,
  disabled: boolean | undefined
) {
  const isLeft = direction === "left";

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      isIconOnly
      className={`p-0 rounded-full bg-white border-2 border-[#4361EE] absolute top-[45%] ${
        isLeft ? "z-10 left-1" : "z-20 right-1"
      }`}
    >
      {isLeft ? (
        <IoIosArrowBack color="#4361EE" size={32} />
      ) : (
        <IoIosArrowForward color="#4361EE" size={32} />
      )}
    </Button>
  );
}

export default function PropertyDetails({
  params,
}: {
  params: { id: string };
}) {
  const [propertyData, setPropertyData] = useState<ListingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const session = useSession();
  const googleMapKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
  const listingStatus = propertyData?.analyticsTaxonomy?.listingStatus;
  const floorPlanImage = propertyData?.content?.floorPlan?.original;
  const showRentOption =
    listingStatus === "to_rent" || listingStatus === "for_rent";
  const showSaleOption =
    listingStatus === "to_sale" || listingStatus === "for_sale";

  useEffect(() => {
    let cancelled = false;

    async function loadProperty() {
      setLoading(true);
      try {
        const details = await fetchPropertyDetails(params.id);
        if (cancelled) return;

        setPropertyData(details);
        setImages(
          (details?.propertyImage ?? []).map((image) => ({
            original: image.original,
            thumbnail: image.original,
          }))
        );
      } catch (error) {
        console.error(error);
        if (!cancelled) {
          setPropertyData(null);
          setImages([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadProperty();

    return () => {
      cancelled = true;
    };
  }, [params.id]);

  if (loading) return <PropertyLoading />;

  return (
    <div className="py-20 max-w-[1280px] mx-auto md:px-6 px-3">
      <h1 className="md:px-6 px-3 text-center font-semibold text-3xl pb-8">
        {propertyData?.title}
      </h1>
      <div className="flex lg:flex-row flex-col gap-5 justify-between">
        <div className="max-w-[800px]">
          <div className="max-w-[800px]">
            <ImageGallery
              lazyLoad
              showPlayButton={false}
              items={images}
              renderLeftNav={(onClick, disabled) =>
                renderGalleryNav("left", onClick, disabled)
              }
              renderRightNav={(onClick, disabled) =>
                renderGalleryNav("right", onClick, disabled)
              }
            />
          </div>
          <Spacer y={6} />
          <div className="flex justify-between items-center px-6 py-3 rounded-sm bg-[#4361EE] bg-opacity-20">
            <div className="flex flex-col">
              <span className="font-light">Mortgage since:</span>
              <span className="text-lg font-semibold">
                {propertyData?.analyticsTaxonomy?.price} €/month
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
          <Spacer y={6} />
          <div>
            <p className="pb-4 font-semibold text-lg flex justify-normal items-center gap-2">
              <BsBuildings size={40} color="#4361EE" />
              <span>Description</span>
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: propertyData?.detailedDescription ?? "",
              }}
            />
          </div>
          <div className="py-8">
            <p className="pb-4 font-semibold text-lg flex justify-normal items-center gap-2">
              <SiBlueprint size={40} color="#4361EE" />
              <span>Basic characteristics</span>
            </p>
            <ul className="list-disc px-7">
              {propertyData?.councilTaxBand && (
                <li>
                  BrandName:{propertyData?.analyticsTaxonomy?.brandName}
                </li>
              )}
              <li>
                propertyType: {propertyData?.analyticsTaxonomy?.propertyType}
              </li>
              <li>postalCode: {propertyData?.location?.postalCode}</li>
              <li>
                Listing condition:{" "}
                {propertyData?.analyticsTaxonomy?.listingCondition}
              </li>
            </ul>
            {propertyData?.features && (
              <ul className="list-disc px-7 py-3">
                <span className="font-semibold text-lg">Features</span>
                {propertyData.features.bullets ? (
                  propertyData.features.bullets.map((bullet, index) => (
                    <li key={`${bullet}-${index}`}>{bullet}</li>
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
            <p>{propertyData?.analyticsTaxonomy?.displayAddress}</p>
          </div>
          <iframe
            title="Property location"
            width="100%"
            height="450"
            src={`https://www.google.com/maps/embed/v1/place?key=${googleMapKey}&q=${propertyData?.location?.coordinates?.latitude},${propertyData?.location?.coordinates?.longitude}`}
          />
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
                    alt="Floor plan"
                    className="z-0 w-full h-full object-contain"
                    src={floorPlanImage || "/no-image.jpg"}
                  />
                  <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                      <p className="text-black text-tiny">
                        {propertyData?.content?.floorPlan?.original
                          ? "Available"
                          : "Unavailable"}
                      </p>
                      <p className="text-black text-tiny">Ready for view.</p>
                    </div>
                    <Button
                      className="text-tiny"
                      color="primary"
                      radius="full"
                      size="sm"
                      as={Link}
                      href={propertyData.floorPlan?.original}
                      isDisabled={!propertyData.floorPlan?.original}
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
          <form className="flex flex-col gap-3 bg-[#4361EE] bg-opacity-20 py-4 rounded-lg sm:px-6 px-3 w-full sm:w-1/2 lg:w-full">
            <p className="text-3xl font-semibold">Contact Us</p>
            <Spacer y={4} />
            <Input
              type="text"
              label="Name"
              labelPlacement="outside"
              placeholder="Enter your full name"
              classNames={fieldClassNames}
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
              classNames={fieldClassNames}
              radius="sm"
              startContent={<MdEmail />}
              key={session.data?.user?.email ?? "email"}
              defaultValue={session.data?.user?.email ?? ""}
            />
            <Input
              label="Phone Number"
              labelPlacement="outside"
              placeholder="Enter your phone number"
              classNames={fieldClassNames}
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
                {showRentOption && (
                  <CustomRadio description="Rent property" value="rent">
                    Rent
                  </CustomRadio>
                )}
                {showSaleOption && (
                  <CustomRadio description="Buy property" value="sale">
                    Sale
                  </CustomRadio>
                )}
                <CustomRadio description="Invest in property" value="Invest">
                  Invest
                </CustomRadio>
              </RadioGroup>
            </div>
            <Textarea
              label="Message"
              labelPlacement="outside"
              placeholder="Enter your message to inquire about the property"
              minRows={4}
              maxRows={6}
              classNames={fieldClassNames}
              radius="sm"
            />
            <Spacer y={4} />
            {session.data?.user ? (
              <Button
                radius="sm"
                className="border-1 text-primary"
                type="submit"
                variant="bordered"
                color="primary"
              >
                Send Message
              </Button>
            ) : (
              <p className="text-base font-semibold">
                Login or sign up to send a message
              </p>
            )}
          </form>
          <div className="flex flex-col gap-4 bg-[#4361EE] bg-opacity-20 rounded-lg sm:px-6 px-3 py-4 h-fit w-full sm:w-1/2 lg:w-full">
            <span className="font-semibold text-lg">Brief Features</span>
            <p>
              <strong>Listing status:</strong>{" "}
              {listingStatus === "to_rent" ? "for rent" : "for sale"}
            </p>
            <p>
              <strong>Category:</strong>{" "}
              {propertyData?.analyticsTaxonomy?.listingsCategory}
            </p>
            <p>
              <strong>Total floor area:</strong>{" "}
              {propertyData?.sqft === ""
                ? "unavailable"
                : propertyData?.analyticsTaxonomy?.sizeSqFeet}
            </p>
            <p>
              <strong>Number of rooms :</strong>{" "}
              {propertyData?.counts?.numLivingRooms === null
                ? "unavailable"
                : propertyData?.counts?.LivingRooms}
            </p>
            <p>
              <strong>Number of beds:</strong>{" "}
              {propertyData?.analyticsTaxonomy?.numBeds === null
                ? "unavailable"
                : propertyData?.analyticsTaxonomy?.numBeds}
            </p>
            <p>
              <strong>Number of baths:</strong>{" "}
              {propertyData?.analyticsTaxonomy?.numBaths === null
                ? "unavailable"
                : propertyData?.analyticsTaxonomy?.numBaths}
            </p>
            <p>
              <strong>Shared ownership:</strong>{" "}
              {propertyData?.analyticsTaxonomy?.isSharedOwnership
                ? "True"
                : "False"}
            </p>
            <p>
              <strong>Student friendly:</strong>{" "}
              {propertyData?.features?.flags?.studentFriendly
                ? "True"
                : "False"}
            </p>
            <p>
              <strong>Retirement Home:</strong>{" "}
              {propertyData?.analyticsTaxonomy?.isRetirementHome
                ? "True"
                : "False"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

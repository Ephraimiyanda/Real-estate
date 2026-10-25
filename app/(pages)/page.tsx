"use client";

import "../infinitescroll.scss";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Select,
  SelectItem,
  Spinner,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { FormEvent, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useRouter } from "next/navigation";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ListedPropertyBlock from "../components/cards/listedPropertyBlock";
import ListedPropertyLoadingBlock from "../components/loaders/listedPropertyLoading";
import { BlogBlock } from "../components/cards/blogBlock";
import LocationAutocomplete from "@/app/components/search/LocationAutocomplete";
import { useLocationSuggestions } from "@/app/hooks/useLocationSuggestions";
import { newsBlogs } from "@/app/assets/data";
import { PROPERTY_TYPES } from "@/app/lib/constants";
import type { BlogPost, GeoSuggestion, PropertyListing } from "@/app/lib/types";
import { fetchSuggestedProperties } from "@/app/lib/zoopla";

const carouselResponsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const carouselSlides = [
  { src: "/carouselhouse1.jpg", alt: "House with a front garden" },
  { src: "/carouselhouse2.jpg", alt: "Modern residential street" },
  { src: "/carouselhouse3.jpg", alt: "Apartment building exterior" },
];

const partnerLogos = [
  { src: "/google.png", alt: "google" },
  { src: "/amazon.png", alt: "amazon" },
  { src: "/logitech.png", alt: "logitech" },
  { src: "/spotify.png", alt: "spotify" },
  { src: "/samsung.png", alt: "samsung" },
  { src: "/netflix.png", alt: "netflix" },
];

const aboutHighlights = [
  {
    icon: "/smart home.svg",
    alt: "smart home",
    title: "Quality properties",
    body: "Comfortable working and living high excellence suitable properties.",
  },
  {
    icon: "/octagon.svg",
    alt: "octagon",
    title: "Security",
    body: "Commercial and residential properties with unique security needs for the client.",
  },
];

const services = [
  {
    icon: "/search.svg",
    alt: "search",
    title: "Buy a New Home",
    body: "Find a property that fits your needs. Browse our listings and discover the perfect properties.",
    titleClassName: "font-medium",
  },
  {
    icon: "/home.svg",
    alt: "home",
    title: "Sell a House",
    body: "List your property for sale and get serious buyers without hassles.",
    titleClassName: "font-medium",
  },
  {
    icon: "/bed.svg",
    alt: "bed",
    title: "Invest in real estate",
    body: "Discover properties to invest in and over time receive profit.",
    titleClassName: "font-[590]",
  },
];

const neighborhoods = [
  { src: "/house1.png", alt: "house 1", count: "216", place: "New York City, NY" },
  { src: "/house2.png", alt: "house 2", count: "141", place: "Houston, TX" },
  { src: "/house3.png", alt: "house 3", count: "212", place: "San Diego, CA" },
  { src: "/house4.png", alt: "house 4", count: "183", place: "Philadelphia, PA" },
  {
    src: "/house5.png",
    alt: "house 5",
    count: "112",
    place: "San Francisco, CA",
    wide: true,
  },
];

const emptyLocation: GeoSuggestion = {
  geoIdentifier: "",
  geoLabel: "",
};

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [latestProperty, setLatestProperty] = useState("All");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<GeoSuggestion>(emptyLocation);
  const [typeOfProperty, setTypeOfProperty] = useState("");
  const [propertyLoading, setPropertyLoading] = useState(false);
  const [noProperty, setNoProperty] = useState(false);
  const [suggestedProperties, setSuggestedProperties] = useState<
    PropertyListing[]
  >([]);
  const { suggestions, isLoading: autoCompleteLoading } =
    useLocationSuggestions(searchValue);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    setPropertyLoading(true);
    setNoProperty(false);

    fetchSuggestedProperties(1)
      .then((listings) => {
        if (cancelled) return;
        setSuggestedProperties(listings);
        setNoProperty(listings.length === 0);
      })
      .catch((error) => {
        console.error(error);
        if (!cancelled) setNoProperty(true);
      })
      .finally(() => {
        if (!cancelled) setPropertyLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!location.geoIdentifier) return;

    setLoading(true);
    const params = new URLSearchParams({
      page: "1",
      locationIdentifier: location.geoIdentifier,
      locationValue: location.geoLabel,
      minPrice: "100",
      maxPrice: "1000",
      sort: "recent",
      type: typeOfProperty,
      purpose: "rent",
      maxBeds: "4",
    });

    router.push(`/Listings?${params.toString()}`);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full top-[0] scroll-smooth">
      <section className="first-section w-full md:h-[80vh] bg-no-repeat bg-center bg-cover flex flex-col gap-5 py-10">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-16 sm:gap-6 lg:flex-row relative lg:top-0 pt-14 lg:justify-between justify-evenly items-center h-full w-full sm:px-6 px-3">
          <div className="flex flex-col gap-4 w-full">
            <p className="text-base font-medium text-[#4361EE]">REAL ESTATE</p>
            <h1 className="text-4xl sm:text-6xl font-semibold max-w-[500px]">
              Find a perfect home you love ..!
            </h1>
            <p className="max-w-[500px] text-[#808080] text-sm">
              We provide a complete service for the sale, purchase or rental of
              real estate. We have been operating in the UK for more than 15
              years.
            </p>
            <form
              onSubmit={handleSearch}
              className="sm:flex hidden gap-2 p-2 bg-[#F3F3FA] max-w-[650px] w-full items-center"
            >
              <Select
                label="Property Type"
                className="max-w-[160px] bg-white"
                radius="none"
                variant="bordered"
                size="sm"
                selectedKeys={typeOfProperty ? [typeOfProperty] : []}
                onChange={(event) => setTypeOfProperty(event.target.value)}
              >
                {PROPERTY_TYPES.map((item) => (
                  <SelectItem key={item.key} value={item.value}>
                    {item.value}
                  </SelectItem>
                ))}
              </Select>
              <LocationAutocomplete
                size="sm"
                items={suggestions}
                isLoading={autoCompleteLoading}
                inputValue={searchValue}
                onInputChange={setSearchValue}
                onSelect={setLocation}
              />
              <Button
                type="submit"
                startContent={
                  loading ? (
                    <Spinner aria-label="Default" color="default" />
                  ) : (
                    <CiSearch size={30} color="white" />
                  )
                }
                className="bg-[#4361EE] text-white w-[190px] h-[45.5px]"
                radius="none"
              >
                Search
              </Button>
            </form>
          </div>
          <div className="w-full lg:w-auto">
            <div className="mx-auto w-full max-w-[500px] min-w-[270px] lg:w-[400px] relative md:-left-[10px] lg:left-[unset]">
              <Carousel
                additionalTransfrom={0}
                arrows
                autoPlay
                autoPlaySpeed={2500}
                centerMode={false}
                className="rounded-lg"
                containerClass="container"
                customDot={<span className="w-[45px] h-[4px] rounded-sm" />}
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                customLeftArrow={<div className="hidden" />}
                customRightArrow={<div className="hidden" />}
                renderArrowsWhenDisabled
                renderButtonGroupOutside
                renderDotsOutside
                responsive={carouselResponsive}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots
                sliderClass=""
                slidesToSlide={1}
                swipeable
              >
                {carouselSlides.map((slide) => (
                  <Image
                    key={slide.src}
                    src={slide.src}
                    alt={slide.alt}
                    width={800}
                    height={600}
                    className="block h-full w-full"
                  />
                ))}
              </Carousel>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center sm:gap-4 sm:top-0 top-6 relative sm:h-10">
          <Image
            width={1000}
            height={200}
            alt="listings"
            src="/200listings.png"
            className="hover:scale-110 duration-100 ease-in transition-all w-[180px] h-auto sm:w-[240px] sm:h-[120px] relative"
            quality={100}
          />
          <Image
            width={1000}
            height={200}
            alt="happy customers"
            src="/happycustomers.png"
            className="hover:scale-110 duration-100 ease-in transition-all w-[180px] h-auto sm:w-[240px] sm:h-[120px] relative"
            quality={100}
          />
        </div>
      </section>

      <section className="py-10 w-full">
        <p className="text-[#808080] text-center pt-3 pb-5">
          Trusted by 100+ across the globe
        </p>
        <div className="flex gap-4 gallery">
          {partnerLogos.map((logo) => (
            <Image
              key={logo.src}
              width={100}
              height={200}
              alt={logo.alt}
              src={logo.src}
            />
          ))}
        </div>
      </section>

      <section
        className="py-10 w-full min-h-[56vh] flex flex-col items-center"
        id="about-us"
      >
        <div className="flex max-w-[1280px] sm:px-6 px-3 m-auto justify-center flex-col lg:flex-row sm:justify-between items-center w-full">
          <div className="lg:max-w-[450px] flex flex-col gap-4">
            <span className="text-base font-medium text-[#4361EE]">
              WHO ARE WE
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold">
              Assisting individuals in locating the appropriate real estate.
            </h2>
            <p className="text-[#808080]">
              We can help you find the perfect apartment for your needs and
              budget. We have access to a wide range of properties in different
              neighborhoods and we can show you the ones that match your
              criteria.
            </p>
            <div className="flex sm:flex-row lg:flex-col flex-col gap-4">
              {aboutHighlights.map((item) => (
                <div
                  key={item.title}
                  className="flex max-w-[320px] p-3 h-30 shadow-md gap-3 rounded-xl"
                >
                  <Image
                    width={200}
                    height={200}
                    alt={item.alt}
                    src={item.icon}
                    className="w-8"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-[#4361EE]">
                      {item.title}
                    </span>
                    <p className="text-[#808080] text-sm">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-1 py-3">
            <Image
              width={200}
              height={200}
              alt="swimming pool"
              src="/swimingpool.jpg"
              className="sm:w-[260px] h-full translate-y-8 object-contain"
            />
            <div className="flex flex-col">
              <Image
                width={200}
                height={200}
                alt="bedroom"
                src="/bedroom.png"
                className="sm:w-[220px] sm:h-[220px] object-contain"
              />
              <Image
                width={300}
                height={300}
                alt="living room"
                src="/livingroom.png"
                className="sm:w-[220px] sm:h-[220px] object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 w-full min-h-[56vh] flex flex-col items-center">
        <div className="flex max-w-[1280px] flex-col gap-3 sm:gap-0 sm:flex-row sm:px-6 px-3 m-auto justify-between sm:items-center w-full">
          <div className="flex flex-col gap-3">
            <span className="text-base font-medium text-[#4361EE]">
              CHECKOUT OUR NEW
            </span>
            <h3 className="text-3xl sm:text-4xl font-semibold">
              Latest Listed Properties
            </h3>
            <p className="text-[#808080]">
              Check out the latest properties on the market right for you.
            </p>
          </div>
          <Tabs
            aria-label="Options"
            selectedKey={latestProperty}
            onSelectionChange={(key) => setLatestProperty(String(key))}
            variant="light"
            color="primary"
            radius="full"
            className="text-black"
            size="md"
            classNames={{
              tab: "border border-[#4361EE] w-20",
            }}
          >
            <Tab key="All" title="All" />
            <Tab key="Rent" title="Rent" />
            <Tab key="Sale" title="Sale" />
          </Tabs>
        </div>
        <div className="py-4 w-full max-w-[1280px] mx-auto sm:px-6 px-3 h-full flex justify-between gap-3">
          <div className="card-container w-full flex-nowrap py-3 h-full overflow-x-auto flex snap-center snap-x first:scroll">
            {!propertyLoading ? (
              suggestedProperties.map((property) => (
                <div className="py-3 flex gap-4" key={property.listingId}>
                  <ListedPropertyBlock
                    id={property.listingId}
                    num_bathrooms={property.attributes?.bathrooms ?? 0}
                    num_bedrooms={property.attributes?.bedrooms ?? 0}
                    title={property.title}
                    location={property.address}
                    src={property.imageUris?.[0] || "/no-image.jpg"}
                    price={property.pricing?.label ?? ""}
                  />
                </div>
              ))
            ) : (
              <ListedPropertyLoadingBlock />
            )}

            {noProperty && (
              <div className="flex w-full justify-center min-h-[50vh] items-center">
                <p className="text-center text-xl mx-auto">
                  No properties found !!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section
        className="bg-[#eceaea] py-12 w-full min-h-[56vh] flex flex-col items-center"
        id="services"
      >
        <div className="flex flex-col gap-3 max-w-[1280px] w-full sm:px-6 px-3 m-auto">
          <p className="text-base font-medium text-center">OUR SERVICES</p>
          <h4 className="text-3xl sm:text-4xl text-center font-semibold">
            What we offer our clients
          </h4>
          <div className="flex flex-col flex-wrap gap-5 sm:gap-4 items-center sm:items-[unset] sm:flex-row w-full justify-center py-6">
            {services.map((service) => (
              <Card
                key={service.title}
                isHoverable
                isPressable
                className="w-[90%] sm:min-w-[256px] max-w-[350px] sm:w-full flex flex-col justify-center items-center py-5 h-[290px] border-none shadow rounded-[24px]"
              >
                <CardHeader>
                  <div className="flex justify-center items-center bg-[#4361EE] p-2 w-[90px] h-[90px] rounded-[50%] shadow-lg shadow-[#aab7f3] mx-auto">
                    <Image
                      width={100}
                      height={100}
                      alt={service.alt}
                      src={service.icon}
                      className="w-10"
                    />
                  </div>
                </CardHeader>
                <CardBody className="overflow-hidden">
                  <span className={`${service.titleClassName} text-center`}>
                    {service.title}
                  </span>
                  <p className="text-[#808080] text-center">{service.body}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 w-full min-h-[56vh] flex flex-col items-center">
        <Image
          width={100}
          height={100}
          alt="blurry ellipse"
          src="/blurry ellipse.svg"
          className="w-11"
        />
        <div className="flex flex-col gap-3 max-w-[1280px] w-full sm:px-6 px-3 m-auto">
          <span className="text-base font-medium text-[#4361EE]">
            AREAS ACROSS THE TOWN
          </span>
          <h5 className="text-3xl sm:text-4xl font-semibold">
            Neighborhood Properties
          </h5>
          <div className="py-3 grid grid-cols-2 md:grid-cols-3 gap-4">
            {neighborhoods.map((area) => (
              <Card
                key={area.place}
                className={`bg-transparent shadow-none ${
                  area.wide ? "grid col-span-2" : ""
                }`}
              >
                <Image
                  width={area.wide ? 1500 : 1000}
                  height={1000}
                  alt={area.alt}
                  src={area.src}
                  className="max-w-full rounded-lg w-full max-h-[340px] object-fill h-full"
                />
                <CardFooter className="sm:px-10 px-5 absolute bottom-4 sm:bottom-10 sm:left-4 left-3">
                  <div>
                    <span className="text-xl sm:text-5xl drop-shadow text-white font-semibold opacity-60">
                      {area.count}
                    </span>
                    <p className="text-white text-pretty">{area.place}</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        <div className="relative max-w-[1280px] w-full sm:px-10 px-3 right-12">
          <Image
            width={100}
            height={100}
            alt="blurry ellipse"
            src="/blurry ellipse.svg"
            className="w-20 rotate-[270deg] ml-auto"
          />
        </div>
      </section>

      <section
        className="bg-[#4361EE] py-12 w-full min-h-[56vh] flex flex-col items-center"
        id="blogs"
      >
        <div className="max-w-[1280px] w-full sm:px-10 px-3 flex flex-col justify-center items-center gap-4">
          <span className="text-white text-center mx-auto pt-3">
            WHAT’S TRENDING
          </span>
          <h6 className="text-white text-3xl sm:text-4xl font-semibold text-center pt-3 py-4">
            Latest Blogs & Posts
          </h6>
          <div className="blog-container w-full flex-nowrap py-3 h-full overflow-x-auto flex gap-5 snap-center snap-x first:scroll">
            {newsBlogs.map((blog: BlogPost) => (
              <BlogBlock
                key={blog.url}
                title={blog.title}
                description={blog.description}
                link={blog.url}
                imgUrl={blog.urlToImage}
                author={blog.author}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 w-full min-h-[56vh] flex flex-col items-center">
        <div className="max-w-[1280px] w-full sm:px-10 px-3 flex sm:flex-row sm:gap-4 flex-col justify-between gap-10">
          <div className="flex justify-between w-full">
            <div className="max-w-[415px] flex flex-col gap-3">
              <span className="text-[#4361EE]">TESTIMONIALS</span>
              <p className="text-3xl sm:text-4xl font-semibold pt-3 py-4">
                Look What Our Customers Say!
              </p>
              <p>
                Take a look at the testimonies of our customers and what they
                have to say about our services.
              </p>
              <div className="flex max-w-[150px] justify-between relative top-6">
                <Button
                  isIconOnly
                  className="p-2 rounded-[50%] rml border-[#4361EE] border bg-white"
                >
                  <GoArrowLeft color="#4361EE" size={32} />
                </Button>
                <Button
                  isIconOnly
                  className="p-2 rounded-[50%] rml border-[#4361EE] border bg-white"
                >
                  <GoArrowRight color="#4361EE" size={32} />
                </Button>
              </div>
            </div>
            <div />
          </div>
          <div className="flex flex-col gap-4 p-10 shadow-md border-t-gray-100 border-t-1 max-w-[500px] rounded-3xl">
            <Image
              src="/quote.svg"
              width={300}
              height={300}
              alt="quote"
              className="h-[70px] w-[50px] mr-auto"
            />
            <p className="pb-5 border-b-gray-300 border-b-1">
              I highly recommend Jodi J. Appleby. She was attentive to our needs
              and worked tirelessly to find us the perfect home. We
              couldn&apos;t be happier with our new place!
            </p>
            <div className="flex justify-between items-center">
              <p className="font-semibold">Barbara D. Smith</p>
              <Image
                src="/stars.svg"
                width={300}
                height={300}
                alt="rating"
                className="h-[50px] w-[150px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 w-full sm:px-10 px-3">
        <div className="max-w-[1280px] w-full sm:px-10 px-3 sm:pt-0 pt-4 flex mx-auto sm:flex-row flex-col-reverse bg-[#3A0CA3] agent_section relative sm:h-[198px] h-full rounded-3xl">
          <Image
            src="/realtor.png"
            width={300}
            height={300}
            alt="realtor"
            className="lg:absolute sm:-top-14 object-contain"
          />
          <div className="flex sm:flex-row flex-col gap-3 justify-between items-center mx-auto relative">
            <div className="max-w-[500px] text-white">
              <p className="font-semibold text-3xl py-3">Become an Agent.</p>
              <p>
                Join us as an agent and help our customers find the right
                accommodations suitable for them.
              </p>
            </div>
            <Button className="bg-white text-[#4361EE] py-2 px-6 mr-auto sm:mr-[unset] rounded-3xl">
              Register
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";
import Link from "next/link";
import "./infinitescroll.scss";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Input,
  Select,
  SelectItem,
  Spinner,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { ImLocation } from "react-icons/im";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import { GrHomeRounded } from "react-icons/gr";
import { InvestChip, NewListingChip, PopularChip } from "./components/Chips";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Script from "next/script";
import { Helmet } from "react-helmet";
import { useDebounceValue } from "./assest/debounce";
import { redirect, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ListedPropertyBlock from "./components/listedPropertyBlock";
import LoadingBlock from "./components/loading";
import ListedPropertyLoadingBlock from "./components/listedPropertyLoading";
import { BlogBlock } from "./components/blogBlock";

interface property {
  address: string;
  imageUris: string[];
  description: string;
  listingId: number;
  title: string;
  attributes: {
    bathrooms: number;
    bedrooms: number;
  };
  pricing: {
    label: string;
  };
}
interface blog {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  author: string | null;
}

export default function Home() {
  const [searchvalue, setSearchValue] = useState("");
  const [latestProperty, setLatestProperty] = useState<any>("All");
  const [autoComplete, setAutoComplete] = useState([]);
  const [autoCompleteLoading, setAutoCompleteLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<any>({
    geoIdentifier: "",
    geoLabel: "",
  });
  const [typeOfProperty, setTypeOfProperty] = useState<string | any>("");
  const [signInloading, setSignInLoading] = useState<any>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [propertyLoading, setPropertyLoading] = useState(false);
  const [noProperty, setNoProperty] = useState(false);
  const [suggestedProperties, setSuggestedProperties] = useState([]);
  const [newsBlogs, setNewsBlogS] = useState([]);
  const [newsBlogsLoading, setNewsBlogsLoading] = useState(true);
  const searchQuery = useDebounceValue(searchvalue);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_BASE_API;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  const NEWS_API = process.env.NEXT_PUBLIC_NEWS_API;

  //get date
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1);
  const backtrackedDate = new Date(currentDate);

  //property types
  const propertyTypeItems = [
    { key: "apartment", value: "APARTMENT" },
    { key: "condo", value: "CONDO" },
    { key: "townhome", value: "TOWNHOME" },
    { key: "single_family", value: "SINGLE FAMILY" },
    { key: "co_op", value: "Co-op" },
    { key: "cond-op", value: "Cond_op" },
    { key: "other", value: "other" },
  ];

  //run autocomplete for location
  const fetchAutoComplete = async (query: string) => {
    setAutoCompleteLoading(true);
    const url = `${API_URL}/v2/auto-complete?locationPrefix=${query}`;
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
      const autoCompleteResult = result.data.geoSuggestion;
      setAutoComplete(autoCompleteResult);
    } catch (error) {
      console.error(error);
    }
    return setAutoCompleteLoading(false);
  };

  function OnInputChange(value: string) {
    setSearchValue(value);
    RunAutoComplete();
  }

  function RunAutoComplete() {
    if (searchQuery.length > 0) {
      fetchAutoComplete(searchQuery);
    }
  }

  //fetch suggested properties to display on page
  async function fetchSuggestedProperties() {
    setPropertyLoading(true);
    setNoProperty(false);
    const url = `${API_URL}/properties/v2/list?locationValue=london&locationIdentifier=london&page=1&minBeds=1&sortOrder=newest_listings&priceMin=1000&priceMax=120000`;
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
      const suggestedPropertiesResult = result.data.listings.regular;
      setSuggestedProperties(suggestedPropertiesResult);
      setPropertyLoading(false);
      if (suggestedPropertiesResult.length === 0) {
        setNoProperty(true);
        setPropertyLoading(false);
        setLoading(false);
      } else {
        setNoProperty(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  //fetch news blogs
  async function fetchNewsBolgs() {
    setNewsBlogsLoading(true);
    const url = `${NEWS_API}?qInTitle=housing&page=1&pageSize=10&language=en&sortBy=publishedAt&domains=bbc.co.uk,cnn.com`;
    const options = {
      method: "GET",
      headers: {
        "X-Api-Key": `${NEWS_API_KEY}`,
      },
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const newsBlogsResult = result.articles;
      setNewsBlogS(newsBlogsResult);
      console.log(result);
      setNewsBlogsLoading(false);
      if (newsBlogsResult.length === 0) {
        setNewsBlogsLoading(false);
        setLoading(false);
      } else {
        setNoProperty(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchSuggestedProperties();
    fetchNewsBolgs();
  }, [API_KEY, API_URL]);

  //momoized property data
  const memoizedProperties = useMemo(() => {
    return suggestedProperties;
  }, [suggestedProperties]);

  //momoized blog data
  const memoizedBlogs = useMemo(() => {
    return newsBlogs;
  }, [newsBlogs]);

  return (
    <main className="flex min-h-screen  flex-col items-center justify-between  w-full  top-[0] scroll-smooth">
      <section className="first-section w-full md:h-[80vh]  bg-no-repeat bg-center bg-cover flex flex-col gap-5 py-10">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-16 sm:gap-6 lg:flex-row relative lg:top-0 pt-14 lg:justify-between  justify-evenly items-center h-full w-full sm:px-6 px-3 ">
          <div className=" flex flex-col gap-4 w-full ">
            <p className=" text-base font-medium text-[#4361EE]">REAL ESTATE</p>

            <h1 className=" text-4xl sm:text-6xl font-semibold max-w-[500px]">
              Find a perfect home you love ..!
            </h1>
            <p className="max-w-[500px] text-[#808080] text-sm">
              We provide a complete service for the sale, purchase or rental of
              real estate. We have been operating in the UK for more than 15
              years.
            </p>
            <form
              onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();

                if (location.length > 0) {
                  setLoading(true);
                  router.push(
                    `/Listings?page=1&locationIdentifier=${location.geoIdentifier}&locationValue=${location.geoValue}&minPrice=100&maxPrice=1000&sort=recent&type=${typeOfProperty}&purpose=rent&maxBeds=4`
                  );
                }
              }}
              className="sm:flex hidden gap-2 p-2 bg-[#F3F3FA] max-w-[650px] w-full items-center"
            >
              <Select
                label="Property Type"
                className="max-w-[160px] bg-white "
                radius="none"
                variant="bordered"
                size="sm"
                selectedKeys={typeOfProperty.length > 0 ? [typeOfProperty] : ""}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setTypeOfProperty(e.target.value)
                }
              >
                {propertyTypeItems.map((item) => (
                  <SelectItem key={item.key} value={item.value}>
                    {item.value}
                  </SelectItem>
                ))}
              </Select>
              <Autocomplete
                radius="none"
                size="sm"
                aria-label="autocomplete"
                variant="bordered"
                items={autoComplete ? autoComplete : []}
                isLoading={autoCompleteLoading}
                inputValue={searchvalue}
                onSelectionChange={(value: any) => {
                  const selectedItem = JSON.parse(value); // Parse the value to extract both geoIdentifier and geoLabel
                  setLocation({
                    geoIdentifier: selectedItem.geoIdentifier,
                    geoLabel: selectedItem.geoLabel,
                  });
                }}
                placeholder="Select a location"
                onInputChange={OnInputChange}
                allowsEmptyCollection
                startContent={<ImLocation color="#1C3988" size={20} />}
                className="bg-white w-full max-w-[500px]"
              >
                {(item: any) => (
                  <AutocompleteItem
                    key={JSON.stringify({
                      geoIdentifier: item.geoIdentifier,
                      geoLabel: item.geoLabel,
                    })}
                    value={item.geoIdentifier}
                    className="capitalize"
                  >
                    {item.geoLabel}
                  </AutocompleteItem>
                )}
              </Autocomplete>
              <Button
                type="submit"
                startContent={
                  !loading ? (
                    <CiSearch size={30} color="white" />
                  ) : (
                    <Spinner aria-label="Default" color="default" />
                  )
                }
                className="bg-[#4361EE] text-white w-[190px]  h-[45.5px]"
                radius="none"
              >
                Search
              </Button>
            </form>
          </div>
          <div className="w-full lg:w-auto">
            <div className="mx-auto w-full max-w-[500px] min-w-[270px] lg:w-[400px] relative md:-left-[10px]  lg:left-[unset]">
              <Carousel
                additionalTransfrom={0}
                arrows
                autoPlay
                autoPlaySpeed={2500}
                centerMode={false}
                className="rounded-lg "
                containerClass="container "
                customDot={
                  <span className="w-[45px] h-[4px] rounded-sm "></span>
                }
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
                renderArrowsWhenDisabled={true}
                renderButtonGroupOutside={true}
                renderDotsOutside={true}
                responsive={{
                  desktop: {
                    breakpoint: {
                      max: 3000,
                      min: 1024,
                    },
                    items: 1,
                  },
                  mobile: {
                    breakpoint: {
                      max: 464,
                      min: 0,
                    },
                    items: 1,
                  },
                  tablet: {
                    breakpoint: {
                      max: 1024,
                      min: 464,
                    },
                    items: 1,
                  },
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots
                sliderClass=""
                slidesToSlide={1}
                swipeable
              >
                <img
                  src="/carouselhouse1.jpg"
                  style={{
                    display: "block",
                    height: "100%",
                    margin: "auto",
                    width: "100%",
                  }}
                />
                <img
                  src="/carouselhouse2.jpg"
                  style={{
                    display: "block",
                    height: "100%",
                    margin: "auto",
                    width: "100%",
                  }}
                />
                <img
                  src="/carouselhouse3.jpg"
                  style={{
                    display: "block",
                    height: "100%",
                    margin: "auto",
                    width: "100%",
                  }}
                />
              </Carousel>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center sm:gap-4 sm:top-0 top-6 relative sm:h-10 ">
          <Image
            width={1000}
            height={200}
            alt="listings"
            src="/200listings.png"
            className="hover:scale-110 duration-100 ease-in transition-all w-[180px] h-auto sm:w-[240px] sm:h-[120px] relative "
            quality={100}
          />
          <Image
            width={1000}
            height={200}
            alt="happy customers"
            src="/happycustomers.png"
            className="hover:scale-110 duration-100 ease-in transition-all w-[180px] h-auto sm:w-[240px] sm:h-[120px] relative "
            quality={100}
          />
        </div>
      </section>
      <section className="py-10  w-full">
        <p className="text-[#808080] text-center pt-3 pb-5">
          Trusted by 100+ across the globe
        </p>
        <div className="flex gap-4 gallery">
          <Image width={100} height={200} alt="google" src="/google.png" />
          <Image width={100} height={200} alt="amazon" src="/amazon.png" />
          <Image width={100} height={200} alt="logitech" src="/logitech.png" />
          <Image width={100} height={200} alt="spotify" src="/spotify.png" />
          <Image width={100} height={200} alt="samsung" src="/samsung.png" />
          <Image width={100} height={200} alt="netflix" src="/netflix.png" />
        </div>
      </section>
      {/* about section */}
      <section
        className="py-10 w-full min-h-[56vh] flex flex-col items-center "
        id="about-us"
      >
        <div className="flex max-w-[1280px]  sm:px-6 px-3 m-auto justify-center flex-col lg:flex-row sm:justify-between items-center w-full">
          <div className="lg:max-w-[450px] flex flex-col gap-4">
            <span className=" text-base font-medium text-[#4361EE]">
              WHO ARE WE
            </span>
            <h2 className=" text-3xl sm:text-4xl font-semibold">
              Assisting individuals in locating the appropriate real estate.
            </h2>
            <p className="text-[#808080]">
              We can help you find the perfect apartment for your needs and
              budget.We have access to a wide range of properties in different
              neighborhoods and We can show you the ones that match your
              criteria.
            </p>
            <div className="flex sm:flex-row lg:flex-col flex-col gap-4">
              <div className="flex max-w-[320px] p-3 h-30 shadow-md gap-3 rounded-xl">
                <Image
                  width={200}
                  height={200}
                  alt="smart home"
                  src="/smart home.svg"
                  className="w-8"
                />
                <div className="flex flex-col gap-1">
                  <span className=" text-sm font-medium text-[#4361EE]">
                    Quality properties
                  </span>
                  <p className="text-[#808080] text-sm">
                    Comfortable working and living high excellence suitable
                    properties.
                  </p>
                </div>
              </div>

              <div className="flex max-w-[320px] p-3 h-30 shadow-md gap-3 rounded-xl">
                <Image
                  width={200}
                  height={200}
                  alt="octagin"
                  src="/octagon.svg"
                  className="w-8"
                />
                <div className="flex flex-col gap-1">
                  <span className=" text-sm font-medium text-[#4361EE]">
                    Security
                  </span>
                  <p className="text-[#808080] text-sm">
                    Commercial and residential properties with unique security
                    needs for the client.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-1 py-3">
            <Image
              width={200}
              height={200}
              alt="swiming pool"
              src="/swimingpool.jpg"
              className="sm:w-[260px] h-full translate-y-8 object-contain"
            />
            <div className="flex flex-col">
              <Image
                width={200}
                height={200}
                alt="bedroom"
                src="/bedroom.png"
                className="sm:w-[220px] sm:h-[220px] object-contai"
              />
              <Image
                width={300}
                height={300}
                alt="google"
                src="/livingroom.png"
                className="sm:w-[220px] sm:h-[220px] object-contai"
              />
            </div>
          </div>
        </div>
      </section>
      {/* listed properties section */}
      <section className="py-10 w-full min-h-[56vh] flex flex-col items-center ">
        <div className="flex max-w-[1280px] flex-col gap-3 sm:gap-0 sm:flex-row sm:px-6 px-3 m-auto justify-between sm:items-center w-full">
          <div className="flex flex-col gap-3">
            <span className=" text-base font-medium text-[#4361EE]">
              CHECKOUT OUR NEW
            </span>
            <h3 className=" text-3xl sm:text-4xl font-semibold">
              Latest Listed Propeties
            </h3>
            <p className="text-[#808080] ">
              Check out the latest properties on the market right for you.
            </p>
          </div>
          <div>
            <Tabs
              aria-label="Options"
              selectedKey={latestProperty}
              onSelectionChange={setLatestProperty}
              variant="light"
              color="primary"
              radius="full"
              className="text-black"
              size="md"
              classNames={{
                tab: "border border-[#4361EE] w-20",
              }}
            >
              <Tab key="All" title="All"></Tab>
              <Tab key="Rent" title="Rent"></Tab>
              <Tab key="Sale" title="Sale"></Tab>
            </Tabs>
          </div>
        </div>
        <div className="py-4 w-full max-w-[1280px] mx-auto sm:px-6 px-3 h-full   flex justify-between gap-3 ">
          <div className="card-container w-full flex-nowrap  py-3 h-full overflow-x-auto flex snap-center snap-x first:scroll ">
            {memoizedProperties && !propertyLoading ? (
              memoizedProperties.map((properties: property) => (
                <div className="py-3">
                  <ListedPropertyBlock
                    key={properties.listingId}
                    id={properties.listingId}
                    num_bathrooms={properties.attributes.bathrooms}
                    num_bedrooms={properties.attributes.bedrooms}
                    title={properties.title}
                    location={properties.address}
                    src={properties.imageUris[0]}
                    price={properties.pricing.label}
                  />
                </div>
              ))
            ) : (
              <ListedPropertyLoadingBlock />
            )}

            {noProperty && (
              <div className="flex w-full justify center min-h-[50vh] items-center">
                <p className="text-center text-xl mx-auto">
                  No properties found !!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* services section */}
      <section
        className="bg-[#eceaea] py-12  w-full min-h-[56vh] flex flex-col items-center "
        id="services"
      >
        <div className="flex flex-col gap-3 max-w-[1280px] w-full sm:px-6 px-3 m-auto">
          <p className=" text-base font-medium text-center">OUR SERVICES</p>
          <h4 className=" text-3xl sm:text-4xl text-center font-semibold">
            What we offer our clients
          </h4>
          <div className="flex flex-col flex-wrap gap-5 sm:gap-4 items-center sm:items-[unset] sm:flex-row w-full justify-evenly py-6">
            <Card
              isHoverable
              isPressable
              className="w-[90%] sm:min-w-[256px] max-w-[350px] sm:w-full flex flex-col justify-center items-center py-5 h-[290px] border-none shadow rounded-[24px]"
            >
              <CardHeader>
                <div className="flex justify-center items-center bg-[#4361EE] p-2 w-[90px] h-[90px] rounded-[50%] shadow-lg shadow-[#aab7f3] mx-auto">
                  <Image
                    width={100}
                    height={100}
                    alt="search"
                    src="/search.svg"
                    className="w-10"
                  />
                </div>
              </CardHeader>
              <CardBody className="overflow-hidden">
                <span className=" font-medium text-center">Buy a New Home</span>
                <p className="text-[#808080] text-center">
                  Find a property that fits your needs.Browse our listings and
                  discover theperfect properties.
                </p>
              </CardBody>
            </Card>
            <Card
              isHoverable
              isPressable
              className=" w-[90%] sm:min-w-[256px] max-w-[350px] sm:w-full flex flex-col justify-center items-center py-5 h-[290px] border-none shadow rounded-[24px]"
            >
              <CardHeader>
                <div className="flex justify-center items-center bg-[#4361EE] p-2 w-[90px] h-[90px] rounded-[50%] shadow-lg shadow-[#aab7f3] mx-auto">
                  <Image
                    width={100}
                    height={100}
                    alt="home"
                    src="/home.svg"
                    className="w-10"
                  />
                </div>
              </CardHeader>
              <CardBody>
                <span className=" font-medium text-center">Sell a House</span>
                <p className="text-[#808080] text-center">
                  List your property for sale and get seriuos buyers without
                  hassles.
                </p>
              </CardBody>
            </Card>
            <Card
              isHoverable
              isPressable
              className=" w-[90%] sm:min-w-[256px] max-w-[350px] sm:w-full flex flex-col justify-center items-center py-5 h-[290px] border-none shadow rounded-[24px]"
            >
              <CardHeader>
                <div className="flex justify-center items-center bg-[#4361EE] p-2 w-[90px] h-[90px] rounded-[50%] shadow-lg shadow-[#aab7f3] mx-auto">
                  <Image
                    width={100}
                    height={100}
                    alt="bed"
                    src="/bed.svg"
                    className="w-10"
                  />
                </div>
              </CardHeader>
              <CardBody>
                <span className=" font-[590] text-center">Buy a New Home</span>
                <p className="text-[#808080] text-center">
                  Find a property that fits your needs.Browse our listings and
                  discover theperfect properties
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
      {/* areas acroos town section */}
      <section className="py-10 w-full min-h-[56vh] flex flex-col items-center ">
        <Image
          width={100}
          height={100}
          alt="blurry ellipse"
          src="/blurry ellipse.svg"
          className="w-11"
        />
        <div className="flex flex-col gap-3 max-w-[1280px] w-full sm:px-6 px-3 m-auto">
          <span className=" text-base font-medium text-[#4361EE]">
            AREAS ACROSS THE TOWN
          </span>
          <h5 className=" text-3xl sm:text-4xl font-semibold">
            Neighborhood Properties
          </h5>
          <div className="py-3 grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="bg-transparent shadow-none">
              <Image
                width={1000}
                height={1000}
                alt="house 1"
                src="/house1.png"
                className="  max-w-full rounded-lg w-full max-h-[340px] object-fill h-full"
              />
              <CardFooter className="px-10 absolute bottom-10 left-4">
                <div>
                  <span className="text-3xl sm:text-5xl drop-shadow text-white font-semibold opacity-60 ">
                    216
                  </span>
                  <p className="text-white">New York City, NY</p>
                </div>
              </CardFooter>
            </Card>
            <Card className="bg-transparent shadow-none">
              <Image
                width={1000}
                height={1000}
                alt="house2"
                src="/house2.png"
                className="  max-w-full rounded-lg w-full max-h-[340px] object-fill h-full"
              />
              <CardFooter className="px-10 absolute bottom-10 left-4">
                <div>
                  <span className=" text-3xl sm:text-5xl drop-shadow text-white font-semibold opacity-60">
                    141
                  </span>
                  <p className="text-white">Houston, TX</p>
                </div>
              </CardFooter>
            </Card>
            <Card className="bg-transparent shadow-none">
              <Image
                width={1000}
                height={1000}
                alt="house 3"
                src="/house3.png"
                className="  max-w-full rounded-lg w-full max-h-[340px] object-fill h-full"
              />
              <CardFooter className="px-10 absolute bottom-10 left-4">
                <div>
                  <span className="text-3xl sm:text-5xl drop-shadow text-white font-semibold opacity-60">
                    212
                  </span>
                  <p className="text-white">San Diego, CA</p>
                </div>
              </CardFooter>
            </Card>
            <Card className="bg-transparent shadow-none">
              <Image
                width={1000}
                height={1000}
                alt="house 4"
                src="/house4.png"
                className="  max-w-full rounded-lg w-full max-h-[340px] object-fill h-full"
              />
              <CardFooter className="px-10 absolute bottom-10 left-4">
                <div>
                  <span className="text-3xl sm:text-5xl drop-shadow text-white font-semibold opacity-60 ">
                    183
                  </span>
                  <p className="text-white">Philadelphia, PA</p>
                </div>
              </CardFooter>
            </Card>
            <Card className=" grid col-span-2 bg-transparent shadow-none">
              <Image
                width={1500}
                height={1000}
                alt="house 5"
                src="/house5.png"
                className="  max-w-full rounded-lg w-full max-h-[340px] object-fill h-full "
              />
              <CardFooter className="px-10 absolute bottom-10 left-4">
                <div>
                  <span className=" text-3xl sm:text-5xl drop-shadow text-white font-semibold opacity-60">
                    112
                  </span>
                  <p className="text-white">San Francisco, CA</p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className=" relative max-w-[1280px] w-full sm:px-10 px-3 right-12">
          <Image
            width={100}
            height={100}
            alt="blurry ellipse"
            src="/blurry ellipse.svg"
            className="w-20 rotate-[270deg] ml-auto"
          />
        </div>
      </section>
      {/* blog section */}
      <section
        className="bg-[#4361EE] py-12  w-full min-h-[56vh] flex flex-col items-center"
        id="blogs"
      >
        <div className=" max-w-[1280px] w-full sm:px-10 px-3 flex flex-col justify-center items-center gap-4">
          <span className="text-white text-center mx-auto pt-3">
            WHAT’S TRENDING
          </span>
          <h6 className="text-white text-3xl sm:text-4xl font-semibold text-center pt-3 py-4">
            Latest Blogs & Posts
          </h6>
          <div className="blog-container w-full flex-nowrap  py-3 h-full overflow-x-auto flex gap-5 snap-center snap-x first:scroll ">
            {memoizedBlogs && !propertyLoading ? (
              memoizedBlogs.map((blogs: blog, index: number) => (
                <BlogBlock
                  key={index}
                  title={blogs.title}
                  description={blogs.description}
                  link={blogs.url}
                  imgUrl={blogs.urlToImage}
                  author={blogs.author}
                />
              ))
            ) : (
              <ListedPropertyLoadingBlock />
            )}
          </div>
        </div>
      </section>
      {/* testemonial section */}
      <section className="py-28 w-full min-h-[56vh] flex flex-col items-center">
        <div className=" max-w-[1280px] w-full sm:px-10 px-3  flex sm:flex-row sm:gap-4 flex-col  justify-between  gap-10">
          <div className="flex justify-between w-full">
            <div className="max-w-[415px] flex flex-col gap-3">
              <span className="text-[#4361EE]">TESTIMONIALS</span>
              <p className=" text-3xl sm:text-4xl font-semibold  pt-3 py-4">
                Look What Our Customers Say!
              </p>
              <p>
                Take a look at the testemonies of our customers and what they
                have to say about our serviecs.
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
            <div></div>
          </div>
          <div className="flex flex-col gap-4 p-10 shadow-md border-t-gray-100 border-t-1 max-w-[500px] rounded-3xl">
            <Image
              src="/quote.svg"
              width={300}
              height={300}
              alt="quote"
              className=" h-[70px] w-[50px] mr-auto"
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
                alt="quote"
                className=" h-[50px] w-[150px] "
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 w-full  sm:px-10 px-3">
        <div className=" max-w-[1280px] w-full sm:px-10 px-3 sm:pt-0 pt-4 flex mx-auto sm:flex-row flex-col-reverse bg-[#3A0CA3] agent_section relative  sm:h-[198px] h-full rounded-3xl">
          <Image
            src="/realtor.png"
            width={300}
            height={300}
            alt="quote"
            className="lg:absolute sm:-top-14 object-contain"
          />
          <div className="flex sm:flex-row flex-col gap-3 justify-between items-center mx-auto relative">
            <div className="max-w-[500px] text-white">
              <p className=" font-semibold text-3xl py-3">Become a Agent.</p>
              <p>
                Join us as an agent and help our customers find the right
                accomadations suitable for them.{" "}
              </p>
            </div>
            <Button className="bg-white text-[#4361EE] py-2 px-6 mr-auto sm:mr-[unset] rounded-3xl ">
              Register
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
// Home.requireAuth=true

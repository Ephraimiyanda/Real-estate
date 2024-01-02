"use client"
import Link from "next/link";
import "./infinitescroll.scss"
import { Button, Input, Select, SelectItem, Tab, Tabs } from "@nextui-org/react";
import { ImLocation } from "react-icons/im";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
export default function Home() {
  const [searchvalue, setSearchValue] = useState("")
  const [latestProperty,setLatestProperty]=useState<any>("All")
  return (
    <main className="flex min-h-screen  flex-col items-center justify-between absolute w-full  top-[0] ">
      <section className="first-section w-full h-screen  bg-no-repeat bg-center bg-cover flex flex-col py-10">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center h-full w-full sm:px-6 px-3 ">
          <div className=" flex flex-col gap-4 w-full ">
            <p className=" text-base font-medium text-[#4361EE]">REAL ESTATE</p>
            <h1 className=" text-6xl font-semibold max-w-[500px]">
              Find a perfect home you love ..!
            </h1>
            <p className="max-w-[500px] text-[#808080] text-sm">
              We provide a complete service for the sale, purchase or rental of
              real estate. We have been operating in Madrid and Barcelona more
              than 15 years.
            </p>
            <div className="flex gap-2 p-2 bg-[#F3F3FA] max-w-[650px] w-full items-center">
              <Select
                label="Property Type"
                className="max-w-[140px] bg-white "
                radius="none"
                variant="bordered"
                size="sm"
              >
                <SelectItem key={"Residential"} value={"Residential"}>
                  Residential
                </SelectItem>
                <SelectItem key={"Commercial"} value={"Commercial"}>
                  Commercial
                </SelectItem>
              </Select>{" "}
              <Input
                variant="bordered"
                value={searchvalue}
                onChange={(e) => setSearchValue(e.target.value)}
                startContent={<ImLocation color="#1C3988" size={20} />}
                aria-label="searchbar"
                placeholder="Search of location"
                radius="none"
                className="bg-white w-full"
                size="sm"
              />
              <Button
                startContent={<CiSearch size={30} color="white" />}
                className="bg-[#4361EE] text-white w-[190px]  h-[44px]"
                radius="none"
              >
                Search
              </Button>
            </div>
          </div>
          <div>
            <div className="max-w-2xl mx-auto w-[400px]">
              <div
                id="default-carousel"
                className="relative"
                data-carousel="static"
              >
                <div className="overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96">
                  <div
                    className="hidden duration-700 ease-in-out"
                    data-carousel-item
                    data-te-carousel-active
                  >
                    <Image
                      width={400}
                      height={400}
                      src="https://th.bing.com/th/id/R.32a24411345f8c2fabf434efc790913a?rik=7UFdKbcmKvrd2g&pid=ImgRaw&r=0"
                      className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 object-cover h-full max-h-[228px] rounded-xl"
                      alt="..."
                    />
                  </div>
                  <div
                    className="hidden duration-700 ease-in-out"
                    data-carousel-item
                  >
                    <Image
                      width={400}
                      height={400}
                      src="https://th.bing.com/th/id/R.29c4399c34b9a89db684191b4c1928fa?rik=w6H%2fFYn6Bj6kww&pid=ImgRaw&r=0"
                      className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 object-cover h-full max-h-[228px] rounded-xl"
                      alt="..."
                    />
                  </div>

                  <div
                    className="hidden duration-700 ease-in-out"
                    data-carousel-item
                  >
                    <Image
                      width={400}
                      height={400}
                      src="https://www.elyssacohen.com/wp-content/uploads/2016/05/9creek-2-1030x687.jpg"
                      className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 object-cover h-full max-h-[228px] rounded-xl"
                      alt="..."
                    />
                  </div>
                </div>

                <div className=" flex absolute -bottom-4 left-1/2 z-30 space-x-3 -translate-x-1/2">
                  <button
                    type="button"
                    className="w-16 h-1 rounded-sm bg-[#4361EE]"
                    aria-current="false"
                    aria-label="Slide 1"
                    data-carousel-slide-to="0"
                  ></button>
                  <button
                    type="button"
                    className="w-16 h-1 rounded-sm bg-[#4361EE]"
                    aria-current="false"
                    aria-label="Slide 2"
                    data-carousel-slide-to="1"
                  ></button>
                  <button
                    type="button"
                    className="w-16 h-1 rounded-sm bg-[#4361EE]"
                    aria-current="false"
                    aria-label="Slide 3"
                    data-carousel-slide-to="2"
                  ></button>
                </div>

                <button
                  type="button"
                  className="flex absolute top-0 -left-10 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                  data-carousel-prev
                >
                  <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white group-hover:bg-white/70 dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60">
                    <svg
                      className="w-5 h-5 text-[#4361EE] sm:w-6 sm:h-6 dark:text-gray-800 "
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 19l-7-7 7-7"
                      ></path>
                    </svg>
                    <span className="hidden">Previous</span>
                  </span>
                </button>
                <button
                  type="button"
                  className="flex absolute top-0 -right-10 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                  data-carousel-next
                >
                  <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white group-hover:bg-white/70 dark:bg-gray-800/30  dark:group-hover:bg-gray-800/60  ">
                    <svg
                      className="w-5 h-5 text-[#4361EE] sm:w-6 sm:h-6 dark:text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                    <span className="hidden">Next</span>
                  </span>
                </button>
              </div>

              <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4 h-10 ">
          <Image
            width={1000}
            height={200}
            alt="listings"
            src="/200 listings.png"
            className="hover:scale-110 duration-100 ease-in transition-all  sm:w-[240px] h-[120px]"
          />
          <Image
            width={1000}
            height={200}
            alt="happy customers"
            src="/happy customers.png"
            className="hover:scale-110 duration-100 ease-in transition-all  sm:w-[240px] h-[120px]"
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
      <section className="py-10 w-full min-h-[56vh] flex flex-col items-center ">
        <div className="flex max-w-[1280px]  sm:px-6 px-3 m-auto justify-between items-center w-full">
          <div className="max-w-[450px] flex flex-col gap-4">
            <span className=" text-base font-medium text-[#4361EE]">
              WHO ARE WE
            </span>
            <h2 className=" text-4xl font-semibold">
              Assisting individuals in locating the appropriate real estate.
            </h2>
            <p className="text-[#808080]">
              We can help you find the perfect apartment for your needs and
              budget.We have access to a wide range of properties in different
              neighborhoods and We can show you the ones that match your
              criteria.
            </p>
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
          <div className="flex gap-1">
            <Image
              width={200}
              height={200}
              alt="swiming pool"
              src="/swiming pool.jpg"
              className="translate-y-8 w-[200px]"
            />
            <div className="flex flex-col">
              <Image
                width={200}
                height={200}
                alt="bedroom"
                src="/bedroom.png"
              />
              <Image
                width={200}
                height={200}
                alt="google"
                src="/living room.png"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-10 w-full min-h-[56vh] flex flex-col items-center ">
        <div className="flex max-w-[1280px]  sm:px-6 px-3 m-auto justify-between items-center w-full">
          <div className="flex flex-col gap-3">
            <span className=" text-base font-medium text-[#4361EE]">
              CHECKOUT OUR NEW
            </span>
            <h3 className=" text-4xl font-semibold">Latest Listed Propeties</h3>
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
              <Tab key="List" title="List"></Tab>
            </Tabs>
          </div>
        </div>
        <div></div>
      </section>
    </main>
  );
}

"use client";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Selection,
  Slider,
  SliderValue,
  Spinner,
} from "@nextui-org/react";
import { FormEvent, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { ImLocation } from "react-icons/im";
import SearchBlock from "@/app/components/searchBlock";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import LoadingBlock from "@/app/components/loading";
interface property {
  address: string;
  image: string;
  description: string;
  id: number;
}
//function to prevent mnultiple calls on fetch
function useDebounceValue(value: string, time = 250) {
  const [debouncevalue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, time);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, time]);

  return debouncevalue;
}

export default function Search() {
  const [suggestedProperties, setSuggestedProperties] = useState([]);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState<any>("");
  const [autoComplete, setAutoComplete] = useState([]);
  const [autoCompleteLoading, setAutoCompleteLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number | any>(1);
  const [priceRange, setPriceRange] = useState<SliderValue | any>([100, 12000]);
  const [bedNumber, setBedNumber] = useState<string | any>();
  const [typeOfProperty, setTypeOfProperty] = useState<string | any>("");
  const [purposeOfProperty, setPurposeOfProperty] = useState<string | any>("");
  const [propertyLoading, setPropertyLoading] = useState(false);
  const [sortBy, setSortBy] = useState<string | any>("");
  const searchQuery = useDebounceValue(query);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const propertyCost = ["highest", "lowest", "recommended", "recent"];
  console.log(bedNumber, sortBy, location,purposeOfProperty,suggestedProperties);
  const propertypurposeItems = [
    { key: "rent", value: "Rent" },
    { key: "sale", value: "Sale" },
    { key: "invest", value: "Invest" },
  ];

  const propertyTypeItems = [
    { key: "apartment", value: "APARTMENT" },
    { key: "condo", value: "CONDO" },
    { key: "townhome", value: "TOWNHOME" },
    { key: "single_family", value: "SINGLE FAMILY" },
    { key: "co_op", value: "Co-op" },
    { key: "cond-op", value: "Cond_op" },
    { key: "other", value: "other" },
  ];
  const numberOfBedrooms = [
    { key: 1, title: "1+ bedroom" },
    { key: 2, title: "2+ bedroom" },
    { key: 3, title: "3+ bedroom" },
    { key: 4, title: "4+ bedroom" },
    { key: 5, title: "5+ bedroom" },
  ];
  //setting states to url as params
  function handleSearch() {
    
    const params = new URLSearchParams();
    if (searchQuery.length > 0) {
      params.set("page", currentPage);
      params.set("locationKey", location);
      params.set("minPrice", priceRange[0]);
      params.set("maxPrice", priceRange[1]);
      params.set("maxBeds", bedNumber);
      params.set("sort", sortBy);
      params.set("type", typeOfProperty)
      params.set("purpose", purposeOfProperty);
    } else {
      params.delete("page", currentPage);
      params.delete("locationKey", location);
      params.delete("minPrice", priceRange[0]);
      params.delete("maxPrice", priceRange[1]);
      params.delete("maxBeds", bedNumber);
      params.delete("sort", sortBy);
       params.delete("type", typeOfProperty);
       params.delete("purpose", purposeOfProperty);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  //getting params from url and setting them to state
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const locationParam = params.get("locationKey");
    const priceMinParam = params.get("minPrice");
    const priceMaxParam = params.get("maxPrice");
    const bedsParam = params.get("maxBeds");
    const sortParam = params.get("sort");
    const pageParam = params.get("page");
    const typeParam = params.get("type");
    const purposeParam = params.get("purpose");

    if (locationParam !==null) {
      console.log(bedsParam,sortParam,locationParam);
      setLocation(locationParam);
      setPriceRange([Number(priceMinParam), Number(priceMaxParam)]);
      setBedNumber(bedsParam);
      setSortBy(sortParam);
      setCurrentPage(Number(pageParam));
      setPurposeOfProperty(purposeParam)
      setTypeOfProperty(typeParam)
    }
  }, []);

  //fetch suggested properties to display on page
  async function fetchSuggestedProperties() {
    setPropertyLoading(true);
       const url =
         `https://zoopla4.p.rapidapi.com/properties/rent?locationKey=london&minPrice=100&page=${currentPage}&minBeds=1&sort=recent&maxPrice=12000`;
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
       const suggestedPropertiesResult = result.data;
       setSuggestedProperties(suggestedPropertiesResult);
       setPropertyLoading(false);
     } catch (error) {
       console.error(error);
     }
  }
  //search for properties based on given params
  const searchProperties = async () => {
    // setPropertyLoading(true);
    // const url = `https://zoopla4.p.rapidapi.com/properties/rent?locationKey=${location}&minPrice=${priceRange[0]}&page=${currentPage}&maxBeds=${bedNumber} &minBeds=${bedNumber}&sort=${sortBy}&maxPrice=${priceRange[1]}`;
    // const options = {
    //   method: "GET",
    //   headers: {
    //     "X-RapidAPI-Key": "5ebd5f9a81msh1cd13fdc012bf64p19cb9bjsnd3764f7fd7a9",
    //     "X-RapidAPI-Host": "zoopla4.p.rapidapi.com",
    //   },
    // };
    // try {
    //   const response = await fetch(url, options);
    //   const result = await response.json();
    //   const suggestedPropertiesResult = result.data;
    //   setPropertyLoading(false);
    //   setSuggestedProperties(suggestedPropertiesResult);
    // } catch (error) {
    //   console.error(error);
    // }
  };
  useEffect(() => {
    if (location) {
      searchProperties();
    } else {
      fetchSuggestedProperties();
    }
  }, []);

  //run autocomplete fo location

  const fetchAutoComplete = async (query: string) => {
    setAutoCompleteLoading(true);
    const url = `https://zoopla4.p.rapidapi.com/locations?location=${query}`;
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
      const autoCompleteResult = result.data;
      setAutoComplete(autoCompleteResult);
    } catch (error) {
      console.error(error);
    }
    return setAutoCompleteLoading(false);
  };

  // const list = useAsyncList({
  //   async load({ signal, filterText }) {
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         "X-RapidAPI-Key":
  //           "5ebd5f9a81msh1cd13fdc012bf64p19cb9bjsnd3764f7fd7a9",
  //         "X-RapidAPI-Host": "realtor-search.p.rapidapi.com",
  //       },
  //     };
  //     let res = await fetch(
  //       `https://realtor-search.p.rapidapi.com/properties/auto-complete?input=${filterText}`,
  //       options
  //     );
  //     let json = await res.json();

  //     return {
  //       items: json.data.autocomplete,
  //     };
  //   },
  // });

  function RunAutoComplete() {
    if (searchQuery.length > 0) {
      fetchAutoComplete(searchQuery);
    }
  }
  function OnInputChange(value: string) {
    setQuery(value);
    RunAutoComplete();
  }
  //pagination based on results
  const setPagination = (value: number) => {
    setCurrentPage(value);
    if (location) {
      searchProperties();
    } else {
      fetchSuggestedProperties();
    }
  };

  return (
    <section className="py-20">
      <div className="">
        <div className="text-center py-10 max-w-[1280px] mx-auto sm:px-6 px-3">
          <h1 className="text-[#141B2D] text-4xl py-3 font-semibold">
            Search for an offer
          </h1>
          <p>Choose from the most advantageous offers</p>
        </div>

        <div className="py-6 bg-[#4361EE] bg-opacity-10">
          <div className="max-w-[1280px] mx-auto sm:px-6 px-3">
            <form
              onSubmit={(e: FormEvent<HTMLFormElement>) => {
                if (location) {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            >
              <div className="flex gap-3 items-center justify-center">
                <Autocomplete
                  radius="none"
                  size="md"
                  aria-label="autocomplete"
                  variant="bordered"
                  items={autoComplete ? autoComplete : []}
                  isLoading={autoCompleteLoading}
                  inputValue={query}
                  onSelectionChange={setLocation}
                  placeholder="Select a location"
                  onInputChange={OnInputChange}
                  allowsEmptyCollection
                  startContent={<ImLocation color="#1C3988" size={20} />}
                  className="bg-white w-full max-w-[500px]"
                  defaultSelectedKey={searchParams
                    .get("locationKey")
                    ?.toString()}
                >
                  {(item: any) => (
                    <AutocompleteItem
                      key={item.key}
                      value={item.key}
                      className="capitalize"
                    >
                      {item.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <Button
                  type="submit"
                  startContent={<CiSearch size={30} color="white" />}
                  className="bg-[#4361EE] flex items-center text-base justify-center text-white w-[150px]  h-[53px]"
                  radius="none"
                >
                  Search
                </Button>
              </div>
              <p className="text-center py-5 text-gray-600">filter settings</p>
              <div className="flex gap-5 justify-evenly flex-wrap ">
                <Select
                  label="Property Purpose"
                  className=" sm:max-w-[200px] bg-white "
                  radius="none"
                  variant="bordered"
                  size="md"
                  selectedKeys={
                    purposeOfProperty.length > 0 ? [purposeOfProperty] : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setPurposeOfProperty(e.target.value)
                  }
                >
                  {propertypurposeItems.map((item) => (
                    <SelectItem key={item.key} value={item.value}>
                      {item.value}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Number of bedrooms"
                  className=" sm:max-w-[200px] bg-white "
                  radius="none"
                  variant="bordered"
                  size="md"
                  selectedKeys={bedNumber ? [bedNumber] : ""}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setBedNumber(e.target.value)
                  }
                >
                  {numberOfBedrooms.map((item) => (
                    <SelectItem key={item.key} value={item.title}>
                      {item.title}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  label="Property Type"
                  className=" sm:max-w-[200px] bg-white "
                  radius="none"
                  variant="bordered"
                  size="md"
                  selectedKeys={typeOfProperty.length>0?[typeOfProperty]:""}
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
                <Select
                  label="Sort by"
                  className=" sm:max-w-[200px] bg-white "
                  radius="none"
                  variant="bordered"
                  size="md"
                  selectedKeys={sortBy.length>0?[sortBy]:""}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSortBy(e.target.value)
                  }
                >
                  {propertyCost.map((cost) => (
                    <SelectItem key={cost} value={cost}>
                      {cost}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className="flex justify-center py-6">
                <Slider
                  label="Price Range"
                  size="sm"
                  step={50}
                  minValue={0}
                  maxValue={30000}
                  value={priceRange}
                  onChange={setPriceRange}
                  formatOptions={{ style: "currency", currency: "USD" }}
                  className="max-w-md"
                  showTooltip
                  tooltipValueFormatOptions={{
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }}
                  tooltipProps={{
                    placement: "bottom",
                  }}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto  sm:px-6 px-3">
          <div className=" flex justify-center sm:justify-between items-center sm:items-start  flex-wrap  py-7 gap-4">
            {suggestedProperties&&!propertyLoading? (
              suggestedProperties.map((properties: property) => (
                <SearchBlock
                  key={properties.id}
                  title={properties.description}
                  location={properties.address}
                  src={properties.image}
                />
              ))
            ) : (
              <LoadingBlock />
            )}
          </div>
          <div className="py-4 flex justify-center ">
            <Pagination
              total={10}
              color="primary"
              page={currentPage}
              onChange={setPagination}
              size="md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

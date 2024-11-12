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
import { useDebounceValue } from "@/app/assest/debounce";
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
}
export default function Page() {
  const [suggestedProperties, setSuggestedProperties] = useState([]);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState<any>({
    geoIdentifier: "london",
    geoLabel: "london",
  });
  const [autoComplete, setAutoComplete] = useState([]);
  const [autoCompleteLoading, setAutoCompleteLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number | any>(1);
  const [priceRange, setPriceRange] = useState<SliderValue | any>([
    1000, 120000,
  ]);
  const [bedNumber, setBedNumber] = useState<string | any>(3);
  const [typeOfProperty, setTypeOfProperty] = useState<string | any>("");
  const [purposeOfProperty, setPurposeOfProperty] = useState<string | any>("");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<string | any>("");
  const [propertyLoading, setPropertyLoading] = useState(false);
  const [noProperty, setNoProperty] = useState(false);
  const searchQuery = useDebounceValue(query);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const router = useRouter();
  const propertyCost = [
    {
      label: "highest",
      key: "highest_price",
    },
    {
      label: "lowest",
      key: "lowest_price ",
    },
    {
      label: "newest",
      key: "newest_listings ",
    },
    {
      label: "most reduced",
      key: "most_reduced ",
    },
  ];
  const API_URL = process.env.NEXT_PUBLIC_BASE_API;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

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
    if (location) {
      params.set("page", currentPage);
      params.set("locationIdentifier", location.geoIdentifier);
      params.set("locationValue", location.geoLabel);
      params.set("location", query);
      params.set("minPrice", priceRange[0]);
      params.set("maxPrice", priceRange[1]);
      params.set("maxBeds", bedNumber);
      params.set("sort", sortBy);
      params.set("type", typeOfProperty);
      params.set("purpose", purposeOfProperty);
    } else {
      params.delete("locationIdentifier", location.geoIdentifier);
      params.delete("locationValue", location.geoLabel);
      params.delete("page", currentPage);
      params.delete("location", query);
      params.delete("locationKey", location);
      params.delete("minPrice", priceRange[0]);
      params.delete("maxPrice", priceRange[1]);
      params.delete("maxBeds", bedNumber);
      params.delete("sort", sortBy);
      params.delete("type", typeOfProperty);
      params.delete("purpose", purposeOfProperty);
    }
    replace(`${pathname}?${params.toString()}`);
    searchProperties();
  }

  //fetch suggested properties to display on page
  async function fetchSuggestedProperties() {
    setPropertyLoading(true);
    setNoProperty(false);
    const url = `${API_URL}/properties/v2/list?locationValue=london&locationIdentifier=london&page=${currentPage}&minBeds=1&sortOrder=newest_listings&priceMin=1000&priceMax=120000`;
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

  //search for properties based on given params
  const searchProperties = async () => {
    setPropertyLoading(true);
    setNoProperty(false);
    setLoading(true);
    const url = `${API_URL}/properties/v2/list?locationValue=${
      location.geoLabel
    }&locationIdentifier=${location.geoIdentifier}&priceMin=${
      priceRange[0]
    }&priceMax=${
      priceRange[1]
    }&page=${currentPage}&bedsMax=${bedNumber}&sortOrder=${sortBy}&includeRented=${
      purposeOfProperty === "rent" ? true : false
    }`;
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
      setLoading(false);
      if (suggestedPropertiesResult && suggestedPropertiesResult.length === 0) {
        setPropertyLoading(false);
        setNoProperty(true);
      } else {
        setNoProperty(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //getting params from url and setting them to state
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const locationIdentifierParam = params.get("locationIdentifier");
    const locationValueParam = params.get("locationValue");
    const priceMinParam = params.get("minPrice");
    const priceMaxParam = params.get("maxPrice");
    const bedsParam = params.get("maxBeds");
    const sortParam = params.get("sort");
    const pageParam = params.get("page");
    const typeParam = params.get("type");
    const purposeParam = params.get("purpose");

    // Update state from URL params
    if (pageParam) {
      setCurrentPage(Number(pageParam));
    }
    if (locationIdentifierParam) {
      setLocation({
        geoIdentifier: locationIdentifierParam,
        geoLabel: locationValueParam,
      });
      setQuery(locationValueParam as string);
      setPriceRange([Number(priceMinParam), Number(priceMaxParam)]);
      setBedNumber(bedsParam);
      setSortBy(sortParam);
      setPurposeOfProperty(purposeParam);
      setTypeOfProperty(typeParam);
    }
  }, []);

  // Second effect: trigger searchProperties or fetchSuggestedProperties
  useEffect(() => {
    // Only run if all necessary state variables have been set
    if (
      location && // Ensure the location has been set correctly
      priceRange &&
      priceRange[0] !== undefined &&
      priceRange[1] !== undefined &&
      purposeOfProperty &&
      typeOfProperty &&
      bedNumber &&
      sortBy &&
      currentPage
    ) {
      searchProperties();
    } else {
      fetchSuggestedProperties();
    }
  }, []);

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

  function RunAutoComplete() {
    if (searchQuery && searchQuery.length > 0) {
      fetchAutoComplete(searchQuery);
    }
  }
  function OnInputChange(value: string) {
    setQuery(value);
    RunAutoComplete();
  }
  //pagination based on results
  const setPagination = (value: number) => {
    setNoProperty(false);
    const params = new URLSearchParams(window.location.search);
    if (location) {
      params.set("page", value.toString());
      params.set("locationIdentifier", location.geoIdentifier);
      params.set("locationValue", location.geoLabel);
      params.set("minPrice", priceRange[0]);
      params.set("maxPrice", priceRange[1]);
      params.set("maxBeds", bedNumber);
      params.set("sort", sortBy);
      params.set("type", typeOfProperty);
      params.set("purpose", purposeOfProperty);

      replace(`${pathname}?${params.toString()}`);
      searchProperties();
    } else {
      params.set("page", value.toString());
      replace(`${pathname}?${params.toString()}`);
      fetchSuggestedProperties();
    }
    setCurrentPage(value);
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
                  setPagination(1);
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
                  inputValue={query ? query : ""}
                  onSelectionChange={(value: any) => {
                    const selectedItem = JSON.parse(value); // Parse the value to extract both geoIdentifier and geoLabel
                    setLocation({
                      geoIdentifier: selectedItem?.geoIdentifier
                        ? selectedItem?.geoIdentifier
                        : "",
                      geoLabel: selectedItem?.geoLabel
                        ? selectedItem?.geoLabel
                        : "",
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
                  endContent={
                    !loading ? (
                      <CiSearch size={30} color="white" />
                    ) : (
                      <Spinner aria-label="Default" color="default" />
                    )
                  }
                  className="bg-[#4361EE] flex items-center text-base justify-center text-white w-[50px] sm:w-[150px]  h-[53px]"
                  radius="none"
                >
                  <span className="hidden sm:block"> Search</span>
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
                    <SelectItem key={item.key} value={item.key}>
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
                  selectedKeys={
                    typeOfProperty.length > 0 ? [typeOfProperty] : ""
                  }
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
                  selectedKeys={sortBy.length > 0 ? [sortBy] : ""}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSortBy(e.target.value)
                  }
                >
                  {propertyCost.map((cost) => (
                    <SelectItem key={cost.key} value={cost.key}>
                      {cost.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className="flex justify-center py-6">
                <Slider
                  label="Price Range"
                  size="sm"
                  step={50}
                  minValue={1000}
                  maxValue={1000000}
                  value={priceRange}
                  onChange={setPriceRange}
                  formatOptions={{ style: "currency", currency: "GBP" }}
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
        <div className="max-w-[1280px] mx-auto w-full sm:px-6 px-3">
          <div className="  md:justify-evenly lg:justify-between items-center sm:items-start  flex-wrap  py-7 gap-4">
            {suggestedProperties && !propertyLoading ? (
              <div className="grid gap-4 grid-cols-1 place-content-center place-items-center items-center  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4  mx-auto w-full max-w-[1280px] ">
                {suggestedProperties.map((properties: property) => (
                  <SearchBlock
                    key={properties.listingId}
                    id={properties.listingId}
                    num_bathrooms={properties.attributes.bathrooms}
                    num_bedrooms={properties.attributes.bedrooms}
                    title={properties.title}
                    location={properties.address}
                    src={properties.imageUris[0]}
                  />
                ))}
              </div>
            ) : (
              <LoadingBlock />
            )}
            {noProperty && (
              <div className="flex w-full justify center min-h-[50vh] items-center">
                <p className="text-center text-xl mx-auto">
                  No properties found !!
                </p>
              </div>
            )}
          </div>
          <div className="py-4 flex justify-center ">
            <Pagination
              total={10}
              color="primary"
              page={currentPage}
              onChange={setPagination}
              initialPage={1}
              size="md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

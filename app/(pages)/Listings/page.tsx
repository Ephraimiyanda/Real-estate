"use client";

import {
  Button,
  Pagination,
  Select,
  SelectItem,
  Slider,
  SliderValue,
  Spinner,
} from "@nextui-org/react";
import { FormEvent, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchBlock from "@/app/components/cards/searchBlock";
import LoadingBlock from "@/app/components/loaders/loading";
import LocationAutocomplete from "@/app/components/search/LocationAutocomplete";
import { useLocationSuggestions } from "@/app/hooks/useLocationSuggestions";
import {
  BEDROOM_OPTIONS,
  DEFAULT_LOCATION,
  PROPERTY_PURPOSES,
  PROPERTY_TYPES,
  SORT_OPTIONS,
} from "@/app/lib/constants";
import type { GeoSuggestion, PropertyListing } from "@/app/lib/types";
import {
  fetchSuggestedProperties,
  searchProperties,
} from "@/app/lib/zoopla";

function priceBounds(value: SliderValue): [number, number] {
  if (Array.isArray(value)) {
    return [Number(value[0]), Number(value[1])];
  }

  const price = Number(value);
  return [price, price];
}

function selectedKeys(value: string) {
  return value ? [value] : [];
}

export default function Listings() {
  const [suggestedProperties, setSuggestedProperties] = useState<
    PropertyListing[]
  >([]);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState<GeoSuggestion>({
    ...DEFAULT_LOCATION,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState<SliderValue>([1000, 120000]);
  const [bedNumber, setBedNumber] = useState("");
  const [typeOfProperty, setTypeOfProperty] = useState("");
  const [purposeOfProperty, setPurposeOfProperty] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [propertyLoading, setPropertyLoading] = useState(false);
  const [noProperty, setNoProperty] = useState(false);
  const { suggestions, isLoading: autoCompleteLoading } =
    useLocationSuggestions(query);
  const pathname = usePathname() ?? "/Listings";
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString = searchParams?.toString() ?? "";

  useEffect(() => {
    const params = new URLSearchParams(queryString);
    const locationIdentifier = params.get("locationIdentifier");
    const locationValue = params.get("locationValue") ?? "";
    const minPriceParam = params.get("minPrice");
    const maxPriceParam = params.get("maxPrice");
    const beds = params.get("maxBeds") ?? "";
    const sort = params.get("sort") ?? "";
    const type = params.get("type") ?? "";
    const purpose = params.get("purpose") ?? "";
    const page = Number(params.get("page") || "1");
    const safePage = Number.isFinite(page) && page > 0 ? page : 1;

    setCurrentPage(safePage);

    const hasFilterSearch = Boolean(
      locationIdentifier &&
        minPriceParam !== null &&
        maxPriceParam !== null &&
        beds &&
        sort &&
        purpose
    );
    const hasSearch = Boolean(
      locationIdentifier && (params.get("search") === "1" || hasFilterSearch)
    );

    if (locationIdentifier) {
      setLocation({
        geoIdentifier: locationIdentifier,
        geoLabel: locationValue,
      });
      setQuery(locationValue);
      if (minPriceParam !== null && maxPriceParam !== null) {
        setPriceRange([Number(minPriceParam), Number(maxPriceParam)]);
      }
      setBedNumber(beds);
      setSortBy(sort);
      setPurposeOfProperty(purpose);
      setTypeOfProperty(type);
    }

    let cancelled = false;
    setPropertyLoading(true);
    setNoProperty(false);
    setLoading(hasSearch);

    const request = hasSearch
      ? searchProperties({
          geoIdentifier: locationIdentifier ?? "",
          geoLabel: locationValue,
          minPrice: Number(minPriceParam),
          maxPrice: Number(maxPriceParam),
          page: safePage,
          maxBeds: beds,
          sortOrder: sort,
          purpose,
        })
      : fetchSuggestedProperties(safePage);

    request
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
        if (!cancelled) {
          setPropertyLoading(false);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [queryString]);

  function writeSearchParams(page: number) {
    const [minPrice, maxPrice] = priceBounds(priceRange);
    const params = new URLSearchParams();

    if (location.geoIdentifier) {
      params.set("search", "1");
      params.set("page", String(page));
      params.set("locationIdentifier", location.geoIdentifier);
      params.set("locationValue", location.geoLabel);
      params.set("location", query);
      params.set("minPrice", String(minPrice));
      params.set("maxPrice", String(maxPrice));
      params.set("maxBeds", bedNumber);
      params.set("sort", sortBy);
      params.set("type", typeOfProperty);
      params.set("purpose", purposeOfProperty);
    } else {
      params.set("page", String(page));
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!location.geoIdentifier) return;
    setCurrentPage(1);
    writeSearchParams(1);
  }

  function setPagination(value: number) {
    setNoProperty(false);
    setCurrentPage(value);
    writeSearchParams(value);
  }

  return (
    <section className="py-20">
      <div>
        <div className="text-center py-10 max-w-[1280px] mx-auto sm:px-6 px-3">
          <h1 className="text-[#141B2D] text-4xl py-3 font-semibold">
            Search for an offer
          </h1>
          <p>Choose from the most advantageous offers</p>
        </div>

        <div className="py-6 bg-[#4361EE] bg-opacity-10">
          <div className="max-w-[1280px] mx-auto sm:px-6 px-3">
            <form onSubmit={handleSearch}>
              <div className="flex gap-3 items-center justify-center">
                <LocationAutocomplete
                  items={suggestions}
                  isLoading={autoCompleteLoading}
                  inputValue={query}
                  onInputChange={setQuery}
                  onSelect={setLocation}
                />
                <Button
                  type="submit"
                  endContent={
                    loading ? (
                      <Spinner aria-label="Default" color="default" />
                    ) : (
                      <CiSearch size={30} color="white" />
                    )
                  }
                  className="bg-[#4361EE] flex items-center text-base justify-center text-white w-[50px] sm:w-[150px] h-[53px]"
                  radius="none"
                >
                  <span className="hidden sm:block">Search</span>
                </Button>
              </div>
              <p className="text-center py-5 text-gray-600">filter settings</p>
              <div className="flex gap-5 justify-evenly flex-wrap">
                <Select
                  label="Property Purpose"
                  className="sm:max-w-[200px] bg-white"
                  radius="none"
                  variant="bordered"
                  size="md"
                  selectedKeys={selectedKeys(purposeOfProperty)}
                  onChange={(event) =>
                    setPurposeOfProperty(event.target.value)
                  }
                >
                  {PROPERTY_PURPOSES.map((item) => (
                    <SelectItem key={item.key} value={item.key}>
                      {item.value}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Number of bedrooms"
                  className="sm:max-w-[200px] bg-white"
                  radius="none"
                  variant="bordered"
                  size="md"
                  selectedKeys={selectedKeys(bedNumber)}
                  onChange={(event) => setBedNumber(event.target.value)}
                >
                  {BEDROOM_OPTIONS.map((item) => (
                    <SelectItem key={item.key} value={item.title}>
                      {item.title}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Property Type"
                  className="sm:max-w-[200px] bg-white"
                  radius="none"
                  variant="bordered"
                  size="md"
                  selectedKeys={selectedKeys(typeOfProperty)}
                  onChange={(event) => setTypeOfProperty(event.target.value)}
                >
                  {PROPERTY_TYPES.map((item) => (
                    <SelectItem key={item.key} value={item.value}>
                      {item.value}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Sort by"
                  className="sm:max-w-[200px] bg-white"
                  radius="none"
                  variant="bordered"
                  size="md"
                  selectedKeys={selectedKeys(sortBy)}
                  onChange={(event) => setSortBy(event.target.value)}
                >
                  {SORT_OPTIONS.map((cost) => (
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
          <div className="md:justify-evenly lg:justify-between items-center sm:items-start flex-wrap py-7 gap-4">
            {!propertyLoading ? (
              <div className="grid gap-4 grid-cols-1 place-content-center place-items-center items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto w-full max-w-[1280px]">
                {suggestedProperties.map((property) => (
                  <SearchBlock
                    key={property.listingId}
                    id={property.listingId}
                    num_bathrooms={property.attributes?.bathrooms ?? 0}
                    num_bedrooms={property.attributes?.bedrooms ?? 0}
                    title={property.title}
                    location={property.address}
                    src={property.imageUris?.[0] || "/no-image.jpg"}
                  />
                ))}
              </div>
            ) : (
              <LoadingBlock />
            )}
            {noProperty && (
              <div className="flex w-full justify-center min-h-[50vh] items-center">
                <p className="text-center text-xl mx-auto">
                  No properties found !!
                </p>
              </div>
            )}
          </div>
          <div className="py-4 flex justify-center">
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

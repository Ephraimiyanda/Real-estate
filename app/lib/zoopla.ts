import { SUGGESTED_LISTINGS_QUERY } from "@/app/lib/constants";
import type {
  GeoSuggestion,
  ListingDetails,
  PropertyListing,
  PropertySearchQuery,
} from "@/app/lib/types";

const API_URL = process.env.NEXT_PUBLIC_BASE_API;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_HOST = "zoopla.p.rapidapi.com";
const VALID_SORTS = new Set([
  "newest_listings",
  "highest_price",
  "lowest_price",
  "most_reduced",
]);

type SearchFeature = {
  content?: number | string;
  iconId?: string;
};

type SearchListing = {
  listingId?: string | number;
  title?: string;
  address?: string;
  price?: string;
  shortPriceTitle?: string;
  image?: { src?: string };
  features?: SearchFeature[];
};

type ListingsResponse = {
  data?: {
    listings?: { regular?: SearchListing[] };
    searchListings?: {
      listings?: {
        regular?: SearchListing[];
        featured?: SearchListing[];
      };
    };
  };
};

async function zooplaGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY ?? "",
      "X-RapidAPI-Host": API_HOST,
    },
  });

  if (response.status === 204) return {} as T;

  const body = await response.text();
  if (!body) return {} as T;

  return JSON.parse(body) as T;
}

function featureCount(features: SearchFeature[] | undefined, iconId: string) {
  const match = features?.find((feature) => feature.iconId === iconId);
  const count = Number(match?.content ?? 0);
  return Number.isFinite(count) ? count : 0;
}

function mapListing(item: SearchListing): PropertyListing {
  return {
    listingId: item.listingId ?? "",
    title: item.title ?? "Property",
    address: item.address ?? "",
    imageUris: item.image?.src ? [item.image.src] : [],
    attributes: {
      bedrooms: featureCount(item.features, "bed"),
      bathrooms: featureCount(item.features, "bath"),
    },
    pricing: {
      label: item.price || item.shortPriceTitle || "",
    },
  };
}

function listingsFrom(result: ListingsResponse): PropertyListing[] {
  const searchListings = result.data?.searchListings?.listings;
  const regular =
    searchListings?.regular ?? result.data?.listings?.regular ?? [];
  const source =
    regular.length > 0 ? regular : searchListings?.featured ?? [];

  return source.map(mapListing);
}

function sectionForPurpose(purpose?: string) {
  if (purpose === "sale" || purpose === "invest") return "for-sale";
  return "to-rent";
}

function buildSearchPath(options: {
  geoIdentifier: string;
  page: number;
  section: string;
  priceMin?: number;
  priceMax?: number;
  bedsMin?: string;
  sort?: string;
}) {
  const params = new URLSearchParams({
    geo_identifier: options.geoIdentifier,
    section: options.section,
    pn: String(options.page || 1),
  });

  if (options.priceMin) params.set("price_min", String(options.priceMin));
  if (options.priceMax) params.set("price_max", String(options.priceMax));
  if (options.bedsMin) params.set("beds_min", options.bedsMin);
  if (options.sort && VALID_SORTS.has(options.sort)) {
    params.set("results_sort", options.sort);
  } else if (options.sort) {
    params.set("results_sort", "newest_listings");
  }

  return `/properties/v2/search?${params.toString()}`;
}

export async function fetchGeoSuggestions(
  query: string
): Promise<GeoSuggestion[]> {
  const result = await zooplaGet<{
    data?: { geoSuggestion?: GeoSuggestion[] };
  }>(`/v2/auto-complete?locationPrefix=${encodeURIComponent(query)}`);

  return result.data?.geoSuggestion ?? [];
}

export async function fetchSuggestedProperties(
  page: number
): Promise<PropertyListing[]> {
  const path = buildSearchPath({
    geoIdentifier: SUGGESTED_LISTINGS_QUERY.locationIdentifier,
    page,
    section: "to-rent",
    priceMin: Number(SUGGESTED_LISTINGS_QUERY.priceMin),
    priceMax: Number(SUGGESTED_LISTINGS_QUERY.priceMax),
    bedsMin: SUGGESTED_LISTINGS_QUERY.minBeds,
    sort: SUGGESTED_LISTINGS_QUERY.sortOrder,
  });

  return listingsFrom(await zooplaGet<ListingsResponse>(path));
}

export async function searchProperties(
  query: PropertySearchQuery
): Promise<PropertyListing[]> {
  const path = buildSearchPath({
    geoIdentifier: query.geoIdentifier,
    page: query.page,
    section: sectionForPurpose(query.purpose),
    priceMin: query.minPrice,
    priceMax: query.maxPrice,
    bedsMin: query.maxBeds,
    sort: query.sortOrder,
  });

  return listingsFrom(await zooplaGet<ListingsResponse>(path));
}

export async function fetchPropertyDetails(
  listingId: string
): Promise<ListingDetails | null> {
  const result = await zooplaGet<{
    data?: { listingDetails?: ListingDetails };
  }>(`/properties/v2/detail?listingId=${encodeURIComponent(listingId)}`);

  return result.data?.listingDetails ?? null;
}

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

function listingsFrom(result: {
  data?: { listings?: { regular?: PropertyListing[] } };
}): PropertyListing[] {
  return result.data?.listings?.regular ?? [];
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
  const params = new URLSearchParams({
    ...SUGGESTED_LISTINGS_QUERY,
    page: String(page),
  });

  const result = await zooplaGet<{
    data?: { listings?: { regular?: PropertyListing[] } };
  }>(`/properties/v2/list?${params.toString()}`);

  return listingsFrom(result);
}

export async function searchProperties(
  query: PropertySearchQuery
): Promise<PropertyListing[]> {
  const params = new URLSearchParams({
    locationValue: query.geoLabel,
    locationIdentifier: query.geoIdentifier,
    priceMin: String(query.minPrice),
    priceMax: String(query.maxPrice),
    page: String(query.page),
    bedsMax: query.maxBeds ?? "",
    sortOrder: query.sortOrder ?? "",
    includeRented: String(query.purpose === "rent"),
  });

  const result = await zooplaGet<{
    data?: { listings?: { regular?: PropertyListing[] } };
  }>(`/properties/v2/list?${params.toString()}`);

  return listingsFrom(result);
}

export async function fetchPropertyDetails(
  listingId: string
): Promise<ListingDetails | null> {
  const result = await zooplaGet<{
    data?: { listingDetails?: ListingDetails };
  }>(`/properties/v2/detail?listingId=${encodeURIComponent(listingId)}`);

  return result.data?.listingDetails ?? null;
}

export const PROPERTY_TYPES = [
  { key: "apartment", value: "APARTMENT" },
  { key: "condo", value: "CONDO" },
  { key: "townhome", value: "TOWNHOME" },
  { key: "single_family", value: "SINGLE FAMILY" },
  { key: "co_op", value: "Co-op" },
  { key: "cond-op", value: "Cond_op" },
  { key: "other", value: "other" },
] as const;

export const PROPERTY_PURPOSES = [
  { key: "rent", value: "Rent" },
  { key: "sale", value: "Sale" },
  { key: "invest", value: "Invest" },
] as const;

export const BEDROOM_OPTIONS = [
  { key: "1", title: "1+ bedroom" },
  { key: "2", title: "2+ bedroom" },
  { key: "3", title: "3+ bedroom" },
  { key: "4", title: "4+ bedroom" },
  { key: "5", title: "5+ bedroom" },
] as const;

export const SORT_OPTIONS = [
  { label: "highest", key: "highest_price" },
  { label: "lowest", key: "lowest_price" },
  { label: "newest", key: "newest_listings" },
  { label: "most reduced", key: "most_reduced" },
] as const;

export const DEFAULT_LOCATION = {
  geoIdentifier: "london",
  geoLabel: "london",
} as const;

export const SUGGESTED_LISTINGS_QUERY = {
  locationValue: "london",
  locationIdentifier: "london",
  minBeds: "1",
  sortOrder: "newest_listings",
  priceMin: "1000",
  priceMax: "120000",
} as const;

export interface GeoSuggestion {
  geoIdentifier: string;
  geoLabel: string;
}

export interface PropertyListing {
  address: string;
  imageUris?: string[];
  description?: string;
  listingId: number;
  title: string;
  attributes?: {
    bathrooms?: number;
    bedrooms?: number;
  };
  pricing?: {
    label?: string;
  };
}

export interface BlogPost {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  author: string | null;
}

export interface ListingDetails {
  title?: string;
  detailedDescription?: string;
  councilTaxBand?: string;
  sqft?: string;
  propertyImage?: { original: string }[];
  floorPlan?: { original?: string };
  content?: {
    floorPlan?: { original?: string };
  };
  analyticsTaxonomy?: {
    price?: string | number;
    brandName?: string;
    propertyType?: string;
    listingCondition?: string;
    displayAddress?: string;
    listingStatus?: string;
    listingsCategory?: string;
    sizeSqFeet?: string | number;
    numBeds?: number | null;
    numBaths?: number | null;
    isSharedOwnership?: boolean;
    isRetirementHome?: boolean;
  };
  location?: {
    postalCode?: string;
    coordinates?: {
      latitude?: number;
      longitude?: number;
    };
  };
  features?: {
    bullets?: string[];
    flags?: {
      studentFriendly?: boolean;
    };
  };
  counts?: {
    numLivingRooms?: number | null;
    LivingRooms?: number | null;
  };
}

export interface PropertySearchQuery {
  geoLabel: string;
  geoIdentifier: string;
  minPrice: number;
  maxPrice: number;
  page: number;
  maxBeds?: string;
  sortOrder?: string;
  purpose?: string;
}

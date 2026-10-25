"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { ImLocation } from "react-icons/im";
import type { GeoSuggestion } from "@/app/lib/types";

type LocationAutocompleteProps = {
  items: GeoSuggestion[];
  isLoading: boolean;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSelect: (location: GeoSuggestion) => void;
  size?: "sm" | "md";
  className?: string;
};

export default function LocationAutocomplete({
  items,
  isLoading,
  inputValue,
  onInputChange,
  onSelect,
  size = "md",
  className = "bg-white w-full max-w-[500px]",
}: LocationAutocompleteProps) {
  return (
    <Autocomplete
      radius="none"
      size={size}
      aria-label="Select a location"
      variant="bordered"
      items={items}
      isLoading={isLoading}
      inputValue={inputValue}
      onSelectionChange={(value) => {
        if (value == null) return;

        try {
          const selected = JSON.parse(String(value)) as GeoSuggestion;
          onSelect({
            geoIdentifier: selected.geoIdentifier ?? "",
            geoLabel: selected.geoLabel ?? "",
          });
        } catch (error) {
          console.error(error);
        }
      }}
      placeholder="Select a location"
      onInputChange={onInputChange}
      allowsEmptyCollection
      startContent={<ImLocation color="#1C3988" size={20} />}
      className={className}
    >
      {(item) => (
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
  );
}

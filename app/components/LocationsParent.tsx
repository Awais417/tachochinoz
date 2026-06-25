"use client";
import React, { useState } from "react";
import LocationsFilter from "./LocationsFilter";
import LocationsList from "./LocationsList";
import { LOCATIONSQUERYResult } from "@/sanity/types";

function LocationsParent({
  data,
}: {
  data: NonNullable<LOCATIONSQUERYResult>["allLocations"] | undefined | null;
}) {
  const [query, setQuery] = useState("");
  return (
    <section className="container mx-auto">
      <LocationsFilter query={query} setQuery={setQuery} />

      <LocationsList data={data} query={query} />
    </section>
  );
}

export default LocationsParent;

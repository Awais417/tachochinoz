"use client";
import React from "react";

function LocationsFilter({
  query,
  setQuery,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div>
      <form className="my-6 flex items-center justify-center">
        <input
          type="text"
          value={query}
          name="query"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter, city, neighborhood, or zip code"
          className="w-full border p-4 rounded-lg border-gray-200 max-w-xl"
        />
      </form>
    </div>
  );
}

export default LocationsFilter;

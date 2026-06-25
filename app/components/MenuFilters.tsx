"use client";
import { ALLMENUSResult } from "@/sanity/types";
import React from "react";

function MenuFilters({
  data,
  selectedMenu,
  handleMenu,
  setSlug,
}: {
  data: NonNullable<ALLMENUSResult> | undefined | null;
  selectedMenu: string;
  handleMenu: (val: string) => void;
  setSlug: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <ul className="mt-6 flex flex-row flex-wrap gap-4">
      {data &&
        data.map((d) => (
          <span
            key={d._id}
            className={`relative inline-flex cursor-pointer bg-red text-white px-4 pb-1 rounded-full font-jomhuria text-xl md:text-3xl pt-2 md:pt-3 transition-colors duration-300 ease-in after:content-[''] after:absolute after:inset-0 after:rounded-full after:border-2 after:border-white after:scale-0 after:transition-transform after:duration-300 after:ease-in ${selectedMenu.toUpperCase() === d.title ? "after:scale-100" : "after:scale-0"}`}
            onClick={() => {
              if (d.title && d.slug?.current) {
                handleMenu(d.title);
                setSlug(d.slug.current);
              }
            }}
          >
            {d.title}
          </span>
        ))}
    </ul>
  );
}

export default MenuFilters;

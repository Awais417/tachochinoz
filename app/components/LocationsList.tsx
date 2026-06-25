"use client";
import React, { useMemo } from "react";
import AnimationDiv from "./global/AnimationDiv";
import { LOCATIONSQUERYResult } from "@/sanity/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { LuMapPin } from "react-icons/lu";
import Link from "next/link";
import { MdOutlinePhone } from "react-icons/md";
import { LiaDirectionsSolid } from "react-icons/lia";

function LocationsList({
  data,
  query,
}: {
  data: NonNullable<LOCATIONSQUERYResult>["allLocations"] | undefined | null;
  query: string;
}) {
  const filteredData = useMemo(() => {
    if (!data) return [];
    if (query.length < 2) return data;

    const searchQuery = query.toLowerCase();
    return data.filter((location) => {
      const address = location.address?.toLowerCase() || "";
      const title = location.title?.toLowerCase() || "";
      return address.includes(searchQuery) || title.includes(searchQuery);
    });
  }, [data, query]);

  return (
    <AnimationDiv className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 lg:gap-18 pt-6">
      {filteredData.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="font-jost text-gray-500 text-lg">
            No locations found matching "{query}"
          </p>
        </div>
      ) : (
        filteredData.map((l) => (
          <div
            key={l._key}
            className="rounded-b-2xl bg-gray-50 shadow border border-gray-200"
          >
            {l.image && (
              <div className="w-full h-80 relative rounded-t-2xl overflow-hidden">
                <Image
                  src={urlFor(l.image).url()}
                  width={700}
                  height={400}
                  alt={l.image.altText || ""}
                  className="object-cover absolute w-full h-full"
                />
              </div>
            )}
            <div className="px-6 py-6">
              <div>
                <h2 className="font-jomhuria text-4xl text-blue">{l.title}</h2>
                <div className="space-y-1 mt-2">
                  <p className="font-jost text-gray-500 flex items-center gap-2">
                    <LuMapPin /> {l.address}
                  </p>
                  <Link
                    className="font-jost text-gray-500 flex items-center gap-2 hover:underline"
                    href={`tel:${l.phone}`}
                  >
                    <MdOutlinePhone /> {l.phone}
                  </Link>
                </div>
              </div>
              <hr className="border-0 h-[1] bg-gray-200 my-8" />
              <div className="flex justify-end">
                <Link
                  href={l.orderLink || "/"}
                  target="_blank"
                  className="bg-blue text-white px-4 pt-1 rounded-md font-jomhuria text-4xl hover:bg-gray-700 transition-all duration-300 ease-in"
                >
                  ORDER NOW
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </AnimationDiv>
  );
}

export default LocationsList;

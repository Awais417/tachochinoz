"use client";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SINGLEMENU } from "@/sanity/lib/queries";
import { SINGLEMENUResult } from "@/sanity/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Labels from "./Labels";
import { PortableText } from "next-sanity";

function Desserts({ showTitle }: { showTitle?: boolean }) {
  const [data, setData] = useState<SINGLEMENUResult | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await client.fetch(SINGLEMENU, {
        slug: "desserts",
      });

      setData(result);
    };
    fetchData();
  }, []);
  return (
    <section className="px-4 container mx-auto py-12">
      <section className="">
        {showTitle && (
          <div className="pb-6">
            <h2 className="font-potta-one text-blue text-2xl  lg:text-3xl">
              {data?.title}
            </h2>
          </div>
        )}

        {data?.desserts?.items &&
          data?.desserts?.items.map((i, index) => (
            <div key={i._key} className="max-w-md pb-6">
              <div className="flex items-center md:gap-4 relative">
                {i.hasLogo && (
                  <Image
                    src="/logo.png"
                    alt="logo"
                    width={50}
                    className="md:absolute md:right-full"
                    height={50}
                  />
                )}
                <div className="font-jomhuria text-3xl text-gray-800 flex items-center gap-2">
                  {i.title}{" "}
                  {i.isVegeterian && (
                    <div className="w-3 h-3 bg-[#128812] rounded-full mb-1"></div>
                  )}
                  {i.isSpicy && i.spicyCount && (
                    <span className="flex items-center gap-1">
                      {Array.from({ length: i.spicyCount }).map((_, idx) => (
                        <Image
                          key={`${i._key}-chili-${idx}`}
                          src="/chille.png"
                          alt="chili"
                          width={12}
                          height={12}
                        />
                      ))}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 pl-2">{i.price}</p>
              </div>
              <p className="font-jost font-medium text-gray-600">
                {i.additionalText}
              </p>
              <p className="text-gray-600 font-jost">{i.description}</p>
            </div>
          ))}
      </section>
    </section>
  );
}

export default Desserts;

"use client";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SINGLEMENU } from "@/sanity/lib/queries";
import { SINGLEMENUResult } from "@/sanity/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Labels from "./Labels";
import { PortableText } from "next-sanity";

function Burritos({ showTitle }: { showTitle?: boolean }) {
  const [data, setData] = useState<SINGLEMENUResult | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await client.fetch(SINGLEMENU, {
        slug: "burritos-and-bowls",
      });

      setData(result);
    };
    fetchData();
  }, []);
  return (
    <section className="px-4 container mx-auto py-12">
      <section className="">
        {data?.burritos &&
          data.burritos.map((r, index) => (
            <div key={r._key}>
              <div>
                {showTitle && (
                  <h2 className="font-potta-one text-blue text-2xl  lg:text-3xl">
                    {r.title?.toUpperCase()}
                  </h2>
                )}
                <p className="font-jost text-gray-600">{""}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 mt-6 gap-4">
                {r.tacosItems &&
                  r.tacosItems.map((i) => (
                    <div key={i._key}>
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
                        <div className="font-jomhuria text-4xl text-gray-800 flex items-center gap-2">
                          {i.title}{" "}
                          {i.isVegeterian && (
                            <div className="w-3 h-3 bg-[#128812] rounded-full mb-1"></div>
                          )}
                          {i.isSpicy && i.spicyCount && (
                            <span className="flex items-center gap-1">
                              {Array.from({ length: i.spicyCount }).map(
                                (_, idx) => (
                                  <Image
                                    key={`${i._key}-chili-${idx}`}
                                    src="/chille.png"
                                    alt="chili"
                                    width={12}
                                    height={12}
                                  />
                                ),
                              )}
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
              </div>
              {index === 0 && (
                <div className="bg-red/20 p-4 md:p-6 max-w-xs rounded-md mt-6">
                  <p className="font-jomhuria text-3xl text-gray-800">
                    {data?.upgrade?.title}
                  </p>
                  <div className="border-l-6 pl-3 border-brown text-gray-800 font-jost">
                    {data?.upgrade?.content && (
                      <PortableText value={data?.upgrade?.content} />
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        <div className="mt-12">
          <Labels />
        </div>

        <div className="mt-6 bg-red/20 p-4 rounded-md flex justify-between gap-4 flex-col md:flex-row">
          <p className="font-mynerve text-pink-600 text-2xl">EXTRA:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 w-1/3">
            {data?.extras?.items &&
              data?.extras?.items?.map((i) => (
                <div key={i._key} className="flex items-center gap-2">
                  <p className="font-jomhuria text-3xl text-gray-800">
                    {i.title}
                  </p>
                  <p className="mb-2 font-jost text-gray-600">{i.price}</p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </section>
  );
}

export default Burritos;

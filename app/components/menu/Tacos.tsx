"use client";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SINGLEMENU } from "@/sanity/lib/queries";
import { SINGLEMENUResult } from "@/sanity/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Labels from "./Labels";

function Tacos({ showTitle }: { showTitle?: boolean }) {
  const [data, setData] = useState<SINGLEMENUResult | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await client.fetch(SINGLEMENU, { slug: "tacos" });

      setData(result);
    };
    fetchData();
  }, []);
  return (
    <section className="px-4 container mx-auto py-12">
      <section className="">
        {data?.tacos &&
          data.tacos.map((r) => (
            <div key={r._key}>
              <div>
                <h2 className="font-potta-one text-blue text-2xl  lg:text-3xl">
                  {r.title?.toUpperCase()}
                </h2>
                <p className="font-jost text-gray-600">{r.description}</p>
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
                        <div className="font-jomhuria text-3xl text-gray-800 flex items-center gap-2">
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
            </div>
          ))}
        <Labels />
      </section>
    </section>
  );
}

export default Tacos;

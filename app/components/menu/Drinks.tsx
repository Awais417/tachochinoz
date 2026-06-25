"use client";
import { client } from "@/sanity/lib/client";
import { SINGLEMENU } from "@/sanity/lib/queries";
import { SINGLEMENUResult } from "@/sanity/types";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function Drinks({ showTitle }: { showTitle?: boolean }) {
  const [data, setData] = useState<SINGLEMENUResult | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await client.fetch(SINGLEMENU, {
        slug: "drinks",
      });

      setData(result);
    };
    fetchData();
  }, []);
  return (
    <section className="container mx-auto px-4 py-12">
      {showTitle && (
        <div>
          <h2 className="font-potta-one text-blue text-2xl  lg:text-3xl">
            {data?.title}
          </h2>
        </div>
      )}

      <section className="flex flex-col gap-6 md:flex-row justify-between lg:gap-12">
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 w-full lg:w-2/3">
          {data?.drinks?.drinksMain &&
            data?.drinks?.drinksMain.map((d, index) => (
              <div
                key={d._key}
                className={`${index === (data?.drinks?.drinksMain?.length ?? 0) - 1 ? "" : "border-b border-dotted border-gray-800"} mb-4`}
              >
                <h3 className="font-jomhuria text-5xl">{d.title}</h3>

                <div className="pb-4 font-jost text-gray-700 space-y-2">
                  {d.block && <PortableText value={d.block} />}
                </div>
              </div>
            ))}
        </div>
        <div className="bg-[#106334] rounded-xl p-2 w-full lg:w-1/3 lg:self-stretch">
          <div className="bg-white/40 rounded-xl p-4 md:p-6 lg:p-8 h-full flex flex-col justify-between items-center text-center">
            {data?.drinksCombos &&
              data?.drinksCombos.map((c, index) => (
                <div
                  key={c._key}
                  className={`${index === (data?.drinksCombos?.length ?? 0) - 1 ? "" : "border-b-4 border-dotted border-b-[#106334]"} w-full pb-6`}
                >
                  <div className="relative w-fit mx-auto">
                    {c.hasLogo && (
                      <Image
                        src={"/logo.png"}
                        width={50}
                        height={50}
                        alt="logo"
                        className="absolute right-full"
                      />
                    )}
                    <h5 className="font-mynerve text-[#1F284F] text-3xl">
                      {c.title}
                    </h5>
                    <p className="font-jomhuria text-yellow text-7xl">
                      {c.name}
                    </p>
                  </div>
                  {c.content && (
                    <div className="text-white font-jost text-md">
                      <PortableText value={c.content} />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </section>
    </section>
  );
}

export default Drinks;

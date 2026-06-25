"use client";
import { client } from "@/sanity/lib/client";
import { SINGLEMENU } from "@/sanity/lib/queries";
import { SINGLEMENUResult } from "@/sanity/types";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function KidsMenu({ showTitle }: { showTitle?: boolean }) {
  const [data, setData] = useState<SINGLEMENUResult | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await client.fetch(SINGLEMENU, {
        slug: "kids-menu",
      });

      setData(result);
    };
    fetchData();
  }, []);
  return (
    <section className="px-4 container mx-auto py-12">
      <section className="">
        {showTitle && (
          <div className="">
            <h2 className="font-potta-one text-blue text-2xl  lg:text-3xl mb-2">
              {data?.title}
            </h2>
          </div>
        )}
        <p className="font-jost font-medium text-gray-800 mb-6">
          {data?.kidsMenu?.description}
        </p>
        <div className="max-w-lg mt-6">
          {data?.kidsMenu?.items &&
            data?.kidsMenu?.items.map((i, index) => (
              <div key={i._key} className="pb-6 flex">
                <div className="bg-red px-2 rounded-l-full flex items-center justify-center w-10">
                  <p className="rotate-270 font-jomhuria text-white text-3xl -mr-4">
                    {i.title}
                  </p>
                </div>

                <div className="bg-[#106334]/60 px-6 py-2 flex-1 flex justify-between rounded-r-lg border-dotted-2 min-h-30 items-center">
                  <div className="text-center">
                    <h3 className="font-jomhuria text-4xl text-yellow uppercase">
                      {i.name}
                    </h3>
                    <p className="text-white font-jomhuria text-2xl">
                      {i.additionalText}
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-jomhuria text-4xl text-yellow">
                      {i.text2}
                    </h3>
                    {i.text2Details && (
                      <div className="text-white font-jomhuria text-2xl">
                        <PortableText value={i.text2Details} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </section>
  );
}

export default KidsMenu;

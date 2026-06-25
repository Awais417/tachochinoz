"use client";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SINGLEMENU } from "@/sanity/lib/queries";
import { SINGLEMENUResult } from "@/sanity/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function Sides({ showTitle }: { showTitle?: boolean }) {
  const [data, setData] = useState<SINGLEMENUResult | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await client.fetch(SINGLEMENU, { slug: "sides" });

      setData(result);
    };
    fetchData();
  }, []);
  return (
    <section className="px-4 container mx-auto py-12">
      {showTitle && (
        <h2 className="font-potta-one text-blue text-2xl  lg:text-3xl">
          SIDES
        </h2>
      )}

      <section className="flex justify-between flex-col md:flex-row">
        <div className="space-y-4 md:space-y-6 py-6 md:py-12">
          {data?.sides &&
            data?.sides.map((d) =>
              d.isTopPick ? (
                <div
                  key={d._key}
                  className="flex flex-col md:flex-row gap-4 items-start"
                >
                  <div className="flex gap-2 items-center">
                    <span className="font-jomhuria text-4xl text-gray-800">
                      {d.title}
                    </span>
                    <span className="font-jost">{d?.price}</span>
                  </div>
                  <div className="flex gap-2 bg-red/20 rounded-md p-4">
                    <div className="relative w-12 h-12 shrink-0">
                      <Image
                        src={"/logo.png"}
                        alt="logo"
                        fill
                        sizes="48px"
                        className="object-contain"
                      />
                    </div>
                    <div className="max-w-sm">
                      <p className="text-red font-jomhuria text-2xl">
                        {d.isTopPickItem?.title}
                      </p>
                      <p className="font-jost text-gray-700">
                        {d.isTopPickItem?.description}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={d._key}>
                  <div className="space-x-6">
                    <span className="font-jomhuria text-4xl text-gray-800">
                      {d.title}
                    </span>
                    <span className="font-jost">{d?.price}</span>
                  </div>
                  {d.description && (
                    <p className="font-jost text-gray-600">{d?.description}</p>
                  )}
                </div>
              ),
            )}
        </div>
      </section>
    </section>
  );
}

export default Sides;

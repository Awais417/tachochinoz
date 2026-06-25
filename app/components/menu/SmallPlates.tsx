"use client";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SINGLEMENU } from "@/sanity/lib/queries";
import { SINGLEMENUResult } from "@/sanity/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function SmallPlates({ showTitle }: { showTitle?: boolean }) {
  const [data, setData] = useState<SINGLEMENUResult | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await client.fetch(SINGLEMENU, { slug: "small-plates" });
      console.log(result);

      setData(result);
    };
    fetchData();
  }, []);
  return (
    <section className="px-4 container mx-auto py-12">
      {showTitle && (
        <h2 className="font-potta-one text-blue text-2xl  lg:text-3xl">
          SMALL PLATES
        </h2>
      )}

      <section className="flex justify-between flex-col md:flex-row">
        <div className="space-y-4 md:space-y-6 py-6 md:py-12">
          {data?.smallPlates &&
            data?.smallPlates.map((d) => (
              <div key={d._key} className="">
                {d.hasSubItems ? (
                  <div>
                    <div>
                      <p className="font-jomhuria text-4xl text-gray-800">
                        {d.itemWithSubItems?.title}
                      </p>
                      <p className="font-jost text-gray-600">
                        {d.itemWithSubItems?.description}
                      </p>
                    </div>

                    <div className="border-l-6 pl-4 mt-4 border-brown">
                      {d.itemWithSubItems?.items &&
                        d.itemWithSubItems.items.map((item) => (
                          <div className="space-x-4" key={item._key}>
                            <span className="font-jomhuria text-4xl text-gray-800">
                              {item.title}
                            </span>
                            <span className="font-jost">{item.price}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="space-x-6">
                      <span className="font-jomhuria text-4xl text-gray-800">
                        {d.itemWithNoSubItems?.title}
                      </span>
                      <span className="font-jost">
                        {d.itemWithNoSubItems?.price}
                      </span>
                    </div>
                    {d.itemWithNoSubItems?.description && (
                      <p className="font-jost text-gray-600">
                        {d.itemWithNoSubItems?.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>

        <div>
          {data?.smallPlatesImageContent?.image && (
            <Image
              src={urlFor(data?.smallPlatesImageContent?.image).url()}
              width={500}
              height={500}
              alt={data?.smallPlatesImageContent.image.altText || ""}
            />
          )}
          <p className="text-brown font-jomhuria text-3xl">
            {data?.smallPlatesImageContent?.title}
          </p>
        </div>
      </section>
    </section>
  );
}

export default SmallPlates;

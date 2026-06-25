import AnimationDiv from "@/app/components/global/AnimationDiv";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { LOCATIONSQUERY } from "@/sanity/lib/queries";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LuMapPin } from "react-icons/lu";
import { MdOutlinePhone } from "react-icons/md";
import { LiaDirectionsSolid } from "react-icons/lia";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ menu: string }>;
}): Promise<Metadata> => {
  const menu = await params;
  const { data } = await sanityFetch({
    query: LOCATIONSQUERY,
    params: {
      slug: menu.menu,
    },
  });
  return {
    title: data?.pageMetadata?.title || "",
    description: data?.pageMetadata?.description || "",
  };
};
async function Locations() {
  const { data } = await sanityFetch({
    query: LOCATIONSQUERY,
  });
  return (
    <>
      <section className="bg-blue flex items-center justify-center">
        <AnimationDiv className="pt-36 pb-12 px-4">
          <h1 className="font-jomhuria text-6xl lg:text-7xl text-white text-center">
            {data?.title?.toUpperCase()}
          </h1>
        </AnimationDiv>
      </section>
      <section className="container mx-auto px-4 py-12 lg:py-24">
        <AnimationDiv className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 lg:gap-18">
          {data?.allLocations?.map((l) => (
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
                  <h2 className="font-jomhuria text-4xl text-blue">
                    {l.title}
                  </h2>
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
                    href={l.mapUrl || "/"}
                    target="_blank"
                    className="bg-gray-100 w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-300 transition-colors duration-300 ease-in"
                  >
                    <LiaDirectionsSolid size={30} color="#1F284F" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </AnimationDiv>
      </section>
    </>
  );
}

export default Locations;

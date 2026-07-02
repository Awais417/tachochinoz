import AnimationDiv from "@/app/components/global/AnimationDiv";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { CATERINGMENU } from "@/sanity/lib/queries";
import { Metadata } from "next";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ menu: string }>;
}): Promise<Metadata> => {
  const menu = await params;
  const { data } = await sanityFetch({
    query: CATERINGMENU,
    params: {
      slug: menu.menu,
    },
  });
  return {
    title: data?.pageMetadata?.title || "",
    description: data?.pageMetadata?.description || "",
  };
};
async function CateringMenu() {
  const { data } = await sanityFetch({
    query: CATERINGMENU,
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
      <section className="relative bg-[url('/bgv2.jpg')] bg-repeat-y bg-top bg-size-[100%_auto]">
        <AnimationDiv className="container px-4 py-12 md:py-16 lg:py-20 mx-auto space-y-8">
          {data?.options &&
            data.options.map((o: NonNullable<typeof data.options>[number], index) => (
              <div
                key={o._key}
                className={`bg-yellow border-4 border-dotted border-[#F23B91] p-5 md:p-6 lg:p-8 rounded-xl max-w-xl relative ${index === 1 && "ml-auto"}`}
              >
                <div>
                  <p className="font-jomhuria text-4xl text-pink">
                    OPTION {index + 1}
                  </p>
                  <div>
                    <h4 className="font-jomhuria text-5xl">{o.title}</h4>
                    <p className="font-jost">{o.additionalInfo}</p>
                  </div>
                  {o.details && (
                    <div className="font-jost mt-6 text-gray-600 max-w-md prose">
                      <PortableText value={o.details} />
                    </div>
                  )}
                  <Link
                    href="/catering/book"
                    className="bg-blue text-white mt-6 block w-fit px-4 py-2 font-jomhuria text-4xl pt-3 rounded-full hover:bg-black cursor-pointer"
                  >
                    BOOK NOW
                  </Link>
                </div>
                <div
                  className={`md:absolute  w-full h-full md:top-0 ${index === 1 ? "md:right-full" : "md:left-full"}`}
                >
                  {o.image && (
                    <div className="relative w-100 h-75">
                      <Image
                        src={urlFor(o.image).url()}
                        alt={o.image.altText || ""}
                        fill
                        className="object-contain"
                        sizes="400px"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
        </AnimationDiv>
      </section>
    </>
  );
}

export default CateringMenu;

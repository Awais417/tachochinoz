import GalleryMain from "@/app/components/GalleryMain";
import AnimationDiv from "@/app/components/global/AnimationDiv";
import { sanityFetch } from "@/sanity/lib/live";
import { GALLERYQUERY } from "@/sanity/lib/queries";
import { Metadata } from "next";

import React from "react";
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ menu: string }>;
}): Promise<Metadata> => {
  const menu = await params;
  const { data } = await sanityFetch({
    query: GALLERYQUERY,
    params: {
      slug: menu.menu,
    },
  });
  return {
    title: data?.pageMetadata?.title || "",
    description: data?.pageMetadata?.description || "",
  };
};
async function Gallery() {
  const { data } = await sanityFetch({
    query: GALLERYQUERY,
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
      <section className="container mx-auto py-12 px-4">
        <GalleryMain images={data?.images} />
      </section>
    </>
  );
}

export default Gallery;

import AnimationDiv from "@/app/components/global/AnimationDiv";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUTQUERY } from "@/sanity/lib/queries";
import { Metadata } from "next";
import React from "react";
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ menu: string }>;
}): Promise<Metadata> => {
  const menu = await params;
  const { data } = await sanityFetch({
    query: ABOUTQUERY,
    params: {
      slug: menu.menu,
    },
  });
  return {
    title: data?.pageMetadata?.title || "",
    description: data?.pageMetadata?.description || "",
  };
};
async function About() {
  const { data } = await sanityFetch({
    query: ABOUTQUERY,
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

      <AnimationDiv className="relative bg-[url('/about-bg.jpg')] h-screen bg-top object-contain flex items-start justify-center px-4">
        <p className="text-white max-w-2xl text-center font-jost text-xl">
          {data?.intro}
        </p>
      </AnimationDiv>
    </>
  );
}

export default About;

import React from "react";
import Hero from "../components/Hero";
import { sanityFetch } from "@/sanity/lib/live";
import { HOMEQUERY, POSTSQUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Lottie from "lottie-react";
import { Metadata } from "next";
import AllMenus from "../components/AllMenus";

export const generateMetadata = async (): Promise<Metadata> => {
  const { data } = await sanityFetch({
    query: HOMEQUERY,
  });
  return {
    title: data?.pageMetadata?.title || "",
    description: data?.pageMetadata?.description || "",
  };
};

async function page() {
  const { data } = await sanityFetch({
    query: HOMEQUERY,
  });
  return (
    <>
      <Hero data={data} />
      <AllMenus />
    </>
  );
}

export default page;

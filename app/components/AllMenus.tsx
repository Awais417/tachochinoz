import { sanityFetch } from "@/sanity/lib/live";
import { ALLMENUS } from "@/sanity/lib/queries";
import Image from "next/image";
import React from "react";
import AnimationDiv from "./global/AnimationDiv";
import MenuWrapper from "./MenuWrapper";

async function AllMenus() {
  const { data } = await sanityFetch({
    query: ALLMENUS,
  });
  return (
    <section className="relative bg-[url('/bgv2.jpg')] bg-repeat-y bg-top bg-size-[100%_auto]">
      <AnimationDiv className="relative z-10 mx-auto w-full flex justify-center py-12 flex-col items-center">
        <h2 className="font-jomhuria text-red text-5xl">OUR MENU</h2>
        <MenuWrapper data={data} />
      </AnimationDiv>
    </section>
  );
}

export default AllMenus;

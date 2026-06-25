import AnimationDiv from "@/app/components/global/AnimationDiv";
import BeyondTaco from "@/app/components/menu/BeyondTaco";
import Burritos from "@/app/components/menu/Burritos";
import Cocktails from "@/app/components/menu/Cocktails";
import Desserts from "@/app/components/menu/Desserts";
import Drinks from "@/app/components/menu/Drinks";
import KidsMenu from "@/app/components/menu/KidsMenu";
import Quesadillas from "@/app/components/menu/Quesadillas";
import Shareable from "@/app/components/menu/Shareable";
import Sides from "@/app/components/menu/Sides";
import SmallPlates from "@/app/components/menu/SmallPlates";
import Tacos from "@/app/components/menu/Tacos";
import TCBRamen from "@/app/components/menu/TCBRamen";
import { sanityFetch } from "@/sanity/lib/live";
import { SINGLEMENU } from "@/sanity/lib/queries";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ menu: string }>;
}): Promise<Metadata> => {
  const menu = await params;
  const { data } = await sanityFetch({
    query: SINGLEMENU,
    params: {
      slug: menu.menu,
    },
  });
  return {
    title: data?.pageMetadata?.title || "",
    description: data?.pageMetadata?.description || "",
  };
};
async function SingleMenu({ params }: { params: Promise<{ menu: string }> }) {
  const menu = await params;

  const { data } = await sanityFetch({
    query: SINGLEMENU,
    params: {
      slug: menu.menu,
    },
  });

  if (!data) {
    return notFound();
  }
  const renderItems = () => {
    switch (data.slug?.current) {
      case "small-plates":
        return <SmallPlates showTitle={false} />;
      case "sides":
        return <Sides showTitle={false} />;
      case "tacos":
        return <Tacos showTitle={false} />;
      case "burritos-and-bowls":
        return <Burritos showTitle={false} />;
      case "quesadillas":
        return <Quesadillas showTitle={false} />;
      case "drinks":
        return <Drinks showTitle={false} />;
      case "desserts":
        return <Desserts showTitle={false} />;
      case "beyond-taco":
        return <BeyondTaco showTitle={false} />;
      case "shareables-and-ultimate-nachos":
        return <Shareable showTitle={false} />;
      case "cocktails":
        return <Cocktails showTitle={false} />;
      case "tcb-ramen":
        return <TCBRamen showTitle={false} />;
      case "kids-menu":
        return <KidsMenu showTitle={false} />;
    }
  };
  return (
    <>
      <section className="bg-blue flex items-center justify-center">
        <AnimationDiv className="pt-36 pb-12 px-4">
          <h1 className="font-jomhuria text-6xl lg:text-7xl text-white text-center">
            {data?.title}
          </h1>
        </AnimationDiv>
      </section>
      <section className="relative bg-[url('/bgv2.jpg')] bg-repeat-y bg-top bg-size-[100%_auto]">
        {renderItems()}
      </section>
    </>
  );
}

export default SingleMenu;

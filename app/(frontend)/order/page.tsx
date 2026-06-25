import AnimationDiv from "@/app/components/global/AnimationDiv";
import LocationsFilter from "@/app/components/LocationsFilter";
import LocationsList from "@/app/components/LocationsList";
import LocationsParent from "@/app/components/LocationsParent";
import { sanityFetch } from "@/sanity/lib/live";
import { LOCATIONSQUERY } from "@/sanity/lib/queries";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Order Online | Taco Chinoz & Bar",
};
async function OrderPage() {
  const { data } = await sanityFetch({
    query: LOCATIONSQUERY,
  });
  return (
    <>
      <section className="bg-blue flex items-center justify-center">
        <AnimationDiv className="pt-36 pb-12 px-4">
          <h1 className="font-jomhuria text-6xl lg:text-7xl text-white text-center">
            WHERE ARE YOU EATING TODAY?
          </h1>
        </AnimationDiv>
      </section>
      <section className="container mx-auto px-4 py-12 ">
        <div className="text-center">
          {/* <h2 className="font-jomhuria  text-blue text-5xl">
            Where are you eating today?
          </h2> */}
          {/* <p className="font-jost text-gray-600">
            Select a location to start your order
          </p> */}
        </div>
        <LocationsParent data={data?.allLocations} />
      </section>
    </>
  );
}

export default OrderPage;

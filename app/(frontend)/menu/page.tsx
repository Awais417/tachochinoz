import AnimationDiv from "@/app/components/global/AnimationDiv";
import React from "react";
import AllMenus from "@/app/components/AllMenus";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Our Menu | Taco Chinoz & Bar",
};
function AllMenusMain() {
  return (
    <>
      <section className="bg-blue flex items-center justify-center">
        <AnimationDiv className="mt-36 mb-12 px-4">
          <h1 className="font-jomhuria text-6xl lg:text-7xl text-white text-center">
            WELCOME TO TACO CHINOZ & BAR's MENU
          </h1>
        </AnimationDiv>
      </section>
      <AllMenus />
    </>
  );
}

export default AllMenusMain;

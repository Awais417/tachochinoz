import CateringForm from "@/app/components/CateringForm";
import FranchiseForm from "@/app/components/FranchiseForm";
import AnimationDiv from "@/app/components/global/AnimationDiv";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Franchise Inquiry | Taco Chinoz & Bar",
};
function BookCatering() {
  return (
    <>
      <section className="bg-blue flex items-center justify-center">
        <AnimationDiv className="pt-36 pb-12 px-4">
          <h1 className="font-jomhuria text-6xl lg:text-7xl text-white text-center">
            BOOK CATERING
          </h1>
        </AnimationDiv>
      </section>
      <div className="py-12">
        <CateringForm />
      </div>
    </>
  );
}

export default BookCatering;

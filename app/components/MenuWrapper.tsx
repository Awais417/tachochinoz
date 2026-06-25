"use client";
import { ALLMENUSResult } from "@/sanity/types";
import React, { useState } from "react";
import MenuFilters from "./MenuFilters";
import SmallPlates from "./menu/SmallPlates";
import Sides from "./menu/Sides";
import Tacos from "./menu/Tacos";
import Burritos from "./menu/Burritos";
import Quesadillas from "./menu/Quesadillas";
import Drinks from "./menu/Drinks";
import Desserts from "./menu/Desserts";
import BeyondTaco from "./menu/BeyondTaco";
import Shareable from "./menu/Shareable";
import Cocktails from "./menu/Cocktails";
import TCBRamen from "./menu/TCBRamen";
import KidsMenu from "./menu/KidsMenu";

function MenuWrapper({
  data,
}: {
  data: NonNullable<ALLMENUSResult> | undefined | null;
}) {
  const [selectedMenu, setSelectedMenu] = useState("SMALL PLATES");
  const [slug, setSlug] = useState("");

  const handleMenu = (menu: string) => {
    setSelectedMenu(menu);
  };
  return (
    <section className="w-full container mx-auto px-4">
      <MenuFilters
        data={data}
        selectedMenu={selectedMenu}
        handleMenu={handleMenu}
        setSlug={setSlug}
      />

      <div className={selectedMenu === "SMALL PLATES" ? "block" : "hidden"}>
        <SmallPlates showTitle={true} />
      </div>
      <div className={selectedMenu === "SIDES" ? "block" : "hidden"}>
        <Sides showTitle={true} />
      </div>
      <div className={selectedMenu === "TACOS" ? "block" : "hidden"}>
        <Tacos showTitle={true} />
      </div>
      <div className={selectedMenu === "BURRITOS/BOWLS" ? "block" : "hidden"}>
        <Burritos showTitle={true} />
      </div>
      <div className={selectedMenu === "QUESADILLAS" ? "block" : "hidden"}>
        <Quesadillas showTitle={true} />
      </div>
      <div className={selectedMenu === "DRINKS" ? "block" : "hidden"}>
        <Drinks showTitle={true} />
      </div>
      <div className={selectedMenu === "DESSERTS" ? "block" : "hidden"}>
        <Desserts showTitle={true} />
      </div>
      <div className={selectedMenu === "BEYOND TACO" ? "block" : "hidden"}>
        <BeyondTaco showTitle={true} />
      </div>
      <div
        className={
          selectedMenu === "SHAREABLE & ULTIMATE NACHOS" ? "block" : "hidden"
        }
      >
        <Shareable showTitle={true} />
      </div>
      <div className={selectedMenu === "COCKTAILS" ? "block" : "hidden"}>
        <Cocktails showTitle={true} />
      </div>
      <div className={selectedMenu === "TCB RAMEN" ? "block" : "hidden"}>
        <TCBRamen showTitle={true} />
      </div>
      <div className={selectedMenu === "KIDS MENU" ? "block" : "hidden"}>
        <KidsMenu showTitle={true} />
      </div>
    </section>
  );
}

export default MenuWrapper;

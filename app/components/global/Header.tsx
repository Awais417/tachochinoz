import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { HEADERQUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeaderMain from "./HeaderMain";

async function Header() {
  const { data } = await sanityFetch({
    query: HEADERQUERY,
  });
  return (
    <header className="absolute left-0 w-full">
      <HeaderMain data={data} />
    </header>
  );
}

export default Header;

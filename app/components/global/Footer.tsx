import { sanityFetch } from "@/sanity/lib/live";
import { FOOTERQUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function Footer() {
  const { data } = await sanityFetch({
    query: FOOTERQUERY,
  });
  return (
    <section className="bg-blue py-12 text-white">
      <div className="text-center">
        <Image
          src={"/logo.png"}
          width={140}
          height={140}
          alt="logo"
          className="mx-auto"
        />

        <h2 className="font-jomhuria text-4xl">{data?.businessName}</h2>
        <p className="font-jost">{data?.address}</p>
        <Link href={`tel:${data?.phone}`} className="font-jost">
          Phone: {data?.phone}
        </Link>
      </div>

      <div className="flex items-center justify-between flex-col md:flex-row container mx-auto mt-6 md:mt-8 lg:mt-12">
        <ul className="space-x-2">
          {data?.menus?.map((m) => (
            <Link
              key={m._key}
              href={m.slug || "/"}
              className="font-jost hover:underline"
            >
              {m.title}
            </Link>
          ))}
        </ul>
        <p className="font-jost">{data?.copyrights}</p>
      </div>
    </section>
  );
}

export default Footer;

"use client";
import { urlFor } from "@/sanity/lib/image";
import { HEADERQUERYResult } from "@/sanity/types";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import MobileMenu from "./MobileMenu";
import { useParams, usePathname } from "next/navigation";
import { BsBag } from "react-icons/bs";

function HeaderMain({
  data,
}: {
  data: NonNullable<HEADERQUERYResult> | null | undefined;
}) {
  const [showMobile, setShowMobile] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const params = useParams();
  const slug = params.menu;
  const pathname = usePathname();

  return (
    <div className="container mx-auto px-4 md:py-2">
      <div className="flex items-center justify-between">
        {data?.logo && (
          <Link href={"/"}>
            <Image
              src={urlFor(data.logo).url()}
              width={150}
              height={200}
              alt={data.logo.altText || ""}
            />
          </Link>
        )}

        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {data?.menu &&
              data.menu.map((m) => (
                <li
                  key={m._key}
                  onMouseEnter={() => {
                    if (m.hasSubMenu) {
                      setShowSubMenu(true);
                    }
                  }}
                  onMouseLeave={() => setShowSubMenu(false)}
                  className={`relative font-jomhuria text-4xl  after:content-[' '] after:absolute after:top-full after:left-0  after:h-1  after:w-0 hover:after:w-full after:transition-[width] duration-300 ease-in after:-mt-1 hover:after:bg-red ${m.hasSubMenu && "pl-2"}`}
                >
                  <Link
                    href={`/${m.slug}` || "/"}
                    className={`hover:text-red ${pathname === `/${m.slug}` ? "text-red" : "text-white"} ${!showSubMenu && "hover:pointer-none:"}`}
                    onClick={() => setShowSubMenu(false)}
                  >
                    {m.title}
                  </Link>
                  {m.hasSubMenu && showSubMenu && (
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 ${!m.hasSubMenu && !showSubMenu ? "opacity-0" : "opacity-100"} transition-opacity duration-300 ease-in bg-white p-6 z-100 rounded-md`}
                    >
                      <ul className="min-w-2xs">
                        {m.subMenus &&
                          m.subMenus.map((m) => (
                            <li key={m._key}>
                              <Link
                                href={`/menu/${m.slug}`}
                                onClick={() => setShowSubMenu(false)}
                                className={` ${m.slug === slug ? "text-gray-800" : "text-red"} hover:text-gray-800 transition-all duration-300 ease-in`}
                              >
                                {m.title}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
          </ul>
          <Link
            href={"/order"}
            className="bg-red text-white font-jomhuria text-3xl px-4 pt-2 pb-1 rounded-full active:bg-yellow active:text-red transition-all duration-300 ease-in flex items-center gap-2"
          >
            <span>
              <BsBag size={20} className="mb-2" />
            </span>
            {data?.cta}
          </Link>
        </div>
        <div className="md:hidden  flex items-center gap-2" role="button">
          <Link
            href={"/order"}
            className="bg-red text-white font-jomhuria text-3xl px-4 pt-2 pb-1 rounded-full active:bg-yellow active:text-red transition-all duration-300 ease-in flex items-center gap-2"
          >
            <span>
              <BsBag size={20} className="mb-2" />
            </span>
            {data?.cta}
          </Link>
          <CiMenuBurger
            color="white"
            size={30}
            className="active:scale-95 transition-transform duration-300 ease-in"
            role="button"
            onClick={() => setShowMobile(!showMobile)}
          />
        </div>

        <div
          className={`fixed top-0 left-0 h-screen bg-black z-50 transition-all duration-300 ${showMobile ? "opacity-100 w-full" : "opacity-0 w-0 overflow-hidden"}`}
        >
          <MobileMenu onClose={() => setShowMobile(!showMobile)} data={data} />
        </div>
      </div>
    </div>
  );
}

export default HeaderMain;

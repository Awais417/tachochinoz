import { HEADERQUERYResult } from "@/sanity/types";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

function MobileMenu({
  onClose,
  data,
}: {
  onClose: () => void;
  data: NonNullable<HEADERQUERYResult> | undefined | null;
}) {
  const pathname = usePathname();
  const [showSubMenu, setShowSubMenu] = useState(false);

  const params = useParams();

  return (
    <div className="bg-yellow h-screen p-6">
      <IoCloseOutline
        size={35}
        className="ml-auto"
        role="button"
        onClick={() => {
          onClose();
          setShowSubMenu(false);
        }}
      />
      <div className="relative">
        {!showSubMenu && (
          <ul className="relative">
            {data?.menu &&
              data.menu.map((m) =>
                m.slug === "menu" ? (
                  <li key={m._key}>
                    <span
                      onClick={() => setShowSubMenu(true)}
                      className={`font-jomhuria text-5xl ${pathname.includes("/menu") ? "text-gray-800" : "text-red"}`}
                    >
                      {m.title}
                    </span>
                  </li>
                ) : (
                  <li key={m._key}>
                    <Link
                      href={`/${m.slug}` || "/"}
                      onClick={onClose}
                      className={`font-jomhuria text-5xl ${pathname === `/${m.slug}` ? "text-gray-800" : "text-red"}`}
                    >
                      {m.title}
                    </Link>
                  </li>
                ),
              )}
          </ul>
        )}
        <div
          className={`absolute left-0 top-0 transform transition-transform duration-300 ease-in ${showSubMenu ? "w-fit" : "translate-x-full overflow-hidden w-0"}`}
        >
          <p
            className="font-jost text-gray-500"
            onClick={() => setShowSubMenu(false)}
          >
            GO BACK
          </p>

          <ul>
            <Link
              href={`/menu`}
              className={`font-jomhuria text-5xl ${pathname === `/menu` ? "text-gray-800" : "text-red"}`}
              onClick={() => {
                onClose();
                setShowSubMenu(false);
              }}
            >
              ALL MENUS
            </Link>

            {data?.menu &&
              data.menu[0].hasSubMenu &&
              data.menu[0].subMenus?.map((s) => (
                <li
                  key={s._key}
                  className={`font-jomhuria text-5xl ${params.menu === `${s.slug}` ? "text-gray-800" : "text-red"}`}
                  onClick={() => {
                    onClose();
                    setShowSubMenu(false);
                  }}
                >
                  <Link href={`/menu/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;

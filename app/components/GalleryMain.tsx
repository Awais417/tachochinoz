"use client";
import { urlFor } from "@/sanity/lib/image";
import { GALLERYQUERYResult } from "@/sanity/types";
import React from "react";
import { Gallery, Item } from "react-photoswipe-gallery";

function GalleryMain({
  images,
}: {
  images: NonNullable<GALLERYQUERYResult>["images"] | undefined | null;
}) {
  return (
    <Gallery>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images &&
          images.map((i) => (
            <div key={i._key} className="h-100 overflow-hidden relative">
              <Item
                original={urlFor(i).url()}
                thumbnail={urlFor(i).url()}
                width="1024"
                height="768"
              >
                {({ ref, open }) => (
                  <img
                    ref={ref}
                    onClick={open}
                    src={urlFor(i).url()}
                    className="w-full h-full object-cover cursor-pointer rounded-lg hover:opacity-90 transition-opacity absolute"
                    alt=""
                  />
                )}
              </Item>
            </div>
          ))}
      </div>
    </Gallery>
  );
}

export default GalleryMain;

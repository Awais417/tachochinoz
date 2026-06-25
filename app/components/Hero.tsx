"use client";
import React, { useEffect, useState } from "react";
import AnimationDiv from "./global/AnimationDiv";
import Lottie from "lottie-react";
import { HOMEQUERYResult } from "@/sanity/types";

function Hero({
  data,
}: {
  data: NonNullable<HOMEQUERYResult> | null | undefined;
}) {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    const url = data?.lottieFile?.asset?.url;

    if (!url) {
      setAnimationData(null);
      return;
    }

    let isMounted = true;

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (isMounted) {
          setAnimationData(json);
        }
      })
      .catch(() => {
        if (isMounted) {
          setAnimationData(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [data?.lottieFile?.asset?.url]);

  return animationData ? (
    <section className="bg-[#1F284F] h-screen flex items-center justify-center">
      <Lottie
        animationData={animationData}
        className="w-100 md:w-150 lg:w-200 mx-auto mt-6 md:mt-8 lg:mt-12"
        loop={false}
      />
    </section>
  ) : null;
}

export default Hero;

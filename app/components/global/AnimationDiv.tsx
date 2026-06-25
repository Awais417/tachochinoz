"use client";
import React, { ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

function AnimationDiv({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (container.current) {
      gsap.set(container.current.children, {
        opacity: 0,
        y: 50,
      });
      gsap.to(container.current.children, {
        opacity: 100,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.1,
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      });
    }
  });

  return (
    <div ref={container} className={className}>
      {children}
    </div>
  );
}

export default AnimationDiv;

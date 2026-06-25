import Image from "next/image";
import React from "react";

function Labels({ onlySpice }: { onlySpice?: boolean }) {
  return (
    <div className="mt-8 flex justify-center gap-12">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-[#128812] rounded-full mb-1"></div>
        <span className="font-jost">VEGETERIAN</span>
      </div>
      <div className="flex items-center gap-2">
        <Image
          src="/chille.png"
          alt="Vegetarian and spicy legend"
          width={12}
          height={12}
          className=""
        />
        <span className="font-jost">SPICY</span>
      </div>
    </div>
  );
}

export default Labels;

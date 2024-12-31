import Image from "next/image";
import React from "react";

const Map = () => {
  return (
    <div className="relative h-[400px] w-full rounded-b-2xl">
        <Image
          src= "/map.png"
          alt="img"
          fill
          className="object-cover"
          priority
        />
        
        </div>
  )
};

export default Map;

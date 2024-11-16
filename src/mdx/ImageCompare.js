import React from "react";

export default function ImageCompare({
  children,
  left,
  right,
  altLeft,
  altRight,
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <div className="w-1/2">
        <img src={left} loading="lazy" alt={altLeft ?? ""} />
      </div>
      <div className="w-1/2">
        <img src={right} loading="lazy" alt={altRight ?? ""} />
      </div>
    </div>
  );
}

import React from "react";

export default function Image({ children, cols, src, alt }) {
  return (
    <div className="flex flex-wrap mb-4">
      <div className={`w-full md:w-${Math.min(12, cols ?? 12)}/12`}>
        <img src={src} loading="lazy" alt={alt ?? ""} />
      </div>
    </div>
  );
}

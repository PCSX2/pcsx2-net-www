import React from 'react';

export default function TextGradient({ children, startColor, endColor }) {
  return (
    <span style={{
      backgroundImage: `linear-gradient(45deg, ${startColor} -20%, ${endColor} 100%)`,
      backgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }}>{children}</span>
  );
}

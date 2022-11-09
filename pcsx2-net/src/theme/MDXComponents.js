import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import PCSX2PRLink from '@site/src/mdx/PCSX2PRLink';
import SliderCompare from '@site/src/mdx/SliderCompare';
import Image from '@site/src/mdx/Image';
import ImageCompare from '@site/src/mdx/ImageCompare';
import TextGradient from '@site/src/mdx/TextGradient';
import BarChart from '@site/src/mdx/BarChart';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  "PCSX2PRLink": PCSX2PRLink,
  "SliderCompare": SliderCompare,
  "Image": Image,
  "ImageCompare": ImageCompare,
  "TextGradient": TextGradient,
  "BarChart": BarChart
};

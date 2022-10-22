import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import PCSX2PRLink from '@site/src/mdx/PCSX2PRLink';
import SliderCompare from '@site/src/mdx/SliderCompare';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  "PCSX2PRLink": PCSX2PRLink,
  "SliderCompare": SliderCompare
};

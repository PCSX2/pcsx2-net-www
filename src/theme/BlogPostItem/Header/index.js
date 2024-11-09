import React from "react";
import BlogPostItemHeaderTitle from "@theme-original/BlogPostItem/Header/Title";
import BlogPostItemHeaderInfo from "@theme-original/BlogPostItem/Header/Info";
import BlogPostItemHeaderAuthors from "@theme-original/BlogPostItem/Header/Authors";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function BlogPostItemHeader() {
  const { metadata } = useBlogPost();
  const image = useBaseUrl(metadata.frontMatter.titleImage);

  let bgStyle = {};
  let classBlog = "";
  if (metadata.frontMatter.titleImage) {
    classBlog = "header-blog";
    bgStyle = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${image}")`,
    };
  }
  return (
    <header className={classBlog} style={bgStyle}>
      <BlogPostItemHeaderTitle />
      <BlogPostItemHeaderInfo />
      <BlogPostItemHeaderAuthors />
    </header>
  );
}

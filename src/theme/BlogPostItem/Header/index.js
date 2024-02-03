import React from 'react';
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title';
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info';
import BlogPostItemHeaderAuthors from '@theme/BlogPostItem/Header/Authors';
import {useBlogPost} from '@docusaurus/theme-common/internal';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function BlogPostItemHeader() {
  const {metadata, isBlogPostPage} = useBlogPost();
  const imageUrl = useBaseUrl(metadata.frontMatter.titleImage);
  console.log(imageUrl);
  return (
    "titleImage" in metadata.frontMatter ? (
      <header style={{
        backgroundColor: "#eee",
        padding: "1em",
        borderRadius: "1em",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('${imageUrl}')`,
        backgroundSize: "cover",
      }}>
        <BlogPostItemHeaderTitle />
        <BlogPostItemHeaderInfo />
        <BlogPostItemHeaderAuthors />
      </header>
    ) : (
      <header>
        <BlogPostItemHeaderTitle />
        <BlogPostItemHeaderInfo />
        <BlogPostItemHeaderAuthors />
      </header>
    )
    );
}

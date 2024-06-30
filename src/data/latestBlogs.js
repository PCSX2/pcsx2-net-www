// docusaurus does not have a query engine layer, so these can be set manually or at build-time
// (manually for now)

import latestProgressReportImage from "/blog/2023/q1-2022-progress-report/feature-progrepq1-2022-bgonly.webp";
import latestBlogImage from "/blog/2024/pcsx2-2-release/banner.webp";
import previousProgressReportImage from "/blog/2022/q4-2021-progress-report/feature-progrepq42021-bgonly.jpg";
import previousBlogImage from "/blog/2022/life-is-short/feature-nobbs66.webp";

export const latestProgressReport = {
  url: "/blog/2023/q1-2022-progress-report",
  title: "Q1 2022 Progress Report",
  img: latestProgressReportImage,
};
export const latestBlog = {
  url: "/blog/2024/pcsx2-2-release/",
  title: "Introducing PCSX2 2.0!",
  img: latestBlogImage,
};
export const previousProgressReport = {
  url: "/blog/2022/q4-2021-progress-report",
  title: "Q4 2021 Progress Report",
  img: previousProgressReportImage,
};
export const previousBlog = {
  url: "/blog/2022/life-is-short",
  title: "Life is Short",
  img: previousBlogImage,
};

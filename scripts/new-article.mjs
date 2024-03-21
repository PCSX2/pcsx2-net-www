import prompts from "prompts";
import fs from "fs";

let content = ["---", "draft: false"];

let response = await prompts({
  type: "text",
  name: "value",
  message: "Title?",
  validate: (value) => (!value ? `Required!` : true),
});
const articleTitle = response.value;
content.push(`title: ${articleTitle}`);
const articleSlug = articleTitle
  .toLowerCase()
  .replace(/[^\w\s]/, "")
  .replace(" ", "-");

response = await prompts({
  type: "select",
  name: "value",
  message: "Article Type?",
  choices: [
    { title: "Progress Report", value: "progress-report" },
    { title: "Developer Blog", value: "devblog" },
  ],
});
const articleCategory = response.value;
content.push(`tags:`);
content.push(` - ${articleCategory}`);

response = await prompts({
  type: "date",
  name: "value",
  message: "Publish Date?",
  mask: "YYYY-MM-DD",
});
const articleDate = response.value;
content.push(
  `date: ${articleDate.toISOString().replace("T", " ").replace("Z", "")}`,
);

response = await prompts({
  type: "text",
  name: "value",
  message: "Description?",
  validate: (value) => (!value ? `Required!` : true),
});
const articleDescription = response.value;
content.push(`description: ${articleDescription}`);

response = await prompts({
  type: "confirm",
  name: "value",
  message: "Show Table of Contents?",
  initial: true,
});
const displayTableOfContents = response.value;
content.push(`hide_table_of_contents: ${!displayTableOfContents}`);

response = await prompts({
  type: "text",
  name: "value",
  message: "Author Name?",
  validate: (value) => (!value ? `Required!` : true),
});
const articleAuthor = response.value;
content.push(`authors:`);
content.push(` - ${articleAuthor.toLowerCase()}`);

content.push("---\n");
content.push("ARTICLE SUMMARY HERE\n");
content.push("<!-- truncate -->\n");
content.push("ARTICLE CONTENT HERE\n");

fs.mkdirSync(`./blog/${articleDate.getFullYear()}/${articleSlug}/img`, {
  recursive: true,
});
fs.writeFileSync(
  `./blog/${articleDate.getFullYear()}/${articleSlug}/index.mdx`,
  content.join("\n"),
);

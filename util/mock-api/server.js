import express from "express";
import https from "https";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());
const port = 8001;

import stableReleases from "./fixtures/stableReleases.json" with { type: "json" };
import nightlyReleases from "./fixtures/nightlyReleases.json" with { type: "json" };
import latest from "./fixtures/latest.json" with { type: "json" };

app.get("/v1/stableReleases", (req, res) => {
  const { offset = 0 } = req.query;
  const offsetInt = parseInt(offset, 10);
  const paginatedData = stableReleases.slice(offsetInt, offsetInt + 10);
  res.json(paginatedData);
});

app.get("/v1/nightlyReleases", (req, res) => {
  const { offset = 0 } = req.query;
  const offsetInt = parseInt(offset, 10);
  const paginatedData = nightlyReleases.slice(offsetInt, offsetInt + 10);
  res.json(paginatedData);
});

app.get("/v1/latestReleasesAndPullRequests", (req, res) => {
  res.json(latest);
});

const sslOptions = {
  key: fs.readFileSync(path.resolve("localhost-key.pem"), "utf8"),
  cert: fs.readFileSync(path.resolve("localhost.pem"), "utf8"),
};

// Start the server
https.createServer(sslOptions, app).listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});

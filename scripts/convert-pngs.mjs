import webp from "webp-converter";
import glob from "glob";
import fs from "fs";

webp.grant_permission();

function convert_pngs(glob_path) {
  glob(glob_path, async function (err, files) {
    for (const path of files) {
      await webp.cwebp(path, path.replace(".png", ".webp"), "-q 90");
      fs.rmSync(path);
    }
  });
}

convert_pngs("./blog/**/*.png");
convert_pngs("./docs/**/*.png");
convert_pngs("./static/**/*.png");

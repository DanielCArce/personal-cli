import { CronJob } from "cron";
import fs from "fs";
function cleanup() {
  setTimeout((time) => {
    fs.readdir("./data/", (err, files) => {
      files.forEach((file) => {
        fs.rmSync(`./data/${file}`);
      });
    });
  }, 10000);
}
export default cleanup;

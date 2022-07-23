const fs = require("fs");
const path = require("path");

function write_on_disk(info) {
  fs.writeFileSync(
    path.join(__dirname, "..", "data", info.filename),
    info.content,
    {
      encoding: "utf8",
    }
  );
}
module.exports = { write_on_disk };

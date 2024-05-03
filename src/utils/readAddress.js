import fs from "fs";
import readLine from "readline";

export async function readAddressesFromFile(filePath) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      reject(new Error(`The file ${filePath} does not exist`));
      return;
    }

    const addresses = [];
    const fileStream = fs.createReadStream(filePath);

    const rl = readLine.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
      addresses.push(line.trim());
    });

    rl.on("close", () => {
      resolve(addresses);
    });

    rl.on("error", (err) => {
      reject(err);
    });
  });
}

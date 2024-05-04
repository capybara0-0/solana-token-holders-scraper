import fs from "fs";
import readline from "readline";

export async function streamAddresses(filePath, action) {
  if (!fs.existsSync(filePath)) {
    console.log(`The file ${filePath} does not exist.`);
    return null;

    // throw new Error(`The file ${filePath} does not exist`);
  }

  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  try {
    for await (const line of rl) {
      await action(line.trim());
    }
  } catch (err) {
    console.error("Error processing file:", err);
  } finally {
    rl.close();
    fileStream.destroy();
  }
}

export async function compareAddressFiles(file1, file2) {
  const addresses = new Set();

  // Load all addresses from file1 into a Set
  await streamAddresses(file1, (address) => addresses.add(address));

  await streamAddresses(file2, (address) => {
    if (addresses.has(address)) {
      addresses.delete(address);
    }
  });

  return Array.from(addresses);
}

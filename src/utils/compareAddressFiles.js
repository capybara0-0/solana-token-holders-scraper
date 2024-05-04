import { streamAddresses } from "./readAddress.js";

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

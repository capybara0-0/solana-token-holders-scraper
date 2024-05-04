import { compareAddressFiles } from "./utils/readAddress.js";

const file1 = "ListAddress.txt";
const file2 = "WhiteListAddress.txt";

await compareAddressFiles(file1, file2)
  .then((uniqueAddresses) => {
    if (uniqueAddresses.length === 0) {
      console.log(`0 non white listed addresses found.`);
    } else {
      console.log("non-white Listed addresses: ", uniqueAddresses);
    }
  })
  .catch((error) => console.error("Error: ", error));

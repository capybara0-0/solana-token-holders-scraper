// Clients module
import { fetchAccountState } from "./clients/fetchAccountState.js";
import { fetchTokenAccountBalance } from "./clients/fetchTokenAccountBalance.js";
import { findTokenAccounts } from "./clients/fetchTokenAccounts.js";

// Constants module
import { FILE1, FILE2 } from "./constants/constatnt.js";

// Utils module
import { compareAddressFiles } from "./utils/compareAddressFiles.js";

async function processAddresses(addresses) {
  for (const address of addresses) {
    console.log(`Processing address: ${address}`);
    const tokenAccounts = await findTokenAccounts(address);
    await delay(3500);
    const balance = await fetchTokenAccountBalance(address);
    await delay(3500);
    const isFrozen = await fetchAccountState(tokenAccounts[0]);
    await delay(3500);

    console.log(`Token Account: ${tokenAccounts}`);
    console.log(`Balance: ${balance}`);
    console.log(`Is Frozen: ${isFrozen}`);

    console.log(`=`.repeat(50));
  }
}

(async () => {
  const addresses = await compareAddressFiles(FILE1, FILE2);
  await processAddresses(addresses);
})();
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

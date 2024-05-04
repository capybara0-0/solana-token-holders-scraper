// Clients module
import { fetchAccountState } from "./clients/fetchAccountState.js";
import { fetchTokenAccountBalance } from "./clients/fetchTokenAccountBalance.js";
import { findTokenAccounts } from "./clients/fetchTokenAccounts.js";

// Constants module
import { FILE1, FILE2 } from "./constants/constatnt.js";

// Utils module
import { compareAddressFiles } from "./utils/compareAddressFiles.js";

export async function main(file1, file2) {
  try {
    const addresses = await compareAddressFiles(file1, file2);
    const resultsPromises = addresses.map(async (address) => {
      const tokenAccounts = await findTokenAccounts(address);

      const accountState = await fetchAccountState(tokenAccounts[0]);

      const tokenAccountBalance = await fetchTokenAccountBalance(address);

      return {
        address,
        tokenAccounts,
        tokenAccountBalance,
        accountState,
      };
    });

    const results = await Promise.all(resultsPromises);
    console.log(results);
    return results;
  } catch (error) {
    console.error("Failed to process addresses:", error);
    throw error;
  }
}

await main(FILE1, FILE2).catch(console.error);

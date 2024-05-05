import chalk from "chalk";
import cliProgress from "cli-progress";

// Clients module
import { fetchAccountState } from "./clients/fetchAccountState.js";
import { fetchTokenAccountBalance } from "./clients/fetchTokenAccountBalance.js";
import { findTokenAccounts } from "./clients/fetchTokenAccounts.js";

// Constants module
import { FILE1, FILE2 } from "./constants/constatnt.js";
import { DELAY } from "./constants/constatnt.js";

// Utils module
import { compareAddressFiles } from "./utils/compareAddressFiles.js";
import { delay } from "./utils/delay.js";

// Models module
import { writeToExcel } from "./models/excelManager.js";

async function processAddresses(addresses) {
  const results = [];

  const progressBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic,
  );
  progressBar.start(addresses.length, 0);

  for (const [index, address] of addresses.entries()) {
    const result = { address };

    const tokenAccounts = await findTokenAccounts(address);
    await delay(DELAY * 1000);

    if (tokenAccounts.length > 0) {
      const balance = await fetchTokenAccountBalance(address);
      await delay(DELAY * 1000);

      const isFrozen = (await fetchAccountState(tokenAccounts[0]))
        ? "isFrozen"
        : "notFrozen";
      await delay(DELAY * 1000);

      result.tokenAccounts = tokenAccounts;
      result.balance = balance;
      result.isFrozen = isFrozen;

      results.push(result);
    } else {
      result.info =
        "Owner Address does not have the specified SPL-token. Skipping";
      await delay(4000);
    }
    progressBar.update(index + 1);
  }
  progressBar.stop();

  return results;
}

(async () => {
  const addresses = await compareAddressFiles(FILE1, FILE2);
  const results = await processAddresses(addresses);
  writeToExcel(results);
})();

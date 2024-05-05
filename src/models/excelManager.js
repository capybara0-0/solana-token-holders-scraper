import chalk from "chalk";
import xlsx from "xlsx";
import { MINT_ADDRESS } from "../constants/constatnt.js";

const sheetName = MINT_ADDRESS.slice(0, 4) + "...." + MINT_ADDRESS.slice(-4);

/**
 * Writes the provided token holder results to an Excel file.
 * This function formats the results into a structured Excel sheet,
 * including columns for the owner address, token accounts, balance, and account state.
 * The Excel file is then saved with a name derived from the mint address.
 *
 * @param {Array<{address: string, tokenAccounts: Array<string>, balance: number, isFrozen: string}>} results - An array of objects,
 * each representing a token holder with their address, associated token accounts, balance, and account state.
 * @returns {void} This function does not return a value.
 */

export function writeToExcel(results) {
  return new Promise((resolve, reject) => {
    const data = results.map(
      ({ address, tokenAccounts, balance, isFrozen }) => ({
        "Owner Address": address,
        "Token Account": tokenAccounts.join(", "),
        "Token Amount": balance,
        "Token Account State": isFrozen,
      }),
    );

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(wb, ws, "Results");

    try {
      xlsx.writeFile(wb, `${sheetName}.xlsx`);
      console.log(
        chalk.greenBright(
          `[SUCCESS] wrote token holder data to ${sheetName}.xlsx`,
        ),
      );
      resolve();
    } catch (error) {
      console.error(
        `Failed to write token holder data to ${sheetName}.xlsx:`,
        error,
      );
      reject(error);
    }
  });
}

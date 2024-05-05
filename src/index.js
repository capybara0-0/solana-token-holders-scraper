import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { connection } from "./constants/connection.js";
import { FILE_PATH, MINT_ADDRESS } from "./constants/constatnt.js";
import fs from "fs/promises";
import XLSX from "xlsx";
import chalk from "chalk";

const sheetName = MINT_ADDRESS.slice(0, 4) + "...." + MINT_ADDRESS.slice(-4);

async function getTokenAccountsByMint(mint) {
  const addressListContent = await fs.readFile(FILE_PATH, {
    encoding: "utf8",
  });
  const addressList = addressListContent
    .split("\n")
    .map((address) => address.trim());

  const filters = [
    {
      dataSize: 165,
    },
    {
      memcmp: {
        offset: 0,
        bytes: mint,
      },
    },
  ];
  const accounts = await connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, {
    filters: filters,
  });

  console.log(
    chalk.blue(
      `[INFO] ${
        accounts.length
      } token accounts found for mint address: ${chalk.yellow(mint)}`,
    ),
  );

  let nonWhitelistedAccounts = [];

  accounts.forEach((account, i) => {
    const parsedAccountInfo = account.account.data;
    const ownerAddress = parsedAccountInfo["parsed"]["info"]["owner"];
    const tokenBalance =
      parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];
    const tokenAccountState = parsedAccountInfo["parsed"]["info"]["state"];

    if (!addressList.includes(ownerAddress)) {
      nonWhitelistedAccounts.push({
        "Owner Address": ownerAddress,
        "Token Account No.": account.pubkey.toString(),
        "Token Balance": tokenBalance,
        "Token Account State": tokenAccountState,
      });
    }
  });

  if (nonWhitelistedAccounts.length > 0) {
    const worksheet = XLSX.utils.json_to_sheet(nonWhitelistedAccounts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Non-Whitelisted Accounts",
    );
    XLSX.writeFile(workbook, `${sheetName}.xlsx`);
    console.log(
      chalk.green(
        "[SUCCESS] Excel file has been populated with non-whitelisted accounts.",
      ),
    );
  } else {
    console.log(
      chalk.blue("[INFO] No non-whitelisted accounts to write to Excel."),
    );
  }
}

await getTokenAccountsByMint(MINT_ADDRESS);

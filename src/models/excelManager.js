import xlsx from "xlsx";
import { MINT_ADDRESS } from "../constants/constatnt.js";

const sheetName = MINT_ADDRESS.slice(0, 4) + "...." + MINT_ADDRESS.slice(-4);

export function writeToExcel(results) {
  const data = results.map(({ address, tokenAccounts, balance, isFrozen }) => ({
    "Owner Address": address,
    "Token Account": tokenAccounts.join(", "),
    "Token Amount": balance,
    "Token Accoun State": isFrozen,
  }));

  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(data);

  xlsx.utils.book_append_sheet(wb, ws, "Results");

  xlsx.writeFile(wb, `${sheetName}.xlsx`);
}

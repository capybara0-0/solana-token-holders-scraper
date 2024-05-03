import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { connection } from "../constants/connection.js";
import { MINT_ADDRESS } from "../constants/constatnt.js";

export async function fetchTokenAccountBalance(ownerAddress) {
  try {
    const ownerPublicKey = new PublicKey(ownerAddress);
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      ownerPublicKey,
      { programId: TOKEN_PROGRAM_ID },
    );

    const specificTokenAccount = tokenAccounts.value.find(
      (account) => account.account.data.parsed.info.mint === MINT_ADDRESS,
    );

    if (!specificTokenAccount) {
      console.log("No tokens found");
      return null;
    }

    const tokenAccountBalance = await connection.getTokenAccountBalance(
      new PublicKey(specificTokenAccount.pubkey),
    );

    console.log(
      "Balance of the specific token account:",
      tokenAccountBalance.value.uiAmount,
    );
    return tokenAccountBalance.value.uiAmount;
  } catch (error) {
    console.error("Failed to fetch token account balance:", error);
  }
}

await fetchTokenAccountBalance("4pgnTmbAYCP5yWDbkDg4bFRKs6URYgJDDJwXCjtjh4J1");

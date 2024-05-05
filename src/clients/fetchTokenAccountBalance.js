import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { connection } from "../constants/connection.js";
import { MINT_ADDRESS } from "../constants/constatnt.js";

/**
 * Fetches the balance of a specific token for a given owner address.
 * This function queries the Solana blockchain for token accounts owned by the specified address,
 * filters for the token account associated with a predefined mint address, and retrieves its balance.
 *
 * @param {string} ownerAddress - The public key of the owner whose token account balance is to be fetched.
 * @returns {Promise<number | null>} A promise that resolves to the balance of the token account in UI amount,
 * or null if no token account is found for the specified owner address and mint address.
 * @throws Will throw an error if the operation fails, such as network issues or invalid input.
 */
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
    // console.log(tokenAccountBalance.value.uiAmount);
    return tokenAccountBalance.value.uiAmount;
  } catch (error) {
    console.error("Failed to fetch token account balance:", error);
  }
}

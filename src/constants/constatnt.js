// ------------------------
// Configuration for Solana Mainnet
// ------------------------

// Solana's Mainnet RPC API.
export const RPC_URL = "https://api.mainnet-beta.solana.com";

// The mint address of the token you are interested in.
export const MINT_ADDRESS = "H24RXEMJ6TK61NrbMZoNxMj2u3yaxJcVMSM65AqfUj9o";

// File paths for the lists of addresses to include and exclude in the scraping process.
export const FILE1 = "ListAddress.txt";
export const FILE2 = "WhiteListAddress.txt";

// Delay time in seconds to manage request rate to the Solana RPC.
// Note: Using a standard RPC URL, it is recommended not to set a delay of less than 4 seconds to avoid rate limiting.
export const DELAY = 4;

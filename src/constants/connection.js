import { RPC_URL } from "./constatnt.js";
import { Connection } from "@solana/web3.js";

export const connection = new Connection(RPC_URL, "confirmed");

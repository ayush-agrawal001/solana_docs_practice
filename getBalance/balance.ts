import { LAMPORTS_PER_SOL, Keypair, Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

const conn = new Connection(clusterApiUrl("devnet"));

const address = new PublicKey("SC9zgtaHCcmPgbBbMq31x8gUr2qhpYkCbV1jSdqTUGd")

const balance = await conn.getBalance(address)

console.log( `Account balance for address : ${address} is ${balance/ LAMPORTS_PER_SOL} SOL`)
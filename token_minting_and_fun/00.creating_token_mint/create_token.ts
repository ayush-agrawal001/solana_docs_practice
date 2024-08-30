import {clusterApiUrl, Connection, Keypair} from "@solana/web3.js" 
import "dotenv/config"
import * as sec from "../sec_guy/sec.json"
import {createMint} from "@solana/spl-token"
import {getExplorerLink} from "@solana-developers/helpers"

const conn = new Connection(clusterApiUrl("devnet"))
const user = Keypair.fromSecretKey(new Uint8Array(sec.SECRET_KEY))

console.log(
    `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`,
);

const tokenMint = await createMint(conn, user, user.publicKey, null, 9) //Mint account

const link = getExplorerLink("address", tokenMint.toString(), "devnet")

console.log(link)

import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token"
import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers"
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js"
import * as sec from "../sec_guy/sec.json"

const conn = new Connection(clusterApiUrl("devnet"))
const user = Keypair.fromSecretKey(new Uint8Array(sec.SECRET_KEY))
console.log(
    `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`,
);

const tokenMintAccount = new PublicKey("8JDoEx542vN5sodzWvdpQwwoB4uoLFh6PGbxiQevJJt8")
const recipent = user.publicKey //for ATA 

const tokenAccount = await getOrCreateAssociatedTokenAccount(
    conn,
    user, // Signer
    tokenMintAccount, // to which token this associates with
    recipent // owner of ATA
)

const link = getExplorerLink(
    "address",
    tokenAccount.address.toBase58(),
    "devnet"
)
console.log(link)
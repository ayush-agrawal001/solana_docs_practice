import * as web3 from "@solana/web3.js"
import * as token from "@solana/spl-token"
import * as sec from "../sec_guy/sec.json"
import { getExplorerLink } from "@solana-developers/helpers"

const conn = new web3.Connection(web3.clusterApiUrl("devnet"))
const user = web3.Keypair.fromSecretKey(new Uint8Array(sec.SECRET_KEY))

const tokenMintAccount = new web3.PublicKey("8JDoEx542vN5sodzWvdpQwwoB4uoLFh6PGbxiQevJJt8")

const recipentsATA = new web3.PublicKey("14K53EYSGRh3GgP2McykWAG1VDvMX8f7cauaKaKjKpwH")  //This is my ATA 

const tokenInSmallestUnit = Math.pow(10, 9)

const mintTransactionSignature = await token.mintTo(
    conn,
    user,
    tokenMintAccount,
    recipentsATA,
    user.publicKey,
    100 * tokenInSmallestUnit
)

const link = getExplorerLink("transaction", mintTransactionSignature, "devnet")
console.log(link)
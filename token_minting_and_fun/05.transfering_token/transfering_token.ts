import * as web3 from "@solana/web3.js"
import * as token from "@solana/spl-token"
import * as sec from "../sec_guy/sec.json"
import { getExplorerLink } from "@solana-developers/helpers"

const conn = new web3.Connection(web3.clusterApiUrl("devnet"))

const sender = web3.Keypair.fromSecretKey(new Uint8Array(sec.SECRET_KEY))
const receiverPubKey = new web3.PublicKey("5rmDFipvqTrqjYxD4QNWQugYpaaYLjKxM7aGvqkZoJJp")
const tokenMintAccount = new web3.PublicKey("8JDoEx542vN5sodzWvdpQwwoB4uoLFh6PGbxiQevJJt8")
const tokenInSmallestUnit = Math.pow(10, 9)

const senderATA = await token.getOrCreateAssociatedTokenAccount(
    conn,
    sender,
    tokenMintAccount,
    sender.publicKey
) //this will give you the ATA of the owner as we already created the ATA

const receiverATA = await token.getOrCreateAssociatedTokenAccount(
    conn,
    sender,
    tokenMintAccount,
    receiverPubKey
)//this will create & give the ATA of the owner as we are sending it for the first time

const sendTokenSignature = await token.transfer(
    conn,
    sender,// payer
    senderATA.address,// from ATA
    receiverATA.address,// to ATA
    sender,// owner
    5 * tokenInSmallestUnit
)

const link = getExplorerLink("transaction", sendTokenSignature, "devnet")
console.log(link)



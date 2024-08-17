import { LAMPORTS_PER_SOL, Keypair, Connection, Transaction, SystemInstruction, SystemProgram, PublicKey, sendAndConfirmRawTransaction, sendAndConfirmTransaction } from "@solana/web3.js";
import { airdropIfRequired, getKeypairFromEnvironment } from "@solana-developers/helpers";
import * as secretKey from "./sec.json"

const conn = new Connection("https://api.devnet.solana.com", 'confirmed')

const transaction = new Transaction()

const myKeyPair = Keypair.fromSecretKey(new Uint8Array(secretKey.SECRET_KEY)) 
//can also use the getKeypairFromEnvironment but giving err

const fpk = new PublicKey("SC9zgtaHCcmPgbBbMq31x8gUr2qhpYkCbV1jSdqTUGd")
const tpk = new PublicKey("5rmDFipvqTrqjYxD4QNWQugYpaaYLjKxM7aGvqkZoJJp")

await airdropIfRequired(
    conn,
    fpk,
    1 * LAMPORTS_PER_SOL,
    1 * LAMPORTS_PER_SOL
) // This does not work in mainNet (obviously)

const amount = 1

const instructionSOL = SystemProgram.transfer({ 
    //The program used in this instruction will be the system program (at the address 11111111111111111111111111111111)
    fromPubkey: fpk,
    toPubkey: tpk,
    lamports: LAMPORTS_PER_SOL * amount
})

transaction.add(instructionSOL)

const signature = await sendAndConfirmTransaction(conn, transaction, [myKeyPair] )// hover and see the args role 

console.log(`Transaction of ${amount} SOL from ${fpk} to ${tpk}`)
console.log(`Signature of the following:- ${signature}`)
import * as web3 from "@solana/web3.js"
import {airdropIfRequired} from "@solana-developers/helpers"
import * as secret_key from "./sec.json"

const conn = new web3.Connection(web3.clusterApiUrl("devnet"))

const transaction = new web3.Transaction();

const myKeyPair = web3.Keypair.fromSecretKey(new Uint8Array(secret_key.SECRET_KEY))

await airdropIfRequired(
    conn,
    myKeyPair.publicKey,
    1 * web3.LAMPORTS_PER_SOL,
    1 * web3.LAMPORTS_PER_SOL
)

const PING_PROGRAM_ADDRESS = new web3.PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa",);
// PING_PROGRAM_ADDRESS refers to the public key of the deployed program

const programId = new web3.PublicKey(PING_PROGRAM_ADDRESS)

const PING_PROGRAM_DATA_ADDRESS = new web3.PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod",);
// Program Data Address refers to a specific on-chain account associated 
// with a Solana program that stores persistent data or state for that program. 

const programDataId = new web3.PublicKey(PING_PROGRAM_DATA_ADDRESS)

const instruction = new web3.TransactionInstruction(
    {
        keys : [
            {
                pubkey : programDataId,
                isSigner : false,
                isWritable : true
            }
        ],
        programId
    }
) //This set of instructions are decided by the program on_chain this is what custom instruction

transaction.add(instruction)

const signature = await web3.sendAndConfirmTransaction(conn, transaction, [myKeyPair])

console.log(`You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)
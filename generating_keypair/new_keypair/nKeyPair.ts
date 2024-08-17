import {Keypair} from "@solana/web3.js"
import bs58 from "bs58"

const myKeyPair = Keypair.generate();

const pubKey = myKeyPair.publicKey
const pvtKey = myKeyPair.secretKey

console.log(`Your Public Key is ${myKeyPair.publicKey}`)
console.log(`Your Private key is ${bs58.encode(myKeyPair.secretKey)}`)
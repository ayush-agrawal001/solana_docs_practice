import {getKeypairFromEnvironment} from "@solana-developers/helpers"
import "dotenv/config";

const secretKey = getKeypairFromEnvironment("SECRET_KEY")

console.log(`Secret Key loaded`);
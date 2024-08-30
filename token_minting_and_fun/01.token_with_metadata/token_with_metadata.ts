import * as web3 from "@solana/web3.js"
import {getExplorerLink} from "@solana-developers/helpers"
import { createCreateMetadataAccountV3Instruction, dataBeet } from "@metaplex-foundation/mpl-token-metadata"
import * as sec from "../sec_guy/sec.json"

const conn = new web3.Connection(web3.clusterApiUrl("devnet"))
const user = web3.Keypair.fromSecretKey(new Uint8Array(sec.SECRET_KEY))

console.log(
    `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`,
);

const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
);

const tokenMintAccount = new web3.PublicKey("8JDoEx542vN5sodzWvdpQwwoB4uoLFh6PGbxiQevJJt8")

const metaData = {
    name : "A_square",
    symbol : "ASQ",
    uri : "https://arweave.net/-3B-_cIeRyXMwufkjgZcicbRCi3wa-4pH1SzSPvppGo",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
}

const metadataPDAAndBump = web3.PublicKey.findProgramAddressSync([
    Buffer.from("metadata"),
    TOKEN_METADATA_PROGRAM_ID.toBuffer(),
    tokenMintAccount.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
)

const metadataPDA = metadataPDAAndBump[0]; //Program derived address

const transaction = new web3.Transaction();

const metadataAccountInstruction = createCreateMetadataAccountV3Instruction(
    {
        metadata: metadataPDA,
        mint : tokenMintAccount,
        mintAuthority : user.publicKey,
        payer : user.publicKey,
        updateAuthority : user.publicKey
    },
    {
        createMetadataAccountArgsV3 : {
            collectionDetails : null,
            data : metaData,
            isMutable : true
        }
    }
)

transaction.add(metadataAccountInstruction)

const transactionSignature = await web3.sendAndConfirmTransaction(
    conn,
    transaction,
    [user]
)

const link = getExplorerLink(
    "address",
    tokenMintAccount.toString(),
    "devnet"
)

console.log(link)
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var web3_js_1 = require("@solana/web3.js");
require("dotenv/config");
var sec = require("./sec_guy/sec.json");
var conn = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("devnet"));
var user = web3_js_1.Keypair.fromSecretKey(new Uint8Array(sec.SECRET_KEY));
console.log("\uD83D\uDD11 Loaded our keypair securely, using an env file! Our public key is: ".concat(user.publicKey.toBase58()));

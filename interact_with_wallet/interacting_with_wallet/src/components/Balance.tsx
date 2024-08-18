import React, { useEffect, useState } from "react";
import {useWallet , useConnection} from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { Buffer } from 'buffer';

window.Buffer = Buffer;


const Balance: React.FC = () => {
    const [balance, setBalance] = useState<number | undefined>(0)
    const [pubInput, setPubInput] = useState("")
    const { connection } = useConnection();
    const { publicKey, sendTransaction  } = useWallet();

    //////////////usEffectHook for connection///////////////
    useEffect(() => {
        if (!connection || !publicKey){
            return ;
        }

    connection.onAccountChange( //whent an account changes
        publicKey ,
        updatedAccountInfo => {
            setBalance(updatedAccountInfo.lamports);
        },
        "confirmed"
    )
    
    connection.getAccountInfo(publicKey).then(info => { // when an account is conncted
        setBalance(info?.lamports);
    })

    }, [connection, publicKey])
    ///////////////////////////////////////////////////////////
    
    const handleInput = (event : any)=> {
        setPubInput(event.target.value)
    }

    const sendSOL = async () => {
        const tpk = new PublicKey(pubInput);
        const transaction = new Transaction();
        
        if (publicKey) // because of TS error
            {
            const SendingInstruction = SystemProgram.transfer({
                fromPubkey : publicKey,
                toPubkey : tpk,
                lamports : 0.1 * LAMPORTS_PER_SOL,
                })
                transaction.add(SendingInstruction)
                const signature = await sendTransaction(transaction, connection)// useWallet method
                console.log(signature);
            }
        
    }

    return (
        <div>
            <h1>{publicKey ? `Balance of account is ${balance / LAMPORTS_PER_SOL} SOL` : ""}</h1>

            {publicKey ? <div><input type="text" onChange={handleInput}/><button onClick={sendSOL}>Send SOL</button></div> : ''} 
        </div>
    )
}

export default Balance
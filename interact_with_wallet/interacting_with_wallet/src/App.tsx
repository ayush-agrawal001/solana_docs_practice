import React, { useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { WalletConnectButton, WalletDisconnectButton, WalletModalButton, WalletModalProvider,
  //  WalletMultiButton
   } 
   from "@solana/wallet-adapter-react-ui";
import Balance from "./components/Balance";

const App: React.FC = () => {
  
  const endpoint = web3.clusterApiUrl("devnet") //RPC of devnet
  const wallets = useMemo(() => [], [])//as requirement of walletProvider wallets type is Adapter[]
  
  // const connectTowallet = use
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div>
            <WalletConnectButton></WalletConnectButton>
            <WalletModalButton></WalletModalButton>
            <WalletDisconnectButton></WalletDisconnectButton>
            <Balance></Balance>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
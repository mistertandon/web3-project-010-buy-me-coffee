import { useEffect, useState } from "react";
import { ethers } from "ethers";
import chai from "./contract/chai.json";
import "./index.scss";
import "./App.scss";

const VITE_CHAI_CONTRACT_ADDRESS = import.meta.env.VITE_CHAI_CONTRACT_ADDRESS;

import { BuyChai } from "./components/BuyChai/BuyChai.jsx";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    chaiContract: null,
  });

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        console.log("window.ethereum", window.ethereum);
        try {
          const { ethereum } = window;

          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });
          console.log("ethers", ethers);
          console.log("ethers.providers", ethers.providers);

          const web3Provider = new ethers.providers.Web3Provider(ethereum);
          const signer = web3Provider.getSigner();
          const chaiContract = new ethers.Contract(
            VITE_CHAI_CONTRACT_ADDRESS,
            chai.abi,
            signer
          );

          setState({ provider: web3Provider, signer, chaiContract });
        } catch (error) {
          console.log("Error", error);
        }
      }
    };
    connectWallet();
  }, []);
  console.log("state", state);
  return (
    <div className="App">
      <h4>Get started with chaipilao Dapp</h4>
<BuyChai/>
    </div>
  );
}

export default App;

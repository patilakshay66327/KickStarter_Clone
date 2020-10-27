import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  //we are in browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  //we are on server or user is not using metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/f17f118cf28743e484805271f036633b"
  );
  web3 = new Web3(provider);
}

export default web3;

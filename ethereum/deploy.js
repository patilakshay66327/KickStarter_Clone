const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

//wallet provider is use to connect with ethereum network and unlock the accounts
const provider = new HDWalletProvider(
  "mobile nuclear custom decade era wish wink odor hope cloth worth list",
  "https://rinkeby.infura.io/v3/f17f118cf28743e484805271f036633b"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: "0x" + compiledFactory.bytecode })
    .send({ from: accounts[0] });

  console.log("contract Deployed to : ", result.options.address);
};
deploy();

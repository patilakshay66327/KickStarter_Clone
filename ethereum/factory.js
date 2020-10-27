import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x5DF5B7baefC28f56255e0606D3603f458efa8245"
);

export default instance;
import web3 from './web3';
import AccountFactory from './build/AccountFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(AccountFactory.interface),
  '0x7c39D355EaeD98B1fA37d3AF43a3aF3dFDacCc2F'
);

export default instance;

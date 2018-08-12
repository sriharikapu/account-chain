import web3 from './web3';
import AccountFactory from './build/AccountFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(AccountFactory.interface),
  '0xF714E9127Fd6008B07d2056934a1d681e8b3D002'
);

export default instance;

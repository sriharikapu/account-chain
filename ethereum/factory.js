import web3 from './web3';
import AccountFactory from './build/AccountFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(AccountFactory.interface),
  '0x1369672A203d6aAbd548d8Cc29758B0ABF845ff9'
);

export default instance;

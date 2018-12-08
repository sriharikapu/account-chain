const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/AccountFactory.json');
const compiledAccount = require('../ethereum/build/Account.json');

let accounts;
let factory;
let accountAddress;
let account;

beforeEach(async () => {
	// console.log("beforeEach");
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });
    // console.log("accounts :"+accounts);
    // console.log("factory: "+factory.methods.getDeployedAccounts());
 	await factory.methods.createAccount('100').send({
    from: accounts[0],
    gas: '1000000'
  	});

  [accountAddress] = await factory.methods.getDeployedAccounts().call();
  account = await new web3.eth.Contract(
    JSON.parse(compiledAccount.interface),
    accountAddress
  );
  
});

describe('Accounts', () => {
	console.log("factory:"+factory);
	it('deploys a factory and a account', () => {
	  assert.ok(factory.options.address);
	  assert.ok(account.options.address);
	});

	it('marks caller as the account owner', async () => {
	  const owner = await account.methods.owner().call();
	  assert.equal(accounts[0], owner);
	});

	it('user can contribute and verify his contribution', async () => {
	  await account.methods.contribute().send({
	     value: '300',
	     from: accounts[1]
	   }); 

	   await account.methods.contribute().send({
	      value: '300',
	      from: accounts[1]
	    });

	   var ret = await account.methods.contributers(accounts[1]).call();
	   let ret_summary = await account.methods.getSummary().call();
	   console.log(ret_summary);
	   // var ret = await account.methods.getMyContribution().call();
	   	
	   console.log(ret);
	   console.log(parseInt(ret_summary[1]));
	   console.log("your contribution is % : " + (ret / parseInt(ret_summary[1])) * 100);
	   // console.log(ret[0] + ' ' + ret[1]);
	   // console.log(ret);
	  // assert.equal(ret, '300');
	});
});
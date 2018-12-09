# Account Chain
**Trustless fund management**

Account chain is a Ethereum smartcontract, where experts (Trader / Fund manager) can deploy his own Account smartcontract, then ihs community can send fund. The Account is owned by the expert and he can trade using the fund in exchanges like Kyber Networks, but the Smartcontract will not allow the expert or the Account owner to withdraw the fund from the contract except for the contributers, their respective share.

### How to install the app

git clone https://gitlab.com/apportion-blockchain/accountChain.git

cd accountChain
npm install

-- if you encounter python version related issues ensure you have python 3.0 or below

cd ethereum

node compile.js

-- you will find Account.json and AccountFactory.json in the build folder  

### How to run the UI

make sure you have logged into a meta-mask, **IMPORTANT** make sure it is rinkeby network and not the main network.

npm run dev


### How to deploy into the cloud (https://zeit.co)

 * npm install -g now
 * npm run build
 * npm run start
 * now
 * now alias https://accountchain-alnukdxzdg.now.sh account-chain
#How to install the app

git clone https://gitlab.com/apportion-blockchain/accountChain.git

cd accountChain
npm install

-- if you encounter python version related issues ensure you have python 3.0 or below

cd ethereum

node compile.js

-- you will find Account.json and AccountFactory.json in the build folder  

#How to run the UI

make sure you have logged into a meta-mask, **IMPORTANT** make sure it is rinkeby network and not the main network.

npm run dev


#How to deploy into the cloud (https://zeit.co)

 npm install -g now
 npm run build
 npm run start
 now
 now alias https://accountchain-bwmtczpvun.now.sh account-chain
now alias https://accountchain-alnukdxzdg.now.sh account-chain

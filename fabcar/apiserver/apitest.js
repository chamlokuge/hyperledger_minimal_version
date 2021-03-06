'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());


const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', 'first-network', 'connection-org1.json');

app.get('/api/queryallcars',async function (req, res){
    try{
        console.log('aaaa');
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

         // Check to see if we've already enrolled the user.
         const userExists = await wallet.exists('user1');
         if(!userExists){
             console.log('An identity for the user "user1" does not exist in the wallet ');
             console.log('Run the registerUser.js application before retrying');
             return;
         }

         //create a new gateway for connecting to our peer node
         const gateway = new Gateway();
        //  await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: false}});
        await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true}});

         // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');


        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('queryAllCars');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString()});
    } catch(error){
         console.error(`failed to evaluate transaction: ${error}`);
       // console.error(error.stack);
        res.status(500).json({error:error});
        process.exit(1);
    }
    
});
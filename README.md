# hyperledger_test
This is a minimalist version of fabric samples repository. This project extends the Fabcar chaincode in hyperledger fabric repository and uses Hyperledger Fabric 1.4.3 in the implemention.

**Prerequisites in accordance with hyperledger fabric v1.4 documentation** https://hyperledger-fabric.readthedocs.io/en/release-1.4/prereqs.html
1. curl latest version
2. docker version 17.06.2-ce or greater
3. docker compose version 1.14.0 or greater
4. golang version 1.11.x
5. nodejs version 8.x
6. npm version 5.x
7. python

'First network' in the fabric samples can be used to test the setting up of the fabric environment.

  cd fabric-samples/first-network   
  ./byfn.sh up
  
On successful execution, you'll see the below message
  
  ================ All GOOD , BYFN execution completed ===============
  
To clean the network  
  ```
  ./byfn down  
  docker rm $(docker ps -aq)  
  docker rmi $(docker images dev-* -q)  
  ```
  
  
  
## Implementation of the API Server to Interact with Chaincode
  
ExpressJS provides an easy way of API implementation. This project is aimed to build the followng APIs.

    GET /api/queryallcars
    
    GET /api/query/CarID
    
    POST /api/addcar/ with detail in body
    
    PUT /api/changeowner/CarID
 
Let rebuild a new environment by cleaning up the fabric network.  
```
  cd /fabric-samples/first-network  
  ./byfn.sh down  
 ```
Then we need to bring up the first network for Fabcar again.

  cd /fabric-samples/fabcar  
  ./startFabric.sh  
  
 After the first network is up and running, we'll open the apiserver directory in the fabcar and install the two packages for the ExpressJS.
 
  cd /fabric-samples/fabcar/apiserver
  npm init
  npm install express body-parser --save
 
 Then we'll remove the wallet and recreate the user1 certificate through registerUser.js.
 
  cd /fabric-samples/fabcar/apiserver
  rm -rf wallet
  node enrollAdmin.js
  node registerUser.js
  
  node apiserver.js
   
  
  
  
  








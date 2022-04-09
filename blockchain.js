const sha256 = require('sha256');
const currentNode = process.argv[3];

//Constructor
function Blockchain(){

    this.chain = [];
    this.pendingTransaction = [];
    this.createNewBlock(100,'0','0'); //genesis block

}

//Create New Block
Blockchain.prototype.createNewBlock = function(nonce, prevHash, hash){

    const newBlock = {

        index: this.chain.length + 1,
        timestamp : Date.now(),
        transactions : this.pendingTransaction,
        nonce: nonce,
        prevHash : prevHash,
        hash : hash,

    };

    //After creating a block.. we need to empty pending transaction array
    this.pendingTransaction = [];
    //need to push new block into the chain(Blockchain)
    this.chain.push(newBlock);

    return newBlock;

}

//Get last block
Blockchain.prototype.getLastBlock = function(){

    //Return the last block of the chain
    return this.chain[this.chain.length - 1];

}

//Create new transaction
Blockchain.prototype.createNewTransaction = function(amount, sender, recipent){

    const newTransaction = {

        amount : amount,
        sender : sender,
        recipent : recipent
    };

    //After getting a transaction.. we need to save it into pending txn array
    this.pendingTransaction.push(newTransaction);

    return this.getLastBlock()['index' + 1];

}

//Create hash for new block
Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce){

    //we will create hash with prevBlockHash + nonce + currentBlockData(Transactions) by using sha256
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString);
    return hash;

}

//Proof of work will provide a valid nonce
Blockchain.prototype.proofOfWork = function(prevBlockHash, currBlockData){

    let nonce = 0;
    let hash = this.hashBlock(prevBlockHash, currBlockData, nonce);

    //hashing validation condition
    while(hash.substring(0,4) !== '0000'){

        nonce++;
        hash = this.hashBlock(prevBlockHash, currBlockData, nonce);
    }

    console.log(hash);
    return nonce;
}

module.exports = Blockchain;
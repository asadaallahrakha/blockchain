const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const {v4: uuidv4} = require('uuid');
const bitcoin = new Blockchain();
const port = process.argv[2];

const nodeAddress = uuidv4().split('-').join('');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));

//This will give us complete blockchain
app.get('/blockchain',function(req, res){
    res.send(bitcoin);
});

//This is creating a new transaction
app.post('/transaction',function(req, res){
    
    const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    res.json({note: 'This transaction will be added in block ${blockIndex}'});

});

//Mine a new block
app.get('/mine',function(req, res){

    //get the last block
    const lastBlock = bitcoin.getLastBlock();
    
    //Get the prevHash from Last block
    const previousBlockHash = lastBlock['hash'];
    
    const currBlockData = {

        transactions: bitcoin.pendingTransaction,
        index: lastBlock['index'] + 1

    }

    //nonce
    const nonce = bitcoin.proofOfWork(previousBlockHash, currBlockData);

    //create hashBlock
    const hashBlock = bitcoin.hashBlock(previousBlockHash, currBlockData, nonce);

    //Giving reward to miner;
    bitcoin.createNewTransaction(0.5,"MINEMACHINE",nodeAddress);

    //To create newblock we require nonce, prevblockhash, hash
    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, hashBlock);

    res.json({
        note: "New block mined successfully",
        block: newBlock
    });

});


app.get('/wallet',function(req, res){
    res.sendFile(__dirname + "/wallet.html");
});

//Create new transaction from wallet
app.post('/wallet',function(req, res){
    
    const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.senderAddress, req.body.recipientAddress);
    res.json({
        note: 'This transaction will be added in block ${blockIndex}'
    });

});

app.listen(port, function(){
    console.log('Server is runing on port : ',port)
});
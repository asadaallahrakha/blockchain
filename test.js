const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

const prevBlockHash = "LKLKLKLKLKLKLKLKLKLKL";
const nonce = 123456;
const currBlockData = [

    {
        amount: 10,
        sender: "SASASASSASASASA",
        recipient: "OKOKOKOKOKOKO"
    },
    {
        amount: 50,
        sender: "SASASASSASASDDDDDDASA",
        recipient: "OKODDDDDDKOKOKOKOKO"
    }



]

//console.log(bitcoin.hashBlock(prevBlockHash, currBlockData , nonce));
//console.log(bitcoin.proofOfWork(prevBlockHash, currBlockData));

console.log(bitcoin);

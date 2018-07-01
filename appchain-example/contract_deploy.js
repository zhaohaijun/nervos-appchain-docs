// this is how you can deploy a contract with Nervos web3.js SDK

const NervosWeb3 = require('@nervos/web3');
const SERVER = 'http://localhost:8888';
const privkey = 'YOUR-PRIVATE-KEY';
var bytecode = 'CONTRACT-BYTECODE';

const web3 = NervosWeb3.default(SERVER);

const tx = {
    from: 'YOUR-PUBLIC-KEY',
    privkey: privkey,
    nonce: 'ELH1A3',
    chainId: 1,
    version: 0,
    value: 0,
    quota: 1000000
};

web3.cita.deploy(bytecode, tx).then(console.log);
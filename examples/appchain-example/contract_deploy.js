// this is how you can deploy a contract with Nervos.js SDK

const Nervos = require('@nervos/nervos').default;
const SERVER = 'http://localhost:8888';
const privkey = 'YOUR-PRIVATE-KEY';
var bytecode = 'CONTRACT-BYTECODE';

const nervos = Nervos(SERVER);

const tx = {
    from: 'YOUR-PUBLIC-KEY',
    privkey: privkey,
    nonce: 'ELH1A3',
    chainId: 1,
    version: 0,
    value: 0,
    quota: 1000000
};

nervos.appchain.deploy(bytecode, tx).then(console.log);

# web3-example
This is a simple example for you to learn how to deploy a contract and make a simple dapp on Neuron.

## Dependency
* [node](https://nodejs.org/en/download/package-manager/)
* [python](https://www.python.org/downloads/)

NPM is for install Nervos web3.js as well as all the other dependencies.
Python is for starting a local server to test our example.

## Usage
Clone the repo first
```
git clone https://github.com/CryptapeHackathon/Hackthon-web3-neuron-example.git
```

Get the dependecies, the web3.js we are using is `"@nervos/web3": "0.17.12"`
```
cd Hackthon-web3-neuron-example 
npm install
```

start a local service
```
python -m SimpleHTTPServer 3000
```

Visit it on Neuron: `http://YOUR-IP-ADDRESS:3000`, for example "http://192.168.2.239:3000"

For other information, refer [the document](https://cryptape.github.io/Nervos-AppChain-Docs/#/)
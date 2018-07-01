const server = 'http://localhost:8888'

function init() {

    const div = document.getElementById('info')
    
    // check if the web3 is injected
    console.log('Web3 exist :' + (typeof web3 !== 'undefined'))
    if (typeof web3 !== 'undefined') {  
      web3 = NervosWeb3(web3.currentProvider)
      console.log('Web Injected')
      div.innerHTML = 'Web Injected';
    } else {
      web3 = NervosWeb3(server)
      console.log('Web3 Initialized')
      div.innerHTML = 'Web Initialized';
    }

    // bind events with function
    const sendCITAButton = document.getElementById('send_cita')
    sendCITAButton.addEventListener('click', sendAppChainTransaction)

    // bind events with function
    const signButton = document.getElementById('sign')
    signButton.addEventListener('click', signTransaction)

}

//construct AppChain transaction structure
var tx_appchain = {
  to: '0x2cc18375F32a98EfC017D1dDEBCEBD6F9Ee75152',
  nonce: 100,
  quota: 100,
  data: '0x2cc18375F32a98EfC017D1dDEBCEBD6F9Ee75152',
  value: "10000000000000000000",
  chainId: 1,
  version: 0
}

// send AppChain transaction
function sendAppChainTransaction() {
  web3.eth.sendTransaction(tx_appchain, function(err, res){
    console.log(res)
  })
  
}


// callback
function cancelled() {
    console.log("transaction cancel");
}

// callback
function onSignSuccessful(hash) {
    console.log("transaction hash: " + hash);
}

// callback
function onSignFail(err) {
    console.log("transaction err: " + err);
}

// sign tx
function signTransaction() {
  web3.eth.signTransaction(tx_appchain, function(err, res) {
    if (!err) {
      console.log(res)
    }
  })
}




window.onload = init()

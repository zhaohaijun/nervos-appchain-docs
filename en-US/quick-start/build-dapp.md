# 完成一个DApp

这个将部分带你完成一个DApp，并让它运行在我们的手机钱包Neuron上。

本文档假设你已经有了一些简单的前端知识，包括基本的HTML和JavaScript。

## 配置manifest.json

在Neuron和AppChain上运行的DApp需要有一个manifest.json

## 示例代码

我们已经为上一节中我们部署的智能合约开发了一个前端示例，通过这个示例你可以了解到如何使用Nervos Web3 SDK完成与AppChain的交互。 完整的代码文件也可以在上一节中的代码包里找到。

### 引入 web3.js

首先需要引入`web3.js`文件和 `bignumber.js`文件。

    <script type="text/javascript" src="js/bignumber.js"></script>
    <script type="text/javascript" src="js/web3-light.js"></script>
    

### 设置参数

给出必需的参数

    //params to send transaction
    const privkey = '352416e1c910e413768c51390dfd791b414212b7b4fe6b1a18f58007fa894214';
    const quota = 999999;
    
    //deployed contract address
    var contractAddress = "0xc83e7e875dc8f3d09ca1af863ae142697fc37398";
    
    //AppChain address
    var chainAddress = "http://47.75.129.215:1337";
    
    //abi for deployed contract
    var abi = [{
            "constant": false,
            "inputs": [],
            "name": "getValue",
            "outputs": [{
                "name": "",
                "type": "string"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{
                "name": "str",
                "type": "string"
            }],
            "name": "setValue",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    

### 检测web3环境

检测web3实例是否已经存在。一般来说，DApp浏览器环境（如Neuron）会给DApp应用注入web3实例，并提供交易签名等方法。所以我们在这里检测环境中是否已经有了实例，如果没有则自己构建；如果已经存在，则使用DApp浏览器的web3实例。

    // check first if the web3 is available
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider(chainAddress));
    }
    

### 实现合约方法

实现getValue方法

    //get value from contract.
    function getValue() {
        if (contractAddress != undefined && contractAddress != "default") {
            var contract = web3.eth.contract(abi).at(contractAddress);
            contract.getValue.call(
                function (error, result) {
                    if (!error) {
                        console.log("result from contract: " + result);
                        document.getElementById("valueFromContract").value = result;
                    } else {
                        console.error("Cannot get value. Error: " + error);
                    }
                }
            )
        } else {
            console.err("Failed to get value: conrtact address is not correct.");
        }
    }
    

实现setValue方法。`validUntilBlock`是一个CITA独有的，非常先进的东西，具体请参考[这篇文章]()。`setValidUntilBlock`方法是用来获得块高度并设置`validUntilBlock`的，它的实现在上面的示例源文件中可以找到。

    //set value from contract.
    function setValue() {
        var valueToSet = document.getElementById("valueToContract").value;
        initBlockNumber(web3, function (params) {
            var commonParams = params
            var contract = web3.eth.contract(abi).at(contractAddress);
    
            var result = contract.setValue(
                valueToSet, {
                    ...commonParams,
                    from: "0dbd369a741319fa5107733e2c9db9929093e3c7"
                }
            );
            console.log("result of setValue " + result);
        })
    }
    

`DAPP` 发起交易并交由 `Neuron` 钱包的本地私钥签名，并最终由钱包将交易发至链上，发送交易的结果会通过以下三个回调方法通知 `DAPP` 。

    cancelled()                  // 交易取消
    onSignSuccessful(hexHash)    // 交易成功，并返回交易hash
    onSignFail(errMessage)       // 交易失败，并返回失败错误信息
    

## 测试DApp

我们可以通过使用python在本地启动一个简单的http服务，并使用Neuron来访问这个DApp。Python的安装请参照[Python网站](https://www.python.org/downloads/)。

    python -m SimpleHTTPServer 3000
    

查看一下自己本机的ip，并打开Neuron，在浏览器页面输入地址，如`http://192.168.2.239:3000`。这个
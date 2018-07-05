# 部署一个智能合约

Nervos AppChain 完全支持以太坊的开发生态，包括使用[Solidity语言](http://solidity.readthedocs.io/en/latest/)来开发智能合约，以及相关的开发工具。除此之外，AppChain 还支持使用Go语言和Rust语言来开发智能合约，详情请参照[智能合约开发文档](zh-CN/smart-contract/intro.md)。

这篇文档将会带你使用Solidity完成一个智能合约，并将它部署到我们的[XXX测试链](zh-CN/quick-start/deploy-appchain.md#测试链)上。

> 如果你想自己搭一条AppChain来测试合约，请参照[搭建一条AppChain]()。

我们给出了[一个简单的示例](https://github.com/cryptape/Nervos-AppChain-Docs/tree/master/appchain-example)，衷心的希望通过这个示例，你能了解到合约和DApp的开发流程。

## 编写智能合约

我们下面给出一个简单的智能合约的示例

    pragma solidity ^0.4.19;    //声明solidity的版本
    
    contract HelloWorld {       //创建一个合约
        address owner;
        string value;           //声明一个字符串变量
    
        //实现合约构造函数
        constructor() public {
            owner = msg.sender;
            value = "Hello World!";
        }
    
        //实现一个获得value值的接口
        function getValue () public constant returns (string) {
            return value;
        }
    
        //实现一个设置value值的接口
        function setValue (string str) public {
            value = str;
        }
    
    }
    

将上面的代码存为一个`HelloWorld.sol`文件。

上面的这个合约实现了最简单的功能，即使用一个字符串变量来存储一段字符串"Hello World!"，并实现了两个接口来读取和更改这个变量。在[完成一个DApp]()文档中，我们将给出如何在你的前端代码里调用合约的办法。

## 安装Solidity编译器

我们这里使用npm来安装`solcjs`来在本地编译，也可以使用以太坊的[Remix](https://remix.ethereum.org/)等工具来进行合约开发。

    sudo npm install -g solc
    

使用下面的命令来检查版本号

    solcjs --version
    

如果遇到问题或需要更多信息，请参照[以太坊的Solidity文档](https://solidity.readthedocs.io/en/v0.4.24/installing-solidity.html)。

## 编译合约

接下来对上面的合约进行编译。

    solcjs --bin --abi HelloWorld.sol
    

编译成功会生成二进制码文件`HelloWorld_sol_HelloWorld.bin`和ABI文件`HelloWorld_sol_HelloWorld.abi`。

## 部署合约

接下来将合约部署到 AppChain 上。

> 部署合约的过程实际上分为下面几个步骤： * 将上面得到的二进制码和ABI作为交易的信息来构造一个区块链交易 * 使用你的私钥来对这个交易进行签名 * 将交易发送到运行区块链的节点，由该节点处理再广播到全网。

一般来说我们有两种方式来与AppChain交互：使用[Json-RPC接口]()，或使用将JSON-RPC封装后得到的[Nervos Web3 SDK]()。下面我们使用SDK的方法部署合约

打开`deploy_contract.js`，首先设置参数

    const NervosWeb3 = require('@nervos/web3');
    const SERVER = 'http://IP-ADDRESS:1337';
    const privkey = 'YOUR-PRIVATE-KEY';
    var bytecode = 'CONTRACT-BYTECODE';
    

然后在使用node环境运行脚本

    node contract_deploy.js
    

成功之后可以得到以下信息

    ...
    contractAddress: '0x3cd5e37659be23016cbbfe3dc77e5838051b5e36',
    ...
    

这个就是你的合约地址，接下来使用这个合约地址和ABI，你可以在Neuron实现对合约方法的调用。

* * *

到这里我们就已经在 AppChain 上成功部署了一个智能合约。你可以读取和修改它里面的变量，也可以进一步通过修改合约实现更加复杂的规则和运算等。

> 这看起来与普通服务器一样，但其实略有不同：这个世界上将不会有任何人有办法来修改你的这份合约，包括你自己（但你可以对合约进行升级）；任何人都可以看到你的这份合约的内容，也可以使用你的这份合约，包括它里面存储的数据，除非你另外进行限制。

更多关于智能合约的信息请参考[智能合约文档](/zh-CN/smart-contract/intro.md)。
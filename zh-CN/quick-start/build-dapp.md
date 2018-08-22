# 在 AppChain 上完成第一个应用

本文档将带你完成一个Nervos AppChain DApp，并让它运行在我们的手机钱包 Neuron 上，由于 H5 DApp 也可以独立运行在 PC 或者手机浏览器中，但是需要在 H5 中嵌入私钥，很不安全。
所以本文档讨论的是如何在手机钱包 Neuron 中开发 DApp ，签名过程由 Neuron 钱包保存的私钥来完成。

> 注：目前 Neuron 钱包只有 Android 版本，iOS 版钱包还在紧张开发中...

DApp 全称 Decenteration App, 中文翻译为去中心化应用，有别于现有互联网应用，DApp 增加了智能合约和链上数据交互的逻辑，简单来说，DApp 就是现有的互联网服务加上智能合约。
所以要开发一个完整的 DApp, 大致需要三个步骤：

1. 开发前端应用，如果需要中心化服务存储业务数据的话，还需要自行搭建后端服务，目前前端应用更多的是H5，手机App还不是很多，所以本文会重点介绍H5应用；
2. 编写智能合约，智能合约包含了链上处理业务的所有逻辑，相当于在区块链 AppChain 上建立私有服务；
3. 打通前端应用与链上智能合约的数据交互。

为了方便接下来的讲述，这里稍微介绍一下前端应用与区块链（这里主要是指 AppChain ）的交互逻辑，通常来说我们会将一些需要长久保存或者多人共识的数据保存在区块链上，链上数据存储本质上
是在发送交易，业务数据被包含在特定的交易字段中，每一笔交易都是需要入块并共识的，所以通常需要等待一段时间。而读取数据只需要调用 Http RPC 请求即可，并不需要入块共识，所以可以很快
获取到结果。

区块链交易都是需要私钥签名的，而出于安全性考虑，私钥只会保存在钱包中，不会保存在 DApp 中，所以就需要钱包协助 DApp 签名，如果使用过 MetaMask 可能会有比较直观的感受，当你在需要购买
加密猫时，会自动唤起 MetaMask，同样的，当你在手机上使用 AppChain DApp 时，也会唤起手机原生的签名支付页面，而要实现这一点，目前通行的方案是手机钱包拦截 DApp 的发交易请求，待签名
完成后，再转发到相应的区块链上，完成最终的交易。

好了，基础知识就先介绍到这里，接下来我们正式开始讲述 DApp 开发流程。

本文档假设你已经有了一些简单的前端知识，包括基本的 HTML 和 JavaScript ，所以我们不会花费太多的篇幅介绍前端基础开发上。

## 前端开发

### 引入Nervos.js

前端开发大部分的业务流程跟现有的互联网产品开发完全相同，唯一不同的地方就是跟区块链数据交互的逻辑，不过不用担心，我们已经提供了相应的 SDK nervos.js，你只需要调用相应的方法即可。

在正式开发前，你需要在工程中引入 SDK nervos.js 通过访问 [@nervos/chain](https://www.npmjs.com/package/@nervos/chain) ，你可以在 package.json 文件中指明 nervos 
依赖版本 `"@nervos/chain": "^0.17.10"`，然后执行 `npm install` 或者 `yarn install`, 当然也可以在命令行中直接执行 `yarn add @nervos/chain`。

引入 `nervos.js` 后，未来所有跟链交互都会通过 nervos 实例完成，我们建议在一个单独的文件中完成所有 nervos 相关的配置，示例代码如下：

```javascript
    const { default: Nervos } = require('@nervos/chain')            // 引入 Nervos 实例

    const config = require('./config')

    if (typeof window.nervos !== 'undefined') {                     // 检测当前浏览器环境 window 中是否有 nervos 实例，如果有的话，用window.nervos 中的currentProvider 实例化 Nervos
        window.nervos = Nervos(window.nervos.currentProvider);
        window.nervos.currentProvider.setHost("localhost:1337");    // 由于存在多链的情况，需要 DApp 指明当前 AppChain 的节点IP地址信息，对于单链 DApp 只需要指定一次即可。
    } else {
        console.log('No nervos? You should consider trying Neuron!')// 如果当前浏览器环境 window 中没有 nervos 实例，则需要手动提供节点IP地址，并完成实例化
        window.nervos = Nervos(config.chain);
    }
    var nervos = window.nervos

    module.exports = nervos
```
> 注：这里需要说明一点，为什么需要检测浏览器环境、`window` 中是否有 `nervos` 实例。主要是为了实现钱包拦截 DApp 发送的交易请求，通常钱包会往浏览器环境中注入 js 代码，同时在 `window` 中提供 `nervos` 实例，而改用 
`window.nervos.currentProvider` 初始化 Nervos 是为了方便钱包做请求拦截。

我们还特意开发了一个示例 DApp [First Forever](https://github.com/cryptape/dapp-demos/tree/neuron/first_forever) 供开发者学习。

### 配置 manifest.json 

由于 AppChain DApp 支持多链，所以需要 DApp 开发者提供一个配置文件 `manifest.json`， 该配置文件会包含 DApp 运行在哪些链上，以下是 `manifest.json` 的
示例：

```javascript
{
    "name": "Nervos First App",                                 // DApp 名称
    "blockViewer": "https://etherscan.io/",                     // 相应区块链浏览器的地址
    "chainSet": {                                               // DApp 所在链的信息集合
      "1": "http://121.196.200.225:1337"                        // key: chainId  value: 节点 host
    },
    "icon": "http://7xq40y.com1.z0.glb.clouddn.com/23.pic.jpg", // DApp 图标
    "entry": "index.html",                                      // DApp 入口地址
    "provider": "https://cryptape.com/"                         // DApp 提供者
}
```
从 `manifest.json` 文件可以看出，我们是通过 `chainSet` 的方式来展示多链信息，我们建议将 `mainfest.json` 文件放到根目录，然后在 html 文件中声明 `mainfest.json` 的文件路径，示例如下：

```javascript
<link rel="manifest" href="%PUBLIC_URL%/manifest.json">
```

钱包 Neuron 会读取 DApp 的 `mainfest.json` 文件，作为识别 DApp 发送到哪条 AppChain 的依据，简单来说，AppChain 的每一笔交易数据中都会包含 `chainId` ，Neuon 根据 `chainId` 决定发送到那个节点 IP 地址。

## 智能合约

AppChain 的 EVM 是完全兼容以太坊的，所以只要是能在以太坊跑通的智能合约都可以直接移植到 AppChain，目前以太坊上主流的智能合约开发语言是 Solidity，下面我们以一个简单存储 
[SimpleStore](https://github.com/cryptape/dapp-demos/blob/develop/first-forever/src/contracts/SimpleStore.sol) 合约为例，介绍一下智能合约从编写、部署
到调用的详细过程。

Solidity 合约文件如下：

```solidity
pragma solidity 0.4.24;

contract SimpleStore {
    mapping (address => mapping (uint256 => string)) private records;
    mapping (address => uint256[]) private categories;

    event Recorded(address _sender, string indexed _text, uint256 indexed _time);

    function _addToList(address from, uint256 time) private {
        categories[from].push(time);
    }

    function getList()
    public
    view
    returns (uint256[])
    {
        return categories[msg.sender];
    }

    function add(string text, uint256 time) public {
        records[msg.sender][time]=text;
        _addToList(msg.sender, time);
        emit Recorded(msg.sender, text, time);
    }
    function get(uint256 time) public view returns(string) {

        return records[msg.sender][time];
    }
}
```

这个合约逻辑很简单，主要包含了三个对外方法，一个 `add` 方法，用来往链上存储文字和时间戳信息，一个 `get` 方法，用来根据时间戳信息获取链上文字信息，最有一个是 `getList` 方法，用来获取当前地址下的所有历史存储信息。
合约文件相当于在 AppChain 上建立自己的服务，业务逻辑和方法完全自定义，`SimpleStore` 相当于在 AppChain 建立一个数据库，并且对外提供了三个可用的方法。

由于兼容以太坊的 EVM ，故而合约编写、编译和调试可以直接使用 [remix](https://remix.ethereum.org/)。

![remix](https://cdn.cryptape.com/docs/images/remix_detail.png)

这里的 `bytecode` 和 `abi` 接下来会用到，我们姑且将其放入 [compiled.js](https://github.com/cryptape/dapp-demos/blob/develop/first-forever/src/contracts/compiled.js) 文件中。

部署合约可以使用我们官方提供的 AppChain-Truffle-Box，详细的部署方式可以参考 [AppChain-Truffle-Box](https://github.com/cryptape/appchain-truffle-box/blob/master/README.md) 文档。

部署成功后，会得到合约地址 `contractAddress`。

## 前端应用与智能合约的数据交互

为了方便调用合约方法，我们首先需要根据 `bytecode` 和 `abi` 来构造 `Contract` 实例，我们以 [First Forever](https://github.com/cryptape/dapp-demos/tree/neuron/first_forever) 为例：

```javascript
const nervos = require('./nervos')
const { abi } = require('./contracts/compiled.js')
const { contractAddress } = require('./config')

const transaction = require('./contracts/transaction')
const simpleStoreContract = new nervos.appchain.Contract(abi, contractAddress)      // 根据 bytecode 和 abi 实例化 SimpleStore 合约对象
module.exports = {
  transaction,
  simpleStoreContract,
}
```

上文提到了合约中包含 `add` 和 `getList` 两个方法，那么我们就来详细介绍一下如何在 js 文件中调用这两个方法。我们还是以[First Forever](https://github.com/cryptape/dapp-demos/tree/neuron/first_forever) 为例：

在示例工程中 `src/containers/Add/index.jsx`

```javascript
handleSubmit = e => {
  const { time, text } = this.state
  nervos.appchain
    .getBlockNumber()
    .then(current => {
      const tx = {
        ...transaction,
        validUntilBlock: +current + 88,         // AppChain 交易数据结构中需要用到当前块高度
      }
      this.setState({
        submitText: submitTexts.submitting,
      })
      return simpleStoreContract.methods.add(text, +time).send(tx) // 执行合约中的 add 方法
    })
    .then(res => {
      if (res.hash) {
        return nervos.listeners.listenToTransactionReceipt(res.hash)    // 数据上链后需要经过至少3S（出块时间为3S）的入块共识，需要监听入块事件
      } else {
        throw new Error('No Transaction Hash Received')
      }
    })
    .then(receipt => {
      if (!receipt.errorMessage) {
        this.setState({ submitText: submitTexts.submitted })
      } else {
        throw new Error(receipt.errorMessage)
      }
    })
    .catch(err => {
      this.setState({ errorText: JSON.stringify(err) })
    })
}
```
由于调用合约的 `add` 方法本质上在向 AppChain 发送交易，而且 `add` 方法需要更改链上数据，所以需要上链共识。

关于 AppChain 交易参数的详细介绍可以参考 [CITA官方文档](https://docs.nervos.org/cita/#/rpc_guide/rpc?id=sendrawtransaction)

添加过数据后，就可以通过调用 `getList` 方法验证数据是否添加成功，示例代码如下：

`src/containers/List/index.jsx`：

```javascript
componentDidMount() {
  const from = window.neuron.getAccount()           // 当前账号由 Neuron 钱包提供
  simpleStoreContract.methods
    .getList()
    .call({
      from,
    })
    .then(times => {
      times.reverse()
      this.setState({ times })
      return Promise.all(times.map(time => simpleStoreContract.methods.get(time).call({ from })))  // 只读接口不需要入块共识，所以请求返回值就是需要的数据
    })
    .then(texts => {
      this.setState({ texts })
    })
    .catch(console.error)
}
```

这样就完成了一个简单的 DApp，从前端页面开发，到智能合约编写和部署，再到前端和 AppChain 数据交互，部署到服务器上，在手机钱包 Neuron 输入地址即可访问。

此文档只是抛砖引玉，希望你能发挥创造力，做出一个改变世界的产品。

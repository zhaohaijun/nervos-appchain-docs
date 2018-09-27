# DApp 开发

## 准备工作

在进行 DApp 开发之前，我们需要先拥有一个 AppChain 上的账户，并为该账户充入一些测试币来进行交易和合约部署调用等操作。

### 如何获得 AppChain 上的账户地址和私钥

Nervos AppChain 的账户系统与以太坊完全一致，用户可以选择直接使用以太坊上的账户。如果没有以太坊账户可以选择通过以下方式获得一个账户：

* 使用在线工具 [MyEtherWallet](https://www.myetherwallet.com/) 创建一个账户（推荐）
* 使用 [CITA-CLI](https://github.com/cryptape/cita-cli) 工具创建一个账户

?> 同一个 AppChain 账户可以在不同的 AppChain 上使用；但是同一个账户在不同 AppChain 上所拥有的资产是不一样。这类似于您在以太坊测试链上获得的测试币，并不代表你在以太坊主链上获得了同样多的以太币。

### 如何获得测试币

如果使用的是我们的 [AppChain Testnet](quick-start/deploy-appchain.md#测试链) ，可以通过[水龙头（faucet）](quick-start/deploy-appchain.md#水龙头)来获取测试币。

如果是使用本地部署的 AppChain，则可以选择从共识节点的账户中来转出一些代币。关于共识节点的账户信息如何获取，可以参考[链的配置文档](https://docs.nervos.org/cita/#/chain/config_tool?id=setup)。

<!-- ## DApp 开发流程简介 -->

## AppChain 开发

AppChain 上的 DApp 开发与以太坊（Ethereum）上的 DApp 开发基本一致。参考阅读里面我们提供了一些以太坊上的 DApp 的开发教程。 同时我们也提供了一些 [demo 和教程](#Demo-和教程) 来帮助你开始 AppChain 上的 DApp 开发。这里我们列出了一些 AppChain 开发中所必备的知识。

### 智能合约开发

AppChain 上的智能合约开发支持使用以太坊的 [Solidity](https://en.wikipedia.org/wiki/Solidity) 语言和 CITA 的原生开发语言 Rust。

使用 Solidity 语言在 AppChain 上进行合约开发与在以太坊上进行合约开发完全一致。可以参考[ Solidity 官方文档](https://solidity.readthedocs.io/en/v0.4.25/)和网上其他资料进行学习。在开发的时候可以使用 [Remix](https://remix.ethereum.org/) 进行合约调试。（暂时不能直接进行合约部署，相关解决方案正在开发中）

Rust 语言的智能合约一般用来开发[系统合约](https://docs.nervos.org/cita/#/chain/config_tool?id=%E7%B3%BB%E7%BB%9F%E5%90%88%E7%BA%A6)。我们也提供了一篇简单的教程来讲解如何[开发一个 Rust 的智能合约](https://github.com/cryptape/dapp-demos/tree/develop/rust-contract)。

使用

?> 目前支持的 Solidity 版本可以参考 [测试链信息](quick-start/deploy-appchain.md#测试链)

<!-- 这里未来可以补充一个表，用来放哪个版本的 CITA 支持哪个版本的 solidity -->

### AppChain 交易的结构

| **名称**            | **类型** | **必需**       | **描述**                                                                                                                                                                                    |
| ----------------- | ------ | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `from`            | string | 是            | 交易的发送方的地址                                                                                                                                                                                 |
| `to`              | string | 是，创建合约的时必需为空 | 交易的接收方的地址                                                                                                                                                                                 |
| `privateKey`      | string | （见下面解释）      | 对交易进行签名的私钥                                                                                                                                                                                |
| `nonce`           | int    | 是            | 交易 nonce，[详见 FAQ](https://docs.nervos.org/cita/#/reference/faq?id=%E4%BA%A4%E6%98%93%E4%B8%AD%E7%9A%84nonce%E7%9A%84%E4%BD%9C%E7%94%A8%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F)               |
| `quota`           | int    | 是            | 交易花费的费用，[详见 FAQ](https://docs.nervos.org/cita/#/reference/faq?id=%E4%BA%A4%E6%98%93%E4%B8%AD%E7%9A%84quota%E7%9A%84%E4%BD%9C%E7%94%A8%EF%BC%9F)                                           |
| `chainId`         | int    | 是            | 链的 ID                                                                                                                                                                                     |
| `version`         | int    | 是            | 链的版本？                                                                                                                                                                                     |
| `validUntilBlock` | int    | 是            | 该交易的有效区块高度，[详见 FAQ](https://docs.nervos.org/cita/#/reference/faq?id=%E4%BA%A4%E6%98%93%E4%B8%AD%E7%9A%84valid_until_block%E6%98%AF%E4%BD%9C%E7%94%A8%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F) |
| `value`           | string | 是            | 该交易所转的币的数量                                                                                                                                                                                |
| `data`            | string | 是            | 该交易所包含的 data 信息                                                                                                                                                                           |

关于 `privateKey` 字段如何填写,首先看是否有钱包环境:  
如果有钱包环境，交易结构体里面 **不能加** `privateKey` 字段（会被 SDK 签名而不是被钱包签名）  
如果没有钱包环境，则可以通过以下两种方式来选择签名使用的私钥

1. 在交易结构体里面加入 `privateKey` 字段
2. 在 SDK 的 account 里面加入一个账户

!> 发送交易时，SDK 优先使用交易结构体里面的私钥进行签名

### DApp 的 manifest.json 文件

Nervos AppChain 是一个所有人可以用来做自己的一条 AppChain 的一个开源项目，这就意味着会有很多条 AppChain 同时存在，承载不同的业务。同时也意味着一个 DApp 可能会同时使用多条 AppChain 上的资产来实现一些功能。所以，为了让 DApp 的运行环境（钱包环境）知道该 DApp 要使用哪些 AppChain 上的资产，需要使用一个 `manifest.json` 文件来对 DApp 将要使用的链进行配置。除了对多链的配置以外，`manifest.json` 还包括了一些对 DApp 本身的配置。具体协议请参考\[多链协议\](miscellaneous/multichain.md#dapp-ui-与终端钱包握手)。在 Demo First Forever 里面我们给出了一个 manifest 文件的[示例](https://github.com/cryptape/dapp-demos/blob/master/first_forever/public/manifest.json)。

## Demo 和教程

我们准备了以下 demo 来帮助你入门在 AppChain 上的开发。每一个 demo 的 readme 里面都有对应的教程。所有 demo 的源文件都这个 [GitHub 仓库](https://github.com/cryptape/dapp-demos/tree/master)里。

* [First Forever](https://github.com/cryptape/dapp-demos/tree/master/first_forever)  
    一个带你从零开始学习 AppChain DApp 开发的小 demo
* [NervosAPI](https://github.com/cryptape/dapp-demos/tree/master/nervos-api)  
    一个包含了 SDK `nervos.js` 所有方法的 demo 页面。
* [Token Factory](https://github.com/cryptape/dapp-demos/tree/master/token-factory)  
    一个从以太坊移植到 AppChain 上的 DApp。
* [Pet-Shop](https://github.com/cryptape/dapp-demos/tree/release/pet-shop) 一个使用 AppChain Truffle Box 实现的 Pet-Shop demo。
* [Rust Contract](https://github.com/cryptape/dapp-demos/tree/develop/rust-contract)  
    一个用 Rust 编写智能合约的简单教程

## 参考阅读

* Truffle Box 官方文档：https://truffleframework.com/docs/truffle/overview
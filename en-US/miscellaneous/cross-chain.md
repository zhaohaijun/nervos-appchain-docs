# 跨链资产流转

## 简介

作为应用链解决方案， Nervos AppChain 保持了与以太坊生态的最大兼容性。但是其资产的跨链流转仍然属于核心待解决的问题。目前跨链资产流转一般有哈希锁定、去中心化 Relay、Merkle Tree 证明、中心化跨链等多种方式。考虑到系统的简洁性，建议 Nervos AppChain 运营方采取中心化跨链的模式进行跨链资产流转。

## 数字资产流入

以太坊上的原生代币 ETH 或 ERC20/ERC721 资产流入为例。运营方在以太坊主网上设定接受地址，引导用户在 H5 DAPP 页面支付（转账）。用户选择后，页面将唤起 Neuron 钱包对以太坊主网上的转账交易进行签名（假设用户在 Neuron 钱包中已经保存了足量的以太坊主网资产）。

待交易广播、确认后，运营方在 Nervos AppChain 链上将对应的数字资产转账给用户的支付地址。例如，用户充值1eth，在 Nervos AppChain 链上获得1000个游戏金币。

## 电子法币流入

作为中心化跨链模式，电子法币的流入与数字资产流入并无本质区别。开发者可以在 H5 DAPP 网页中嵌入微信、支付宝或现在支付等第三方支付 SDK。用户唤起支付工具，支付成功后运营方在 Nervos AppChain 链上将对应的数字资产转账给用户的支付地址。

## 场外交易

作为区块链资产， Nervos AppChain 上的数字资产天然支持 C2C 交易。因此每一个 Nervos AppChain 链都会形成场外市场，以满足用户的流动性需求。
# Nervos Multichain RFC

**version: 0.1(draft)**

## 概述

Nervos区块链网络由任意多条分散运营的区块链构成，只有这些链符合相同的资源访问协议才能方便开发者和用户安全便捷地访问链上资源。

## 角色

**AppChain**：高性能、弱去中心化应用区块链，整个网络中有任意多条；

**Hub**：多链注册中心，由AppChain运营者**自愿**公开链信息，便于DApp开发者访问，不在Hub上公开的AppChain也可以正常运行和访问；

**DApp**：包括部署在一条或多条AppChain上的智能合约和便于用户访问的UI界面，后者一般以H5形式实现；

**终端钱包**：由终端用户使用，管理**所有****AppChain**上的数字资产，并支持DApp唤起钱包进行数字签名。

## 关系

* 每一条AppChain需要定义自己的chainID以区分其他AppChain；
* AppChain需要对外提供自己的节点、原生代币、签名算法等基本信息；
* DApp需要告诉终端钱包自己所在的AppChain的相关信息；
* 终端钱包需要针对不同的AppChain的要求进行对应的签名操作、交易隔离、交易发送、交易查询等业务；
* Hub用来登记各种AppChain的信息，便于DApp开发者选择执行环境，并防止chainID冲突。

## 协议内容

### AppChain与终端握手

由AppChain的RPC服务提供函数**getMetaData()**，可以由终端钱包或DApp调用。返回值为json，内容包括：

| **Name**       | **Type**      | **Description**  |
| -------------- | ------------- | ---------------- |
| chain-id       | uuid/128      | 链的唯一地址，建议运营方随机生成 |
| chain-name     | utf8/32       | 链名称              |
| operator       | utf8/128      | 运营方描述            |
| website        | url           | 官方网站             |
| genesis-time   | timestamp     | 创世块时间            |
| validators     | address array | 记账节点外部账户地址列表     |
| block-interval | uint          | 区块产生间隔时间         |

### DApp UI与终端钱包握手

开发者制作DApp的H5 UI中，需要内嵌**manifest 文件**，以便告知本地钱包其访问区块链的情况和用到的数字资产情况。本地钱包将自动识别相应的数字资产，并将其加入资产列表中。

```json
{
    "shortName": "Demo",
    "name": "Cryptape DApp Demo",
    "chainId": "1000",
    "httpProvider": "http://47.97.108.229:1337",
    "blockViewer": "https://etherscan.io/",
    "networkId": "N/A",
    "icon": "http://7xq40y.com1.z0.glb.clouddn.com/23.pic.jpg",
    "entry": "index.html",
    "provider": "Cryptaper"
}
```

其中，manifest文件的path应该在html中给出：

```js
<link rel="manifest" href="/manifest.json">
```

### DApp调用SDK

打开DApp页面后，Neruon会自动注入web3对象，DApp应该采用如下方法实现交易签名申请：

```js
nervos-web3.sendTransaction(transactionObject [, callback])
```

其中transactionObject中增加chainId对象，用户终端拦截调用请求后找到预先保存的chainId与httpProvider的关系，将签名后交易发送到对应的服务上。

### Hub注册

暂缺

## 完整流程

1. 用户在终端钱包打开DApp网页；
2. 终端钱包分析HTML文件，找到manifest文件并解析；
3. 终端钱包为网页注入web3对象；
4. DApp网页调用web3.sendTransaction函数唤起终端钱包签名；
5. 用户确认签名；
6. 终端钱包将签名结果返回DApp网页，同时将签名内容发送到manifest指示的httpProvider接口
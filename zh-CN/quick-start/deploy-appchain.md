# 部署一条 AppChain

在开始正式开发AppChain DApp之前，我们需要先有一条AppChain。可以从以下方案中进行选择：
* [测试链](#测试链)
* [使用华为云一键部署](#华为云一键部署)
* [使用万云 BaaS 服务](#万云BaaS服务)
* [自行部署](https://docs.nervos.org/cita/#/chain/getting_started)


## 测试链

如果你是普通的开发者，自己并不想运行一条链，我们推荐使用我们已经部署好的测试链 Nervos AppChain Testnet。  
该测试链由4个节点组成，各节点的 ip 地址和端口如下：

```
node 1: 121.196.200.225:1337 //或者通过域名访问： https://node.cryptape.com
node 2: 116.62.221.89:1338  
node 3: 47.96.84.91:1339  
node 4: 121.43.163.31:1340  
```

测试链的内核 CITA 的版本为 `v0.17`，目前支持的 Solidity 智能合约版本为 v0.4.24。

> **给节点设置域名并加上 https 证书是必要的！**比如上述的 `node 1` 可以通过域名 https://node.cryptape.com 来访问。这是因为如果我们希望使用 https 协议来访问某个基于 AppChain 的前端服务，我们就需要给它使用了的后端服务同样加上证书。这就需要我们给 AppChain 的节点也设置域名并加上 https 证书。我们建议您在部署自己的 AppChain 时也给只读节点或记账节点给予证书。


#### 区块链浏览器

我们官方运行的区块链浏览器地址为：https://microscope.cryptape.com

浏览器默认是从我们的测试链上获取数据，如果想要切换到其他 AppChain 上，可以点开右上角链信息按钮，找到“其他链”输入框，输入测试链的节点地址进行切换。

!> 如果链接的是链节点而不是对应的缓存服务器，Microscope 的部分功能无法使用。

#### 缓存服务器

我们官方运行的缓存服务器的地址为：https://microscope.cryptape.com:9999

目前部署的这个服务器主要为我们的 Microscope 提供数据缓存服务，对接上面提到的测试 AppChain Testnet。

具体的部署方法和使用方法请参考 [ReBirth GitHub](https://github.com/cryptape/re-birth)。

#### 水龙头

测试链的水龙头的地址为：https://dapp.cryptape.com/faucet/

可以在这里领取 AppChain Testnet 的代币。

使用浏览器或我们的 Neuron 访问页面，即可领到测试链上的原生代币 NOS。它可以用来支付交易费，进行合约的部署和调用等操作。

## 华为云一键部署

目前一键部署的功能为，通过使用部署模板，用户只需输入必要的配置参数，即可一键部署一条至少4个node 的 AppChain。

#### 准备工作

用户已经在华为云官网注册。并且已经账户充入一定的资金。

>**关于密钥对**  
若用户之前没有创建过密钥对，则应先在“示例模板>示例模板详情”的“模板概述”中按提示创建一个密钥对。  
若已经有密钥对，则进入示例模板详情页面，然后“创建堆栈”，按页面提示一步步输入配置信息并最终创建堆栈。

#### 操作步骤

1. 进入 Nervos AppChain 模版页面

首先进入华为云控制台页面：https://console.huaweicloud.com/

在导航栏**服务列表**菜单中，找到**应用编排服务**。在**模板市场**页面中，找到模版**一键部署Nervos AppChain区块链 (nervos)**。

![step 1](../../_media/huawei/image01.png)

2. 点击“创建堆栈”，

其中，token_avatar为代币图标，应输入图标所在的url链接。

![step 2](../../_media/huawei/image02.png)
3. 点击下一步，

![step 3](../../_media/huawei/image03.png)
输入资源配置的相关参数。如下图：

一个用户用同一个模板在一个区域（见下图第一个参数“集群可用区”）只能部署一个链。

另外,第一次操作时用户没有sshkey，需要先生成sshkey.

Cce_node_flavor为节点的规格，指CPU和内存规格。如4核8G，8核16G，16核32G。

Cita_sfs_size为节点的硬盘大小。

Eip_bandwidth为节点的带宽。

您可根据您的具体要求输入配置。也可以参考我们的推荐配置来输入：

|参考性能（TPS）	|云主机个数	|节点个数	|CPU和内存	|每台带宽(Mbps)	|
|---	|---	|---	|---	|---	|
|1500	|4	|4	|4核8G	|10	|
|3900	|4	|4	|8核16G	|20	|
|15000	|4	|4	|32核64G	|100	|

![step 4](../../_media/huawei/image04.png)
点击“下一步”。显示，

![step 5](../../_media/huawei/image05.png)
点击创建堆栈，页面显示创建进度，最后完成。

生成sshkey的步骤为,返回到第一个页面，如下图，找到“这里”，并点击

![step 6](../../_media/huawei/image06.png)
点击后显示：

![step 7](../../_media/huawei/image07.png)
点击“创建密钥对”，

![step 8](../../_media/huawei/image08.png)
点击“确定”。

![step 9](../../_media/huawei/image09.png)
密钥文件下载到本地。

## 万云Baas服务

1. 打开万云主页：https://www.wancloud.io/

并登陆（没有注册的用户需要先注册再登陆）。

2. 在“极速万云”下拉菜单中，直接找到“Nervos AppChain” （或者，可以先点击“极速万云”，然后点击“公链”，然后找到Nervos AppChain）

![step1](../../_media/wanyun/image01.png)

3. 点击上一步中的“Nervos AppChain”，页面显示Nervos Appchain的介绍页面，如下：

![step2](../../_media/wanyun/image02.png)

其中接入地址即链的访问地址：http://nervosappchain-api.wancloud.io/， 端口号为默认值80

接口调用举例说明：

（查询有几个节点：）


`$ curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}' http://nervosappchain-api.wancloud.io/`

其他命令请查看[相关API文档](https://docs.nervos.org/cita/#/rpc_guide/rpc)

4. 点击“本地搭建”或“相关文档”，页面显示相关文档，及组件的链接（即将上线）

![step3](../../_media/wanyun/image03.png)

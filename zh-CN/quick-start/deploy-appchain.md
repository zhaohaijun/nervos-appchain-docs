# 部署一条 AppChain

在开始正式开发AppChain DApp之前，我们需要先有一条AppChain。而这条开发用的AppChain可以通过以下方法获得：
* 测试链
* 

# 测试链

我们提供一条已部署好的测试链Nervos AppChain Testnet给大家使用，链信息如下：

`47.94.105.230:1337`


# 华为云一键部署操作指南

**操作目的**

目前一键部署的功能为，通过使用部署模板，用户只需输入必要的配置参数，即可一键部署一条至少4个节点的chain。

**操作前提**

用户已经在华为云官网注册。并且已经账户充入一定的资金。

**关于密钥对**

若用户之前没有创建过密钥对，则应先在“示例模板>示例模板详情”的“模板概述”中按提示创建一个密钥对。

若已经有密钥对，则进入示例模板详情页面，然后“创建堆栈”，按页面提示一步步输入配置信息并最终创建堆栈。

**具体步骤为**

1. 点击链接：在官网点击链接：….//todo

[_https://console.huaweicloud.com/aos/?region=cn-north-1#/app/demoTemplate/demoDetail?id=9a9d736e-851b-91d2-e06f-25269d9ffe2a_](https://console.huaweicloud.com/aos/?region=cn-north-1)
[Image: https://cryptape.quip.com/-/blob/TQIAAAmwhfg/pN3fU_0eUsSSAlLqEIM3GA]
2. 点击“创建堆栈”，

其中，token_avatar为代币图标，应输入图标所在的url链接。

[Image: https://cryptape.quip.com/-/blob/TQIAAAmwhfg/h5Az5oGmiWZ2qb9309Dk7w]
3. 点击下一步，

[Image: https://cryptape.quip.com/-/blob/TQIAAAmwhfg/V6QtzK1GrsQvN5BB7FvPuw]
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

[Image: https://cryptape.quip.com/-/blob/TQIAAAmwhfg/ZzqWPT-KZUmn7yn1YF5E8A]
点击“下一步”。显示，

[Image: https://cryptape.quip.com/-/blob/TQIAAAmwhfg/qVpGFN9nAxYDiQ4KVjS1gQ]
点击创建堆栈，页面显示创建进度，最后完成。

生成sshkey的步骤为,返回到第一个页面，如下图，找到“这里”，并点击

[Image: https://cryptape.quip.com/-/blob/TQIAAAmwhfg/9nCB7DUVxuzjBMpPvC1EHQ]
点击后显示：

[Image: https://cryptape.quip.com/-/blob/TQIAAAmwhfg/0VPRCus0OHaIjqcUjlVaQQ]
点击“创建密钥对”，

[Image: https://cryptape.quip.com/-/blob/TQIAAAmwhfg/o6D_OVGO3TKloNEEKHTPhg]
点击“确定”。

[Image: https://cryptape.quip.com/-/blob/TQIAAAmwhfg/OF-POewTOaUzEf-NakLuNg]
密钥文件下载到本地。


# 在万云上部署DApp

万云介绍……
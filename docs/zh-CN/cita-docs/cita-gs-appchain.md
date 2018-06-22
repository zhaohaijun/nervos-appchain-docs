---
id: cita-gs-appchain
title: 搭建一条AppChain
---

CITA是一个开源的区块链内核，任何人都可以基于CITA来搭建属于自己的一条AppChain，更多关于 CITA 的信息请参照[CITA简介]()。  
我们已经准了一些脚本来帮助你部署AppChain，接下来本文档会带你搭建一条你自己的AppChain。  
> 同时我们也与云服务提供商合作提供了AppChain的一键部署服务，具体请参照[云服务支持]()。

如果您在部署AppChain的时候遇到问题，请随时[联系我们]()。

> 如果你是一位开发者，想直接在区块链上开发您的应用，我们建议你直接使用我们的测试链，详情请参照[部署智能合约]()。

## 系统要求
CITA目前支持在linux上进行部署，其他系统平台暂时不支持（未来可能也不支持）。我们推荐使用docker来部署CITA，请参考docker的系统要求页面来察看CITA是否支持你的电脑或服务器的系统。  
下面的例子中我们使用的系统为`Ubuntu 16.04.3 LTS (GNU/Linux 4.4.0-105-generic x86_64)`。

### 安装 Docker
在你的终端上打开一个shell，并按顺序执行以下命令来安装Docker。

```
sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install docker-ce
```
使用下面的命令来检查Docker是否已经成功安装：  
```
sudo docker run hello-world
```

如果需要更多关于Docker的帮助，请参照[docker的安装页面](https://docs.docker.com/install/linux/docker-ce/ubuntu/)。

### 安装 CITA （安装包）
首先从Docker Hub上安装CITA需要的Docker环境  
```
sudo docker pull cita/cita-run
```
这里提供的方法是下载本版本已经编译好的CITA软件包  
```
wget https://github.com/cryptape/cita/releases/download/v0.16/cita_secp256k1_sha3.tar.gz
```
解压软件包,并进入其目录
```
tar -xzf cita_secp256k1_sha3.tar.gz
cd cita_secp256k1_sha3/
```
### 安装 CITA （源文件）

#### 下载源代码
从 Github 仓库下载 CITA 的源代码，然后切换到 CITA 的源代码目录
```
git clone https://github.com/cryptape/cita.git
cd cita
git submodule init
git submodule update
```
#### Docker 环境使用说明
在源码根目录下，我们提供了 `env.sh` 脚本，封装了 docker 相关的操作。运行此脚本，以实际要运行的命令作为参数，即表示在 docker 环境中运行相关命令。例如`./env.sh make debug`即表示在 docker 环境中运行 `make debug`。

不带任何参数运行 `./env.sh` ，将直接获取一个 docker 环境的 shell。

> 国内用户请使用 `env_cn.sh` ，提供了编译时的国内镜像加速。  
> 还提供了 `daemon.sh` ,用法同 `env.sh` ，效果是后台运行。

如果出现 docker 相关的报错，可以执行如下命令并重试：
```
docker kill $(docker ps -a -q)
```
#### 编译源代码
可以按照自己的需求自行选择相应的编译方式（Debug-调试模式 或 Release-发行模式）

./env.sh make debug
或者

./env.sh make release
编译生成的文件在发布件目录target/install下，生产环境下只需要这个目录即可。

### 生成节点配置
在节点配置中你可以设置创世块相关配置，节点相关配置，网络配置和私钥相关配置。
我们提供一个脚本 `admintool.sh` 来快速生成一份默认的节点配置，来在本地实现一条4个节点的AppChain。
更多关于节点配置的信息，可以参考[节点配置]()。

首先进入docker环境
```
sudo ./env.sh
```
运行脚本生成默认配置
```
./bin/admintool.sh
```
依次配置4个节点
```
./bin/cita setup node0
./bin/cita setup node1
./bin/cita setup node2
./bin/cita setup node3
```

配置成功将得到已下反馈信息。若出现问题请去[github提issue]()，或者查看我们的[常见问题]()。
```
docker container cita_run_home_cita_cita_secp256k1_sha3 is already running
sysctl: setting key "fs.inotify.max_user_watches": Read-only file system
sysctl: setting key "fs.inotify.max_user_instances": Read-only file system
```

### 启动节点
使用以下命令依次启动节点
```
sudo ./daemon.sh ./bin/cita start node0
sudo ./daemon.sh ./bin/cita start node1
sudo ./daemon.sh ./bin/cita start node2
sudo ./daemon.sh ./bin/cita start node3
```

### 验证节点是否正常运行
为了验证节点是否已正常运行，可以通过发送以下Json-RPC命令来查看节点数量
```
sudo ./env.sh curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}' 127.0.0.1:1337
```
其中1337为节点#0的默认端口。节点#1的端口为1338，依此类推。
如果4个节点运行正常，则得到如下返回信息：
```
{"jsonrpc":"2.0","id":74,"result":"0x3"}
```

通过以下Json-RPC命令来查看块高度
```
sudo ./env.sh curl -X POST --data '{"jsonrpc":"2.0","method":"cita_blockNumber","params":[],"id":83}' 127.0.0.1:1337
```
应该得到如下返回结果
```
{"jsonrpc":"2.0","id":83,"result":"0x82"}
```

更多的Json-RPC命令，请查看[CITA JSON-RPC接口]()。

require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("hardhat-deploy-ethers")
require("hardhat-gas-reporter");
require("hardhat-watcher")
require('solidity-coverage')
require('dotenv').config({path:__dirname+'/.env'})

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || console.log("Missing .env variable - ETHERSCAN_API_KEY")
const KOVAN_RPC_URL = process.env.KOVAN_RPC_URL || console.log("Missing .env variable - KOVAN_RPC_URL")
const ROPSTEN_RPC_URL = process.env.ROPSTEN_RPC_URL || console.log("Missing .env variable - ROPSTEN_RPC_URL")
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || console.log("Missing .env variable - RINKEBY_RPC_URL")
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || console.log("Missing .env variable - GOERLI_RPC_URL")
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL || console.log("Missing .env variable - MAINNET_RPC_URL")
const POLYGON_MAINNET_RPC_URL = process.env.POLYGON_MAINNET_RPC_URL || console.log("Missing .env variable - POLYGON_MAINNET_RPC_URL")

//const TEST_PRIVATE_KEY = process.env.TEST_PRIVATE_KEY || console.log("Missing .env variable - TEST_MNEMONIC")
//const PRIVATE_KEY = process.env.PRIVATE_KEY || console.log("Missing .env variable - PRIVATE_KEY")
const TEST_MNEMONIC = process.env.TEST_MNEMONIC || console.log("Missing .env variable - TEST_MNEMONIC")
const MNEMONIC = process.env.MNEMONIC || console.log("Missing .env variable - MNEMONIC")
const REPORT_GAS = process.env.REPORT_GAS === "true";
const REPORT_GAS_PRICE = process.env.REPORT_GAS_PRICE || 21;

require("./tasks/accounts")

module.exports = {
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 50,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: true
    },
    localhost: { },
    kovan: {
      url: KOVAN_RPC_URL,
      //accounts: [TEST_PRIVATE_KEY],
      accounts: {
        mnemonic: TEST_MNEMONIC,
      },
      saveDeployments: true,
    },
    ropsten: {
      url: ROPSTEN_RPC_URL,
      // accounts: [TEST_PRIVATE_KEY],
      accounts: {
        mnemonic: TEST_MNEMONIC,
      },
      saveDeployments: true,
    },
    rinkeby: {
      url: RINKEBY_RPC_URL,
      // accounts: [TEST_PRIVATE_KEY],
      accounts: {
        mnemonic: TEST_MNEMONIC,
      },
      saveDeployments: true,
    },
    goerli: {
      url: GOERLI_RPC_URL,
      //accounts: [TEST_PRIVATE_KEY],
      accounts: {
        mnemonic: TEST_MNEMONIC,
      },
      saveDeployments: true,
    },
    mainnet: {
      chainId: 1,
      url: MAINNET_RPC_URL,
      gasPrice: 220,
      // accounts: [PRIVATE_KEY],
      accounts: {
        mnemonic: MNEMONIC,
      },
      saveDeployments: true,
    },
    polygon: {
      url: POLYGON_MAINNET_RPC_URL,
      // accounts: [PRIVATE_KEY],
      accounts: {
        mnemonic: MNEMONIC,
      },
      saveDeployments: true,
    },
  },
  watcher: {
    test: {
      tasks: [{ command: 'test', params: { testFiles: ['{path}'] } }],
      files: ['./test/*.test.js'],
      verbose: true
    }
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      //1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
      //4: '0xA296a3d5F026953e17F472B497eC29a5631FB51B', // but for rinkeby it will be a specific address
      //"goerli": '0x84b9514E013710b9dD0811c9Fe46b837a4A0d8E0', //it can also specify a specific netwotk name (specified in hardhat.config.js)
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  gasReporter: {
    enabled: REPORT_GAS,
    gasPrice: REPORT_GAS_PRICE
  },
}
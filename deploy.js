const { ethers } = require("ethers")

const fs = require("fs")

require("dotenv").config()

async function main() {
  let provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
  let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8")
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",

    "utf-8",
  )
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
  console.log("Deploying...WAIT!!!!!")

  const contract = await contractFactory.deploy()
  await contract.deploymentTransaction().wait(1)
  const currentFavoriteNumber = await contract.retrieve()
  console.log(`Curr fav number ${currentFavoriteNumber.toString()}`)
  const txResponse = await contract.store("7")
  const txReceipt = await txResponse.wait(1)
  const updateFavoriteNumber = await contract.retrieve()
  console.log(`Udated favorite number is ${updateFavoriteNumber}`)
}

// Вызовем функцию main для запуска node deploy.js
// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  const provider = new hre.ethers.getDefaultProvider();

  console.log("+--------------------------------------------------------------+");
  console.log("| Address                                    | Balance         |");
  console.log("+--------------------------------------------------------------+");

  for (const account of accounts) {
    var balance = await provider.getBalance(account.address);
    console.log("| ",account.address, " | ", balance.toString(), " |");
  }
});

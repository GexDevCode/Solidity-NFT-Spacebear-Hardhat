(async () => {
    try {
        const Spacebear = await hre.ethers.getContractFactory("Spacebear");

        const spacebearInstance = await Spacebear.deploy();

        console.log("Deploy contract at " + spacebear.address);
    }catch(e) {
        console.log(e);
        process.exitCode = 1;
    }
})
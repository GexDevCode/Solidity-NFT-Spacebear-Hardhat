const { expect } = require("chai");
const hre = require("hardhat");
const { loadFixture } = require('@nomicfoundation/hardhat-toolbox/network-helpers'); 

describe("Spacebear", function() {

    async function deploySpacebearAndMintTokenFixture() {
        const Spacebear = await hre.ethers.getContractFactory("Spacebear");
        const [owner, otherAccount, notTheNFTOwner] = await hre.ethers.getSigners();
        const spacebearInstance = await Spacebear.deploy(owner);
        await spacebearInstance.safeMint(otherAccount.address);

        return [spacebearInstance, owner, otherAccount, notTheNFTOwner];
    }
    
    it("is possible to mint a token", async () => {
        const [spacebearInstance, owner, otherAccount, notTheNFTOwner] = await loadFixture(deploySpacebearAndMintTokenFixture);
        
        expect(await spacebearInstance.ownerOf(0)).to.equal(otherAccount.address);
    })

    it("fails to transfer tokens from the wrong address", async () => {
        const [spacebearInstance, owner, otherAccount, notTheNFTOwner] = await loadFixture(deploySpacebearAndMintTokenFixture);
        
        expect(await spacebearInstance.ownerOf(0)).to.equal(otherAccount.address);
        await expect(spacebearInstance.connect(notTheNFTOwner).transferFrom(otherAccount.address, notTheNFTOwner.address, 0))
    })
})
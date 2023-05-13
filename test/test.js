const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Calender", function () {
  let Contract, contract;
  let owner, add1, add2;
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  this.beforeEach(async function () {
    [owner, add1, add2] = await ethers.getSigners();
    Contract = await ethers.getContractFactory("Calend3");
    contract = await Contract.deploy();

    await contract.deployed();
  });
  it("Should set the minutely rate", async function () {
    const tx = await contract.setRate(1008);
    // wait until the transaction is mined
    await tx.wait();
    // verify rate is set correctly
    expect(await contract.getRate()).to.equal(1008);

    // get addresses
    // const [owner, addr1, addr2] = await ethers.getSigners();
    // // call setRate using a different account address
    // // this should fail since this address is not the owner
  });
  it("Should fail if non-ownet sets rate", async function () {
    await expect(contract.connect(add1).setRate(500)).to.be.revertedWith(
      "Only the owner can set the rate"
    );
  });
  it("Should add two appointments", async function () {
    const tx1 = await contract.setRate(ethers.utils.parseEther("0.0001"));
    await tx1.wait();
    const tx2 = await contract
      .connect(add1)
      .createAppointment(
        "Meeting with Part Time Larry",
        1644143408,
        1644158680,
        { value: ethers.utils.parseEther("2") }
      );
    await tx2.wait();
    const tx3 = await contract
      .connect(add2)
      .createAppointment("Breakfast at Tiffany's", 1644154208, 1644159680, {
        value: ethers.utils.parseEther("1.5"),
      });
    await tx3.wait();
    const appointments = await contract.getAppointments();
    expect(appointments.length).to.equal(2);

    const balance1 = await ethers.provider.getBalance(owner.address);
    const balance2 = await ethers.provider.getBalance(add1.address);
    const balance3 = await ethers.provider.getBalance(add2.address);
    console.log(balance1);
    console.log(balance2);
    console.log(balance3);
  });
});

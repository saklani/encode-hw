import { Injectable } from '@nestjs/common';
import { ethers, Contract } from "ethers";
import * as tokenJson from "./MyToken.json";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  provider: ethers.providers.BaseProvider;
  contract: ethers.Contract;

  constructor(private configService: ConfigService) {
    this.provider = ethers.getDefaultProvider("sepolia");
    this.contract = new Contract(this.getContractAddress(), tokenJson.abi, this.provider);
  }
  getHello(): string {
    return 'Hello World!';
  }

  getLastBlock() {
    return this.provider.getBlock('latest');
  }

  getContractAddress() {
    return this.configService.get("TOKEN_ADDRESS");
  }

  getTotalSupply() {
    return this.contract.totalSupply();
  }

  getBalanceOf(address: string) {
    return this.contract.balanceOf(address);
  }

  async getTransactionReciept(hash: string) {
    const transaction = await this.provider.getTransaction(hash);
    const reciept = await transaction.wait()
    return reciept;
  }

  requestTokens(address: string, signature: string) {
    const pkey = this.configService.get("PRIVATE_KEY");
    const wallet = new ethers.Wallet(pkey);
    const signer = wallet.connect(this.provider);
    return this.contract.connect(signer).mint(address, ethers.utils.parseEther("0.001"))
  }


}

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestTokensDto } from './dtos/requestTokensDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('last-block')
  getLastBlock(): Promise<any> {
    return this.appService.getLastBlock();
  }

  @Get('contract-address')
  getContractAddress() {
    return this.appService.getContractAddress();
  }

  @Get('balance/:address')
  getBalanceOf(@Param('address') address: string) {
    return this.appService.getBalanceOf(address);
  }

  @Get('transaction-reciept')
  getTransactionReciept(@Query('hash') hash: string): Promise<any> {
    return this.appService.getTransactionReciept(hash);
  }

  @Post('request-tokens')
  requestTokens(@Body() body: RequestTokensDto) {
    return this.appService.requestTokens(body.address, body.signature);
  }

}

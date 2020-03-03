import { Controller, Get, Post, Res, Body, HttpCode } from "@nestjs/common";
import { Response } from "express";

//SERVICES
import { CustomerService } from "./customer.service";

//DTO
import { GetCustomerDetailPost } from "./dto/customer.dto";

@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post("getById")
  @HttpCode(200)
  async getById(@Body() postData: GetCustomerDetailPost, @Res() res: Response) {
    const result = await this.customerService.getById(postData);
    res.status(result.statusCode).send(result);
  }
}
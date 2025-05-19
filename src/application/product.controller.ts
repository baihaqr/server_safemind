// src/application/product.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Response } from '@nestjs/common';
import { ProductService } from '../domain/product/services/product.service';
import { ProductDto } from '../domain/product/dtos/product.dto';
import { BadRequestException , HttpException, NotFoundException} from '@nestjs/common';
import { ResponseHelper } from  '../common/helpers/response';
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: ProductDto, @Response() res): Promise<any> {
    if (!this.productService) {
      return ResponseHelper.sendError(res, 500, 'Product service not found');
    }
    return ResponseHelper.sendResponse(res, 201, await this.productService.create(createProductDto), 'Product created successfully');
  }

  @Get()
  async findAll(): Promise<ProductDto[]> {
    const products = await this.productService.findAll();
    if (!products) {
      throw new BadRequestException('No products found');
    }
    return products;
  
  }

@Get('ok/:id')
  async findOne(@Param('id') id: number): Promise<ProductDto> {
    const product = await this.productService.findOne(id);
    if (!product) {
    throw new NotFoundException(`Product with ids ${id} not found`);
    }
    return product;

  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateProductDto: ProductDto , @Response() res): Promise<any> {
    if (!this.productService) {
      return ResponseHelper.sendError(res, 500, 'Product service not found');
    }
    return  ResponseHelper.sendResponse(res, 200, await this.productService.update(id, updateProductDto), 'Product updated successfully');
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    if (!this.productService) {
      throw new BadRequestException('Product service not found');
    }
    await this.productService.remove(id);
    return { message: 'Product removed successfully' };

  }
}
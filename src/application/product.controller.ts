import { Controller, Get, Post, Body, Param, Put, Delete, Response } from '@nestjs/common';
import { ProductService } from '../domain/product/services/product.service';
import { ProductDto } from '../domain/product/dtos/product.dto';
import { BadRequestException , HttpException, NotFoundException} from '@nestjs/common';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: ProductDto): Promise<ProductDto | undefined> {
    if(!this.productService) {
      throw new BadRequestException('Product service not found');
    }
    const product = await this.productService.create(createProductDto);
    if (!product) {
      throw new BadRequestException('Product creation failed');
    }
    return product;
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
    throw new NotFoundException(`Product with id ${id} not foundfg`);
    }
    return product;

  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateProductDto: ProductDto ): Promise<ProductDto> {
    if (!this.productService) {
      throw new BadRequestException('Product service not found');
    }
    const product = await this.productService.update(id, updateProductDto);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
   
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
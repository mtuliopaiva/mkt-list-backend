import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { CreateProductDto } from '../domain/dtos/create-product.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { UpdateProductDto } from '../domain/dtos/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(data: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  async getProductByUuid(uuid: string): Promise<Product> {
    try {
      return await this.prisma.product.findUnique({
        where: {uuid}
      })
    } catch (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
  }

  async getProductList(
    page: number,
    itemsPerPage: number,
    search: string,
  ): Promise<[Product[], number]> {
    const skip = (page - 1) * itemsPerPage;
    const take = itemsPerPage;

    const query = this.prisma.product;

    try {
      const total = await query.count({
        where: {
          OR: [
            { name: { contains: search || '', mode: 'insensitive' } },
          ],
          deletedAt: null,
        },
      });

      const product = await query.findMany({
        orderBy: [
          {
            updatedAt: 'desc',
          },
        ],
        where: {
          OR: [
            { name: { contains: search || '', mode: 'insensitive' } },
          ],
          deletedAt: null,
        },
        skip: skip,
        take: take,
      });

      return [product, total];
    } catch (error) {
      throw new Error(`Error fetching product: ${error.message}`);
    }
  }

  async updateProduct(uuid: string, data: UpdateProductDto): Promise<Product> {
    try {
      return await this.prisma.product.update({
        where: { uuid },
        data,
      });
    } catch (error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  async restoreProduct(uuid: string): Promise<Product> {
    try {
      return await this.prisma.product.update({
        where: { uuid },
        data: { deletedAt: null },
      });
    } catch (error) {
      throw new Error(`Error restoring product: ${error.message}`);
    }
  }

  async softDeleteProduct(uuid: string): Promise<Product> {
    try {
      return await this.prisma.product.update({
        where: { uuid },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new Error(`Error soft deleting product: ${error.message}`);
    }
  }

}

import { Injectable } from '@nestjs/common';
import { List, Product } from '@prisma/client';
import { CreateListDto } from '../domain/dtos/create-list.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { UpdateListDto } from '../domain/dtos/update-list.dto';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  async createList(createListDto: CreateListDto) {
    const { name, userUuid, products } = createListDto;

    if (!products || !Array.isArray(products)) {
      throw new Error('Products must be an array');
    }

    return this.prisma.list.create({
      data: {
        name,
        userUuid,
        products: {
          create: products.map(product => ({
            productId: product.productId,
            quantity: product.quantity,
          })),
        },
      },
      include: {
        products: true,
      },
    });
  }

  async getListByUuid(uuid: string): Promise<List> {
    try {
      return await this.prisma.list.findUnique({
        where: {uuid}
      })
    } catch (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
  }

  async getListListAndSearch(
    page: number,
    itemsPerPage: number,
    search: string,
  ): Promise<[List[], number]> {
    const skip = (page - 1) * itemsPerPage;
    const take = itemsPerPage;

    const query = this.prisma.list;

    try {
      const total = await query.count({
        where: {
          OR: [
            { name: { contains: search || '', mode: 'insensitive' } },
          ],
          deletedAt: null,
        },
      });

      const list = await query.findMany({
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

      return [list, total];
    } catch (error) {
      throw new Error(`Error fetching list: ${error.message}`);
    }
  }

  async updateList(uuid: string, data: UpdateListDto): Promise<List> {
    try {
      return await this.prisma.list.update({
        where: { uuid },
        data,
      });
    } catch (error) {
      throw new Error(`Error updating list: ${error.message}`);
    }
  }

  async restoreList(uuid: string): Promise<List> {
    try {
      return await this.prisma.list.update({
        where: { uuid },
        data: { deletedAt: null },
      });
    } catch (error) {
      throw new Error(`Error restoring list: ${error.message}`);
    }
  }

  async softDeleteList(uuid: string): Promise<List> {
    try {
      return await this.prisma.list.update({
        where: { uuid },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new Error(`Error soft deleting list: ${error.message}`);
    }
  }

}

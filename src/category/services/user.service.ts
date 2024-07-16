import { Injectable, NotFoundException } from '@nestjs/common';
import { Users, Prisma, Category } from '@prisma/client';
import { CreateCategoryDto } from '../domain/dtos/create-category.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { UpdateCategoryDto } from '../domain/dtos/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(data: CreateCategoryDto): Promise<Category> {
    return this.prisma.category.create({ data });
  }

  async getCategoryByUuid(uuid: string): Promise<Category> {
    try {
      return await this.prisma.category.findUnique({
        where: {uuid}
      })
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  async getCategoryList(
    page: number,
    itemsPerPage: number,
    search: string,
  ): Promise<[Category[], number]> {
    const skip = (page - 1) * itemsPerPage;
    const take = itemsPerPage;

    const query = this.prisma.category;

    try {
      const total = await query.count({
        where: {
          OR: [
            { name: { contains: search || '', mode: 'insensitive' } },
          ],
          deletedAt: null,
        },
      });

      const category = await query.findMany({
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

      return [category, total];
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }


  async putCategory(uuid: string, data: UpdateCategoryDto): Promise<Category> {
    try {
      return await this.prisma.category.update({
        where: { uuid },
        data,
      });
    } catch (error) {
      throw new Error(`Error updating category: ${error.message}`);
    }
  }

  async restoreCategory(uuid: string): Promise<Category> {
    try {
      const category = await this.prisma.category.findUnique({
        where: {uuid}
      });

      if (!category || !category.deletedAt) {
        throw new NotFoundException('User not found or not deleted');
      }

      return await this.prisma.category.update({
        where: { uuid },
        data:{deletedAt: null}
      });
    } catch (error) {
      throw new Error(`Error updating category: ${error.message}`);
    }
  }

  async softDeleteCategory(uuid: string): Promise<Category> {
    try {
      return await this.prisma.category.update({
        where: { uuid },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new Error(`Error soft deleting category: ${error.message}`);
    }
  }
}

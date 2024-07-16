import { ICommand } from '@nestjs/cqrs';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

export class UpdateCategoryCommand implements ICommand {
  constructor(
    public readonly uuid: string,
    public readonly updateCategoryDto: UpdateCategoryDto
  ) {}
}

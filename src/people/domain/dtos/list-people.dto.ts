import { ReadPeopleDto } from './read-people.dto';

export class ListPeopleDto {
  data: ReadPeopleDto[];
  total: number;
}
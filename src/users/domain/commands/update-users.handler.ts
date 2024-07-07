import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateUsersCommand } from "./update-users.command";
import { BaseHttpException } from "src/core/exceptions/http-base.exceptions";
import { UsersService } from "src/users/services/user.service";
import { ReadUsersDto } from "../dtos/read-users.dto";
import { UpdateUsersDto } from "../dtos/update-users.dto";
import { UserType } from "src/users/enums/userType.enum";


@CommandHandler(UpdateUsersCommand)
export class UpdateUsersHandler
  extends BaseHttpException
  implements ICommandHandler<UpdateUsersCommand>
{
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async execute(command: UpdateUsersCommand): Promise<ReadUsersDto> {

    const { uuid, updateUsersDto } = command;

    const userData = await this.usersService.putUser(uuid, updateUsersDto);


    return <ReadUsersDto>{
      uuid: userData.uuid,
      name: userData.name,
      email: userData.email,
      userType: UserType[userData.userType],
      profileImageUrl: userData.profileImageUrl,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
      deletedAt: userData.deletedAt,
    };
  }
}
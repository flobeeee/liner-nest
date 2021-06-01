import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user/user.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  sayHi() {
    return this.appService.getHello();
  }

  @Post()
  async createHighlight(@Body() CreateHighlightDto): Promise<User> {
    // 유저확인
    const checkUser = await User.findOne({
      where: { id: CreateHighlightDto.userId },
    });
    if (!checkUser) {
      throw new NotFoundException(
        `User with id: ${CreateHighlightDto.userId} not found`,
      );
    }
    // Url create or find
    // colorHex 확인 후 colorId 넣기
    // text 넣기

    return checkUser;
  }
}

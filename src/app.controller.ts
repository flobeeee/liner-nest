import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateHighlightDto, UpdateHighlightDto } from './dto/HighlightDto';

interface resData {
  highlightId: number;
  userId: number;
  pageId: number;
  colorHex: string;
  text: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  sayHi() {
    return this.appService.getHello();
  }

  @Post()
  createHighlight(
    @Body() createHighlightDto: CreateHighlightDto,
  ): Promise<resData> {
    return this.appService.create(createHighlightDto);
  }

  @Patch()
  updateHighlight(
    @Body() updateHighlightDto: UpdateHighlightDto,
  ): Promise<resData> {
    return this.appService.update(updateHighlightDto);
  }

  // http://localhost:3000/highlights?userId=1&pageUrl=naver.com&pageId=123 이면 123 우선
  @Get('highlights')
  readHighlights(
    @Query('userId') userId: number,
    @Query('pageUrl') pageUrl?: string,
    @Query('pageId') pageId?: number,
  ) {
    return this.appService.readhighlights(userId, pageId, pageUrl);
  }

  @Get(':userId')
  readAll(@Param('userId') userId: number) {
    return this.appService.readAll(userId);
  }

  @Delete(':userId/:highlightId')
  deleteHighlight(
    @Param('userId') userId: number,
    @Param('highlightId') highlightId: number,
  ) {
    return this.appService.delete(userId, highlightId);
  }

  @Put(':userId/:themeId')
  changeTheme(
    @Param('userId') userId: number,
    @Param('themeId') themeId: number,
  ) {
    return this.appService.changeTheme(userId, themeId);
  }
}

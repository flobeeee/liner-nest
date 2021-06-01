import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateHighlightDto } from './dto/createHighlightDto';

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
}

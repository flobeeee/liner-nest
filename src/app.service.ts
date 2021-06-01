import { Injectable, NotFoundException } from '@nestjs/common';
import { Highlight } from './highlight/highlight.model';
import { Page } from './page/page.model';
import { Theme } from './theme/theme.model';
import { User } from './user/user.model';

interface resData {
  highlightId: number;
  userId: number;
  pageId: number;
  colorHex: string;
  text: string;
}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello liner-nest!';
  }

  async create(data): Promise<resData> {
    const { userId, pageUrl, colorHex, text } = data;
    // 유저확인
    const checkUser = await User.findOne({
      where: { id: userId },
    });
    if (!checkUser) {
      throw new NotFoundException(`User with id: ${userId} not found`);
    }

    // Url 확인
    const checkUrl = await Page.findOrCreate({
      where: { pageUrl: pageUrl },
    });
    const pageId = checkUrl[0].getDataValue('id');

    // colorHex 확인 후 colorId 넣기
    const checkColor = await Theme.findOne({
      where: { colorHex: colorHex },
    });
    const colorId = checkColor.id;

    // highlight 테이블에 데이터 추가
    const highlightDB = await Highlight.create({
      userId: userId,
      pageId: pageId,
      colorId: colorId,
      text: text,
    });
    const highlightId = highlightDB.id;

    return {
      highlightId,
      userId,
      pageId,
      colorHex,
      text,
    };
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async update(data): Promise<resData> {
    const { userId, highlightId, colorHex, text } = data;
    let pageId;
    // 하이라이트 확인
    const checkHighlight = await Highlight.findOne({
      where: { id: highlightId },
    });
    if (!checkHighlight) {
      throw new NotFoundException(
        `highlight with id: ${highlightId} not found`,
      );
    } else if (checkHighlight.getDataValue('userId') !== userId) {
      throw new NotFoundException(`User with id: ${userId} not found`);
    } else if (colorHex || text) {
      if (colorHex && text) {
        const themeDB = await Theme.findOne({
          where: { colorHex: colorHex },
        });
        await Highlight.update(
          {
            text: text,
            colorId: themeDB.id,
          },
          {
            where: {
              userId: userId,
              id: highlightId,
            },
          },
        );
        const highlightDB = await Highlight.findOne({
          where: { id: highlightId },
        });
        pageId = highlightDB.getDataValue('pageId');
      } else if (colorHex) {
        const themeDB = await Theme.findOne({
          where: { colorHex: colorHex },
        });
        await Highlight.update(
          {
            colorId: themeDB.id,
          },
          {
            where: {
              userId: userId,
              id: highlightId,
            },
          },
        );
        const highlightDB = await Highlight.findOne({
          where: { id: highlightId },
        });
        pageId = highlightDB.getDataValue('pageId');
      } else {
        await Highlight.update(
          {
            text: text,
          },
          {
            where: {
              userId: userId,
              id: highlightId,
            },
          },
        );
        const highlightDB = await Highlight.findOne({
          where: { id: highlightId },
        });
        pageId = highlightDB.getDataValue('pageId');
      }
    } else {
      throw new BadRequestException('required color or text');
    }

    return {
      highlightId,
      userId,
      pageId,
      colorHex,
      text,
    };
  }

  async readhighlights(userId, pageId, pageUrl) {
    // 유저확인
    const checkUser = await User.findOne({
      where: { id: userId },
    });
    if (!checkUser) {
      throw new NotFoundException(`User with id: ${userId} not found`);
    }
    if (pageId) {
      const highlightDB = await Highlight.findAll({
        where: { userId: userId, pageId: pageId },
        attributes: ['id', 'userId', 'pageId', 'text'],
        include: [
          {
            model: Theme,
            attributes: ['colorHex'],
            required: true,
          },
        ],
        order: [['updatedAt', 'DESC']],
      });
      const data = highlightDB.map((highlight) => {
        highlight.setDataValue('highlightId', highlight.getDataValue('id'));
        highlight.setDataValue(
          'colorHex',
          highlight.getDataValue('themeData').getDataValue('colorHex'),
        );
        const json = highlight.toJSON();
        delete json['themeData'];
        delete json['id'];
        return json;
      });
      return data;
    } else if (pageUrl) {
      const pageDB = await Page.findOne({
        where: { pageUrl: pageUrl },
      });
      const highlightDB = await Highlight.findAll({
        where: { userId: userId, pageId: pageDB.id },
        attributes: ['id', 'userId', 'pageId', 'text'],
        include: [
          {
            model: Theme,
            attributes: ['colorHex'],
            required: true,
          },
        ],
        order: [['updatedAt', 'DESC']],
      });
      const data = highlightDB.map((highlight) => {
        highlight.setDataValue('highlightId', highlight.getDataValue('id'));
        highlight.setDataValue(
          'colorHex',
          highlight.getDataValue('themeData').getDataValue('colorHex'),
        );
        const json = highlight.toJSON();
        delete json['themeData'];
        delete json['id'];
        return json;
      });
      return data;
    } else {
      throw new BadRequestException('required pageId or pageUrl');
    }
  }

  async readAll(userId) {
    // 유저확인
    const checkUser = await User.findOne({
      where: { id: userId },
    });
    if (!checkUser) {
      throw new NotFoundException(`User with id: ${userId} not found`);
    }
    // 1. User_Page 에서 해당 유저아이디의 모든 데이터를 최근 순으로 뽑아낸다.
    const allText = await Highlight.findAll({
      where: {
        userId: userId,
      },
      order: [['updatedAt', 'DESC']],
    });
    // 2. 배열에 최근 업데이트된 텍스트순으로 페이지를 정리한다.
    let pageList = [];
    allText.map((data) => {
      pageList.push(data.getDataValue('pageId'));
    });
    pageList = [...new Set(pageList)];
    // 3. 배열요소 순으로 페이지와 텍스트를 가져온다.
    const allData = [];
    for (let i = 0; i < pageList.length; i++) {
      const urls = await Page.findOne({
        where: {
          id: pageList[i],
        },
      });
      const highlightDB = await Highlight.findAll({
        where: { userId: userId, pageId: urls.getDataValue('id') },
        attributes: ['id', 'userId', 'pageId', 'text'],
        include: [
          {
            model: Theme,
            attributes: ['colorHex'],
            required: true,
          },
        ],
        order: [['updatedAt', 'DESC']],
      });
      const data = highlightDB.map((highlight) => {
        highlight.setDataValue('highlightId', highlight.getDataValue('id'));
        highlight.setDataValue(
          'colorHex',
          highlight.getDataValue('themeData').getDataValue('colorHex'),
        );
        const json = highlight.toJSON();
        delete json['themeData'];
        delete json['id'];
        return json;
      });
      allData.push({
        pageId: urls.getDataValue('id'),
        pageUrl: urls.getDataValue('pageUrl'),
        highlights: [],
      });
      allData[i].highlights.push(data);
    }
    return allData;
  }

  async delete(userId, highlightId) {
    if (userId && highlightId) {
      await Highlight.destroy({
        where: {
          id: highlightId,
          userId: userId,
        },
      });
      return 'OK';
    } else {
      throw new BadRequestException('required userId or highlightId');
    }
  }

  async changeTheme(userId, themeId) {
    // 유저확인
    const checkUser = await User.findOne({
      where: { id: userId },
    });
    if (!checkUser) {
      throw new NotFoundException(`User with id: ${userId} not found`);
    } else if (themeId < 0 || themeId > 3) {
      throw new NotFoundException(`Theme with id: ${themeId} not found`);
    }
    const beforeTheme = checkUser.getDataValue('theme');
    // 테마변경
    await User.update(
      {
        theme: themeId,
      },
      {
        where: {
          id: userId,
        },
      },
    );
    const color = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    // 색 변경
    for (let i = 0; i < 3; i++) {
      await Highlight.update(
        {
          colorId: color[themeId - 1][i],
        },
        {
          where: {
            userId: userId,
            colorId: color[beforeTheme - 1][i],
          },
        },
      );
    }
    return 'OK';
  }
}

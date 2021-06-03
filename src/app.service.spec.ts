import { Test, TestingModule } from '@nestjs/testing';
import { User } from './user/user.model';
import { Highlight } from './highlight/highlight.model';
import { Theme } from './theme/theme.model';
import { Page } from './page/page.model';
import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize('liner_nest', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.addModels([User, Highlight, Theme, Page]);

import { AppService } from './app.service';
import { NotFoundException } from '@nestjs/common';

describe('LinerService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
    // 테스트마다 데이터 추가하고있는데, 이부분에 넣어도 됨!
  });
  // beforeEach, afterEach, beforeAll, afterAll 등 많은 Hook 있음

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getHello', () => {
    it('should return Hello liner-nest', () => {
      const result = service.getHello();
      expect(result).toEqual('Hello liner-nest!');
    });
  });

  describe('readhighlights', () => {
    it('should return two highlights', async () => {
      const result = await service.readhighlights(1, 1, 'test');
      expect(result.length).toEqual(2);
    });
    it('should return two highlights', async () => {
      const result = await service.readhighlights(1, null, 'www.naver.com');
      expect(result.length).toEqual(2);
    });
    it('should return a 404', async () => {
      try {
        await service.readhighlights(999, 1, 'test');
      } catch (e) {
        expect(e.message).toEqual(`User with id: 999 not found`);
      }
    });
    it('should return a 400', async () => {
      try {
        await service.readhighlights(1, null, null);
      } catch (e) {
        expect(e.message).toEqual('required pageId or pageUrl');
      }
    });
  });

  describe('createHighlight', () => {
    it('should return created a highlight', async () => {
      const before = await service.readhighlights(1, 3, 'test');
      await service.create({
        userId: 1,
        pageUrl: 'www.getliner.com',
        colorHex: '#a5f2e9',
        text: '테스트 진행중입니다.',
      });
      const after = await service.readhighlights(1, 3, 'test');
      expect(after.length).toBeGreaterThan(before.length);
    });
    it('should return a 404', async () => {
      try {
        await service.create({
          userId: 999,
          pageUrl: 'www.getliner.com',
          colorHex: '#a5f2e9',
          text: '테스트 진행중입니다.',
        });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('updateHighlight', () => {
    it('1. should return updated the highlight', async () => {
      const result = await service.update({
        highlightId: 2,
        userId: 1,
        colorHex: '#ffd5c8',
        text: '변경된 텍스트입니다',
      });
      expect(result.text).toEqual('변경된 텍스트입니다');
    });
    it('2. should return updated the highlight', async () => {
      const result = await service.update({
        highlightId: 2,
        userId: 1,
        text: '변경된 텍스트입니다',
      });
      expect(result.text).toEqual('변경된 텍스트입니다');
    });
    it('3. should return updated the highlight', async () => {
      const result = await service.update({
        highlightId: 2,
        userId: 1,
        colorHex: '#ffd5c8',
      });
      expect(result.colorHex).toEqual('#ffd5c8');
    });
    it('should return a 404', async () => {
      try {
        await service.update({
          highlightId: 999,
          userId: 1,
          text: '변경된 텍스트입니다',
        });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
    it('should return a 400', async () => {
      try {
        await service.update({
          highlightId: 2,
          userId: 2,
          text: '변경된 텍스트입니다',
        });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
    it('should return a 400', async () => {
      try {
        await service.update({
          userId: 1,
          highlightId: 2,
        });
      } catch (e) {
        expect(e.message).toEqual('required color or text');
      }
    });
  });

  describe('delete', () => {
    it('should return delete the highlight', async () => {
      const result = await service.delete(1, 23);
      expect(result).toEqual('OK');
    });
    it('should return a 400', async () => {
      try {
        await service.delete(null, null);
      } catch (e) {
        expect(e.message).toEqual('required userId or highlightId');
      }
    });
  });

  describe('readAll', () => {
    it('should return all data with userid:2', async () => {
      const result = await service.readAll(2);
      expect(result[0]['highlights'][0].length).toEqual(2);
    });
    it('should return a 404', async () => {
      try {
        await service.readAll(999);
      } catch (e) {
        expect(e.message).toEqual(`User with id: 999 not found`);
      }
    });
  });

  describe('changeTheme', () => {
    it('should return OK', async () => {
      const result = await service.changeTheme(1, 1);
      expect(result).toEqual('OK');
    });
    it('should return a 404', async () => {
      try {
        await service.changeTheme(999, 2);
      } catch (e) {
        expect(e.message).toEqual(`User with id: 999 not found`);
      }
    });
    it('should return a 404', async () => {
      try {
        await service.changeTheme(1, 9);
      } catch (e) {
        expect(e.message).toEqual(`Theme with id: 9 not found`);
      }
    });
  });
});

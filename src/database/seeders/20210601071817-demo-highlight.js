'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Highlights',
      [
        {
          userId: 1,
          pageId: 1,
          text: '네이버의 첫 하이라이트입니다.',
          colorId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          pageId: 1,
          text: '네이버의 두번째 하이라이트입니다.',
          colorId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          pageId: 1,
          text: '네이버의 세번째 하이라이트입니다.',
          colorId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          pageId: 2,
          text: '유튜브 텍스트1입니다. 테마1번입니다.',
          colorId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          pageId: 2,
          text: '유튜브 텍스트2입니다. 테마2번입니다',
          colorId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Highlights', null, {});
  },
};

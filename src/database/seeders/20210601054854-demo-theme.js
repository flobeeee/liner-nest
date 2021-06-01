'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Themes',
      [
        {
          theme: 1,
          colorHex: '#ffff8d',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          theme: 1,
          colorHex: '#a5f2e9',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          theme: 1,
          colorHex: '#ffd5c8',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          theme: 2,
          colorHex: '#f6f0aa',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          theme: 2,
          colorHex: '#d3edd1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          theme: 2,
          colorHex: '#f9d6c1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          theme: 3,
          colorHex: '#f4ff40',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          theme: 3,
          colorHex: '#8affd7',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          theme: 3,
          colorHex: '#ffc477',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Themes', null, {});
  },
};

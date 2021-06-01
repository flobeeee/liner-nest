'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Highlights', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
      },
      pageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Pages', key: 'id' },
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      colorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Themes', key: 'id' },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Highlights');
  },
};

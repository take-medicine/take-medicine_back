'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('medicines', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      dosage: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      frequency_hours: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      scheduled_times: {
        type: Sequelize.JSON,
        allowNull: false
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });

    // Add indexes
    await queryInterface.addIndex('medicines', ['active']);
    await queryInterface.addIndex('medicines', ['start_date']);
    await queryInterface.addIndex('medicines', ['name']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('medicines');
  }
};

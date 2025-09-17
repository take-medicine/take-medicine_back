'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('intakes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      medicine_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'medicines',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      scheduled_datetime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      taken_datetime: {
        type: Sequelize.DATE,
        allowNull: true
      },
      taken: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.addIndex('intakes', ['medicine_id']);
    await queryInterface.addIndex('intakes', ['scheduled_datetime']);
    await queryInterface.addIndex('intakes', ['taken']);
    
    // Unique constraint to prevent duplicate scheduled intakes
    await queryInterface.addIndex('intakes', ['medicine_id', 'scheduled_datetime'], {
      unique: true,
      name: 'unique_medicine_scheduled_datetime'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('intakes');
  }
};

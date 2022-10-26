module.exports = {
  up: async (queryInterface, DataTypes) => [
    await queryInterface.createTable('game', {
      game_id: {
        unique: true,
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      moves: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
      deleted_at: {
        type: DataTypes.DATE,
      },
    }),
  ],
  down: async (queryInterface) => [
    await queryInterface.dropTable('game'),
  ],
};

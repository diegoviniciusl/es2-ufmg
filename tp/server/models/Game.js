module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define(
    'Game',
    {
      gameId: {
        type: DataTypes.STRING,
        field: 'game_id',
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        unique: true,
        primaryKey: true,
      },
      moves: {
        type: DataTypes.JSONB,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at',
      },
    },
    {
      timestamps: true,
      tableName: 'game',
      paranoid: true,
    },
  );
  return Game;
};

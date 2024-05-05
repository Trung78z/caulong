module.exports = (sequelize, DataTypes) => {
  const Joins = sequelize.define("Joins", {
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  Joins.associate = (models) => {
    Joins.belongsTo(models.Users, { foreignKey: "UserId" });
  };
  return Joins;
};

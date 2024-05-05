module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    // title: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    commentBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Comments.associate = (models) => {
    Comments.belongsTo(models.Users, { foreignKey: "UserId" });
  };
  return Comments;
};

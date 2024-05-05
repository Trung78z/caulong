const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stadium: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
    slotCustomer: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rank: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Gioitinh: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pricemin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pricemax: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timeStart: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timeEnd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Posts.associate = (models) => {
    // Define associations
    Posts.hasMany(models.Comments, {
      onDelete: "cascade",
    });

    Posts.hasMany(models.Joins, {
      onDelete: "cascade",
    });

    Posts.belongsTo(models.Users, { foreignKey: "UserId" });
  };

  return Posts;
};

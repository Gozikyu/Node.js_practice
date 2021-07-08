"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      validate: { notEmpty: { msg: "名前は必須項目です" } },
    },
    pass: {
      type: DataTypes.STRING,
      validate: { notEmpty: { msg: "パスワードは必須項目です" } },
    },

    mail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { msg: "有効なメールアドレスを入力してください" },
      },
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: { msg: "整数を入力してください" },
        min: { args: [0], msg: "ゼロ以上の整数を入力してください" },
      },
    },
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};

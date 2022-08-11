const Sequelize = require("sequelize");

module.exports = new Sequelize("sql6511980", "sql6511980", "qTaTG4T6Ge", {
  host: "sql6.freesqldatabase.com",
  port: 3306,
  dialect: "mysql",
  define: {
    timestamps: true,
    freezeTableName: true,
  },
});

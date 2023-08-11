import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("zoobalo", "admin", "zoobalo123", {
  host: "zoobalo-db.caanvcmlhm9m.us-east-1.rds.amazonaws.com",
  dialect: "mysql",
});
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.DATABASE_NAME as string, process.env.USER as string, process.env.PASSWORD as string, {
    host: process.env.HOST,
    dialect: 'mysql'
})
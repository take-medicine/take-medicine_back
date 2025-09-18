import { Sequelize } from "sequelize";
import { username, password, database, host, dialect } from "../config/config.js";

const db_connection = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect,
    define: {
        timestamps: true,
        underscored: true
    }
});

export default db_connection;
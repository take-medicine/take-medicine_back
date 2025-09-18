import { Sequelize } from "sequelize";
import { username, password, database, host, dialect, port } from "../config/config.js";

const db_connection = new Sequelize(database, username, password, {
    host,
    port: port || 5432,   // Puerto por defecto de PostgreSQL
    dialect: 'postgres',  // ⚠ para pgAdmin/PostgreSQL
    define: {
        timestamps: true,
        underscored: true
    },
    logging: false // opcional: desactiva logs SQL en consola
});


export default db_connection;
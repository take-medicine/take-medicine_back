import 'dotenv/config';


export const   username = process.env.DB_USER || 'root';
export const   password = process.env.DB_PASS || null;
export const    database = process.env.DB_NAME || 'app_development';
export const  host = process.env.DB_HOST || '127.0.0.1';
export const  dialect = 'mysql';


//   },
//   test: {
//     username: process.env.DB_USER || 'root',
//     password: process.env.DB_PASS || null,
//     database: process.env.DB_TEST || 'app_test',
//     host: process.env.DB_HOST || '127.0.0.1',
//     dialect: 'mysql',
//     logging: false
//   },
//   production: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: 'mysql'
//   }
// };

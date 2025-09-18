import 'dotenv/config';

export const username = process.env.DB_USER || 'postgres';       
export const password = process.env.DB_PASS || '5891';  
export const database = process.env.DB_NAME || 'postgres'; 
export const host = process.env.DB_HOST || '127.0.0.1';
export const port = process.env.DB_PORT || 5432;                
export const dialect = 'postgres';     

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

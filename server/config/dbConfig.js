// server/config/dbConfig.js

const dbConfig = {
    development: {
        DB_CONFIG: `mongodb://${process.env.DB_HOST || 'localhost'}:27017/userDb?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0`,
    },
    staging: {
        DB_CONFIG: `mongodb://${process.env.DB_HOST}:27017/userDb?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0`,
    },
    production: {
        DB_CONFIG: `mongodb://${process.env.DB_HOST}:27017/userDb?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0`,
    }
};

const environment = process.env.NODE_ENV || 'development';
const config = dbConfig[environment];

module.exports = config;

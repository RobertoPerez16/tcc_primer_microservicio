import { config } from 'dotenv';

config();
const appPort = process.env.APP_PORT;
const databaseConfig = {
    server: process.env.DATABASE_SERVER_NAME,
    database: process.env.DATABASE_SERVER_DB_NAME,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }
}

const microserviceUrl = process.env.SECOND_APP_URL_LOCAL;

export {
    appPort,
    databaseConfig,
    microserviceUrl
}

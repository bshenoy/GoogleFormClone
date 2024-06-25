const envconfig = {
    development: {
        DOMAIN_URL: 'http://localhost:3000/',
        GOOGLE_ID: process.env.GOOGLE_ID
    },
    staging: {
        DOMAIN_URL: ''

    },
    production: {
        DOMAIN_URL: ''
    }
}

const environment = process.env.NODE_ENV || 'development';
const config = envconfig[environment];

export default config;
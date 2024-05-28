import{config} from 'dotenv';
config();

export default {
    port: process.env.PORT ?? 3000,
    entorn: process.env.ENTORN ?? 'DEVELOPER',
    TOKEN_KEY: "Sa170366930",
    crypto_key: 'palabraSecreta01$'
}
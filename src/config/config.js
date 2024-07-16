const dotenv = require("dotenv") ;

dotenv.config();


const { SECRET_SESSION, PORT, MONGODB_URI, SECRET_KEY, HOST } = process.env

const config = {
    secret_session: SECRET_SESSION || "",
    secret_key: SECRET_KEY || "",
    port: PORT || 8080,
    mongodb_url: MONGODB_URI,
    host: HOST
};

module.exports = config;
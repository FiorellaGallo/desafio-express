import dotenv from "dotenv";
dotenv.config();
const config = {
    port:process.env.NODE_PORT,
    dbUri: process.env.MONGO_DB_URI,
    privateKey: process.env.PRIVATE_KEY,
    dbType:process.env.DB,
    host:process.env.SMTP_HOST,
    portHost:process.env.SMTP_PORT
    
};

export default config;
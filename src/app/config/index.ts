import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  saltRound: process.env.SALT_ROUND,
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    resetPassSecret: process.env.RESET_PASS_SECRET,
    resetPassExpiresIn: process.env.RESET_PASS_EXPIRES_IN,
  },
  emailSender: {
    email: process.env.EMAIL_SENDER,
    app_pass: process.env.EMAIL_SENDER_APP_PASS,
  },
  reset_pass_link: process.env.RESET_PASS_LINK,
  reset_pass_secret: process.env.RESET_PASS_SECRET,
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
};

export default config;

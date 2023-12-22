//dirname
import { dirname } from "path";
import { fileURLToPath } from "url";
export const __dirname = dirname(fileURLToPath(import.meta.url));

//mongostore
import "dotenv/config";
import MongoStore from "connect-mongo";

export const mongoStoreOptions = {
  store: MongoStore.create({
    mongoUrl: process.env.DB_CONNECTION,
    ttl: 600,
    crypto: { secret: process.env.COOKIE_KEY },
  }),
  secret: process.env.COOKIE_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 600000 },
};

//bcyprt
import { hashSync, genSaltSync, compareSync } from "bcrypt";

export const createHash = (password) => hashSync(password, genSaltSync(10));

export const isValidPassword = (password, user) =>
  compareSync(password, user.password);

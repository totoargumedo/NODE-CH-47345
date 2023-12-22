import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import UserServices from "../services/users.services.js";
const usersServices = new UserServices();

//opciones de la estrategia
const strategyOptions = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  try {
    // console.log("profile: ", profile);
    const email = profile._json.email;
    const user = await usersServices.getByEmail(email);
    // console.log("user: ", user);
    if (user) return done(null, user);
    const newUser = await usersServices.create({
      first_name: profile._json.name,
      email: email,
      isGithub: true,
    });
    // console.log("newUser", newUser);
    return done(null, newUser);
  } catch (error) {
    console.log(error);
  }
};

//inicializacion de estrategias
passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));

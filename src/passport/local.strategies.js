import UserServices from "../services/users.services.js";
const userServices = new UserServices();
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

//opciones de la estrategia
const strategyOptions = {
  usernameField: "email",
  passportField: "password",
  passReqToCallback: true,
};

//logica registro
const singup = async (req, email, password, done) => {
  try {
    const user = await userServices.getByEmail(email);
    if (user) {
      return done(null, false);
    } else {
      const newUser = await userServices.create(req.body);
      return done(null, newUser);
    }
  } catch (error) {
    console.log(error);
    return done(null, false);
  }
};

//logica de login
const login = async (req, email, password, done) => {
  try {
    const userLogged = await userServices.login(req.body);
    if (!userLogged) {
      return done(null, false, { message: "Invalid credentials" });
    } else {
      return done(null, userLogged);
    }
  } catch (error) {
    console.log(error);
  }
};
//estrategias
const singupStrategy = new LocalStrategy(strategyOptions, singup);
const loginStrategy = new LocalStrategy(strategyOptions, login);
//inicializacion de estrategias
passport.use("register", singupStrategy);
passport.use("login", loginStrategy);

//serializacion y deserializacion, obtiene el id del usuario y lo guarda en la sesion
//req.session.passport.user
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userServices.getById(id);
    done(null, user);
  } catch (error) {
    console.log(error);
  }
});

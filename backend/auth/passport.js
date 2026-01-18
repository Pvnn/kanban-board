import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import prisma from "../db/prisma.js";

const cookieExtractor = (request) => {
  if (request && request.cookies) {
    return request.cookies["access_token"];
  }
  return null;
};

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: payload.sub },
        });
        if (!user) return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

export default passport;

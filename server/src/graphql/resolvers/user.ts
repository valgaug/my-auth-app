import bcrypt from 'bcrypt';
import User from '../../models/User';
import { QueryResolvers, MutationResolvers } from '../../generated/graphql';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-errors';
import dotenv from 'dotenv';
import { authenticate } from '../../middleware/authMiddleware';

dotenv.config();

const saltRounds = 10;
const maxLoginAttempts = 5;
const jwtSecret = process.env.JWT_SECRET as jwt.Secret;

const queryResolvers: QueryResolvers = {
  getUser: async (_, { email }, context) => {
    authenticate(context);
    return await User.findOne({ email });
  },
};

const mutationResolvers: MutationResolvers = {
  createUser: async (_, { firstName, lastName, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      loginAttempts: 0,
    });

    try {
      const savedUser = await newUser.save();
      return {
        id: savedUser.id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Error creating user: ' + error.message);
      } else {
        throw error;
      }
    }
  },

  loginUser: async (_, { email, password }) => {
    const user = await User.findOne({ email });

    const now = new Date();

    if (user && user.lockoutUntil && user.lockoutUntil > now) {
      throw new AuthenticationError('Try again later.');
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      if (user) {
        const loginAttempts = user.loginAttempts + 1;

        if (loginAttempts >= maxLoginAttempts) {
          const lockoutDuration = 2;
          await User.updateOne(
            { email },
            {
              $set: {
                loginAttempts,
                lockoutUntil: new Date(now.getTime() + lockoutDuration * 60000),
              },
            }
          );
          throw new AuthenticationError('Try again later.');
        } else {
          await User.updateOne(
            { email },
            {
              $inc: { loginAttempts: 1 },
              $set: { lastFailedLoginAttempt: now },
            }
          );
        }
      }

      throw new AuthenticationError('Email or Password is invalid');
    }

    await User.updateOne({ email }, { loginAttempts: 0 });

    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

    return {
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    };
  },

  logoutUser: async (_, { userId, token }) => {
    try {
      await User.findByIdAndUpdate(userId, { $push: { blacklistedTokens: token } });
      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Error logging out: ' + error.message);
      } else {
        throw error;
      }
    }
  },
};

export const userResolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};

import bcrypt from 'bcrypt';
import User from '../../models/User';
import { QueryResolvers, MutationResolvers } from '../../generated/graphql';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-errors';
import dotenv from 'dotenv';

dotenv.config();

const saltRounds = 10;
const maxLoginAttempts = 5;
const jwtSecret = process.env.JWT_SECRET as jwt.Secret;

const queryResolvers: QueryResolvers = {
  getUser: async (_, { email }) => {
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

    if (!user) {
      throw new AuthenticationError('User not found');
    }

    if (user.loginAttempts >= maxLoginAttempts) {
      throw new AuthenticationError('Account locked due to multiple failed login attempts. Please try again later.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      await User.updateOne({ email }, { $inc: { loginAttempts: 1 } });
      throw new AuthenticationError('Invalid password');
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

    await User.updateOne({ email }, { loginAttempts: 0 });

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

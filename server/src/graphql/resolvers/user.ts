import bcrypt from 'bcrypt';
import User from '../../models/User';
import { QueryResolvers, MutationResolvers } from '../../generated/graphql';

const saltRounds = 10;

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
    });

    try {
      return await newUser.save();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Error creating user: ' + error.message);
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

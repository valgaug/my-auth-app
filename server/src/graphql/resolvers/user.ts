import User from '../../models/User';
import { QueryResolvers, MutationResolvers } from '../../generated/graphql';

export const queryResolvers: QueryResolvers = {
  getUser: async (_, { email }) => {
    return await User.findOne({ email });
  },
};

export const mutationResolvers: MutationResolvers = {
  createUser: async (_, { firstName, lastName, email, password }) => {
    const newUser = new User({ firstName, lastName, email, password });
    // Remember to hash the password before saving
    return await newUser.save();
  },
};

export const userResolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};

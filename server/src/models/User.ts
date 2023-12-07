import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  loginAttempts: {
    type: Number,
    required: true,
    default: 0,
  },
  blacklistedTokens: {
    type: [String],
    required: false,
    default: [],
  },
  lastFailedLoginAttempt: {
    type: Date,
    required: false,
  },
  lockoutUntil: {
    type: Date,
    required: false,
  },
});

const User = mongoose.model('User', userSchema);

export default User;

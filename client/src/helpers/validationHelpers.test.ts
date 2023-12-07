import { isValidEmail, doPasswordsMatch } from './validationHelpers';

describe('isValidEmail', () => {
  it('returns true for a valid email', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
  });

  it('returns false for an invalid email', () => {
    expect(isValidEmail('test@example')).toBe(false);
    expect(isValidEmail('test@')).toBe(false);
    expect(isValidEmail('test')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});

describe('doPasswordsMatch', () => {
  it('returns true when passwords match', () => {
    expect(doPasswordsMatch('password123', 'password123')).toBe(true);
  });

  it('returns false when passwords do not match', () => {
    expect(doPasswordsMatch('password123', 'different')).toBe(false);
  });
});

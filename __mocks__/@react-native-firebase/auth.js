const mockAuth = {
  currentUser: { id: '123', email: 'test@example.com' },
  createUserWithEmailAndPassword: jest.fn((auth, email, password) =>
    Promise.resolve({
      user: { _user: { id: '123', email } },
      additionalUserInfo: { isNewUser: true, providerId: 'password' },
    }),
  ),
  signInWithEmailAndPassword: jest.fn((auth, email, password) =>
    Promise.resolve({
      user: { _user: { id: '123', email } },
      additionalUserInfo: { isNewUser: false, providerId: 'password' },
    }),
  ),
  signOut: jest.fn(() => Promise.resolve()),
};

export const getAuth = jest.fn(() => mockAuth);
export default { getAuth };

export default {
  initializeApp: jest.fn(() => Promise.resolve(true)),
  auth: jest.fn(() => ({
    createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { uid: '123' } })),
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { uid: '123' } })),
    signOut: jest.fn(() => Promise.resolve()),
    currentUser: { uid: '123', email: 'test@example.com' },
  })),
};

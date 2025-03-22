export default {
  initializeApp: jest.fn(() => Promise.resolve(true)),
  auth: jest.fn(() => ({
    createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { id: '123' } })),
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { id: '123' } })),
    signOut: jest.fn(() => Promise.resolve()),
    currentUser: { id: '123', email: 'test@example.com' },
  })),
};

const mockFirestore = {
  getFirestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        set: jest.fn(() => Promise.resolve()),
        get: jest.fn(() =>
          Promise.resolve({
            exists: true,
            data: () => ({
              id: '123',
              displayName: 'Test User',
              email: 'test@example.com',
              photoURL: '',
              phoneNumber: '',
            }),
          }),
        ),
      })),
    })),
  })),

  doc: jest.fn(() => ({
    set: jest.fn(() => Promise.resolve()),
    get: jest.fn(() =>
      Promise.resolve({
        exists: true,
        data: () => ({
          id: '123',
          displayName: 'Test User',
          email: 'test@example.com',
          photoURL: '',
          phoneNumber: '',
        }),
      }),
    ),
  })),

  setDoc: jest.fn(() => Promise.resolve()),
  getDoc: jest.fn(() =>
    Promise.resolve({
      exists: true,
      data: () => ({
        id: '123',
        displayName: 'Test User',
        email: 'test@example.com',
        photoURL: '',
        phoneNumber: '',
      }),
    }),
  ),

  serverTimestamp: jest.fn(() => new Date()),
};

export const getFirestore = jest.fn(() => mockFirestore);
export default { getFirestore };

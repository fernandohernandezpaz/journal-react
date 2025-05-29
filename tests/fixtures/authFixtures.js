export const initialState = {
  status: 'checking',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authenticatedState = {
  status: 'authenticated',
  uid: '1234567890',
  email: 'fernando@gmail.com',
  displayName: 'Fernando',
  photoURL: 'https://example.com/photo.jpg',
  errorMessage: null,
};

export const notAuthenticatedState = {
  status: 'not-authenticated',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};


export const demoUserState = {
  status: 'authenticated',
  uid: '1234567892',
  email: 'demo@gmail.com',
  displayName: 'demo',
  photoURL: 'https://example.com/photo1.jpg',
  errorMessage: null,
};

import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { LoginPage } from '../../../src/auth/pages';
import { configureStore } from '@reduxjs/toolkit';
import { authSlide } from '../../../src/store/auth';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

const mockStartGoogleSignIn = jest.fn();
const mockStartUserPasswordLogin = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startUserPasswordLogin: ({email, password}) => () => mockStartUserPasswordLogin({email, password}),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    auth: authSlide.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  }
});


describe('Tests for LoginPage', () => {

  it('should render LoginPage correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
            }}>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // screen.debug();

    expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);

  });


  it( 'should the google button call startGoogleSignIn', () => {

    render(
      <Provider store={store}>
        <MemoryRouter
           future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
            }}>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const googleButton = screen.getByLabelText('google-btn');

    fireEvent.click(googleButton);

    expect( mockStartGoogleSignIn ).toHaveBeenCalled();

  });


  it('should button call the submit form', () => {
    const email = 'example@example.com'
    const password = '12345678';

    render(
      <Provider store={store}>
        <MemoryRouter
           future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
            }}>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole('textbox', { 'name': 'Correo' });
    fireEvent.change(emailField, { target: { name: 'email', value: email}});

    const passwordField = screen.getByTestId('password');
    fireEvent.change(passwordField, { target: { name: 'password', value: password}});

    const loginForm = screen.getByLabelText('submit-form');
    fireEvent.submit( loginForm );

    expect( mockStartUserPasswordLogin ).toHaveBeenCalledWith({ email, password });


  });

});

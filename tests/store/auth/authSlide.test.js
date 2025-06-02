import { authSlide, checkingCredentials, login, logout } from "../../../src/store/auth/authSlide";
import { authenticatedState, demoUserState, initialState } from "../../fixtures/authFixtures";

describe( 'Test authSlice', () => {

  it( 'should the slide called "auth"', () => {

    expect( authSlide.name ).toBe( 'auth' );

  });


  it( 'should be the initial state', () => {

    const state = authSlide.reducer( initialState, {} );

    expect( state ).toEqual( initialState );

  });


  it( 'should authenticate user', () => {

    const state = authSlide.reducer( initialState, login(demoUserState) );

    expect( state ).toEqual( {
      status: 'authenticated',
      uid: demoUserState.uid,
      email: demoUserState.email,
      displayName: demoUserState.displayName,
      photoURL: demoUserState.photoURL,
      errorMessage: null,
    } );

  });

  test( 'should logout user', () => {
    const state = authSlide.reducer( authenticatedState, logout(null));

    expect( state ).toEqual({
      ...initialState,
      status: 'no-authenticated',
    });

  });

  test( 'should show error message on logout', () => {

    const errorMessage = 'Invalid credentials';

    const state = authSlide.reducer( authenticatedState, logout({ errorMessage }) );

    expect( state ).toEqual({
      'status': 'no-authenticated',
      'uid': null,
      'email': null,
      'displayName': null,
      'photoURL': null,
      'errorMessage': errorMessage,
    });


  });

  test( 'should change the status to checking', () => {

    const state = authSlide.reducer( authenticatedState, checkingCredentials() );

    expect( state.status ).toBe( 'checking' );

  });

});

import { authSlide, login, logout } from "../../../src/store/auth/authSlide";
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

    expect( state ).toEqual( demoUserState );

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

});

import { loginWithEmailPassword, logOutFireBase, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/core/firebase/provider";
import {
  checkingAuthentication,
  checkingCredentials,
  login,
  logout,
  startGoogleSignIn,
  startLogOut,
  startUserPasswordLogin,
  startCreatingUserWithEmailPassword,
} from "../../../src/store/auth";
import { demoUserState } from "../../fixtures/authFixtures";

jest.mock("../../../src/core/firebase/provider");

describe("Test auth thunks", () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("should invoke the checkingCredentials", async () => {
    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  it("should get a successs login with startGoogleSignIn", async () => {
    delete demoUserState.errorMessage;
    const loginData = { ok: true, ...demoUserState };

    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(demoUserState));
  });

  it("should get an unsuccesss logout with startGoogleSignIn", async () => {
    const errorPayload = { errorMessage: "Invalid credentials" };
    const loginData = { ok: false, ...errorPayload };

    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(errorPayload.errorMessage));
  });

  test("should get a success login with startUserPasswordLogin", async () => {
    const loginData = { ok: true, ...demoUserState };

    const formData = { email: demoUserState.email, password: "123456" };

    await loginWithEmailPassword.mockResolvedValue( loginData );

    await startUserPasswordLogin(formData)(dispatch);

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );

    expect( dispatch ).toHaveBeenCalledWith( login( demoUserState ) );

  });

  test("should get an unsuccess logout with startUserPasswordLogin", async () => {
    const loginData = { ok: false, errorMessage: "Invalid credentials" };

    const formData = { email: demoUserState.email, password: "123456" };

    await loginWithEmailPassword.mockResolvedValue(loginData);
    await startUserPasswordLogin(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
    expect(dispatch).toHaveBeenCalledWith( logout( { errorMessage: loginData.errorMessage} ) );
  });


  it( 'should do a success logout', async () => {

    await startLogOut()(dispatch);

    expect( logOutFireBase ).toHaveBeenCalled();
    expect( dispatch ).toHaveBeenCalled();
    expect( dispatch ).toHaveBeenCalledWith( logout() );

  });

  it('should create a user with startCreatingUserWithEmailPassword and get a success response', async () => {

    const formData = {
      email: "example@example.com",
      password: '123456',
      displayName: "Example User"
    };

    await registerUserWithEmailPassword.mockResolvedValue({
      ok: true,
      uid: "12345",
      photoUrl: "https://example.com/photo.jpg",
    });

    await startCreatingUserWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());

    expect(dispatch).toHaveBeenCalledWith(login({
      uid: "12345",
      email: formData.email,
      displayName: formData.displayName,
      photoUrl: "https://example.com/photo.jpg"
    }));


  });

  it('should create a user with startCreatingUserWithEmailPassword and get an error', async () => {

    const formData = {
      email: "example@example.com",
      password: '123456',
      displayName: "Example User",
    };
    const errorMessage = "User already exists";

    await registerUserWithEmailPassword.mockResolvedValue({
      ok: false,
      errorMessage,
    });

    await startCreatingUserWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());

    expect(dispatch).toHaveBeenCalledWith(logout({
      errorMessage,
    }));


  });


});

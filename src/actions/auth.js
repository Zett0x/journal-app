import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleAuthProvider } from "../firebase/firebase-conf";
import { types } from "../types/types";
import { removeError, startLoading, finishLoading } from "./ui";
import Swal from "sweetalert2";

export const login = (uid, displayName) => ({
  type: types.login,
  payload: { uid, displayName },
});
export const logout = () => ({
  type: types.logout,
});

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const { uid, displayName } = user;
        dispatch(login(uid, displayName));
      })
      .catch((error) => {
        const customErrorStringTemp = error.message
          .trim()
          .replace("Firebase: Error (auth/", "")
          .replaceAll("-", " ")
          .replace(")", "")
          .replace("Firebase:", "");

        const customErrorString =
          customErrorStringTemp.charAt(0).toUpperCase() +
          customErrorStringTemp.slice(1);

        Swal.fire("Error", customErrorString, "error");
      })
      .finally(() => {
        dispatch(finishLoading());
      });
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateProfile(auth.currentUser, {
          displayName: name,
        }).then(() => {
          const { uid, displayName } = user;
          dispatch(login(uid, displayName));
          dispatch(removeError()); //added temp
        });
      })
      .catch((error) => {
        const customErrorStringTemp = error.message
          .trim()
          .replace("Firebase: Error (auth/", "")
          .replaceAll("-", " ")
          .replaceAll(")", "")
          .replace("Firebase:", "");
        const customErrorString =
          customErrorStringTemp.charAt(0).toUpperCase() +
          customErrorStringTemp.slice(1);
        Swal.fire("Error", customErrorString, "error");
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;

        const { uid, displayName } = user;

        dispatch(login(uid, displayName));

        // ...
      })
      .catch((error) => {
        // // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ..
      });
  };
};

export const startLogOut = () => {
  return async (dispatch) => {
    await auth.signOut();
    dispatch(logout());
  };
};

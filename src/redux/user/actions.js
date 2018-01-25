import { AsyncStorage } from 'react-native';
import { ErrorMessages, Firebase, FirebaseRef } from '@constants/';
import * as RecipeActions from '../recipes/actions';
import { Actions } from 'react-native-router-flux';

/**
  * Get Login Credentials from AsyncStorage
  */
async function getCredentialsFromStorage() {
  const values = await AsyncStorage.getItem('api/credentials');
  const jsonValues = JSON.parse(values);

  // Return credentials from storage, or an empty object
  if (jsonValues.email || jsonValues.password) return jsonValues;
  return {};
}

/**
  * Save Login Credentials to AsyncStorage
  */
async function saveCredentialsToStorage(email = '', password = '') {
  await AsyncStorage.setItem('api/credentials', JSON.stringify({ email, password }));
}

/**
  * Remove Login Credentials from AsyncStorage
  */
async function removeCredentialsFromStorage() {
  await AsyncStorage.removeItem('api/credentials');
}

/**
  * Get this User's Details
  */
function getUserData(dispatch) {
  if (Firebase === null) {
    return () => new Promise((resolve, reject) =>
      reject({ message: ErrorMessages.invalidFirebase }));
  }

  const UID = Firebase.auth().currentUser.uid;
  if (!UID) return false;

  const ref = FirebaseRef.child(`users/${UID}`);

  return ref.on('value', (snapshot) => {
    const userData = snapshot.val() || [];

    return dispatch({
      type: 'USER_DETAILS_UPDATE',
      data: userData,
    });
  });
}

/**
  * Login to Firebase with Email/Password
  */
export function login(formData = {}, verifyEmail = false) {
  // Reassign variables for eslint ;)
  let mobile = formData.Mobile || '';
  let password = formData.Password || '';

    // When no credentials passed in, check AsyncStorage for existing details
    if (!mobile || !password) {
      return () => new Promise((resolve, reject) =>
        reject({ message: 'Please provide mobile and password both!' }));
    }

    // Update Login Creds in AsyncStorage
    if (mobile && password) {


      return () =>  fetch('http://ec2-18-216-151-224.us-east-2.compute.amazonaws.com:8000/login',
                   {
                     method: 'POST',
                     headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                     },
                     body: JSON.stringify({
                     username: mobile,
                     password: password,
                     })
                 }).then(

                 ).catch((err)=>{throw err })
  }
};

/**
  * Sign Up to Firebase
  */
export function signUp(formData = {}) {
  if (Firebase === null) {
    return () => new Promise((resolve, reject) =>
      reject({ message: ErrorMessages.invalidFirebase }));
  }

  const email = formData.Email || '';
  const password = formData.Password || '';
  const firstName = formData.FirstName || '';
  const lastName = formData.LastName || '';

  return () => Firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      // Setup/Send Details to Firebase database
      if (res && res.uid) {
        FirebaseRef.child(`users/${res.uid}`).set({
          firstName,
          lastName,
          signedUp: Firebase.database.ServerValue.TIMESTAMP,
          lastLoggedIn: Firebase.database.ServerValue.TIMESTAMP,
        });
      }
    });
}

/**
  * Reset Password
  */
export function resetPassword(formData = {}) {
  if (Firebase === null) {
    return () => new Promise((resolve, reject) =>
      reject({ message: ErrorMessages.invalidFirebase }));
  }

  const email = formData.Email || '';
  return () => Firebase.auth().sendPasswordResetEmail(email);
}

/**
  * Update Profile
  */
export function updateProfile(formData = {}) {
  if (Firebase === null) {
    return () => new Promise((resolve, reject) =>
      reject({ message: ErrorMessages.invalidFirebase }));
  }

  const UID = Firebase.auth().currentUser.uid;
  if (!UID) return false;

  const email = formData.Email || '';
  const firstName = formData.FirstName || '';
  const lastName = formData.LastName || '';

  // Set the email against user account
  return () => Firebase.auth().currentUser
    .updateEmail(email)
      .then(() => {
        // Then update user in DB
        FirebaseRef.child(`users/${UID}`).update({
          firstName, lastName,
        });
      });
}

/**
  * Logout
  */
export function logout() {
  if (Firebase === null) {
    return () => new Promise((resolve, reject) =>
      reject({ message: ErrorMessages.invalidFirebase }));
  }

  return dispatch => Firebase.auth()
    .signOut()
    .then(() => {
      removeCredentialsFromStorage();
      RecipeActions.resetFavourites(dispatch);
      dispatch({ type: 'USER_LOGOUT' });
    });
}

export function addDevice(formData = {}) {
  if (Firebase === null) {
    return () => new Promise((resolve, reject) =>
      reject({ message: ErrorMessages.invalidFirebase }));
  }

  const email = formData.Email || '';
  const password = formData.Password || '';
  const firstName = formData.FirstName || '';
  const lastName = formData.LastName || '';

  return () => Firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      // Setup/Send Details to Firebase database
      if (res && res.uid) {
        FirebaseRef.child(`users/${res.uid}`).set({
          firstName,
          lastName,
          signedUp: Firebase.database.ServerValue.TIMESTAMP,
          lastLoggedIn: Firebase.database.ServerValue.TIMESTAMP,
        });
      }
    });
}

/**
 * Firebase Reference/Init
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import * as Firebase from 'firebase';
// import {
//   API_KEY,
//   AUTH_DOMAIN,
//   DATABASE_URL,
//   STORAGE_BUCKET,
//   MESSAGING_SENDER_ID,
// } from 'react-native-dotenv';

const API_KEY = 'AIzaSyAZZ1Z3ZB8rGc0vTNNyDu4QhGnICajrMqA';
const AUTH_DOMAIN = 'studenttracker-b120f.firebaseapp.com';
const DATABASE_URL = 'https://studenttracker-b120f.firebaseio.com';
const STORAGE_BUCKET = 'studenttracker-b120f.appspot.com';
const MESSAGING_SENDER_ID = '952561093041';
let firebaseInitialized = false;

if (
  API_KEY !== 'null' &&
  AUTH_DOMAIN !== 'null' &&
  DATABASE_URL !== 'null' &&
  STORAGE_BUCKET !== 'null' &&
  MESSAGING_SENDER_ID !== 'null'
) {
  Firebase.initializeApp({
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
  });

  firebaseInitialized = true;
}

// firebaseInitialized = false;

export const FirebaseRef = firebaseInitialized ? Firebase.database().ref() : null;
export default firebaseInitialized ? Firebase : null;

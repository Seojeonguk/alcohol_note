import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { CACHE_SIZE_UNLIMITED, getFirestore, initializeFirestore } from 'firebase/firestore';

// Optionally import the services that you want to use
//import {...} from 'firebase/auth';
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: Constants.manifest.extra.firebaseApiKey,
  authDomain: Constants.manifest.extra.firebaseAuthDomain,
  projectId: Constants.manifest.extra.firebaseProjectId,
  storageBucket: Constants.manifest.extra.firebaseStorageBucket,
  messagingSenderId: Constants.manifest.extra.firebaseMessagingSenderId,
  appId: Constants.manifest.extra.firebaseAppId,
  measurementId: Constants.manifest.extra.firebaseMeasurementId,
};

let app;
let auth;
let db;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  db = initializeFirestore(app, {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  });
} else {
  app = getApp();
  auth = getAuth(app);
  db = getFirestore(app);
}

export { auth, db };

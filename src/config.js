import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
  connectAuthEmulator,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCPxoFmKby_ivzowd_H0NtSyJLm99oRYiI',
  authDomain: 'test-proj-9f46d.firebaseapp.com',
  projectId: 'test-proj-9f46d',
  storageBucket: 'test-proj-9f46d.appspot.com',
  messagingSenderId: '631888908208',
  appId: '1:631888908208:web:f621dea15574a60bff5075',
  measurementId: 'G-MG5J0MRJEZ',
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);

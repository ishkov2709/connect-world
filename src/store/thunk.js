import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from '../config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  updateDoc,
  getDoc,
} from 'firebase/firestore';

export const registerDB = createAsyncThunk(
  'user/register',
  async (credentials, thunkAPI) => {
    const { login, email, password, image } = credentials;
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;

      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        const storage = getStorage();
        const storageRef = await ref(storage, email);
        await uploadBytesResumable(storageRef, blob);
      }

      if (user) {
        await updateProfile(user, {
          displayName: login,
          photoURL: image,
        });
      }
    } catch (error) {
      throw thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const loginDB = createAsyncThunk(
  'user/login',
  async (credentials, thunkAPI) => {
    const { email, password } = credentials;
    let imageURL = null;
    try {
      const {
        user: { displayName, photoURL },
      } = await signInWithEmailAndPassword(auth, email, password);
      if (photoURL) {
        const storage = getStorage();
        const imageRef = ref(storage, '/' + email);
        imageURL = await getDownloadURL(imageRef);
      }
      return { displayName, email, imageURL };
    } catch (error) {
      throw thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const deletePhoto = createAsyncThunk(
  'user/deleteImg',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const storage = getStorage();

    const desertRef = ref(storage, '/' + state.user.email);
    await deleteObject(desertRef);

    const user = auth.currentUser;

    if (user) {
      await updateProfile(user, {
        photoURL: '',
      });
    }
  }
);

export const uploadPhoto = createAsyncThunk('user/uploadImg', async image => {
  const user = auth.currentUser;
  const response = await fetch(image);
  const blob = await response.blob();
  const storage = getStorage();
  const storageRef = await ref(storage, user.email);
  await uploadBytesResumable(storageRef, blob);

  if (user) {
    await updateProfile(user, {
      photoURL: image,
    });
  }

  const imageRef = ref(storage, '/' + user.email);
  const imageURL = await getDownloadURL(imageRef);
  return imageURL;
});

export const setPublication = createAsyncThunk(
  'public/set',
  async credentials => {
    const { data, image } = credentials;
    try {
      const docRef = await addDoc(collection(db, 'publics'), data);

      const response = await fetch(image);
      const blob = await response.blob();
      const storage = getStorage();
      const storageRef = await ref(storage, docRef.id);
      await uploadBytesResumable(storageRef, blob);
      const imageRef = ref(storage, '/' + docRef.id);
      const imageURL = await getDownloadURL(imageRef);
      return { id: docRef.id, ...data, imageURL };
    } catch (error) {
      throw error;
    }
  }
);

export const getPublications = createAsyncThunk('publics/get', async () => {
  try {
    const storage = getStorage();
    const snapshot = await getDocs(collection(db, 'publics'));
    return await Promise.all(
      snapshot.docs.map(async doc => {
        const imageRef = ref(storage, '/' + doc.id);
        const imageURL = await getDownloadURL(imageRef);
        return { id: doc.id, ...doc.data(), imageURL };
      })
    );
  } catch (error) {
    throw error;
  }
});

export const addComment = createAsyncThunk(
  'publics/addComment',
  async credentials => {
    try {
      const ref = doc(db, 'publics', credentials.id);
      const beforeDocSnap = await getDoc(ref);
      await updateDoc(ref, {
        comments: [...beforeDocSnap.data().comments, credentials.newComment],
      });
      const afterDocSnap = await getDoc(ref);
      return { ...afterDocSnap.data(), id: credentials.id };
    } catch (error) {
      throw error;
    }
  }
);

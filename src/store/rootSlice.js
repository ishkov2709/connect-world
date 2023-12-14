import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import {
  addComment,
  deletePhoto,
  getPublications,
  loginDB,
  registerDB,
  setPublication,
  uploadPhoto,
} from './thunk';
import {
  handleAddCommentsFulfilled,
  handleAddCommentsPending,
  handleAddCommentsRejected,
  handleDeletePhotoFulfilled,
  handleDeletePhotoPending,
  handleDeletePhotoRejected,
  handleGetPublicationsFulfilled,
  handleGetPublicationsPending,
  handleGetPublicationsRejected,
  handleLoginFulfilled,
  handleLoginPending,
  handleLoginRejected,
  handleRegisterFulfilled,
  handleRegisterPending,
  handleRegisterRejected,
  handleSetPublicationsFulfilled,
  handleSetPublicationsPending,
  handleSetPublicationsRejected,
  handleUploadPhotoFulfilled,
  handleUploadPhotoPending,
  handleUploadPhotoRejected,
} from './operations';

const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    turnOffSuccess: state => {
      state.isSuccess = false;
    },
    clearError: state => {
      state.error = null;
    },
    logout: state => {
      state.user = null;
      state.publics = [];
      state.isLoading = false;
      state.isSuccess = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerDB.pending, handleRegisterPending)
      .addCase(registerDB.fulfilled, handleRegisterFulfilled)
      .addCase(registerDB.rejected, handleRegisterRejected)
      .addCase(loginDB.pending, handleLoginPending)
      .addCase(loginDB.fulfilled, handleLoginFulfilled)
      .addCase(loginDB.rejected, handleLoginRejected)
      .addCase(deletePhoto.pending, handleDeletePhotoPending)
      .addCase(deletePhoto.fulfilled, handleDeletePhotoFulfilled)
      .addCase(deletePhoto.rejected, handleDeletePhotoRejected)
      .addCase(uploadPhoto.pending, handleUploadPhotoPending)
      .addCase(uploadPhoto.fulfilled, handleUploadPhotoFulfilled)
      .addCase(uploadPhoto.rejected, handleUploadPhotoRejected)
      .addCase(setPublication.pending, handleSetPublicationsPending)
      .addCase(setPublication.fulfilled, handleSetPublicationsFulfilled)
      .addCase(setPublication.rejected, handleSetPublicationsRejected)
      .addCase(getPublications.pending, handleGetPublicationsPending)
      .addCase(getPublications.fulfilled, handleGetPublicationsFulfilled)
      .addCase(getPublications.rejected, handleGetPublicationsRejected)
      .addCase(addComment.pending, handleAddCommentsPending)
      .addCase(addComment.fulfilled, handleAddCommentsFulfilled)
      .addCase(addComment.rejected, handleAddCommentsRejected);
  },
});

export const { turnOffSuccess, clearError, logout } = rootSlice.actions;

export const rootReducer = rootSlice.reducer;

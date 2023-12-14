// Register

export const handleRegisterPending = state => {
  state.isLoading = true;
};

export const handleRegisterFulfilled = state => {
  state.isLoading = false;
  state.isSuccess = true;
};

export const handleRegisterRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

// Login

export const handleLoginPending = state => {
  state.isLoading = true;
};

export const handleLoginFulfilled = (state, { payload }) => {
  state.user = { ...payload };
  state.isLoading = false;
  state.isLoggedIn = true;
};

export const handleLoginRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

// Delete Photo

export const handleDeletePhotoPending = state => {
  state.isLoading = true;
};

export const handleDeletePhotoFulfilled = state => {
  state.isLoading = false;
  state.user = { ...state.user, imageURL: null };
};

export const handleDeletePhotoRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

// Upload Photo

export const handleUploadPhotoPending = state => {
  state.isLoading = true;
};

export const handleUploadPhotoFulfilled = (state, { payload }) => {
  state.isLoading = false;
  state.user = { ...state.user, imageURL: payload };
};

export const handleUploadPhotoRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

// Set Publics

export const handleSetPublicationsPending = state => {
  state.isLoading = true;
};

export const handleSetPublicationsFulfilled = (state, { payload }) => {
  state.publics = [payload, ...state.publics];
};

export const handleSetPublicationsRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

//Get Publics

export const handleGetPublicationsPending = state => {
  state.isLoading = true;
};

export const handleGetPublicationsFulfilled = (state, { payload }) => {
  state.isLoading = false;
  state.publics = [...payload];
};

export const handleGetPublicationsRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

// Add Comments

export const handleAddCommentsPending = state => {
  state.isLoading = true;
};

export const handleAddCommentsFulfilled = (state, { payload }) => {
  state.isLoading = false;
  state.publics = state.publics.map(el =>
    el.id === payload.id ? { ...el, comments: payload.comments } : { ...el }
  );
};

export const handleAddCommentsRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

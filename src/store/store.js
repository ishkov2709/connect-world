import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rootReducer } from './rootSlice';
import { configureStore } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelift: ['user'],
};

const presistMiddleware = getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  });

const reducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer,
  middleware: presistMiddleware,
});

const persistor = persistStore(store);

export default { store, persistor };

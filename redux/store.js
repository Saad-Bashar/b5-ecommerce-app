import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import productsReducer from './productsSlice'
import cartReducer from './cartSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';



import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
  key: 'root',
  version: 2,
  storage: AsyncStorage,
}

const rootReducer = combineReducers ({
  counter: counterReducer,
  products: productsReducer,
  cart: cartReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

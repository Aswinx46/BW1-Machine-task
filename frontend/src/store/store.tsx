import storage from 'redux-persist/lib/storage'
import userSlice from './slices/user/userSlice'
import tokenSlice from './slices/token/tokenSlice'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
const persistConfig = {
    key: "root",
    storage,
    blacklist: ['token']
}

const rootReducer = combineReducers({
    user: userSlice,
    token:tokenSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
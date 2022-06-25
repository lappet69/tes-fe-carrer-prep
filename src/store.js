/* eslint-disable import/no-anonymous-default-export */
import { createStore } from 'redux'

import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
  sidebarShow: true,
  authed: false,
  tokenUser: {},
  product: {},
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authed', 'tokenUser', 'product'],
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    case 'SET_USER':
      return { ...state, tokenUser: { ...rest }, authed: true }
    case 'GET_USER':
      return { ...state, tokenUser: { ...rest }, authed: true }
    case 'GET_PRODUCT':
      return { ...state, product: { ...rest } }
    case 'logout':
      return initialState
    default:
      return state
  }
}

export const store = createStore(persistReducer(persistConfig, changeState), composeWithDevTools())
export const persistor = persistStore(store)
export default { store, persistor }

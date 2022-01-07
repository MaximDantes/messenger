import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import authReducer from './auth/reducer'
import thunkMiddleware from 'redux-thunk'
import chatsReducer from './chats/reducer'
import profileReducer from './profile/reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    chats: chatsReducer,
})

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store
export type State = ReturnType<typeof rootReducer>


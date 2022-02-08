import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import authReducer from './auth/auth-reducer'
import thunkMiddleware from 'redux-thunk'
import chatsReducer from './chats/chats-reducer'
import profileReducer from './profile/profile-reducer'
import messagesReducer from './messages/messages-reducer'
import filesReducer from './files/files-reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    chats: chatsReducer,
    messages: messagesReducer,
    files: filesReducer,
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


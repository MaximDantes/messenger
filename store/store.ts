import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import authReducer from './auth/reducer'
import thunkMiddleware from 'redux-thunk'
import chatsReducer from './chats/reducer'
import messagesReducer from './app/reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    chats: chatsReducer,
    messages: messagesReducer
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


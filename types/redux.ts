import {ThunkAction} from 'redux-thunk'
import {State} from '../store/store'
import {Action} from 'redux'

//TODO remove ts ignore
type InferValues<T> = T extends { [key: string]: infer U } ? U : never
//@ts-ignore
export type ActionTemplate<T> = ReturnType<InferValues<T>>

export type ThunkTemplate<T extends Action> = ThunkAction<void, State, undefined, T>
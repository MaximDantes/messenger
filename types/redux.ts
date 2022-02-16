import {ThunkAction} from 'redux-thunk'
import {State} from '../store/store'
import {Action} from 'redux'

type InferValues<T> = T extends { [key: string]: infer U } ? U : never

//TODO remove ts ignore
//@ts-ignore
export type ActionTemplate<T> = ReturnType<InferValues<T>>

export type ThunkTemplate<T extends Action> = ThunkAction<void, State, undefined, T>
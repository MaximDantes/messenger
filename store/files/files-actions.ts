import {IFile} from '../../types/entities'

export const filesReceived = (files: IFile[]) => ({
    type: 'files/FILES_RECEIVED',
    payload: files
} as const)

export const fetchingStateChanged = (isFetching: boolean) => ({
    type: 'files/FETCHING_STATE_CHANGED',
    payload: isFetching
} as const)
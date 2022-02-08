import {IFile} from '../../types/entities'

export const filesReceived = (files: IFile[]) => ({
    type: 'files/FILES_RECEIVED',
    payload: files
} as const)
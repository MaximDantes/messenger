import {ISpeciality} from '../../types/entities'

export const specialitiesReceived = (specialities: ISpeciality[]) => ({
    type: 'specialities/SPECIALITIES_RECEIVED',
    payload: specialities
} as const)
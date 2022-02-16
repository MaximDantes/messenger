import {State} from '../store/store'

export const selectArticles = (specialityId?: number, courseId?: number, teacherId?: number) =>
    (state: State) => state.articles.articles
        .filter(item => item.courseId === courseId && item.specialityId === specialityId &&
            (!teacherId || item.teacherId === teacherId))
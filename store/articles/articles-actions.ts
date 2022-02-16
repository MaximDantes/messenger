import {IArticle, ISpeciality} from '../../types/entities'

export const articlesReceived = (articles: IArticle[]) => ({
    type: 'articles/ARTICLES_RECEIVED',
    payload: articles
} as const)
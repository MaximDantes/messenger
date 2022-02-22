import {IArticle, IArticlePreview} from '../../types/entities'
import {bool} from 'yup'

export const articlesPreviewsReceived = (articlesPreviews: IArticlePreview[]) => ({
    type: 'articles/ARTICLES_PREVIEWS_RECEIVED',
    payload: articlesPreviews
} as const)

export const articleReceived = (article: IArticle) => ({
    type: 'articles/ARTICLE_RECEIVED',
    payload: article
} as const)

export const articleRemoved = (articleId: number) => ({
    type: 'articles/ARTICLE_REMOVED',
    payload: articleId
} as const)

export const articleCreated = (articlePreview: IArticlePreview) => ({
    type: 'articles/ARTICLE_CREATED',
    payload: articlePreview
} as const)

export const shareArticle = (sharedArticle: IArticlePreview) => ({
    type: 'articles/SHARED_ARTICLE_CHANGED',
    payload: sharedArticle
} as const)

export const removeArticleFromSharing = (id: number) => ({
    type: 'articles/ARTICLE_REMOVED_FROM_SHARING',
    payload: id
} as const)

export const fetchingStateChanged = (isFetching: boolean) => ({
    type: 'articles/FETCHING_STATE_CHANGED',
    payload: isFetching
} as const)
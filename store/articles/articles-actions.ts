import {IArticle, IArticlePreview} from '../../types/entities'

export const articlesPreviewsReceived = (articlesPreviews: IArticlePreview[]) => ({
    type: 'articles/ARTICLES_PREVIEWS_RECEIVED',
    payload: articlesPreviews
} as const)

export const articleReceived = (article: IArticle) => ({
    type: 'articles/ARTICLE_RECEIVED',
    payload: article
} as const)

export const shareArticle = (sharedArticle: IArticlePreview) => ({
    type: 'articles/SHARED_ARTICLE_CHANGED',
    payload: sharedArticle
} as const)

export const removeArticleFromSharing = (id: number) => ({
    type: 'articles/ARTICLE_REMOVED_FROM_SHARING',
    payload: id
} as const)
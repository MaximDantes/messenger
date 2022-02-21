import {State} from '../store'

export const selectArticlesPreviews = (state: State) => state.articles.articlesPreviews

export const selectArticle = (articleId: number) => (state: State) => state.articles.articles
    .find(item => item.id === articleId)

export const selectSharedArticle = (state: State) => state.articles.sharedArticles

export const selectIsArticleInSharing = (id: number) => (state: State) => !!state.articles.sharedArticles
    .find(item => item.id === id)
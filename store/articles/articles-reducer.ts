import {ActionTemplate, ThunkTemplate} from '../../types/redux'
import * as actions from './articles-actions'
import {IArticle, IArticlePreview} from '../../types/entities'

const initialState = {
    articlesPreviews: [] as IArticlePreview[],
    articles: [] as IArticle[],
    sharedArticles: [] as IArticlePreview[],
    isFetching: false
}

const articlesReducer = (state = initialState, action: Action): typeof initialState => {
    switch (action.type) {
        case 'articles/ARTICLES_PREVIEWS_RECEIVED':
            return {
                ...state,
                articlesPreviews: action.payload
            }

        case 'articles/ARTICLE_RECEIVED':
            return {
                ...state,
                articles: [...state.articles, action.payload]
            }

        case 'articles/ARTICLE_REMOVED':
            return {
                ...state,
                articles: state.articles.filter(item => item.id !== action.payload),
                articlesPreviews: state.articlesPreviews.filter(item => item.id !== action.payload),
                sharedArticles: state.sharedArticles.filter(item => item.id !== action.payload)
            }

        case 'articles/ARTICLE_CREATED':
            return {
                ...state,
                articlesPreviews: [...state.articlesPreviews, action.payload]
            }

        case 'articles/ARTICLE_EDITED':
            return {
                ...state,
                articles: [...state.articles.filter(item => item.id !== action.payload.id), action.payload]
            }

        case 'articles/SHARED_ARTICLE_CHANGED':
            return {
                ...state,
                sharedArticles: [...state.sharedArticles, action.payload]
            }

        case 'articles/ARTICLE_REMOVED_FROM_SHARING':
            return {
                ...state,
                sharedArticles: state.sharedArticles.filter(item => item.id !== action.payload)
            }

        case 'articles/CLEAR_SHARING':
            return {
                ...state,
                sharedArticles: []
            }

        case 'articles/FETCHING_STATE_CHANGED':
            return {
                ...state,
                isFetching: action.payload
            }

        default:
            return state
    }
}

export default articlesReducer

export type Action = ActionTemplate<typeof actions>
export type Thunk = ThunkTemplate<Action>
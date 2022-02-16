import {ActionTemplate, ThunkTemplate} from '../../types/redux'
import * as actions from './articles-actions'
import {IArticle, ISpeciality} from '../../types/entities'
import excludeSameId from '../../utilits/exclude-same-id'

const initialState = {
    articles: [] as IArticle[]
}

const articlesReducer = (state = initialState, action: Action): typeof initialState => {
    switch (action.type) {
        case 'articles/ARTICLES_RECEIVED':
            return {
                ...state,
                articles: excludeSameId([...state.articles, ...action.payload])
            }

        default:
            return state
    }
}

export default articlesReducer

export type Action = ActionTemplate<typeof actions>
export type Thunk = ThunkTemplate<Action>
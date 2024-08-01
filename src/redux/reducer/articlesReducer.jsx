const initialState = {
  articles: [],
  loading: false,
  error: null,
  total: 0
}

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ARTICLES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      }
    case 'FETCH_ARTICLES_SUCCESS':
      return {
        ...state,
        loading: false,
        articles: action.payload.articles,
        total: action.payload.total
      }
    case 'FETCH_ARTICLES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case 'LIKE_ARTICLE_SUCCESS':
    case 'UNLIKE_ARTICLE_SUCCESS':
      return {
        ...state,
        articles: state.articles.map((article) =>
          article.slug === action.payload.slug ? { ...article, ...action.payload } : article
        )
      }
    case 'LIKE_ARTICLE_FAILURE':
    case 'UNLIKE_ARTICLE_FAILURE':
      return {
        ...state,
        error: action.payload
      }
    case 'DELETE_ARTICLE_SUCCESS':
      return {
        ...state,
        articles: state.articles.filter((article) => article.slug !== action.payload)
      }
    default:
      return state
  }
}

export default articlesReducer

// const initialState = {
//   oneArticle: [],
//   loading: false,
//   error: null
// }

// const articleReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'FETCH_ARTICLES_REQUEST':
//       return { ...state, loading: true }
//     case 'FETCH_ARTICLES_SUCCESS':
//       return { ...state, oneArticle: action.payload.articles, total: action.payload.total, loading: false }
//     case 'FETCH_ARTICLES_FAILURE':
//       return { ...state, error: action.error, loading: false }
//     case 'UPDATE_ARTICLE_SUCCESS':
//       return state
//     case 'DELETE_ARTICLE_SUCCESS':
//       return state
//     case 'LIKE_ARTICLE_SUCCESS':
//       return state
//     case 'LIKE_ARTICLE_FAILURE':
//       return { ...state, error: action.payload }
//     case 'UNLIKE_ARTICLE_SUCCESS':
//       return state
//     case 'UNLIKE_ARTICLE_FAILURE':
//       return { ...state, error: action.payload }
//     case 'CLEAR_ARTICLES':
//       return {
//         oneArticle: []
//       }
//     default:
//       return state
//   }
// }

// export default articleReducer

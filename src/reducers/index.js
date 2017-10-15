import { combineReducers } from 'redux';
import PostsReducer from './PostsReducer.js';
import CategoriesReducer from './CategoriesReducer.js';
import CommentsReducer from './CommentsReducer.js';
import SortOrder from './SortOrder.js';
import CommentCount from './CommentCountPerPost'

const rootReducer = combineReducers({
  posts: PostsReducer,
  categories: CategoriesReducer,
  comments: CommentsReducer,
  sortOrder: SortOrder,
  commentCount: CommentCount
});

export default rootReducer;

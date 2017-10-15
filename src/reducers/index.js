import { combineReducers } from 'redux';
import PostsReducer from './PostsReducer.js';
import CategoriesReducer from './CategoriesReducer.js';
import CommentsReducer from './CommentsReducer.js';
import SortOrder from './SortOrder.js';

const rootReducer = combineReducers({
  posts: PostsReducer,
  categories: CategoriesReducer,
  comments: CommentsReducer,
  sortOrder: SortOrder
});

export default rootReducer;

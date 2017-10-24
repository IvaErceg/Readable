import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-thunk';
import './styles/index.css';
import App from './components/App';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import EditComment from './components/EditComment.js'
import PostDetails from './components/PostDetails';
import CategoryView from './components/CategoryView'
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers/index'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <Switch>
            <Route path="/comments/:id" component={EditComment}></Route>
                <Route path="/posts/new" component={CreatePost}></Route>
                <Route path="/edit/:id" component={EditPost}></Route>
                <Route path="/:category/posts" component={CategoryView}></Route>
                <Route path="/:category/:id" component={PostDetails}></Route>
                <Route path="/" component={App}></Route>
            </Switch>
        </BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();

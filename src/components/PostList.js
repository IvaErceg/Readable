import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../actions/posts';
import { getCategories } from '../actions/categories';
import { voteForPost } from '../actions/posts';
import { getComments } from '../actions/comments';
import { deletePost } from '../actions/posts';
import { orderPosts } from '../actions/posts';
import { connect } from 'react-redux';
import _ from 'lodash';
import Header from './Header';
import { getCommentCount } from '../actions/comments';
import Post from './Post.js';

class PostList extends Component {

  componentDidMount() {
    this.props.getPosts();
    this.props.getCategories();
  }

  renderPosts() {
    const posts = _.orderBy(this.props.posts, this.props.order, "desc");
    return _.map(posts, post => {
      return (
        <Post post={post} key={post.id} />
      )
    })
  }

  renderCategories() {
    return this.props.categories.map(category => {
      return (
        <li key={category.name} className="list-group-item"><Link to={`/${category.path}/posts`}>{category.name}</Link></li>
      )
    })
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <h1>Posts</h1>
          <div className="form-inline">
            <select className="form-control" onChange={e => this.props.orderPosts(e.target.value)}>
              <option value='timestamp'>Sort by date</option>
              <option value='voteScore'>Sort by votes</option>
              <option value='author'>Sort by author</option>
              <option value='name'>Sort by title</option>
            </select>
          </div>
          <div className="row">
            <section className="posts col-md-9">
              <ul className="list-group">
                {this.renderPosts()}
              </ul>
              <Link to='/posts/new' className="btn top-margin">Create post</Link>
            </section>
            <section className="categories col-md-3">
              <ul>
                {this.renderCategories()}
              </ul>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    categories: state.categories,
    order: state.sortOrder,
    comments: state.comments,
  }
}

export default connect(mapStateToProps, { getPosts, getCategories, voteForPost, deletePost, getComments, orderPosts, getCommentCount })(PostList);

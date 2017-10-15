import React, { Component } from 'react';
import '../styles/App.css';
import { Link } from 'react-router-dom';
import { getPosts } from '../actions';
import { getCategories } from '../actions';
import { voteForPost } from '../actions';
import { getComments } from '../actions';
import { deletePost } from '../actions';
import { orderPosts } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import Header from './Header';
import FontAwesome from 'react-fontawesome';
import { getCommentCount } from '../actions';

class App extends Component {

  componentDidMount() {
    this.props.getPosts();
    this.props.getCategories();
  }


  renderPosts() {
    const posts = _.orderBy(this.props.posts, this.props.order, "desc");
    
    return _.map(posts, post => {
      return (
        <li key={post.id}>
          <div className="card mb-3">
            <div className="card-block">
              <h4 className="category">{post.category}</h4>
              <Link to={`/posts/${post.id}`}><h3 className="card-title">{post.title}</h3></Link>
              <p className="card-text">{post.body.slice(0, 170).concat("...")}</p>
              <p className="card-text"><small class="text-muted">By {post.author}</small></p>
              <div className="row bottom">
              <h5></h5>
                <i className="fa fa-comment-o fa-2x text-muted" aria-hidden="true"></i>
                <i className="fa fa-thumbs-o-down fa-2x text-muted " aria-hidden="true"
                  onClick={() => { this.props.voteForPost(post.id, "downVote") }}></i>
                <h5>{post.voteScore}</h5>
                <i className="fa fa-thumbs-o-up fa-2x text-muted" aria-hidden="true" onClick={() => { this.props.voteForPost(post.id, "upVote") }}></i>
                <section className="buttons">
                  <button onClick={() => this.props.deletePost(post.id, () => this.props.getPosts())} className="btn text-xs-right">Delete</button>
                  <Link to={`/edit/${post.id}`} className="btn text-xs-right">Edit</Link></section>
              </div>
            </div>
          </div>
        </li>
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
          <div className="row">
            <section className="posts col-sm-10">
              <h1>Posts</h1>
              <div className="form-inline">
                <select className="form-control" onChange={e => this.props.orderPosts(e.target.value)}>
                  <option value='timestamp'>Sort by date</option>
                  <option value='voteScore'>Sort by votes</option>
                  <option value='author'>Sort by author</option>
                  <option value='name'>Sort by title</option>
                </select>
              </div>
              <ul className="list-group">
                {this.renderPosts()}
              </ul>
              <Link to='/posts/new' className="btn create">Create post</Link>
            </section>
            <section className="categories col-sm-2">
              <h1>categories</h1>
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
    comments: state.comments
  }
}

export default connect(mapStateToProps, { getPosts, getCategories, voteForPost, deletePost, getComments, orderPosts, getCommentCount })(App);

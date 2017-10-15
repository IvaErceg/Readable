import React, { Component } from 'react';
import '../styles/App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost } from '../actions';
import { getComments } from '../actions';
import { deletePost } from '../actions';
import CommentList from './comments'

class PostDetails extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getPost(id);
    this.props.getComments(id);
  }

  getTime = (timestamp) => {
    return new Date(timestamp).toDateString();
  }

  deletePostHelper = () => {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => this.props.history.push('/'));
  }


  render() {
    if (!this.props.post) {
      return <div>Loading...</div>
    }

    return (
      <div className="container">
      <section className="post">
        <div className="card text-center">
          <div className="card-header">
            <ul className="nav nav-pills card-header-pills">
              <li className="nav-item">
                <Link className="nav-link-active" to='/'>Back to Index</Link>
              </li>
            </ul>
          </div>
          <div className="card-block">
            <h1 className="card-title">{this.props.post.title}</h1>
            <h4>By {this.props.post.author}</h4>
            <h6 className="text-right">{this.getTime(this.props.post.timestamp)}</h6>
            <p className="card-text">{this.props.post.body}</p>
            <button onClick={this.deletePostHelper} className="btn text-xs-right">Delete</button>
            <Link to={`/edit/${this.props.post.id}`} className="btn text-xs-right">Edit</Link>
          </div>
        </div>
        </section>
        <CommentList parentId={this.props.post.id}/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.posts[ownProps.match.params.id],
    comments: state.comments.filter(comment => comment.parentId === ownProps.match.params.id),
  }
}

export default connect(mapStateToProps, { getPost, deletePost, getComments})(PostDetails);
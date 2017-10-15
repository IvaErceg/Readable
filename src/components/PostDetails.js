import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost } from '../actions';
import { getComments } from '../actions';
import { deletePost } from '../actions';
import { voteForPost } from '../actions';
import CommentList from './Comments'

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
              <h4 className="category">{this.props.post.category}</h4>
              <h1 className="card-title">{this.props.post.title}</h1>
              <h4>By {this.props.post.author}</h4>
              <h6 className="text-right">{this.getTime(this.props.post.timestamp)}</h6>
              <p className="card-text">{this.props.post.body}</p>
              <div className="row bottom">
                <h5>{this.props.comments.length}</h5>
                <i className="fa fa-comment-o fa-2x text-muted" aria-hidden="true"></i>
                <i className="fa fa-thumbs-o-down fa-2x text-muted " aria-hidden="true"
                  onClick={() => { this.props.voteForPost(this.props.post.id, "downVote") }}></i>
                <h5>{this.props.post.voteScore}</h5>
                <i className="fa fa-thumbs-o-up fa-2x text-muted" aria-hidden="true" onClick={() => { this.props.voteForPost(this.props.post.id, "upVote") }}></i>
                <section className="buttons">
                  <button onClick={this.deletePostHelper} className="btn text-xs-right">Delete</button>
                  <Link to={`/edit/${this.props.post.id}`} className="btn text-xs-right">Edit</Link>
                </section>
              </div>
            </div>
          </div>
        </section>
        <CommentList parentId={this.props.post.id} />
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

export default connect(mapStateToProps, { getPost, deletePost, getComments, voteForPost })(PostDetails);
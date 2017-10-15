
import React, { Component } from 'react';
import '../styles/App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost } from '../actions';
import { getComments } from '../actions';
import { deletePost } from '../actions';
import CommentList from './comments'

class Post extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getPost(id);
        this.props.getComments(id);
    }

    render() {
        if (!this.props.post) {
            return <div>Loading...</div>
        }

        return (
            <div>
            <Link to={`/posts/${post.id}`}><h3>{post.title}</h3></Link>
            <h4>{post.author}</h4>
            <button onClick={() => { this.props.voteForPost(post.id, "downVote") }} className="btn">-</button>
            <h5>{post.voteScore}</h5>
            <button onClick={() => { this.props.voteForPost(post.id, "upVote") }} className="btn">+</button>
            <button onClick={() => this.props.deletePost(post.id, () => this.props.getPosts())} className="btn text-xs-right">Delete</button>
            <Link to={`/edit/${post.id}`} className="btn text-xs-right">Edit</Link>)</div>)
        }}

        function mapStateToProps(state, ownProps) {
            return {
              post: state.posts[ownProps.match.params.id],
              comments: state.comments.filter(comment => comment.parentId === ownProps.match.params.id),
            }
          }

        export default connect({voteForPost, deletePost, getComments, getPost })(Post);



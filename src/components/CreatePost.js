import React, { Component } from 'react';
import '../styles/App.css';
import { createPost } from '../actions';
import { connect } from 'react-redux';
import PostForm from './PostForm'

class CreatePost extends Component {

    
    render() {
        return (
            <PostForm title="Create Post" onSubmit={(post) => this.props.createPost(post, () => this.props.history.push('/'))}/>)
    }
}

function mapStateToProps(state, ownProps) {
    return {
        post: state.posts[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { createPost })(CreatePost);
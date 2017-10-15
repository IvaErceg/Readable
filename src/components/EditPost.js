import React, { Component } from 'react';
import '../styles/App.css';
import { connect } from 'react-redux';
import PostForm from './PostForm'
import { editPost } from '../actions';

class EditPost extends Component {

  

    render() {
        return (
            <div>
            <PostForm title="Edit Post" post={this.props.post} onSubmit={(post) => this.props.editPost(post.id, post, () => this.props.history.push('/'))}/>
        </div>
        
        
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        post: state.posts[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { editPost })(EditPost);
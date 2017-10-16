import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostForm from './PostForm'
import { editPost } from '../actions/posts';

class EditPost extends Component {

  

    render() {
        return (
            <div>
            <PostForm title="Edit Post" post={this.props.post} onSubmit={(post) => this.props.editPost(post.id, post, () => this.props.history.push(`/posts/${post.id}`))}/>
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
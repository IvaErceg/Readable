import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { addComment } from '../actions/comments';
import { connect } from 'react-redux';
import CommentForm from './CommentForm';

class CreateComment extends Component {

    render() {
        return (
            <div>
                <CommentForm title="Add Comment" parentId={this.props.parentId} onSubmit={(comment) => this.props.addComment(comment, () => this.props.history.push(`/posts/${this.props.parentId}`))} />
            </div>)
    }
}

function mapStateToProps(state, ownProps) {
    return {
        parentId: state.comments.map(comment => comment.parentId)[0]
    }
}

export default connect(mapStateToProps, { addComment })(CommentForm);
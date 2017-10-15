import React, { Component } from 'react';
import '../styles/App.css';
import { connect } from 'react-redux';
import CommentForm from './CommentForm'
import { editComment } from '../actions';

class EditComment extends Component {

    render() {
        return (
            <div>
                <CommentForm title="Edit Comment" comment = {this.props.comment} onSubmit={(comment) => this.props.editComment(comment.id, comment, () => this.props.history.push(`/posts/${comment.parentId}`))} />
            </div>


        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        comment: state.comments.filter(comment => comment.id === ownProps.match.params.id)[0]
    }
}

export default connect(mapStateToProps, { editComment })(EditComment);
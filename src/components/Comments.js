import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { deleteComment } from '../actions/comments';
import { getComments } from '../actions/comments';
import { addComment } from '../actions/comments';
import { voteForComment } from '../actions/comments';
import { connect } from 'react-redux';
import { orderComments } from '../actions/comments';
import uuid from 'uuid';
import _ from 'lodash';


class CommentList extends Component {

    state = {
        author: "",
        body: "",
        timestamp: Date.now(),
        id: uuid(),
        parentId: this.props.parentId
    }


    deleteCommentHelper = (id) => {
        this.props.deleteComment(id, this.props.getComments(this.props.parentId));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addComment(
            {
                author: this.state.author,
                body: this.state.body,
                timestamp: this.state.timestamp,
                id: this.state.id,
                parentId: this.state.parentId
            }, () => this.props.getComments(this.props.parentId))

        this.setState({
            author: "",
            body: "",
            timestamp: Date.now(),
            id: uuid(),
            parentId: this.props.parentId
        })
    }


    onAuthorChange = (e) => {
        this.setState({ author: e.target.value })
    }

    onContentChange = (e) => {
        this.setState({ body: e.target.value })
    }

    renderComments = () => {
        const comments = _.orderBy(this.props.comments, this.props.order, "desc");
        return (comments.map(comment => {
            return (<li className="comment-list" key={comment.id}>
                <div className="card mb-3">
                    <div className="card-block">
                        <p className="card-text">{comment.body}</p>
                        <p className="card-text text-muted">By {comment.author}</p>
                        <div className="row bottom">
                            <i className="fa fa-thumbs-o-down fa-2x text-muted " aria-hidden="true"
                                onClick={() => { this.props.voteForComment(comment.id, "downVote", () => this.props.getComments(this.props.parentId)) }}></i>
                            <h5>{comment.voteScore}</h5>
                            <i className="fa fa-thumbs-o-up text-muted fa-2x" aria-hidden="true" onClick={() => { this.props.voteForComment(comment.id, "upVote", () => this.props.getComments(this.props.parentId)) }}></i>
                            <section className="buttons">
                                <button onClick={() => this.props.deleteComment(comment.id, () => this.props.getComments(this.props.parentId))} className="btn text-xs-right">Delete</button>
                                <Link to={`/comments/${comment.id}`} className="btn">Edit</Link>
                            </section>
                        </div>
                    </div>
                </div>
            </li >)
        }))
    }


    render() {
        return (
            <section className="comments">
                <h2>Comments</h2>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Your name" className="form-control" value={this.state.author} onChange={this.onAuthorChange} type="text" name="author" id="author" />
                    <textarea rows="5" placeholder="Your comment" className="form-control" value={this.state.body} onChange={this.onContentChange} type="text" name="content" id="content"></textarea>
                    <button className="btn top-margin">Add Comment</button>
                </form>
                <div className="form-inline pull-right">
                    <select className="form-control" onChange={e => this.props.orderComments(e.target.value)}>
                        <option value='timestamp'>Sort by date</option>
                        <option value='voteScore'>Sort by votes</option>
                        <option value='author'>Sort by author</option>
                    </select>
                </div>
                <ul>{this.renderComments()}
                </ul>
            </section>
        )
    }
}


function mapStateToProps(state, ownProps) {
    return {
        comments: state.comments,
        order: state.sortOrder
    }
}

export default connect(mapStateToProps, { deleteComment, getComments, addComment, voteForComment, orderComments })(CommentList);

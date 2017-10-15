import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { deleteComment } from '../actions';
import { getComments } from '../actions';
import { addComment } from '../actions';
import { voteForComment } from '../actions';
import { connect } from 'react-redux';
import { orderComments } from '../actions';
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
            return (<li key={comment.id} className="list-group-item">
                <p>{comment.body}</p>
                <p>By {comment.author}</p>
                <button onClick={() => { this.props.voteForComment(comment.id, "downVote", () => this.props.getComments(this.props.parentId)) }} className="btn">-</button>
                <h5>{comment.voteScore}</h5>
                <button onClick={() => { this.props.voteForComment(comment.id, "upVote", () => this.props.getComments(this.props.parentId)) }} className="btn">+</button>
                <button className="btn btn-primary" onClick={() => this.props.deleteComment(comment.id, () => this.props.getComments(this.props.parentId))}>Delete</button>
                <Link to={`/comments/${comment.id}`} className="btn btn-primary">Edit</Link>
            </li>)
        }))
    }


    render() {
        return (
            <section className="comments">
                <h2>Comments</h2>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Your name" className="form-control" value={this.state.author} onChange={this.onAuthorChange} type="text" name="author" id="author" />
                    <textarea rows="5" placeholder="Your comment" className="form-control" value={this.state.body} onChange={this.onContentChange} type="text" name="content" id="content"></textarea>
                    <button className="btn">Add Comment</button>
                </form>
                <div className="form-inline">
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
    console.log(state, ownProps)
    return {
        comments: state.comments,
        order: state.sortOrder
    }
}

export default connect(mapStateToProps, { deleteComment, getComments, addComment, voteForComment, orderComments })(CommentList);
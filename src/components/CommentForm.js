
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import uuid from 'uuid';


class CommentForm extends Component {



    state = {
        author: this.props.comment ? this.props.comment.author : "",
        body: this.props.comment ? this.props.comment.body : "",
        timestamp: this.props.comment ? this.props.comment.timestamp : Date.now(),
        id: this.props.comment ? this.props.comment.id : uuid(),
        parentId: this.props.comment["parentId"]
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(
            {
            
                author: this.state.author,
                body: this.state.body,
                timestamp: this.state.timestamp,
                id: this.state.id,
                parentId: this.state.parentId
            })
    }



    onAuthorChange = (e) => {
        this.setState({ author: e.target.value })
    }

    onContentChange = (e) => {
        this.setState({ body: e.target.value })
    }


    render() {
        return (
            <div className="container">
                <h1 className="text-center">{this.props.title}</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input className="form-control" value={this.state.author} onChange={this.onAuthorChange} type="text" name="author" id="author" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Content</label>
                        <textarea rows="10" className="form-control" value={this.state.body} onChange={this.onContentChange} type="text" name="content" id="content"></textarea>
                        <button className="btn top-margin" type="submit">Save</button>
                        <Link to={`/posts/${this.state.parentId}`} className="btn top-margin">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default CommentForm;
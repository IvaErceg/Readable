
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import uuid from 'uuid';


class PostForm extends Component {



    state = {
        title: this.props.post ? this.props.post.title : "",
        author: this.props.post ? this.props.post.author : "",
        category: this.props.post ? this.props.post.category : "",
        body: this.props.post ? this.props.post.body : "",
        timestamp: this.props.post ? this.props.post.timestamp : Date.now(),
        id: this.props.post ? this.props.post.id : uuid()
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(
            {
                title: this.state.title,
                author: this.state.author,
                category: this.state.category,
                body: this.state.body,
                timestamp: this.state.timestamp,
                id: this.state.id
            })
    }

    onTitleChange = (e) => {
        this.setState({ title: e.target.value })
    }

    onAuthorChange = (e) => {
        this.setState({ author: e.target.value })
    }

    onCategoryChange = (e) => {
        this.setState({ category: e.target.value })
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
                        <label htmlFor="title">Title</label>
                        <input className="form-control" value={this.state.title} type="text" onChange={this.onTitleChange} name="title" id="title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input className="form-control" value={this.state.author} onChange={this.onAuthorChange} type="text" name="author" id="author" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Category</label>
                        <input className="form-control" value={this.state.category} onChange={this.onCategoryChange} type="text" name="category" id="category" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Content</label>
                        <textarea rows="10" className="form-control" value={this.state.body} onChange={this.onContentChange} type="text" name="content" id="content"></textarea>
                        <button className="btn top-margin" type="submit top-margin">Save</button>
                        <Link to={`/`} className="btn top-margin">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default PostForm;
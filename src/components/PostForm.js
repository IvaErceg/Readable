
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import uuid from 'uuid';


class PostForm extends Component {



    state = {
        title: this.props.post ? this.props.post.title : "",
        author: this.props.post ? this.props.post.author : "",
        category: this.props.post ? this.props.post.category : "react",
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
                        <div className="form-inline">
                        <select className="form-control" name="category" id="category" onChange={this.onCategoryChange}>
                          <option value='react'>React</option>
                          <option value='redux'>Redux</option>
                          <option value='udacity'>Udacity</option>
                        </select>
                      </div>
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
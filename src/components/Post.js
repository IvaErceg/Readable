import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../actions';
import { getCategories } from '../actions';
import { voteForPost } from '../actions';
import { getComments } from '../actions';
import { deletePost } from '../actions';
import { orderPosts } from '../actions';
import { connect } from 'react-redux';
import { getCommentCount } from '../actions';

class Post extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <li>
                <div className="card mb-3">
                    <div className="card-block">
                        <h4 className="category">{this.props.post.category}</h4>
                        <Link to={`/posts/${this.props.post.id}`}><h3 className="card-title">{this.props.post.title}</h3></Link>
                        <p className="card-text">{this.props.post.body.slice(0, 170).concat("...")}</p>
                        <p className="card-text"><small className="text-muted">By {this.props.post.author}</small></p>
                        <div className="row bottom">
                            <h5>{this.props.commentCount}</h5>
                            <i className="fa fa-comment-o fa-2x text-muted" aria-hidden="true"></i>
                            <i className="fa fa-thumbs-o-down fa-2x text-muted " aria-hidden="true"
                                onClick={() => { this.props.voteForPost(this.props.post.id, "downVote") }}></i>
                            <h5>{this.props.post.voteScore}</h5>
                            <i className="fa fa-thumbs-o-up fa-2x text-muted" aria-hidden="true" onClick={() => { this.props.voteForPost(this.props.post.id, "upVote") }}></i>
                            <section className="buttons">
                                <button onClick={() => this.props.deletePost(this.props.post.id, () => this.props.getPosts())} className="btn text-xs-right">Delete</button>
                                <Link to={`/edit/${this.props.post.id}`} className="btn text-xs-right">Edit</Link></section>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}
function mapStateToProps(state, ownProps) {
    console.log(state)
    return {
        commentCount: state.commentCount
    }
}

export default connect(mapStateToProps, { getPosts, getCategories, voteForPost, deletePost, getComments, orderPosts, getCommentCount })(Post);



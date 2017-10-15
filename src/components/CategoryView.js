import React, { Component } from 'react';
import { getPosts } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Header from './Header';
import { voteForPost } from '../actions';
import { getComments } from '../actions';
import { deletePost } from '../actions';

class CategoryView extends Component {

    componentDidMount() {
        this.props.getPosts();
    }



    render() {
        if (!this.props.categoryPosts) {
            return (<div>Loading...</div>)
        }
        return (
            <div>
                <Header />
                <div className="container">
                    <section className="posts">
                        <h2>Category: {this.props.match.params.category}</h2>
                        <ul className="list-group">
                            {_.map(this.props.categoryPosts, post => {
                                return (<li key={post.title} className="list-group-item">
                                    <Link to={`/posts/${post.id}`}><h3>{post.title}</h3></Link>
                                    <h4>{post.author}</h4>
                                    <button onClick={() => { this.props.voteForPost(post.id, "downVote") }} className="btn">-</button>
                                    <h5>{post.voteScore}</h5>
                                    <button onClick={() => { this.props.voteForPost(post.id, "upVote") }} className="btn">+</button>
                                    <button onClick={() => this.props.deletePost(post.id, () => this.props.getPosts())} className="btn text-xs-right">Delete</button>
                                    <Link to={`/edit/${post.id}`} className="btn text-xs-right">Edit</Link>
                                </li>)
                            })}

                        </ul>
                        <Link to='/' className="btn">Home</Link>
                    </section>
                </div>
            </div>
        )
    }


}

function mapStateToProps(state, ownProps) {
    return {
        categoryPosts: _.filter(state.posts, post => post.category === ownProps.match.params.category)
    }
}



export default connect(mapStateToProps, { getPosts, voteForPost, getComments, deletePost })(CategoryView);
import React, { Component } from 'react';
import { getPosts } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Header from './Header';
import { voteForPost } from '../actions';
import { getComments } from '../actions';
import { deletePost } from '../actions';
import Post from './Post';

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
                                return (<Post post={post}/>)
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
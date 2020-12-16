import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchPosts, removePost, upVotePost, downVotePost, fetchPostComments, fetchCategories
} from '../../actions';
import { PostList, SideNav } from '../../components';

class Home extends Component {
  componentDidMount() {
    this.props.fetchPosts().then(data => {
      data && data.payload && data.payload.map(post => this.props.fetchPostComments(post.id));
    });
    this.props.fetchCategories();
  }

  render() {
    const { posts, categories, removePost, upVotePost, downVotePost } = this.props;
    const links = categories ? categories.map(category => {
      return { url: `/${category.path}`, name: category.name };
    }) : [];
    return (
      <div>
        <PostList posts={posts} onDeletePost={removePost} onUpVote={upVotePost} onDownVote={downVotePost}/>
        <SideNav links={links} />
      </div>
    );
  }
}
Home.propTypes = {
  fetchPosts: PropTypes.func,
  removePost: PropTypes.func,
  upVotePost: PropTypes.func,
  downVotePost: PropTypes.func,
  fetchPostComments: PropTypes.func,
  fetchCategories: PropTypes.func,
};

function mapStateToProps(state) {
  const { posts, categories } = state;
  return {
    posts,
    categories,
  };
}
export default connect(mapStateToProps, {
  fetchPosts,
  removePost,
  upVotePost,
  downVotePost,
  fetchPostComments,
  fetchCategories,
})(Home);

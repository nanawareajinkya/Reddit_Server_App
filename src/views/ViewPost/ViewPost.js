import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PostView } from '../../components';
import {
  fetchPost, fetchPostComments, fetchCategories, editPost,
  removePost, upVotePost, downVotePost, addPostComment,
  editPostComment, removePostComment, upVoteComment, downVoteComment,
} from "../../actions";
import CommentList from "../../components/CommentList/CommentList";

class ViewPost extends Component {
  componentDidMount() {
    const { match } = this.props;
    this.props.fetchPost(match.params.postId);
    this.props.fetchPostComments(match.params.postId);
    this.props.fetchCategories();
  }

  onDeletePost(postId) {
    this.props.removePost(postId);
    this.props.history.goBack();
  }

  render() {
    const {
      posts, match, upVotePost, downVotePost, addPostComment, editPostComment, removePostComment,
      upVoteComment, downVoteComment
    } = this.props;
    const post = posts && posts.find(post => {
      return post.id === match.params.postId;
    });
    if (!post) return null;
    if (post.deleted) {
      return (
        <div>Oops! This post has been deleted!</div>
      );
    }
    return (
      <div>
        <PostView
          timestamp={post.timestamp}
          title={post.title}
          body={post.body}
          author={post.author}
          category={post.category}
          voteScore={post.voteScore}
          onUpVote={() => upVotePost(post.id)}
          onDownVote={() => downVotePost(post.id)}
          postEditURL={`/${post.category}/${post.id}/edit`}
          categoryURL={`/${post.category}`}
          onDeletePost={() => this.onDeletePost(post.id)}
        />
        <CommentList
          postId={post.id}
          comments={post.comments}
          onEditComment={editPostComment}
          onDeleteComment={removePostComment}
          onUpVote={upVoteComment}
          onDownVote={downVoteComment}
          onAddComment={addPostComment}
        />
      </div>
    );
  }
}
ViewPost.propTypes = {
  posts: PropTypes.array,
  match: PropTypes.object,
  history: PropTypes.object,
  fetchPost: PropTypes.func,
  fetchPostComments: PropTypes.func,
  fetchCategories: PropTypes.func,
  removePost: PropTypes.func,
  upVotePost: PropTypes.func,
  downVotePost: PropTypes.func,
  addPostComment: PropTypes.func,
  editPostComment: PropTypes.func,
  removePostComment: PropTypes.func,
  upVoteComment: PropTypes.func,
  downVoteComment: PropTypes.func,
};
function mapStateToProps(state) {
  const { posts, comments } = state;
  return {
    posts,
    comments,
  };
}
export default connect(mapStateToProps, {
  fetchPost,
  fetchPostComments,
  fetchCategories,
  editPost,
  removePost,
  upVotePost,
  downVotePost,
  addPostComment,
  editPostComment,
  removePostComment,
  upVoteComment,
  downVoteComment,
})(ViewPost);

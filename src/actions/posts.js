import {
  getPosts, getPost, addPost, updatePost, deletePost, votePost,
  getPostComments, addComment, updateComment, deleteComment, voteComment, getCategoryPosts,
} from "../utils/apiHelper";
import uuidv1 from 'uuid/v1';

import {
  FETCH_POSTS, ADD_POST, UPDATE_POST,
  FETCH_POST_COMMENTS, ADD_POST_COMMENT, UPDATE_COMMENT,
  FETCH_CATEGORY_POSTS,
} from './types';

export function fetchPosts() {
  return dispatch => {
    return getPosts().then(posts => dispatch({
      type: FETCH_POSTS,
      payload: posts,
    }));
  };
}

export function fetchPost(postId) {
  return dispatch => {
    return getPost(postId).then(post => dispatch({
      type: UPDATE_POST,
      payload: post,
    }));
  };
}

export function editPost(post) {
  return dispatch => {
    return updatePost(post).then(post => dispatch({
      type: UPDATE_POST,
      payload: post,
    }));
  };
}

export function createPost(post) {
  return dispatch => {
    return addPost(post).then(post => dispatch({
      type: ADD_POST,
      payload: post,
    }));
  };
}

export function removePost(postId) {
  return dispatch => {
    return deletePost(postId).then(post => dispatch({
      type: UPDATE_POST,
      payload: post,
    }));
  };
}

export function upVotePost(postId) {
  return dispatch => {
    return votePost(postId, 'upVote').then(post => dispatch({
      type: UPDATE_POST,
      payload: post,
    }));
  };
}

export function downVotePost(postId) {
  return dispatch => {
    return votePost(postId, 'downVote').then(post => dispatch({
      type: UPDATE_POST,
      payload: post,
    }));
  };
}

export function fetchPostComments(postId) {
  return dispatch => {
    return getPostComments(postId).then(comments => dispatch({
      type: FETCH_POST_COMMENTS,
      payload: {
        postId,
        comments,
      },
    }));
  };
}

export function editPostComment(comment) {
  return dispatch => {
    return updateComment(comment).then(comment => dispatch({
      type: UPDATE_COMMENT,
      payload: comment,
    }));
  };
}

export function addPostComment(postId, comment) {
  const payload = {
    ...comment,
    timestamp: Date.now(),
    id: uuidv1(),
    parentId: postId,
  };
  return dispatch => {
    return addComment(payload).then(comment => dispatch({
      type: ADD_POST_COMMENT,
      payload: comment,
    }));
  };
}

export function removePostComment(commentId) {
  return dispatch => {
    return deleteComment(commentId).then(comment => dispatch({
      type: UPDATE_COMMENT,
      payload: comment,
    }));
  };
}

export function upVoteComment(commentId) {
  return dispatch => {
    return voteComment(commentId, 'upVote').then(comment => dispatch({
      type: UPDATE_COMMENT,
      payload: comment,
    }));
  };
}

export function downVoteComment(commentId) {
  return dispatch => {
    return voteComment(commentId, 'downVote').then(comment => dispatch({
      type: UPDATE_COMMENT,
      payload: comment
    }));
  };
}

export function fetchCategoryPosts(categoryId) {
  return dispatch => {
    return getCategoryPosts(categoryId).then(posts => dispatch({
      type: FETCH_CATEGORY_POSTS,
      payload: posts,
    }));
  };
}

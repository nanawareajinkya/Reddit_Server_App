import axios from 'axios';
import config from '../config.json';

// Axios settings
axios.defaults.baseURL = config.API_SERVER;
axios.defaults.headers.common['Authorization'] = config.AuthorizationToken;
axios.defaults.headers.post['Content-Type'] = 'application/json';


export const getPosts = () => {
  return axios.get('/posts').then(response => response && response.data ? response.data : []);
};

export const getPost = (postId) => {
  return axios.get(`posts/${postId}`)
    .then(response => response && response.data ? response.data : []);
};

export const updatePost = (post) => {
  return axios.put(`posts/${post.id}`, { title: post.title, body: post.body })
    .then(response => response && response.data ? response.data : []);
};

export const addPost = (post) => {
  return axios.post('/posts', post).then(response => response && response.data ? response.data : {});
};

export const deletePost = (postId) => {
  return axios.delete(`/posts/${postId}`).then(response => response.data ? response.data : {})
};

export const votePost = (postId, option) => {
  return axios.post(`/posts/${postId}`, { option }).then(response => response.data ? response.data : {})
};

export const getPostComments = (postId) => {
  return axios.get(`/posts/${postId}/comments`).then(response => response && response.data ? response.data : []);
};

export const addComment = (comment) => {
  return axios.post(`/comments`, comment)
    .then(response => response && response.data ? response.data : []);
};

export const updateComment = (comment) => {
  return axios.put(`/comments/${comment.id}`, { body: comment.body })
    .then(response => response && response.data ? response.data : []);
};

export const deleteComment = (commentId) => {
  return axios.delete(`/comments/${commentId}`).then(response => response.data ? response.data : {})
};

export const voteComment = (commentId, option) => {
  return axios.post(`/comments/${commentId}`, { option }).then(response => response.data ? response.data : {})
};

export const getCategoryPosts = (categoryId) => {
  return axios.get(`/${categoryId}/posts`).then(response => response && response.data ? response.data : []);
};

export const getCategories = () => {
  return axios.get('/categories').then(response => response && response.data ? response.data.categories : []);
};

import {
  FETCH_POSTS, ADD_POST, UPDATE_POST,
  UPDATE_COMMENT, ADD_POST_COMMENT,
  FETCH_POST_COMMENTS, FETCH_CATEGORY_POSTS
} from "../actions";

const postReducer = (state=[], action) => {
  switch(action.type) {
    case FETCH_POSTS:
      return action.payload;
    case ADD_POST:
      return state.concat(action.payload);
    case UPDATE_POST:
      if (state.length === 0) return [action.payload];
      return state.map(post => (post.id === action.payload.id ? {
        ...action.payload,
        comments: post.comments
      } : post));
    case FETCH_POST_COMMENTS:
      return state.map(post => {
        const newPost = { ...post };
        if (newPost.id === action.payload.postId) {
          newPost.comments = action.payload.comments;
        }
        return newPost;
      });
    case ADD_POST_COMMENT:
      return state.map(post => {
        const newPost = { ...post };
        if (newPost.id === action.payload.parentId) {
          newPost.comments = (newPost.comments || newPost.comments.length === 0) ?
            newPost.comments.concat(action.payload) : [action.payload];
        }
        return newPost;
      });
    case UPDATE_COMMENT:
      return state.map(post => {
        if (post.id === action.payload.parentId) {
          const newPost = { ...post };
          newPost.comments = post.comments ?
            post.comments.map(comment => comment.id === action.payload.id ? action.payload : comment) : [];
          return newPost;
        }
        return post;
      });
    case FETCH_CATEGORY_POSTS:
      return action.payload;
    default:
      return state;
  }
};

export default postReducer;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PostForm } from '../../components';
import { createPost, editPost, fetchPosts, fetchCategories } from '../../actions';
import uuidv1 from 'uuid/v1';

class AddEditPost extends Component {
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchCategories();
  }

  doSubmit = (isEdit, values) => {
    const { createPost, editPost, history } = this.props;
    if (isEdit) {
      // Edit Post
      editPost(values).then(() => {
        history.push(`/${values.category}/${values.id}`);
      });
    } else {
      // Add Post
      const payload = {
        ...values,
        timestamp: Date.now(),
        id: uuidv1(),
      };
      createPost(payload).then(() => {
        history.push(`/${payload.category}/${payload.id}`);
      });
    }
  };

  render() {
    const { isEdit, categories, initialValues } = this.props;
    return (
      <div>
        <PostForm
          isEdit={isEdit}
          initialValues={initialValues}
          categories={categories}
          onSubmit={ (values) => this.doSubmit(isEdit, values)}
        />
      </div>
    );
  }
}
AddEditPost.propTypes = {
  posts: PropTypes.array,
  match: PropTypes.object,
  history: PropTypes.object,
  createPost: PropTypes.func,
  editPost: PropTypes.func,
  fetchPosts: PropTypes.func,
  fetchCategories: PropTypes.func,
  initialValues: PropTypes.object,
};
function mapStateToProps(state, ownProps) {
  const { posts, categories } = state;
  let initialValues = {};
  let isEdit = false;
  if (ownProps && ownProps.match.params.postId) {
    // Edit Mode
    isEdit = true;
    initialValues = {
      ...posts.find(post => post.id === ownProps.match.params.postId),
      comments: null,
    }
  } else {
    // Add Mode
    initialValues = {
      category: categories && categories.length > 0 ? categories[0].path : '',
    }
  }
  return {
    isEdit,
    initialValues,
    categories,
  };
}
export default connect(mapStateToProps, {
  createPost,
  editPost,
  fetchPosts,
  fetchCategories,
})(AddEditPost);

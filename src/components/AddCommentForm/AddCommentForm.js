import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, reset } from 'redux-form';
import { commentsValidate } from '../../utils/validationHelper';
import { renderInputField, renderTextAreaField } from "../../utils/formHelper";
import './AddCommentForm.css';

const FORM_NAME = 'add-comment-form';

class AddCommentForm extends Component {
  render() {
    const { handleSubmit, submitting, pristine, reset, onSubmit, postId } = this.props;
    return (
      <div className="AddCommentForm-container">
        <form onSubmit={handleSubmit((values) => onSubmit(postId, values))}>
          <Field
            name="author"
            type="text"
            component={renderInputField}
            label="Author *"
            placeholder="Enter your name here"
          />
          <Field
            name="body"
            type="text"
            component={renderTextAreaField}
            label="Body *"
            placeholder="Enter comment here"
            rows="5"
          />
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            Submit
          </button>
          <button className="btn btn-secondary" type="button" disabled={pristine || submitting} onClick={reset}>
            Clear
          </button>
        </form>
      </div>
    );
  }
}
AddCommentForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  onSubmit: PropTypes.func,
  postId: PropTypes.string,
};
export default reduxForm({
  form: FORM_NAME,
  validate: commentsValidate,
  onSubmitSuccess: (result, dispatch) => dispatch(reset(FORM_NAME)),
})(AddCommentForm);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { commentsValidate } from '../../utils/validationHelper';
import { renderInputField, renderTextAreaField } from "../../utils/formHelper";
import { uniqueId } from 'lodash';
import './CommentCard.css';

const FORM_NAME = uniqueId('edit-comment-form-');

class EditCommentForm extends Component {
  render() {
    const { handleSubmit, submitting, pristine, reset, onSubmit } = this.props;
    return (
      <div className="CommentCard-editForm-container">
        <form onSubmit={handleSubmit(values => onSubmit(values))}>
          <Field
            name="author"
            type="text"
            component={renderInputField}
            label="Author *"
            placeholder="Enter your name here"
            disabled
          />
          <Field
            name="body"
            type="text"
            component={renderTextAreaField}
            label="Body *"
            placeholder="Enter comment here"
            rows="3"
          />
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            Submit
          </button>
          <button className="btn btn-secondary" type="button" disabled={pristine || submitting} onClick={reset}>
            Reset
          </button>
        </form>
      </div>
    );
  }
}
EditCommentForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  onSubmit: PropTypes.func,
};
export default reduxForm({
  form: FORM_NAME,
  validate: commentsValidate,
  onSubmitSuccess: (result, dispatch, props) => props.onSubmitSuccess(),
})(EditCommentForm);


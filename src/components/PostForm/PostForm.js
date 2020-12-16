import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, reset } from 'redux-form';
import { validate } from './validationHelper';
import { renderInputField, renderTextAreaField, renderSelectField } from "../../utils/formHelper";
import './PostForm.css';

const FORM_NAME = 'post-form';

class PostForm extends Component {
  render() {
    const { handleSubmit, submitting, pristine, reset, onSubmit, categories, isEdit } = this.props;
    const options = categories ? categories.map(category => ({ label: category.name, value: category.path })) : [];
    return (
      <div className="PostForm-container">
        <form onSubmit={handleSubmit((values) => onSubmit(values))}>
          <Field
            name="title"
            type="text"
            component={renderInputField}
            label="Title *"
            placeholder="Enter the title here"
          />
          <Field
            name="body"
            type="text"
            component={renderTextAreaField}
            label="Body *"
            placeholder="Enter the body here"
            rows="5"
          />
          <Field
            name="author"
            type="text"
            component={renderInputField}
            label="Author *"
            placeholder="Enter your name here"
            disabled={isEdit}
          />
          <Field
            name="category"
            component={renderSelectField}
            label="Category *"
            options={options}
            disabled={isEdit}
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
PostForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  onSubmit: PropTypes.func,
  categories: PropTypes.array,
  isEdit: PropTypes.bool,
};
export default reduxForm({
  form: FORM_NAME,
  validate,
  enableReinitialize: true,
  onSubmitSuccess: (result, dispatch) => dispatch(reset(FORM_NAME)),
})(PostForm);

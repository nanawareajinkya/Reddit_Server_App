export const commentsValidate = values => {
  const errors = {};
  if (!values.author) {
    errors.author = 'Author should not be empty';
  }
  if (!values.body) {
    errors.body = 'Body should not be empty';
  }
  return errors;
};

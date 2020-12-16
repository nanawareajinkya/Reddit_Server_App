export const validate = values => {
  const errors = {};
  if (!values.author) {
    errors.author = 'Author should not be empty';
  }
  if (!values.body) {
    errors.body = 'Body should not be empty';
  }
  if (!values.category) {
    errors.category = 'Category should not be empty';
  }
  if (!values.title) {
    errors.title = 'Title should not be empty';
  }
  return errors;
};

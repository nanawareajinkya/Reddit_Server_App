import React from 'react';

export const renderInputField = (props) => {
  const { input, label, placeholder, type, meta: { touched, error }, ...rest } = props;
  return (
    <div>
      <label className="FormLabel">{label}</label>
      <div>
        <input {...input} placeholder={placeholder} type={type} {...rest} />
        {touched && error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};


export const renderTextAreaField = (props) => {
  const { input, label, placeholder, type, meta: { touched, error }, ...rest } = props;
  return (
    <div>
      <label className="FormLabel">{label}</label>
      <div>
        <textarea {...input} placeholder={placeholder} type={type} {...rest} />
        {touched && error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export const renderSelectField = (props) => {
  const { input, label, meta: { touched, error }, options, ...rest } = props;
  return (
    <div>
      <label className="FormLabel">{label}</label>
      <div className="Select-container">
        <select {...input} {...rest} >
          {
            options && options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))
          }
        </select>
        {touched && error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};


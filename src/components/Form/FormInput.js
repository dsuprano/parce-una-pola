import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import FormPureInput from './Pure/FormPureInput';

const FormInput = forwardRef(({ label, submitOnNext, secureTextEntry, textInputProps, ...restOfProps }, ref) => {
  const [field, meta] = useField(restOfProps);
  const { handleBlur, handleSubmit, setFieldValue } = useFormikContext();

  const error = meta.touched && meta.error;
  const value = field.value || '';

  const onChangeValue = (value) => {
    if (value && textInputProps.keyboardType === 'numeric') {
      value = Number(value);
    }

    setFieldValue(field.name, value);
  };

  const onBlur = (e) => {
    handleBlur(field.name)(e);
  };

  return (
    <FormPureInput
      label={label}
      handleBlur={(e) => onBlur(e)}
      textInputProps={textInputProps}
      handleSubmit={handleSubmit}
      submitOnNext={submitOnNext}
      disabled={textInputProps?.disabled}
      handleChange={(e) => {
        onChangeValue(e);
      }}
      error={error}
      value={value.toString()}
      ref={ref}
      secureTextEntry={secureTextEntry}
      {...restOfProps}
    />
  );
});

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  submitOnNext: PropTypes.bool,
  textInputProps: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  secureTextEntry: PropTypes.bool,
};

export default FormInput;

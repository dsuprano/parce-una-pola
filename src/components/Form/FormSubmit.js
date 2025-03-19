import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';

import Button from 'components/ui/Button';

const FormSubmit = ({ disabled = false, children = null, isLoading = false, ...props }) => {
  const { isSubmitting, handleSubmit } = useFormikContext();

  return (
    <Button disabled={isSubmitting || disabled} onPress={handleSubmit} isLoading={isSubmitting || isLoading} {...props}>
      {children}
    </Button>
  );
};

FormSubmit.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

export default FormSubmit;

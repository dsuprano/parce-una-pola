import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';

import { Text, View } from 'react-native';
import Checkbox from 'components/ui/Checkbox';
import FormError from 'components/Form/FormError';
import theme from 'theme';

const FormCheckbox = forwardRef((props, ref) => {
  const { title, titleStyle, styleContainer, labelStyle, iconStyle, label, rounded, style, color, ...restOfProps } =
    props;
  const [field, meta] = useField(restOfProps);
  const { setFieldValue } = useFormikContext();

  const error = meta.touched && meta.error;

  const value = field.value || false;

  return (
    <View style={styleContainer}>
      {!!title && <Text style={titleStyle}>{title}</Text>}
      <Checkbox
        innerRef={ref}
        checked={value}
        label={label}
        setChecked={() => setFieldValue(field.name, !value)}
        labelStyle={labelStyle}
        iconStyle={iconStyle}
        rounded={rounded}
        style={style}
        color={color || theme.primary}
      />
      {!!error && <FormError error={error} />}
    </View>
  );
});

FormCheckbox.displayName = 'FormCheckbox';

FormCheckbox.propTypes = {
  title: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  titleStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  styleContainer: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  labelStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  iconStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  rounded: PropTypes.bool,
  color: PropTypes.string,
  error: PropTypes.string,
};

export default FormCheckbox;

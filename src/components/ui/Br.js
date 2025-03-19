import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const Br = ({ marginVertical }) => <View style={{ marginVertical }} />;

Br.propTypes = {
  marginVertical: PropTypes.number.isRequired,
};

export default Br;

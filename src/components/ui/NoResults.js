import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'components/ui/Icon';

import theme from 'theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  icon: {
    fontSize: 100,
    color: theme.grey,
  },
  title: {
    ...theme.fontStyle({
      fontSize: 18,
      fontWeight: '700',
    }),
    marginBottom: 5,
    textAlign: 'center',
  },
  content: {
    ...theme.fontStyle(),
    textAlign: 'center',
  },
  image: {
    width: '80%',
    resizeMode: 'contain',
  },
  actionButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  actionButtonText: {
    ...theme.fontStyle({
      fontSize: 16,
      fontWeight: '400',
    }),
  },
});

const NoResults = ({ image, icon, title, content, emptyAction = null, emptyActionText = null }) => (
  <View style={styles.container}>
    {!!title && <Text style={[styles.title]}>{title}</Text>}
    {!!content && <Text style={styles.content}>{content}</Text>}
    {typeof icon === 'string' ? <Icon name={icon} style={styles.icon} /> : icon}
    {image && <Image source={image} style={styles.image} />}
    {emptyAction && (
      <TouchableOpacity onPress={emptyAction} style={styles.actionButton}>
        <Text style={styles.actionButtonText}>{emptyActionText || ''}</Text>
      </TouchableOpacity>
    )}
  </View>
);

NoResults.propTypes = {
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.node,
  title: PropTypes.string,
  content: PropTypes.string,
};

export default NoResults;

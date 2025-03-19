import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import Icon from 'components/ui/Icon';

import theme from 'theme';
import HeaderTitle from './HeaderTitle';

const styles = StyleSheet.create({
  content: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.paddingHorizontal,
    height: 50,
  },
  headerLeft: {
    height: 40,
    justifyContent: 'center',
  },
  headerBody: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBack: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconBack: {
    color: theme.headerTitleColor,
    marginRight: 10,
  },
});

const Header = ({
  title = 'Moodai',
  subtitle = '',
  headerRight = null,
  backgroundColor = theme.primary,
  hideBackButton = false,
  backNavigation = null,
  iconBack = 'chevron-left',
  iconBackSize = 28,
}) => {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  const onBackNavigate = () => {
    if (canGoBack && !hideBackButton) {
      navigation.goBack();
    } else if (backNavigation) {
      backNavigation();
    }
  };

  const showGoBack = (canGoBack && !hideBackButton) || backNavigation;

  return (
    <View style={[styles.content, { backgroundColor }]}>
      {showGoBack && (
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onBackNavigate} style={styles.buttonBack}>
            <Icon name={iconBack} style={[styles.iconBack, { fontSize: iconBackSize }]} />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.headerBody}>
        {!!title && <HeaderTitle title={title} subtitle={subtitle} tintColor={styles.tintColor} />}
      </View>
      <View style={styles.headerRight}>
        {headerRight && headerRight({ titleColor: theme.primary, subtitleColor: theme.secondary })}
      </View>
    </View>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  headerRight: PropTypes.func,
  backgroundColor: PropTypes.string,
  hideBackButton: PropTypes.bool,
  backNavigation: PropTypes.func,
};

export default observer(Header);

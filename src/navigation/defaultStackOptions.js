import React from 'react';

import Header from 'components/Header';

import theme from 'theme';

const defaultTabStackOptions = {
  cardStyle: {
    backgroundColor: theme.backgroundScreen,
  },

  header: ({ options }) => {
    const backgroundColor = options?.backgroundHeader || theme.backgroundHeader;

    const title = options?.title;
    const subtitle = options?.subtitle;
    const iconBack = options?.iconBack;
    const iconBackSize = options?.iconBackSize;

    return (
      <Header
        title={title}
        subtitle={subtitle}
        headerRight={options.headerRight}
        backgroundColor={backgroundColor}
        hideBackButton={options.hideBackButton}
        hideDrawerButton={options.hideDrawerButton}
        backNavigation={options.backNavigation}
        iconBack={iconBack}
        iconBackSize={iconBackSize}
      />
    );
  },
};

export default defaultTabStackOptions;

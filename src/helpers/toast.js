import { defaults } from 'lodash';
import Snackbar from 'react-native-snackbar';

import theme from 'theme';

const generic = (options) => {
  const barStyle = {
    backgroundColor: theme.gray,
    color: theme.white,
  };

  switch (options.type) {
    case 'danger':
      barStyle.backgroundColor = theme.red;
      barStyle.color = theme.white;
      break;
    case 'success':
      barStyle.backgroundColor = theme.primary;
      barStyle.color = theme.white;
      break;
    default:
      break;
  }

  let config = {
    text: '',
    textColor: barStyle.color,
    backgroundColor: barStyle.backgroundColor,
    action: {
      textColor: barStyle.color,
      label: 'OK',
      onPress: () => Snackbar.dismiss(),
    },
    duration: 15000,
  };

  if (typeof options === 'string') {
    config.text = options;
  } else {
    config = defaults(options, config);
  }

  Snackbar.show(config);
};

const error = (text = 'Ocurrió un error inesperado.') =>
  generic({ text, type: 'danger', duration: Snackbar.LENGTH_LONG });
const success = (text) => generic({ text, type: 'success', duration: Snackbar.LENGTH_LONG });

export default { generic, error, success };

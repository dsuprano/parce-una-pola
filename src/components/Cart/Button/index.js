import React from 'react';
import { Text } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { GROUP_CART_STATUS } from 'models/GroupModel';

import Button from 'components/ui/Button';
import styles from './styles';

const CartButton = ({ group }) => {
  const { t } = useTranslation();

  const changeStatusOrder = (status) => {
    group?.setStatus(status);
  };

  let buttonText = '';
  let buttonAction = '';

  switch (group?.status) {
    case GROUP_CART_STATUS.OPEN:
      buttonText = t('cartScreen.button.close');
      buttonAction = GROUP_CART_STATUS.CLOSED;
      break;
    case GROUP_CART_STATUS.CLOSED:
      buttonText = t('cartScreen.button.delivered');
      buttonAction = GROUP_CART_STATUS.DELIVERED;
      break;
    default:
      return;
  }

  if (group?.isDelivered || !group?.canPlaceOrder || !group?.isMyGroup) {
    return;
  }

  return (
    <Button style={styles.button} onPress={() => changeStatusOrder(buttonAction)}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </Button>
  );
};

export default observer(CartButton);

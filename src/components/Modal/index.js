import { View, Text, Modal, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import Button from 'components/ui/Button';
import React from 'react';
import styles from './styles';

const CustomModal = ({
  visible,
  setModalVisible,
  hasBackdrop,
  title,
  buttonText,
  onPressOk,
  onPressBack,
  cancelButtonText,
  children,
  modalContainerStyle,
}) => (
  <TouchableWithoutFeedback style={styles.backdrop}>
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={() => {
          // Puedes manejar el cierre del modal aquí
          setModalVisible(false);
        }}
      >
        <View style={hasBackdrop && styles.backdrop}>
          <View style={[styles.modalContainer, modalContainerStyle]}>
            {children || (title && <Text style={styles.title}>{title}</Text>)}
            {buttonText && (
              <Button style={styles.button} onPress={onPressOk}>
                <Text>{buttonText}</Text>
              </Button>
            )}
            {cancelButtonText && (
              <Button style={styles.cancelButton} onPress={onPressBack} simple>
                <Text style={styles.cancelButtonText}>{cancelButtonText}</Text>
              </Button>
            )}
          </View>
        </View>
      </Modal>
    </View>
  </TouchableWithoutFeedback>
);

CustomModal.propTypes = {
  visible: PropTypes.bool,
  setModalVisible: PropTypes.func,
  hasBackdrop: PropTypes.bool,
  onPressBack: PropTypes.func,
  title: PropTypes.string,
  buttonText: PropTypes.string,
  onPressOk: PropTypes.func,
  cancelButtonText: PropTypes.string,
  modalContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default CustomModal;

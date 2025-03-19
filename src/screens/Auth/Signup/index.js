import React, { useLayoutEffect, useRef, useCallback } from 'react';
import { Keyboard, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useFocusEffect } from '@react-navigation/native';

import { useStore } from 'providers/StoreProvider';
import ToastHelper from 'helpers/toast';

import FormInput from 'components/Form/FormInput';
import FormSubmit from 'components/Form/FormSubmit';
import ScrollView from 'components/ui/ScrollView';
import Button from 'components/ui/Button';

import styles from './styles';

const SignupScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { authStore, themeStore } = useStore();
  const usernameInput = useRef();
  const passwordInput = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('signupScreen.title'),
      headerShown: true,
    });
  }, [navigation, t]);

  const handleOnSubmit = async ({ username, password }, { setSubmitting }) => {
    Keyboard.dismiss();
    setSubmitting(true);

    try {
      await authStore.signup(username, password);
    } catch (error) {
      ToastHelper.error(error?.message || t('generic.anErrorOccurred'));
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(t('signupScreen.errors.username.required'))
      .email(t('signupScreen.errors.username.email')),
    password: Yup.string().required(t('signupScreen.errors.password.required')),
  });

  const onPressSignup = () => {
    navigation.goBack();
  };

  useFocusEffect(
    useCallback(() => {
      themeStore.initialColors();
    }, [themeStore]),
  );

  return (
    <ScrollView keyboardShouldPersistTaps="always" bounces={false} contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleOnSubmit}
        >
          <View style={styles.form}>
            <FormInput
              ref={usernameInput}
              name="username"
              label={t('signupScreen.fields.username.label')}
              submitOnNext
              textInputProps={{
                caretHidden: false,
                textContentType: 'username',
                autoCompleteType: 'email',
                keyboardType: 'email-address',
                placeholder: t('signupScreen.fields.username.placeholder'),
                errorWithBackground: false,
                successIcon: true,
                autoCapitalize: 'none',
                onSubmitEditing: () => passwordInput.current?.focus(),
              }}
            />
            <FormInput
              ref={passwordInput}
              name="password"
              label={t('signupScreen.fields.password.label')}
              submitOnNext
              secureTextEntry
              textInputProps={{
                keyboardType: 'default',
                autoCompleteType: 'off',
                autoCorrect: false,
                placeholder: t('signupScreen.fields.password.placeholder'),
                errorWithBackground: false,
                autoCapitalize: 'none',
              }}
            />
            <View style={styles.containerButtonSubmit}>
              <FormSubmit>
                <Text>{t('signupScreen.buttons.login')}</Text>
              </FormSubmit>
            </View>
          </View>
        </Formik>
        <Button simple onPress={onPressSignup} style={styles.buttonSignup}>
          {t('signupScreen.buttons.back')}
        </Button>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;

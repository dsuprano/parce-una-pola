import React, { useLayoutEffect, useRef, useCallback } from 'react';
import { Keyboard, View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useStore } from 'providers/StoreProvider';
import ToastHelper from 'helpers/toast';
import routes from 'navigation/routes';

import FormInput from 'components/Form/FormInput';
import FormSubmit from 'components/Form/FormSubmit';
import ScrollView from 'components/ui/ScrollView';
import Button from 'components/ui/Button';

import styles from './styles';

const LoginScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { authStore, themeStore } = useStore();
  const usernameInput = useRef();
  const passwordInput = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('loginScreen.title'),
      headerShown: true,
    });
  }, [navigation, t]);

  const handleOnSubmit = async ({ username, password }, { setSubmitting }) => {
    Keyboard.dismiss();
    setSubmitting(true);

    try {
      await authStore.login(username, password);
    } catch (error) {
      ToastHelper.error(error?.message || t('generic.anErrorOccurred'));
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(t('loginScreen.errors.username.required'))
      .email(t('loginScreen.errors.username.email')),
    password: Yup.string().required(t('loginScreen.errors.password.required')),
  });

  const onPressSignup = () => {
    navigation.navigate(routes.SIGNUP);
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
              label={t('loginScreen.fields.username.label')}
              submitOnNext
              textInputProps={{
                caretHidden: false,
                textContentType: 'username',
                autoCompleteType: 'email',
                keyboardType: 'email-address',
                placeholder: t('loginScreen.fields.username.placeholder'),
                errorWithBackground: false,
                successIcon: true,
                autoCapitalize: 'none',
                onSubmitEditing: () => passwordInput.current?.focus(),
              }}
            />
            <FormInput
              ref={passwordInput}
              name="password"
              label={t('loginScreen.fields.password.label')}
              submitOnNext
              secureTextEntry
              textInputProps={{
                keyboardType: 'default',
                autoCompleteType: 'off',
                autoCorrect: false,
                placeholder: t('loginScreen.fields.password.placeholder'),
                errorWithBackground: false,
                autoCapitalize: 'none',
              }}
            />
            <View style={styles.containerButtonSubmit}>
              <FormSubmit>
                <Text>{t('loginScreen.buttons.login')}</Text>
              </FormSubmit>
            </View>
          </View>
        </Formik>
        <Button simple onPress={onPressSignup} style={styles.buttonSignup}>
          {t('loginScreen.buttons.signup')}
        </Button>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

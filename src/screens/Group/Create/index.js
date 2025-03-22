import React, { useLayoutEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { useStore } from 'providers/StoreProvider';
import ToastHelper from 'helpers/toast';

import { Listing, UserItem } from 'components/Listing';
import FormPureInput from 'components/Form/Pure/FormPureInput';
import NoResults from 'components/ui/NoResults';
import Button from 'components/ui/Button';

import styles from './styles';

const NewGroupScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { userStore, authStore, groupStore } = useStore();
  const [groupName, setGroupName] = useState('');
  const [usersSelected, setUsersSelected] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: t('newGroupScreen.title'),
    });
  }, [navigation, t]);

  const onPressItem = (user) => {
    if (usersSelected.includes(user.id)) {
      setUsersSelected(usersSelected.filter((id) => id !== user.id));
    } else {
      setUsersSelected([...usersSelected, user.id]);
    }
  };

  const onPressCreateGroup = async () => {
    try {
      if (!groupName) {
        ToastHelper.error(t('newGroupScreen.errors.groupName.required'));
        return;
      }

      navigation.goBack();
      await groupStore.openGroup(authStore?.user, groupName, [...usersSelected, authStore?.user?.id]);
    } catch (e) {
      ToastHelper.error(e.message);
    }
  };

  const sectionHeader = useMemo(() => {
    return (
      <View style={styles.containerHeader}>
        <View style={styles.containerLabel}>
          <Text style={styles.label}>{t('newGroupScreen.fields.users.label')}</Text>
        </View>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <FormPureInput
        label={t('newGroupScreen.fields.groupName.label')}
        handleChange={(e) => setGroupName(e)}
        handleBlur={() => true}
        value={groupName.toString()}
      />
      <Listing
        searchKey="email"
        showSearchInput
        items={userStore?.search}
        loading={userStore.isLoading}
        onFetchData={(params, searchKey) => userStore.searchUser(params, searchKey, authStore?.user?.id)}
        headerComponent={sectionHeader}
        renderItem={({ item }) => (
          <UserItem User={item} onPressItem={onPressItem} selected={usersSelected.includes(item.id)} />
        )}
        emptyComponent={<NoResults title={t('newGroupScreen.list.notFound')} />}
        contentContainerStyle={styles.contentContainerStyle}
        itemLayoutHeight={50}
      />
      <View style={styles.containerButton}>
        <Text style={styles.text}>
          {usersSelected.length ? `${t('newGroupScreen.label.members')}: ${usersSelected.length}` : ''}
        </Text>
        <Button style={styles.button} onPress={onPressCreateGroup}>
          <Text>{t('newGroupScreen.button.create')}</Text>
        </Button>
      </View>
    </View>
  );
};

export default observer(NewGroupScreen);

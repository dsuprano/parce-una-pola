// TODO: POR CONFIGURAR

// import messaging from '@react-native-firebase/messaging';
// import notifee, { EventType } from '@notifee/react-native';
import AuthService from 'services/AuthService';
// import NavigationHelper from 'helpers/navigation';
import ReportingHelper from 'helpers/reporting';

// import Routes from 'navigation/routes';

const REFER_TO = {
  DASHBOARD_TAB: 'dashboardTab',
  TASK_TAB: 'taskTab',
  ACTIVE_TASK_TAB: 'activeTaskTab',
  TASK_DETAIL: 'task',
};

let pendingNotification;
let _rootStore;

const openNotification = (notification) => {
  if (!_rootStore.authStore.token) {
    pendingNotification = notification;
    return;
  }

  switch (notification.referTo) {
    case REFER_TO.DASHBOARD_TAB:
      NavigationHelper.navigate(Routes.DASHBOARD_TAB);
      break;
    case REFER_TO.TASK_TAB:
      NavigationHelper.navigate(Routes.TASK_TAB);
      break;
    case REFER_TO.ACTIVE_TASK_TAB:
      NavigationHelper.navigate(Routes.ACTIVE_TASK_TAB);
      break;
    case REFER_TO.TASK_DETAIL:
      NavigationHelper.navigate(Routes.TASK_TAB, {
        screen: Routes.TASK_DETAIL,
        params: { id: notification?.referId },
        initial: false,
      });
      break;
    default: // Do nothing
      break;
  }
};

const actionNotification = (notification) => {
  if (!_rootStore.authStore.token) {
    return;
  }

  switch (notification.referTo) {
    case REFER_TO.TASK_DETAIL:
      _rootStore.workOrderStore.syncWorkOrder();
      break;
    default: // Do nothing
      break;
  }
};

const openPendingNotification = () => {
  if (pendingNotification) {
    openNotification(pendingNotification);
    return true;
  }

  return false;
};

const clearPendingNotification = () => {
  pendingNotification = null;
};

const createNotification = async (message) => {
  try {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: message.channelId || 'ChannelName',
      name: 'ChannelName',
    });

    // Display a notification
    notifee
      .displayNotification({
        id: message?.messageId,
        title: message?.notification?.title || 'Notification Title',
        body: message?.notification?.body || 'Main body content of the notification',
        data: message?.data || {},
        android: {
          channelId,
          pressAction: {
            launchActivity: 'default',
            id: 'default',
          },
        },
      })
      .catch((error) => {
        ReportingHelper.reportError(`Notification error: ${error}`);
      });
  } catch (err) {
    ReportingHelper.reportError(`Notification error: ${err}`);
  }
};

const init = async (rootStore) => {
  _rootStore = rootStore;

  messaging().onMessage((notification) => {
    actionNotification(notification?.data);
    createNotification(notification);
  });

  // Initial Listener
  messaging()
    .getInitialNotification()
    .then((notification) => {
      if (notification) {
        openNotification(notification?.data);
      }
    });

  const initialNotification = await notifee.getInitialNotification();

  if (initialNotification) {
    openNotification(initialNotification?.notification?.data);
  }

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage);
  });

  messaging().onNotificationOpenedApp((notification) => {
    openNotification(notification?.data);
  });

  // Foreground Listener
  notifee.onForegroundEvent(({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log('User dismissed notification');
        break;
      case EventType.PRESS:
        openNotification(detail?.notification?.data);
        break;
      default:
        break;
    }
  });

  // Background Listener
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;
    // Check if the user pressed the "Mark as read" action
    if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
      // Remove the notification
      await notifee.cancelNotification(notification.id);
    } else {
      openNotification(notification?.data);
    }
  });

  messaging().onTokenRefresh((token) => {
    if (_rootStore.authStore.isLoggedIn) {
      AuthService.sendDeviceToken(token);
    }
  });
};

const requestPermissions = async () => {
  try {
    await messaging().requestPermission();
  } catch (error) {
    // do nothing
  }
};

const getToken = async () => {
  await requestPermissions();

  let token = null;
  try {
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      await messaging().registerDeviceForRemoteMessages();
    }
    token = await messaging().getToken();
  } catch (e) {
    // do nothing
  }

  return token || 'testToken';
};

export default {
  init,
  requestPermissions,
  getToken,
  openPendingNotification,
  clearPendingNotification,
  openNotification,
};

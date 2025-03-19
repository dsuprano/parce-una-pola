import { getSystemName, getSystemVersion } from 'react-native-device-info';

const SystemName = () => getSystemName();
const SystemVersion = () => getSystemVersion();

export default { SystemName, SystemVersion };

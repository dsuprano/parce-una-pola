import { MMKV } from 'react-native-mmkv';
import { configurePersistable } from 'mobx-persist-store';
import { isArray } from 'lodash';

const storage = new MMKV();

/**
 * Get all keys in Storage.
 */
const getKeys = () => storage.getAllKeys();

/**
 * Get a one or more value for a key or array of keys from Storage.
 * @param {String|Array} key A key or array of keys.
 */
const getString = (key) => {
  if (!isArray(key)) {
    return JSON.parse(storage.getString(key) || null);
  }
  return key.map((k) => [k, JSON.parse(storage.getString(k) || null)]);
};

/**
 * Save a key value pair or a series of key value pairs to Storage.
 * @param  {String|Array} key The key or an array of key/value pairs.
 * @param  {*} value The value to save.
 */
const saveKey = (key, value = null) => {
  if (!isArray(key)) {
    return storage.set(key, JSON.stringify(value));
  }
  return key.map((item) => storage.set(item[0], JSON.stringify(item[1])));
};

/**
 * Delete the value for a given key in Storage.
 * @param  {String|Array} key The key or an array of keys to be deleted.
 */
const deleteKey = (key) => {
  if (!isArray(key)) {
    return storage.delete(key);
  }

  return key.map((value) => storage.delete(value));
};

/**
 * Delete all the values in Storage.
 */
const clearKeys = () => storage.clearAll();

const init = () => {
  configurePersistable({
    storage: {
      setItem: (key, data) => saveKey(key, data),
      getItem: (key) => getString(key),
      removeItem: (key) => deleteKey(key),
    },
  });
};

export default { init, getKeys, getString, saveKey, deleteKey, clearKeys };

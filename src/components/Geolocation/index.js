import React, { useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid, Platform, ActivityIndicator } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { getDistance } from 'geolib';

import theme from 'theme';
import styles from './styles';

const GeoDistance = ({ target = { latitude: 40.7128, longitude: -74.006 } }) => {
  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        setHasPermission(false);
        return false;
      }
    } else {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      if (auth !== 'granted') {
        setHasPermission(false);
        return false;
      }
    }

    setHasPermission(true);
    return true;
  };

  const getCurrentLocation = async () => {
    const permission = await requestLocationPermission();

    if (permission) {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          const currentDistance = getDistance({ latitude, longitude }, target);
          setDistance((currentDistance / 1000).toFixed(2));
        },
        (error) => console.error(error.message),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, [hasPermission]);

  if (!hasPermission) {
    return;
  }

  return (
    <View style={styles.container}>
      {location ? (
        <Text style={styles.distance}>{`${distance} km`}</Text>
      ) : (
        <ActivityIndicator size="small" color={theme.white} />
      )}
    </View>
  );
};

export default GeoDistance;

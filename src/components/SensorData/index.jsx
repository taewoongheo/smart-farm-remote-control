import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import NoSensorData from './NoSensorData';
import ShowSensorData from './ShowSensorData';
import {firebase} from '@react-native-firebase/database';

function SensorData({threshold, thresholdIsLoading}) {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    const onValueChange = firebase
      .app()
      .database()
      .ref('/sensorData')
      .on('value', snapshot => {
        setSensorData({
          ...snapshot.val(),
          lastUpdate: new Date().toLocaleTimeString(),
        });
      });

    return () =>
      firebase.app().database.ref('/sensorData').off('value', onValueChange);
  }, []);

  return (
    <View style={styles.container}>
      {sensorData === null ? (
        <NoSensorData />
      ) : (
        <ShowSensorData
          sensorData={sensorData}
          threshold={threshold}
          thresholdIsLoading={thresholdIsLoading}
        />
      )}
    </View>
  );
}

export default SensorData;

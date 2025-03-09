import React from 'react';
import {Alert, View} from 'react-native';
import {styles} from './styles';
import {useSensorData} from '../../hooks/useSensorData';
import NoSensorData from './NoSensorData';
import LoadingSensorData from './LoadingSensorData';
import ShowSensorData from './ShowSensorData';

function SensorData({threshold, thresholdIsLoading}) {
  const {sensorData, lastUpdate, refreshing, setRefreshing, updateSensorData} =
    useSensorData();

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await updateSensorData();
    } catch (err) {
      Alert.alert('오류 발생', `${err.message}`, [
        {
          text: '확인',
        },
      ]);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      {sensorData === null ? (
        <NoSensorData />
      ) : refreshing === true ? (
        <LoadingSensorData />
      ) : (
        <ShowSensorData
          sensorData={sensorData}
          threshold={threshold}
          thresholdIsLoading={thresholdIsLoading}
          onRefresh={onRefresh}
          lastUpdate={lastUpdate}
        />
      )}
    </View>
  );
}

export default SensorData;

import React, {useState} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {useSensorData} from '../../hooks/useSensorData';
import NoSensorData from './NoSensorData';
import LoadingSensorData from './LoadingSensorData';
import ShowSensorData from './ShowSensorData';

function SensorData({threshold, thresholdIsLoading}) {
  const {sensorData, updateSensorData} = useSensorData();
  const [refreshing, setRefreshing] = useState(false);

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
          updateSensorData={updateSensorData}
          setRefreshing={setRefreshing}
        />
      )}
    </View>
  );
}

export default SensorData;

import React, {useState} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {useSensorData} from '../../hooks/useSensorData';
import NoSensorData from './NoSensorData';
import LoadingSensorData from './LoadingSensorData';
import ShowSensorData from './ShowSensorData';
import {errorAlert} from '../../utils/alerts';
import {ALERT_MESSAGES} from '../../constants/messages';

function SensorData({threshold, thresholdIsLoading}) {
  const {sensorData, updateSensorData} = useSensorData();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await updateSensorData();
    } catch (err) {
      errorAlert(
        ALERT_MESSAGES.ERROR.TITLE,
        err.message,
        ALERT_MESSAGES.ERROR.CONFIRM,
      );
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
        />
      )}
    </View>
  );
}

export default SensorData;

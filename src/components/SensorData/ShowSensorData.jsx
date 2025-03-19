import React from 'react';
import {Text, View} from 'react-native';
import DataCardGrid from './DataCardGrid';
import {styles} from './styles';

function ShowSensorData({sensorData, threshold, thresholdIsLoading}) {
  return (
    <View style={styles.dataContainer} accessibilityLabel="센서 데이터">
      <View style={styles.gridContainer} accessibilityLabel="센서 데이터 정보">
        <DataCardGrid
          sensorData={sensorData}
          threshold={threshold}
          thresholdIsLoading={thresholdIsLoading}
        />
      </View>
      <View style={styles.updateContainer}>
        <Text
          style={styles.updateText}
          accessibilityLabel="마지막 업데이트 정보">
          마지막 업데이트: {sensorData.lastUpdate}
        </Text>
      </View>
    </View>
  );
}

export default ShowSensorData;

import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import DataCardGrid from './DataCardGrid';
import {styles} from './styles';

function ShowSensorData({
  sensorData,
  threshold,
  thresholdIsLoading,
  onRefresh,
  lastUpdate,
}) {
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
        <TouchableOpacity
          onPress={onRefresh}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="센서 데이터 새로고침">
          <Text style={[styles.updateText, styles.updateBtn]}>새로고침</Text>
        </TouchableOpacity>
        {lastUpdate && (
          <Text
            style={styles.updateText}
            accessibilityLabel="마지막 업데이트 정보">
            마지막 업데이트: {lastUpdate}
          </Text>
        )}
      </View>
    </View>
  );
}

export default ShowSensorData;

import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {useSensorData} from '../../hooks/useSensorData';
import DataCardGrid from './DataCardGrid';

function SensorData({threshold, thresholdIsLoading}) {
  const {sensorData, lastUpdate, refreshing, setRefreshing, updateSensorData} =
    useSensorData();

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await updateSensorData();
    } catch (err) {
      console.error('센서 데이터를 가져올 수 없습니다', err);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      {sensorData === null ? (
        <Text>센서 데이터가 없습니다</Text>
      ) : refreshing === true ? (
        <Text>로딩중.....</Text>
      ) : (
        <View style={styles.gridContainer}>
          <DataCardGrid
            sensorData={sensorData}
            threshold={threshold}
            thresholdIsLoading={thresholdIsLoading}
          />
          <View style={styles.updateContainer}>
            <TouchableOpacity onPress={onRefresh} activeOpacity={0.7}>
              <Text style={[styles.updateText, styles.updateBtn]}>
                새로고침
              </Text>
            </TouchableOpacity>
            {lastUpdate && (
              <Text style={styles.updateText}>
                마지막 업데이트: {lastUpdate}
              </Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

export default SensorData;

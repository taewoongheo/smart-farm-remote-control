import React from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
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
      Alert.alert('오류 발생', '센서 데이터를 가져올 수 없습니다', [
        {
          text: '확인',
          onPress: () => console.log('Alert closed'),
        },
      ]);
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
          <View accessibilityLabel="센서 데이터 정보">
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
              <Text style={[styles.updateText, styles.updateBtn]}>
                새로고침
              </Text>
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
      )}
    </View>
  );
}

export default SensorData;

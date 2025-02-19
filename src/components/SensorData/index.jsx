import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {useSensorData} from '../../hooks/useSensorData';
import DataCard from './DataCard';

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

  if (refreshing || !sensorData) {
    return (
      <View>
        <Text>로딩중.....</Text>
      </View>
    );
  }

  const cards = [
    {
      title: '온도',
      icon: '🌡️',
      current: sensorData.dht11.temperature,
      target: threshold?.temperature || 25,
      unit: '°C',
    },
    {
      title: '습도',
      icon: '💧',
      current: sensorData.dht11.humidity,
      target: threshold?.humidity || 60,
      unit: '%',
    },
    {
      title: '토양 습도',
      icon: '🌱',
      current: sensorData.soil.soilHumidity,
      target: threshold?.soilHumidity || 70,
      unit: '%',
    },
    {
      title: '조도',
      icon: '💡',
      current: sensorData.light.percentage,
      target: threshold?.light || 50,
      unit: '%',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {cards.map((card, index) => (
          <View key={index} style={styles.sensorCard}>
            <DataCard card={card} thresholdIsLoading={thresholdIsLoading} />
          </View>
        ))}
        <View style={styles.updateContainer}>
          <TouchableOpacity onPress={onRefresh} activeOpacity={0.7}>
            <Text style={[styles.updateText, styles.updateBtn]}>새로고침</Text>
          </TouchableOpacity>
          {lastUpdate && (
            <Text style={styles.updateText}>마지막 업데이트: {lastUpdate}</Text>
          )}
        </View>
      </View>
    </View>
  );
}

export default SensorData;

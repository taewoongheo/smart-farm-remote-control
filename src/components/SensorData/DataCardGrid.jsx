import React from 'react';
import DataCard from './DataCard';
import DEFAULT_THRESHOLD from '../../constants/defaultThreshold';
import {styles} from './styles';
import {View} from 'react-native';

function DataCardGrid({sensorData, threshold, thresholdIsLoading}) {
  const cards = [
    {
      title: '온도',
      icon: '🌡️',
      current: sensorData.dht11.temperature,
      target: threshold?.temperature || DEFAULT_THRESHOLD.temperature,
      unit: '°C',
    },
    {
      title: '습도',
      icon: '💧',
      current: sensorData.dht11.humidity,
      target: threshold?.humidity || DEFAULT_THRESHOLD.humidity,
      unit: '%',
    },
    {
      title: '토양 습도',
      icon: '🌱',
      current: sensorData.soil.soilHumidity,
      target: threshold?.soilHumidity || DEFAULT_THRESHOLD.soilHumidity,
      unit: '%',
    },
    {
      title: '조도',
      icon: '💡',
      current: sensorData.light.percentage,
      target: threshold?.light || DEFAULT_THRESHOLD.light,
      unit: '%',
    },
  ];

  return (
    <>
      {cards.map((card, index) => (
        <View key={index} style={styles.sensorCard}>
          <DataCard card={card} thresholdIsLoading={thresholdIsLoading} />
        </View>
      ))}
    </>
  );
}

export default DataCardGrid;

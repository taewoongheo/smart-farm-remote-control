import React from 'react';
import DataCard from './DataCard';
import {styles} from './styles';
import {View} from 'react-native';
import SensorDataAlert from './SensorDataAlert';

function DataCardGrid({sensorData, threshold, thresholdIsLoading}) {
  const cards = [
    {
      title: '온도',
      icon: '🌡️',
      current: sensorData.dht11.temperature,
      target: threshold.temperature,
      range: threshold.tempRange,
      unit: '°C',
    },
    {
      title: '습도',
      icon: '💧',
      current: sensorData.dht11.humidity,
      target: threshold.humidity,
      range: threshold.humidityRange,
      unit: '%',
    },
    {
      title: '토양 습도',
      icon: '🌱',
      current: sensorData.soil.humidity,
      target: threshold.soilHumidity,
      range: threshold.soilHumidityRange,
      unit: '%',
    },
    {
      title: '조도',
      icon: '💡',
      current: sensorData.light.percentage,
      target: threshold.light,
      range: threshold.lightRange,
      unit: '%',
    },
  ];

  return (
    <SensorDataAlert sensorData={sensorData} threshold={threshold}>
      {cards.map((card, index) => (
        <View key={index} style={styles.sensorCard}>
          <DataCard card={card} thresholdIsLoading={thresholdIsLoading} />
        </View>
      ))}
    </SensorDataAlert>
  );
}

export default DataCardGrid;

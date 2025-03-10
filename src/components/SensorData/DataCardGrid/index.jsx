import React, {useEffect, useState} from 'react';
import DataCard from './DataCard';
import {styles} from './styles';
import {Text, View} from 'react-native';
import {statusAlert} from '../../../utils/alerts';
import {ALERT_MESSAGES} from '../../../constants/messages';

function DataCardGrid({sensorData, threshold, thresholdIsLoading}) {
  const [isAlerted, setIsAlerted] = useState(false);

  useEffect(() => {
    const temperature = sensorData.dht11.temperature;
    const temperatureTarget = threshold.temperature;
    const temperatureRange = threshold.tempRange;
    if (temperature < temperatureTarget - temperatureRange) {
      if (!isAlerted) {
        setIsAlerted(true);
        statusAlert(
          ALERT_MESSAGES.STATUS_CHANGE.TEMPERATURE.LOW,
          ALERT_MESSAGES.STATUS_CHANGE.TEMPERATURE.MESSAGE(
            temperature,
            temperatureTarget,
            temperatureRange,
          ),
          ALERT_MESSAGES.STATUS_CHANGE.TEMPERATURE.CONFIRM,
        );
      }
    } else {
      setIsAlerted(false);
    }
  }, [sensorData, threshold]);

  if (threshold === undefined) {
    return <Text>목표값을 찾을 수 없습니다</Text>;
  }

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
      current: sensorData.soil.soilHumidity,
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

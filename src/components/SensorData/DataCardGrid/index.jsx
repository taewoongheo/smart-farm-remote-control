import React, {useEffect, useState} from 'react';
import DataCard from './DataCard';
import {styles} from './styles';
import {Text, View} from 'react-native';
import {statusAlert} from '../../../utils/alerts';

function DataCardGrid({sensorData, threshold, thresholdIsLoading}) {
  const [isAlerted, setIsAlerted] = useState(false);

  useEffect(() => {
    const temp = sensorData.dht11.temperature;
    const tempStand = threshold.temperature;
    const tempRange = threshold.tempRange;
    if (temp < tempStand - tempRange) {
      if (!isAlerted) {
        setIsAlerted(true);
        statusAlert(
          '온도 낮음',
          `현재 온도 ${temp}가 기준치: ${tempStand}~${
            tempStand - tempRange
          }보다 낮습니다`,
          '확인',
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

import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';

function SensorData({sensorData, lastUpdate, threshold, thresholdIsLoading}) {
  if (sensorData === null) {
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

  console.log(cards);
  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {cards.map((card, index) => (
          <View key={index} style={styles.sensorCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>{card.icon}</Text>
              <Text style={styles.cardTitle}>{card.title}</Text>
            </View>

            <View style={styles.valueContainerVertical}>
              <View style={styles.valueBox}>
                <Text style={styles.valueLabel}>목표</Text>
                <Text style={styles.currentValue}>
                  {thresholdIsLoading ? '로딩 중..' : card.target}
                  <Text style={styles.unit}>{card.unit}</Text>
                </Text>
              </View>

              <View style={styles.dividerHorizontal} />

              <View style={styles.valueBox}>
                <Text style={styles.valueLabel}>현재</Text>
                <Text style={styles.targetValue}>
                  {card.current}
                  <Text style={styles.unit}>{card.unit}</Text>
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.statusBar,
                card.current >= card.target
                  ? styles.statusGood
                  : styles.statusWarning,
              ]}
            />
          </View>
        ))}
      </View>
      {lastUpdate && (
        <Text style={styles.updateText}>마지막 업데이트: {lastUpdate}</Text>
      )}
    </View>
  );
}

export default SensorData;

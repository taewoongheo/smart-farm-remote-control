import React from 'react';
import {useState} from 'react';
import {ESP32_IS_CONNECT} from '../../constants/config';
import {Alert, Button, Text, View} from 'react-native';
import {styles} from './styles';
import getESP32_IP from '../../utils/utils';

function ThresholdControl() {
  const sendThreshold = async () => {
    if (!ESP32_IS_CONNECT) {
      console.log('ESP32 연결되지 않음 - 임시 저장:', threshold);
      return;
    }
    const ESP32_IP = getESP32_IP();
    try {
      const response = await fetch(`http://${ESP32_IP}/api/threshold`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lightThreshold: threshold,
        }),
      });

      if (response.ok) {
        Alert.alert('성공', '기준값이 설정되었습니다.');
      }
    } catch (error) {
      console.error('ESP32 통신 에러:', error);
    }
  };

  const [threshold, setThreshold] = useState(50);
  return (
    <View style={styles.thresholdContainer}>
      <Text style={styles.sensorText}>기준 조도: {threshold}%</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="-"
          onPress={() => setThreshold(Math.max(0, threshold - 5))}
        />
        <Button
          title="+"
          onPress={() => setThreshold(Math.min(100, threshold + 5))}
        />
        <Button title="설정" onPress={sendThreshold} />
      </View>
    </View>
  );
}

export default ThresholdControl;

import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ESP32_IP} from '@env';

const mockSensorData = {
  dht11: {
    temperature: 25.5,
    humidity: 60,
  },
  soil: {
    soilHumidity: 75,
  },
  light: {
    percentage: 80,
  },
};

function App() {
  const ESP32_IS_CONNECT = false;

  const [sensorData, setSensorData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [threshold, setThreshold] = useState(50);

  const sendThreshold = async () => {
    if (!ESP32_IS_CONNECT) {
      console.log('ESP32 연결되지 않음 - 임시 저장:', threshold);
      return;
    }

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

  const fetchSensorData = async () => {
    if (!ESP32_IS_CONNECT) {
      setSensorData(mockSensorData);
      setLastUpdate(new Date().toLocaleTimeString());
      return;
    }

    try {
      const response = await fetch(`http://${ESP32_IP}/api/sensors`);
      const data = await response.json();
      setSensorData(data);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('ESP32 통신 에러:', error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchSensorData().finally(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!sensorData) {
    return (
      <View style={styles.container}>
        <Text>데이터 로딩 중...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.card}>
          <Text style={styles.title}>현재 상태</Text>
          <Text style={styles.sensorText}>
            🌡️ 온도: {sensorData.dht11.temperature}°C
          </Text>
          <Text style={styles.sensorText}>
            💧 습도: {sensorData.dht11.humidity}%
          </Text>
          <Text style={styles.sensorText}>
            🌱 토양 습도: {sensorData.soil.soilHumidity}%
          </Text>
          <Text style={styles.sensorText}>
            💡 조도: {sensorData.light.percentage}%
          </Text>

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
        </View>

        {lastUpdate && (
          <Text style={styles.updateText}>마지막 업데이트: {lastUpdate}</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  sensorText: {
    fontSize: 18,
    marginBottom: 8,
    color: '#444',
  },
  updateText: {
    textAlign: 'center',
    color: '#444',
    marginTop: 8,
  },
  thresholdContainer: {
    marginTop: 16,
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
});

export default App;

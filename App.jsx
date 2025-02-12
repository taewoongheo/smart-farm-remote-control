import React, {useEffect, useState} from 'react';
import {
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const ESP32_IP = '192.168.0.14';

function App() {
  const [sensorData, setSensorData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchSensorData = async () => {
    try {
      const response = await fetch(`http://${ESP32_IP}/api/sensors`);
      const data = await response.json();
      setSensorData(data);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (error) {
      Alert.alert('에러', 'ESP32와 통신 중 오류가 발생했습니다.');
      console.error(error);
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
            💡 조도: {sensorData.light.percentage}%
          </Text>
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
});

export default App;
